"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { Bot, MessageSquare, Sparkles } from "lucide-react";

export default function AIAssistantPage() {
  const stats = [
    { label: "AI Engine", value: "EV-GPT 4", change: "Dedicated LLM", changeType: "positive" as const },
    { label: "Response Speed", value: "0.85s", change: "Streaming ready", changeType: "positive" as const },
    { label: "Daily Queries", value: "8,240+", change: "+24% this wk", changeType: "positive" as const },
    { label: "Expert Domain", value: "100% EV", change: "Fine-tuned", changeType: "neutral" as const }
  ];

  const widgets = [
    {
      title: "Intelligent EV Assistant Interface",
      description: "Ask technical questions about vehicle specs, charging compatibility, diagnostic trouble codes (DTCs), and more.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
            <span className="text-[#FF9F1A] font-bold">User:</span>
            <p className="text-[#AEB5C0]">What is the difference between active and passive cell balancing in a BMS?</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              AI Assistant:
            </span>
            <p className="text-[#AEB5C0]/85 leading-relaxed">Passive balancing dissipates excess energy as heat through resistors, whereas active balancing shuttles charge between cells using capacitive/inductive transfers for 95%+ efficiency...</p>
          </div>
        </div>
      )
    },
    {
      title: "Fine-Tuning Capabilities",
      description: "Our LLM is continuously trained on automotive schemas, SAE charging protocols, and BMS codebases.",
      content: (
        <div className="w-full text-xs text-[#AEB5C0]/85 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Dataset Version: v2.8 Automotive Fine-tune active</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="AI EV Assistant"
      subtitle="Interact with our intelligent, fine-tuned EV advisory AI."
      categoryName="AI EV Assistant"
      stats={stats}
      widgets={widgets}
    />
  );
}
