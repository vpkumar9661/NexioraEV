"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { Battery, Zap, ShieldCheck } from "lucide-react";

export default function BatteryLabPage() {
  const stats = [
    { label: "Lab Status", value: "Operational", change: "Temp: 24°C", changeType: "positive" as const },
    { label: "BMS Status", value: "Optimal", change: "SOC: 85%", changeType: "positive" as const },
    { label: "Thermal Loop", value: "Liquid Active", change: "Flowing", changeType: "positive" as const },
    { label: "Cell Chemistry", value: "LFP / NMC", change: "Tested", changeType: "neutral" as const }
  ];

  const widgets = [
    {
      title: "Cell Chemistry Analytics",
      description: "Compare energy density, life cycles, and thermal profiles of current Lithium-ion cell variants.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">LFP Chemistry</span>
            <span className="text-[#FF9F1A]">3,000+ Cycles (Long Life)</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">NMC Chemistry</span>
            <span className="text-[#FF9F1A]">250 Wh/kg (High Density)</span>
          </div>
        </div>
      )
    },
    {
      title: "BMS Smart Diagnosis",
      description: "Battery Management Systems monitor state of charge, state of health, and cell balancing in real time.",
      content: (
        <div className="w-full space-y-2 text-xs text-[#AEB5C0]/85">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Over-voltage Protection: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Thermal Runway Safe Mode: Standby</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="Battery Lab"
      subtitle="Deep dive into battery chemistries, thermal management systems, and safety features."
      categoryName="Battery Lab"
      stats={stats}
      widgets={widgets}
    />
  );
}
