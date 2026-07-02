"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { Sparkles, Orbit, Cpu } from "lucide-react";

export default function FutureTechPage() {
  const stats = [
    { label: "Research Nodes", value: "6 Fields", change: "Active R&D", changeType: "positive" as const },
    { label: "Solid-State Target", value: "2028 Prod", change: "450 Wh/kg target", changeType: "positive" as const },
    { label: "AI Fleet Nodes", value: "Active", change: "Level 4 ADAS", changeType: "positive" as const },
    { label: "Wireless Charge", value: "92% Efficiency", change: "Inductive", changeType: "neutral" as const }
  ];

  const widgets = [
    {
      title: "Solid-State Battery Progress",
      description: "Replacing liquid electrolytes with solid ceramics/polymers to double energy density and improve thermal safety.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">Anode-free design</span>
            <span className="text-[#FF9F1A]">Reduces cell size by 40%</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">Ceramic Electrolyte</span>
            <span className="text-[#FF9F1A]">Zero thermal runaway risk</span>
          </div>
        </div>
      )
    },
    {
      title: "Inductive Wireless Roadways",
      description: "Dynamic wireless charging lanes that charge EVs as they drive over them, eliminating range anxiety.",
      content: (
        <div className="w-full text-xs text-[#AEB5C0]/85 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <Sparkles className="w-4 h-4 text-[#FF9F1A]" />
            <span>Pilot Test Status: Active trial on 2km highway strip</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="Future Tech"
      subtitle="Discover solid-state chemistry, wireless charging, dynamic infrastructure, and autonomous drive systems."
      categoryName="Future Tech"
      stats={stats}
      widgets={widgets}
    />
  );
}
