"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Mic, Paperclip, ArrowRight, X, Search, Pin, MessageSquare, Trash } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  pinned: boolean;
}

export function UnifiedWorkspace() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Welcome to the NexioraEV flagship AI Operating System. I have unified all active data feeds from: (1) Charging Hubs, (2) BESS Battery Vaults, (3) Fleet Telematics, (4) Microgrid Solar Arrays, (5) Smart Energy Grids, and (6) Business Ledgers. Ask me to run cross-layer load balancing simulations or audit carbon credentials.",
      timestamp: "09:40",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: "sess-1", title: "HQ Charger Optimization", pinned: true },
    { id: "sess-2", title: "Battery SOH Degradation", pinned: true },
    { id: "sess-3", title: "Carbon compliance index", pinned: false },
    { id: "sess-4", title: "VPP dispatch arbitration", pinned: false },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Run cross-layer grid balance simulation.",
    "Forecast battery failure risks for Fleet A.",
    "Calculate LEED LT green incentive margins.",
    "Should we export solar storage reserve now?",
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
      if (lower.includes("balance") || lower.includes("simulation")) {
        reply = "Initiating cross-layer smart energy grid simulation:\n- Solar PV generation clearing: 480 kW.\n- Active BESS storage charge: 92% SOC.\n- Peak workplace loads: 340 kW.\n- Net state: **Exporting +140 kW** to regional utility. Load balancer is stable.";
      } else if (lower.includes("battery") || lower.includes("failure")) {
        reply = "Evaluating battery health diagnostics across Fleet A:\n- Analyzed 14 LFP battery packs via cloud BMS digital twins.\n- Node #4 is displaying a localized temperature spike (+12°F vs fleet mean).\n- Anomaly confidence: **98.4%**. Scheduling preventive maintenance.";
      } else if (lower.includes("leed") || lower.includes("incentive")) {
        reply = "To secure maximum LEED LT points at HQ parking:\n1. 10 AC charging ports must conform to OCPP 2.0.1 smart load balancing schedules.\n2. Ensure grid isolation is maintained to yield an estimated **12 green certification credits**.";
      } else if (lower.includes("export") || lower.includes("solar")) {
        reply = "Dynamic P2P clearing rate is currently **$0.14 / kWh**.\nExporting 80 kW excess solar from Canopy B is recommended, yielding daily credits of **$11.20** while maintaining 45% BESS buffer security limits.";
      } else {
        reply = "I have scanned all active solutions systems. Diagnostics are nominal. Power factor is aligned at 0.98 and THD harmonics are 1.8%. Ask me to compile reports or trigger load shifting.";
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
        setInputVal("Assess battery health degradation across the active fleet.");
      }, 3000);
    }
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chats Sidebar */}
        <div className="lg:col-span-4 bg-black/40 border border-white/5 p-4 rounded-xl flex flex-col justify-between h-[380px]">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>CONVERSATION HISTORY</span>
              <MessageSquare className="w-3.5 h-3.5" />
            </div>

            <div className="space-y-2 max-y-[240px] overflow-y-auto scrollbar-thin pr-1">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-2.5 rounded-lg border border-white/5 bg-white/2 hover:bg-white/4 flex items-center justify-between gap-3 text-xs text-white"
                >
                  <div className="flex items-center gap-2">
                    {sess.pinned && <Pin className="w-3 h-3 text-[#8B5CF6] shrink-0" />}
                    <span className="font-extrabold truncate max-w-[120px]">{sess.title}</span>
                  </div>
                  <Trash className="w-3 h-3 text-muted-foreground/35 hover:text-rose-400 cursor-pointer shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-white/2 border border-white/5 rounded-lg text-[9px] text-muted-foreground/50 text-center font-mono uppercase tracking-widest">
            Nexiora Memory V3.0
          </div>
        </div>

        {/* Right Chat workspace */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4 h-[380px]">
          {/* Chat feed */}
          <div className="flex-1 overflow-y-auto border border-white/5 bg-black/40 rounded-xl p-4 space-y-4 scroll-smooth">
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
                        : "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#8B5CF6]"
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
                    <span className="text-[8px] text-muted-foreground/30 font-mono block text-right mt-1.5 leading-none">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[70%]">
                  <div className="w-7 h-7 rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce duration-[0.6s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce duration-[0.6s] delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce duration-[0.6s] delay-200" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Prompts list */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {suggestedPrompts.slice(0, 4).map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                className="p-2 rounded-lg border border-white/4 bg-white/1 text-left text-[9px] leading-tight text-muted-foreground/75 hover:bg-white/3 hover:border-white/10 hover:text-white transition-all cursor-pointer font-bold"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Inputs bar */}
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
                fileName ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-white" : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
              }`}
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding smart grids, battery health predictions, or VPP bids..."}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              className="flex-1 px-4 py-3 rounded-xl border border-white/5 bg-white/2 focus:border-[#8B5CF6]/40 text-xs text-white placeholder-muted-foreground/45 outline-hidden"
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
              className="p-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7c4ee6] text-white font-extrabold cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
