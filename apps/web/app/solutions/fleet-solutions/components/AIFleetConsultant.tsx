"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Mic, Paperclip, ArrowRight, X } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function AIFleetConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello, I am your Nexiora AI Fleet Consultant. I have scanned your active vehicle logs, route coordinates, and charging schedule grids. Ask me anything regarding eco-routing, driver efficiency rankings, or diagnostic warnings.",
      timestamp: "19:00",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "How can I reduce fleet operating costs?",
    "Which vehicle requires urgent maintenance?",
    "Optimize our daily depot charging schedule.",
    "Best route for SF loop cargo deliveries.",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setFileName(null);
    setIsTyping(true);

    // AI Response heuristics simulation
    setTimeout(() => {
      let replyContent = "";
      if (text.toLowerCase().includes("reduce") || text.toLowerCase().includes("cost")) {
        replyContent = "To reduce fleet operating costs by an estimated 14%:\n1. Enforce night off-peak charging schedules (10 PM - 6 AM) to leverage $0.08 off-peak utility tariffs.\n2. Mandate the 'Eco Route' for SF Downtown Cargo, which reduces consumption from 22 kWh to 16 kWh compared to direct highway loops.";
      } else if (text.toLowerCase().includes("maintenance") || text.toLowerCase().includes("urgent")) {
        replyContent = "Active logs show Logistics-04 (Tesla Semi) has a 'Front Caliper Thickness' RUL of 18%. This is a critical warning; I recommend scheduling brake pad service at the Ontario Depot within the next 450 miles to avoid safety lockouts.";
      } else if (text.toLowerCase().includes("optimize") || text.toLowerCase().includes("schedule")) {
        replyContent = "Your current grid demand is 132 kW against a 150 kW peak load limit. To optimize charging, I have shifted the charging slot for Logistics-02 (Rivian EDV) to midnight, reducing afternoon grid demand by 22 kW and avoiding utility peak demand charges.";
      } else if (text.toLowerCase().includes("route") || text.toLowerCase().includes("sf")) {
        replyContent = "For SF Downtown deliveries, selecting the 'Eco Route' instead of US-101 N saves 6 kWh per vehicle and avoids the evening rush-hour traffic blockages. SOH arrival estimation is stable at 78% SOC.";
      } else {
        replyContent = "Active telemetry indices show your EV fleet is operating at 98.4% availability. I recommend scheduling routine coolant line checks for Logistics-02 to maintain normal thermal bounds.";
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, assistantMsg]);
    }, 1500);
  };

  const handleMicClick = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setTimeout(() => {
        setVoiceActive(false);
        setInputVal("Which delivery vehicle has diagnostic warnings active?");
      }, 3000);
    }
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-4">
        
        {/* Header bar */}
        <div className="border-b border-white/5 pb-3 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.15)]">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">AI Fleet Advisor</h3>
              <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                Connected to Fleet-API-v4.0
              </p>
            </div>
          </div>
          <span className="text-[9px] text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-2 py-0.5 rounded-full font-bold">
            Telemetry Feed Live
          </span>
        </div>

        {/* Chat window */}
        <div className="h-[280px] overflow-y-auto border border-white/5 bg-black/40 rounded-2xl p-4 space-y-4 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg border shrink-0 flex items-center justify-center text-xs ${
                    msg.sender === "user"
                      ? "border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]"
                      : "border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#00D4FF]/5 border border-[#00D4FF]/10 text-white rounded-tr-xs"
                      : "bg-white/2 border border-white/5 text-muted-foreground/90 rounded-tl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className="text-[8px] text-muted-foreground/30 font-mono block text-right mt-1.5 leading-none">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 max-w-[70%]"
              >
                <div className="w-7 h-7 rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce duration-[0.6s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce duration-[0.6s] delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce duration-[0.6s] delay-200" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="p-2.5 rounded-xl border border-white/4 bg-white/1 text-left text-[10px] text-muted-foreground/75 hover:bg-white/3 hover:border-white/10 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-[#3B82F6] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="relative flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileAttach}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              fileName ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white" : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
            }`}
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding fleet costs, route optimization or diagnostics errors..."}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 focus:bg-black/30 focus:border-[#3B82F6]/40 text-xs text-white placeholder-muted-foreground/40 outline-hidden transition-all"
            />

            <button
              onClick={handleMicClick}
              className={`absolute right-3 p-1.5 rounded-lg transition-all cursor-pointer ${
                voiceActive ? "bg-destructive/25 text-red-400 animate-pulse" : "text-muted-foreground/65 hover:text-white"
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => handleSendMessage(inputVal)}
            className="p-3 rounded-xl bg-linear-to-r from-[#00E676] to-[#00D4FF] text-black font-extrabold shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4 fill-black text-black" />
          </button>
        </div>

      </div>
    </section>
  );
}
