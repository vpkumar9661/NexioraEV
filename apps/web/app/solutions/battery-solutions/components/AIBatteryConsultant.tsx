"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Mic, Paperclip, Sparkles, RefreshCw, Volume2, ArrowRight, X } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function AIBatteryConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello, I am the Nexiora BESS AI Consultant. I have analyzed your battery pack telemetry, temperature curves, and cell chemistry configurations. Ask me anything regarding thermal balancing algorithms, longevity schedules, or recycling options.",
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
    "Which battery chemistry fits commercial intercity buses?",
    "How to mitigate pack cell imbalance degradation?",
    "What is causing the hotspot in cell module #16?",
    "Provide a second-life grid storage value estimation.",
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

    // Simulated AI response
    setTimeout(() => {
      let replyContent = "";
      if (text.toLowerCase().includes("chemistry") || text.toLowerCase().includes("bus")) {
        replyContent = "For intercity heavy-duty commercial buses, LFP (Lithium Iron Phosphate) or LMFP (Manganese-doped) are optimal. They provide up to 5,000 charge cycles, extreme safety against thermal events, and lower CAPEX per kWh compared to NMC, despite having a lower energy density.";
      } else if (text.toLowerCase().includes("imbalance") || text.toLowerCase().includes("degradation")) {
        replyContent = "Pack cell imbalance is typically caused by variations in internal resistance or localized thermal gradients. To mitigate this:\n1. Limit high C-rate charging (> 1.5C) when cell temperature is above 35°C.\n2. Ensure the BMS active balancing routine completes weekly by keeping the pack plugged in at 100% SOC for at least 30 minutes.";
      } else if (text.toLowerCase().includes("cell module") || text.toLowerCase().includes("hotspot")) {
        replyContent = "Cell #16 hotspot (exceeding 44°C) indicates high internal resistance localized degradation or an adjacent cooling pump solenoid valve failure. I recommend running a thermal flush simulation or limiting charge current to 40kW until an on-site mechanical inspection of the cooling lines is performed.";
      } else if (text.toLowerCase().includes("second-life") || text.toLowerCase().includes("grid")) {
        replyContent = "Retired EV battery packs retaining 70-80% SOH are highly suitable for stationary grid storage buffers. They can provide an additional 6-8 years of utility service for solar load shifting, with value estimations averaging $40-$60 per kWh of remaining capacity, plus carbon credits.";
      } else {
        replyContent = "That is an excellent battery systems inquiry. Active BMS logs show that maintaining cell temperatures between 15°C and 35°C is the single most effective way to optimize SOH lifespan. I recommend compiling a Thermal Report to inspect grid thermal trends.";
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
        setInputVal("Recommended thermal balancing algorithms for LFP packs");
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
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">AI Battery Advisor</h3>
              <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                Connected to Nexiora BESS-v3.2
              </p>
            </div>
          </div>
          <span className="text-[9px] text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 rounded-full font-bold">
            BMS Optimization Active
          </span>
        </div>

        {/* Chat window */}
        <div className="h-[300px] overflow-y-auto border border-white/5 bg-black/40 rounded-2xl p-4 space-y-4 scroll-smooth">
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
                      : "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]"
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
                <div className="w-7 h-7 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce duration-[0.6s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce duration-[0.6s] delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce duration-[0.6s] delay-200" />
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
              <ArrowRight className="w-3 h-3 text-[#10B981] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
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
              placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding battery chemistry, thermal balancing, or diagnostic warnings..."}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 focus:bg-black/30 focus:border-[#10B981]/40 text-xs text-white placeholder-muted-foreground/40 outline-hidden transition-all"
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
            className="p-3 rounded-xl bg-linear-to-r from-[#10B981] to-[#00D4FF] text-black font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4 fill-black text-black" />
          </button>
        </div>

      </div>
    </section>
  );
}
