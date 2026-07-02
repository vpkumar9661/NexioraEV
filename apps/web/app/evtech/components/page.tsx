"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { Cpu, RotateCcw, Wrench } from "lucide-react";

export default function EVComponentsPage() {
  const stats = [
    { label: "Motor Type", value: "PMSM", change: "97% Efficient", changeType: "positive" as const },
    { label: "Max Motor RPM", value: "18,000", change: "Liquid Cooled", changeType: "positive" as const },
    { label: "Inverter Tech", value: "SiC MOSFET", change: "Low switching loss", changeType: "positive" as const },
    { label: "Drivetrain Config", value: "AWD Dual", change: "Synchronized", changeType: "neutral" as const }
  ];

  const widgets = [
    {
      title: "Core EV Drivetrain Modules",
      description: "How the motor, controller, power inverter, and drivetrain gearboxes sync up to drive the wheels.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">SiC Inverter</span>
            <span className="text-[#FF9F1A]">Converts DC to 3-Phase AC</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-white font-bold">Reduction Gearbox</span>
            <span className="text-[#FF9F1A]">Single-speed transmission</span>
          </div>
        </div>
      )
    },
    {
      title: "Regenerative Braking Systems",
      description: "Converts kinetic energy back into electrical energy during coasting, storing it back into the battery pack.",
      content: (
        <div className="w-full text-xs text-[#AEB5C0]/85 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <RotateCcw className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Energy Recovered: +28% range offset achieved</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="EV Components"
      subtitle="Examine motors, inverter technologies, gearboxes, and suspension modules."
      categoryName="EV Components"
      stats={stats}
      widgets={widgets}
    />
  );
}
