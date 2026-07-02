"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { Plug, Radio, Activity } from "lucide-react";

export default function ChargingHubPage() {
  const stats = [
    { label: "Active Stations", value: "842 Grid", change: "99.8% Uptime", changeType: "positive" as const },
    { label: "Max Peak Rate", value: "350 kW", change: "DC Superfast", changeType: "positive" as const },
    { label: "Standard Ports", value: "CCS2 / NACS", change: "Compliant", changeType: "neutral" as const },
    { label: "Grid Status", value: "Balanced", change: "Active V2G", changeType: "positive" as const }
  ];

  const widgets = [
    {
      title: "Charging Standards Connector Matrix",
      description: "Explore the different charging speeds, voltage configurations, and connectors standard globally.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">CCS Type 2</span>
            <span className="text-[#FF9F1A]">Up to 350kW DC</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">NACS Standard</span>
            <span className="text-[#FF9F1A]">Tesla / Universal North America</span>
          </div>
        </div>
      )
    },
    {
      title: "V2G (Vehicle-to-Grid) Simulator",
      description: "Bidirectional charging allows parked EVs to supply battery power back to the grid during peak loads.",
      content: (
        <div className="w-full text-xs text-[#AEB5C0]/85 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Power Output Flowing: Grid Feed active</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="Charging Hub"
      subtitle="Connectors, charging types, charging speed profiles, and grid integration."
      categoryName="Charging Hub"
      stats={stats}
      widgets={widgets}
    />
  );
}
