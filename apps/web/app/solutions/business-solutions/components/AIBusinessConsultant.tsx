"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Mic, Paperclip, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function AIBusinessConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello! I am your AI Business Advisor. I can help evaluate ROI payback schedules, draft tenant lease arrangements, configure pricing hierarchies, and estimate LEED LT green credentials. Ask me a question to begin.",
      timestamp: "09:00",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "How do I calculate ROI payback?",
    "Configure tenant lease charging rules.",
    "Assess LEED credit requirements.",
    "Analyze workplace charging occupancy.",
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

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();
      if (lower.includes("roi") || lower.includes("payback")) {
        reply = "Our ROI payback algorithm models initial capital offsets from state/federal grants:\n- CapEx: $12,500 (4 ports AC charging).\n- Grants offset: -$3,500 (PM E-Drive rebate).\n- Expected monthly net revenue (at 78% daily guest utilization): $820.\n- Payback timeline: **11 Months**.";
      } else if (lower.includes("lease") || lower.includes("tenant")) {
        reply = "Recommended tenant lease configurations:\n1. Fixed Lease surcharge: Add $15/month for unlimited employee charging up to 50 kWh.\n2. Utility pass-through: Dynamic billing passes through real-time spot rates + $0.05/kWh maintenance offset margin.";
      } else if (lower.includes("leed") || lower.includes("credit")) {
        reply = "To secure maximum LEED LT points:\n- Install at least 1 fast-charge port for every 10 parking bays.\n- Maintain OCPP smart energy synchronization to log active grid draw schedules.";
      } else {
        reply = "Workplace charging utilization is nominal today. Ask me to draft pricing guidelines or estimate monthly utility bills.";
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        content: reply,
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
        setInputVal("What is our projected payback timeline for office chargers?");
      }, 3000);
    }
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-4">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-3 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">AI Business Advisor</h3>
              <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                Nexiora Business Core
              </p>
            </div>
          </div>
        </div>

        {/* Chat box */}
        <div className="h-[240px] overflow-y-auto border border-white/5 bg-black/40 rounded-2xl p-4 space-y-4 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <div
                key={msg.id}
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
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#00E676]/5 border border-[#00E676]/10 text-white rounded-tr-xs"
                      : "bg-white/2 border border-white/5 text-muted-foreground/90 rounded-tl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className="text-[8px] text-muted-foreground/30 font-mono block text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[70%]">
                <div className="w-7 h-7 rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce duration-[0.6s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce duration-[0.6s] delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce duration-[0.6s] delay-200" />
                </div>
              </div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Prompts suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="p-2.5 rounded-xl border border-white/4 bg-white/1 text-left text-[10px] text-muted-foreground/75 hover:bg-white/3 hover:border-white/10 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-[#00D4FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Inputs row */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && setFileName(e.target.files[0].name)}
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

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding business ROI, landlord lease terms, or charging rates..."}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
            className="flex-1 px-4 py-3 rounded-xl border border-white/5 bg-white/2 focus:border-[#00D4FF]/40 text-xs text-white placeholder-muted-foreground/45 outline-hidden"
          />

          <button
            onClick={handleMicClick}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              voiceActive ? "bg-destructive/20 text-red-400 animate-pulse" : "border-white/5 bg-white/2 text-muted-foreground/65 hover:text-white"
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleSendMessage(inputVal)}
            className="p-3 rounded-xl bg-linear-to-r from-[#00E676] to-[#00D4FF] text-black font-extrabold cursor-pointer"
          >
            Send
          </button>
        </div>

      </div>
    </section>
  );
}
