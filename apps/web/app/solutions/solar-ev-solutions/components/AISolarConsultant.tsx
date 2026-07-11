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

export function AISolarConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      content: "Hello! I am your Nexiora AI Solar & Storage Advisor. I can help size your rooftop solar array, coordinate Tesla Powerwall backup parameters, evaluate net metering credits, or optimize your daily EV charging schedules. Ask me anything!",
      timestamp: "20:00",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What solar capacity do I need?",
    "Should I add battery storage?",
    "Can I charge my EV only from solar?",
    "How much solar tax subsidy can I receive?",
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
      if (lower.includes("capacity") || lower.includes("size")) {
        replyContent = "For a standard home with a $250 monthly utility bill, I recommend a **10.5 kW DC Solar Plant**.\nThis requires approximately 26 modern 400W solar panels and covers about 460 sq. ft. of clear south-facing roof space.";
      } else if (lower.includes("battery") || lower.includes("storage")) {
        replyContent = "Adding a battery storage system (like the Tesla Powerwall 3) is highly recommended if:\n1. Your local utility has a time-of-use tariff rate (e.g., peak rates of $0.40/kWh vs off-peak $0.12/kWh).\n2. You live in an area prone to grid outages.\nIt allows you to store excess daytime solar and discharge during high-rate evening hours.";
      } else if (lower.includes("only from solar") || lower.includes("charge my ev")) {
        replyContent = "Yes! Charging your EV 100% from solar is possible. A 10 kW solar array produces about 40-50 kWh of energy on a clear day. Since the average daily commute requires only 10-15 kWh, you can schedule EV charging during peak solar generation hours (10 AM to 3 PM) or store it in your home battery for nighttime charging.";
      } else if (lower.includes("subsidy") || lower.includes("tax")) {
        replyContent = "Under the Federal Residential Clean Energy Credit (Section 25D), you can claim a **30% tax credit (ITC)** on the total cost of both the solar system and battery storage installations. For a $22,400 project, this saves you $6,720 directly on your federal taxes.";
      } else if (lower.includes("roi") || lower.includes("payback")) {
        replyContent = "Your estimated payback period is **5.5 to 6.5 years** depending on utility inflation. Over the 25-year performance warranty lifetime of the solar panels, you will accumulate over **$70,000 in net savings**.";
      } else {
        replyContent = "Your solar capacity estimations look optimal. I recommend shifting your EV charging window to start at 10:00 AM to absorb excess generation and avoid grid imports.";
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
        setInputVal("What is my estimated payback period for a 10 kW system?");
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
            <div className="w-8 h-8 rounded-lg bg-[#F4B400]/15 border border-[#F4B400]/30 flex items-center justify-center text-[#F4B400] shadow-[0_0_10px_rgba(244,180,0,0.15)]">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">AI Solar Consultant</h3>
              <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
                Connected to Inverter-API-v2.1
              </p>
            </div>
          </div>
          <span className="text-[9px] text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-2 py-0.5 rounded-full font-bold">
            Solar Feed Active
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
                      : "border-[#F4B400]/30 bg-[#F4B400]/10 text-[#F4B400]"
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
                <div className="w-7 h-7 rounded-lg border border-[#F4B400]/30 bg-[#F4B400]/10 flex items-center justify-center text-[#F4B400]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white/2 border border-white/5 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] animate-bounce duration-[0.6s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] animate-bounce duration-[0.6s] delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] animate-bounce duration-[0.6s] delay-200" />
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
              <ArrowRight className="w-3 h-3 text-[#F4B400] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
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
              placeholder={fileName ? `Attached: ${fileName}` : "Ask regarding rooftop solar sizing, net metering tariffs, or EV charging schedules..."}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 focus:bg-black/30 focus:border-[#F4B400]/40 text-xs text-white placeholder-muted-foreground/40 outline-hidden transition-all"
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
            className="p-3 rounded-xl bg-linear-to-r from-[#F4B400] to-[#00E676] text-black font-extrabold shadow-[0_0_20px_rgba(244,180,0,0.2)] hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-all cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4 fill-black text-black" />
          </button>
        </div>

      </div>
    </section>
  );
}
