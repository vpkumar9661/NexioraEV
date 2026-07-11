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

export function AIEnergyAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello! I am your AI Energy Assistant. I have connected to your active building SCADA lines, battery bank logs, and dynamic P2P clearing price grids. Ask me anything regarding VPP dispatch events, load forecasts, or grid frequency sags.",
      timestamp: "20:30",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "How can I reduce energy costs?",
    "Optimize battery dispatch schedules.",
    "Forecast tomorrow's load curve.",
    "Should I export energy to the grid?",
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
      const lower = text.toLowerCase();
      if (lower.includes("reduce") || lower.includes("cost")) {
        replyContent = "To reduce energy costs by an estimated 16%:\n1. Implement off-peak battery charging (12 AM - 6 AM) using off-peak utility tariffs ($0.08/kWh).\n2. Dispatch 150 kW storage to HQ building C during afternoon peak rate spikes ($0.42/kWh).";
      } else if (lower.includes("optimize") || lower.includes("battery")) {
        replyContent = "Battery dispatch schedules optimized:\n- Solar BESS set to absorb rooftop PV outputs (10 AM - 3 PM).\n- Virtual Power Plant dispatch trigger set to discharge 180 kW BESS at 6 PM to offset evening cooling peaks, avoiding peak demand charges.";
      } else if (lower.includes("forecast") || lower.includes("tomorrow")) {
        replyContent = "AI Load Forecast for tomorrow:\n- Peak demand predicted at 2:00 PM (1,150 kW) due to 84°F ambient cooling demands.\n- Solar generation forecasted to peak at 12:30 PM (680 kW).\n- Recommending charging BESS to 100% SOC before noon to offset the afternoon spike.";
      } else if (lower.includes("export") || lower.includes("grid")) {
        replyContent = "Dynamic Tariff clearing price is currently **$0.14 / kWh**.\nExporting 80 kW excess solar from Canopy B is recommended, yielding estimated daily credits of **$11.20** while maintaining 45% BESS buffer security limits.";
      } else {
        replyContent = "System indices are stable. Power factor is aligned at 0.98, and Total Harmonic Distortion is 1.8%. Ask me to run specific load predictions or generate grid compliance reports.";
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
        setInputVal("Should we export excess solar energy to the grid now?");
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
            <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.15)]">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">AI Energy Command Center</h3>
              <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                Connected to EMS-API-v3.0
              </p>
            </div>
          </div>
          <span className="text-[9px] text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-2 py-0.5 rounded-full font-bold">
            SCADA Feed Live
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
                      ? "border-[#00E676]/30 bg-[#00E676]/10 text-[#00E676]"
                      : "border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#00E676]/5 border border-[#00E676]/10 text-white rounded-tr-xs"
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
                <div className="w-7 h-7 rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce duration-[0.6s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce duration-[0.6s] delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce duration-[0.6s] delay-200" />
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
              <ArrowRight className="w-3 h-3 text-[#00D4FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
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
              placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding microgrid status, peak loads forecasts, or VPP bids clearance price..."}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 focus:bg-black/30 focus:border-[#00D4FF]/40 text-xs text-white placeholder-muted-foreground/40 outline-hidden transition-all"
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
