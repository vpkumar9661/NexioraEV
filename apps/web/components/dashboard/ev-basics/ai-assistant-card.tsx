"use client";

import { Bot, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const EXAMPLE_QUESTIONS = [
  "What is the difference between BEV and PHEV?",
  "How long does an EV battery last?",
  "Explain regenerative braking in simple terms",
  "Which is more efficient — AC or DC motors?",
];

export function AIAssistantCard() {
  return (
    <div className="rounded-[20px] border border-[#8B5CF6]/15 bg-linear-to-br from-[#8B5CF6]/4 to-transparent p-6 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#8B5CF6]/5 rounded-full blur-[60px]" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">NexioraEV AI Assistant</h3>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
            </span>
          </div>
        </div>

        <p className="text-[12.5px] text-[#AEB5C0]/65 leading-relaxed">
          Ask anything about Electric Vehicles — from basics to advanced engineering.
        </p>

        <div className="space-y-2">
          {EXAMPLE_QUESTIONS.map((q, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/3 border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/4 transition-all duration-200 cursor-pointer group"
            >
              <Sparkles className="w-3 h-3 text-[#A78BFA]/50 shrink-0" />
              <span className="text-[11.5px] text-[#AEB5C0]/70 group-hover:text-white transition-colors">{q}</span>
            </div>
          ))}
        </div>

        <Link
          href="/evtech/ai-assistant"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-[12px] font-bold hover:bg-[#7C3AED] transition-all duration-200 shadow-[0_4px_12px_rgba(139,92,246,0.25)] group"
        >
          Open AI Assistant
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
