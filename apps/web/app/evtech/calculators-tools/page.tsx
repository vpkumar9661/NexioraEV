"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { Calculator, Sparkles, RefreshCw } from "lucide-react";

export default function CalculatorsToolsPage() {
  const stats = [
    { label: "Tools Loaded", value: "4 Modules", change: "Interactive", changeType: "neutral" as const },
    { label: "Calculation Latency", value: "12ms", change: "Client-side", changeType: "positive" as const },
    { label: "Precision", value: "99.9%", change: "WLTP Standard", changeType: "positive" as const },
    { label: "Updates", value: "June 2026", change: "Up-to-date", changeType: "neutral" as const }
  ];

  const widgets = [
    {
      title: "Interactive Range & Charging Cost Estimator",
      description: "Estimate your monthly fuel cost savings, vehicle battery health degradation rates, and charging times.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">Estimated Cost Savings</span>
            <span className="text-[#FF9F1A]">~₹8,500 / Month</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">Battery Degradation Target</span>
            <span className="text-[#FF9F1A]">&lt;1.8% / Year</span>
          </div>
        </div>
      )
    },
    {
      title: "EMI and ROI Analysis Module",
      description: "Analyze the total cost of ownership (TCO) compared to ICE vehicles to calculate break-even years.",
      content: (
        <div className="w-full text-xs text-[#AEB5C0]/85 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>TCO Break-even Target reached in 2.4 Years</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="Calculators & Tools"
      subtitle="Interactive tools to calculate EV charging cost, battery health, and financial ROI."
      categoryName="Calculators & Tools"
      stats={stats}
      widgets={widgets}
    />
  );
}
