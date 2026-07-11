"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Mic, Paperclip, Sparkles, RefreshCw, Volume2, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function AIChargingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Welcome to the NexioraEV Charging Infrastructure consultant. I have analyzed your property configurations, solar capacity metrics, and regional utility grids. Ask me anything regarding CAPEX amortization, optimal charger standard allocation, or local power permits.",
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
    "Which charger standard should I install for high traffic malls?",
    "What is the best commercial business model (owner operator vs hosted)?",
    "How to size battery storage offsets for solar + charging integration?",
    "Explain local fast charger subsidy incentives.",
  ];

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // User message
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

    // Simulated streaming response from the AI assistant
    setTimeout(() => {
      let replyContent = "";
      if (text.toLowerCase().includes("which charger") || text.toLowerCase().includes("mall")) {
        replyContent = "For high-traffic commercial hubs like retail malls, I recommend a dual configuration:\n1. 80% Level 2 AC Chargers (22kW) for visitors staying 2-3 hours.\n2. 20% DC Fast Chargers (60kW-120kW) for rapid top-ups. Ensure NACS and CCS2 standards are supported to cover all modern vehicles.";
      } else if (text.toLowerCase().includes("business model") || text.toLowerCase().includes("operator")) {
        replyContent = "The hosted model (Third-party owns, pays rent) offers low CAPEX risk but captures lower yield. An Owner-Operator model yields a much higher long-term ROI (average payback under 3.5 years) if utilization exceeds 15% daily, plus it qualifies you directly for accelerated federal depreciation write-offs.";
      } else if (text.toLowerCase().includes("solar") || text.toLowerCase().includes("battery")) {
        replyContent = "For solar + charging setups, aim for 2.5 kW of solar capacity per daily vehicle session. Integrate a stationary battery bank (BESS) sized at 1.5x your daily solar generation. This lets you buffer peak charger demand spikes (saving utility load tariffs) and buffer energy generated during off-peak morning hours.";
      } else if (text.toLowerCase().includes("subsidy") || text.toLowerCase().includes("incentives")) {
        replyContent = "Current federal incentives (Title 30C) cover 30% of EV infrastructure hardware and installation costs up to $100,000. Additionally, state LCFS (Low Carbon Fuel Standard) programs issue credits tradeable for cash based on cumulative energy dispensed. Make sure to claim these at filing.";
      } else {
        replyContent = "That is an excellent engineering inquiry. Based on grid transformer sizing rules, deploying high-capacity fast charging requires coordinating load profiles with local utility substations. I recommend downloading the cost report model to inspect the load constraints.";
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
      // Simulate listening
      setTimeout(() => {
        setVoiceActive(false);
        setInputVal("Optimal charging corridor configuration for expressways");
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
            <div className="w-8 h-8 rounded-lg bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center text-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.15)]">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">AI Charging Advisor</h3>
              <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                Connected to Nexiora LLM-Energy-v3
              </p>
            </div>
          </div>
          <span className="text-[9px] text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-2 py-0.5 rounded-full font-bold">
            Grid Optimizer Live
          </span>
        </div>

        {/* Chat Body workspace */}
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
                      : "border-[#00E676]/30 bg-[#00E676]/10 text-[#00E676]"
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
                <div className="w-7 h-7 rounded-lg border border-[#00E676]/30 bg-[#00E676]/10 flex items-center justify-center text-[#00E676]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-bounce duration-[0.6s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-bounce duration-[0.6s] delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-bounce duration-[0.6s] delay-200" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="p-2.5 rounded-xl border border-white/4 bg-white/1 text-left text-[10px] text-muted-foreground/75 hover:bg-white/3 hover:border-white/10 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-[#00E676] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>

        {/* Input Bar terminal */}
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
              placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding grid layout, charger sizing, business modeling..."}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 focus:bg-black/30 focus:border-[#00E676]/40 text-xs text-white placeholder-muted-foreground/40 outline-hidden transition-all"
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
