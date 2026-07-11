"use client";

import { useState } from "react";
import { Bot, Sparkles, Send, ArrowRight } from "lucide-react";

const PRESETS: Record<string, string> = {
  "Which battery is safest?": "Lithium Iron Phosphate (LFP) is currently the safest mass-market chemistry. It has high thermal runaway thresholds (>270°C) and releases almost no oxygen when failing, eliminating self-sustaining chemical fires. Solid-State is projected to be even safer by replacing combustible liquid electrolytes entirely.",
  "LFP vs NMC?": "LFP (Lithium Iron Phosphate) offers lower energy density (140-160 Wh/kg) but is cheap, highly safe, cobalt-free, and lasts over 3000 cycles. NMC (Nickel Manganese Cobalt) has higher energy density (200-250 Wh/kg) providing superior driving range and cold-weather performance but is more expensive and degrades faster.",
  "Why do batteries degrade?": "Battery degradation is caused by chemical and physical wear: (1) SEI layer growth on the anode which consumes active lithium; (2) Mechanical stress/cracking in cathode particles due to volume expansion during fast charging; (3) Calendar aging, accelerated by storing batteries at high states of charge (100%) in hot temperatures.",
  "What is SOC?": "SOC (State of Charge) represents the remaining usable battery capacity as a percentage of its current maximum capacity. It is estimated by the BMS using coulomb counting (tracking current entering/leaving) combined with voltage mapping algorithms.",
  "What is SOH?": "SOH (State of Health) measures a battery's current capacity compared to its original factory capacity. For example, a battery with 90% SOH can store 90% of the energy it did when brand new. When SOH drops below 70-80%, the battery is considered degraded for EV traction.",
  "How does BMS work?": "The Battery Management System (BMS) monitors cell parameters (voltage, current, temperature), balances cell voltages, calculates SOC & SOH, protects against short circuits/overcharging, controls cooling loops, and communicates telemetry to the vehicle controller via CAN-bus networks."
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! I am your AI Battery Specialist. Click any query below or ask about battery cells, safety, or BMS." }
  ]);
  const [customText, setCustomText] = useState("");

  const handleQuery = (qText: string) => {
    const userMsg = { sender: "user" as const, text: qText };
    const answer = PRESETS[qText] || "Let me analyze our electrochemistry database for that specific request... (Simulation: Preset answer triggered)";
    const botMsg = { sender: "bot" as const, text: answer };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <section id="ai" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">AI Battery Assistant</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Get instant diagnostic or technical answers about high-voltage battery systems</p>
      </div>

      <div className="rounded-[24px] border border-[#10B981]/15 bg-linear-to-br from-[#10B981]/3 via-transparent to-[#8B5CF6]/2 p-6 relative overflow-hidden grid lg:grid-cols-12 gap-6">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#10B981]/5 rounded-full blur-[80px]" />
        
        {/* Chat History Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between h-[320px] bg-[#131722]/50 border border-white/3 rounded-xl p-4">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.sender === "user" ? "bg-[#3B82F6]/10 border-[#3B82F6]/20" : "bg-[#10B981]/15 border-[#10B981]/25"
                }`}>
                  <Bot className={`w-3.5 h-3.5 ${msg.sender === "user" ? "text-[#60A5FA]" : "text-[#6EE7B7]"}`} />
                </div>
                <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === "user" ? "bg-[#3B82F6]/15 text-white" : "bg-white/5 text-muted-foreground/85"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Simple custom input box */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customText.trim()) {
                  handleQuery(customText);
                  setCustomText("");
                }
              }}
              placeholder="Ask the Battery Assistant..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/3 border border-white/10 text-xs text-white placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#10B981]/40"
            />
            <button
              onClick={() => {
                if (customText.trim()) {
                  handleQuery(customText);
                  setCustomText("");
                }
              }}
              className="w-9 h-9 rounded-lg bg-[#10B981] hover:bg-[#059669] flex items-center justify-center text-white transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset Questions list */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Recommended Queries</span>
            <div className="grid gap-2">
              {Object.keys(PRESETS).map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuery(q)}
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-white/2 border border-white/5 hover:border-[#10B981]/25 hover:bg-[#10B981]/3 transition-all text-left group"
                >
                  <Sparkles className="w-3 h-3 text-[#6EE7B7]/40 group-hover:text-[#6EE7B7] shrink-0" />
                  <span className="text-[11px] text-muted-foreground/75 group-hover:text-white transition-colors">{q}</span>
                </button>
              ))}
            </div>
          </div>

          <a
            href="/evtech/ai-assistant"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 text-[#6EE7B7] hover:bg-[#10B981]/15 text-xs font-bold transition-all group"
          >
            Open Complete Intelligent Assistant
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
