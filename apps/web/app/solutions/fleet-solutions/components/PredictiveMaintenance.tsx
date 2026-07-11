"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, ShieldAlert, Cpu, CheckCircle2, RotateCcw, AlertTriangle } from "lucide-react";

interface ComponentHealth {
  name: string;
  category: "battery" | "motor" | "brakes" | "suspension";
  rul: number; // Remaining Useful Life %
  status: "nominal" | "check" | "critical";
  recommendation: string;
}

export function PredictiveMaintenance() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const components: ComponentHealth[] = [
    { name: "Cathode Cell Degradation", category: "battery", rul: 94, status: "nominal", recommendation: "Optimal capacity. Run weekly active balancing." },
    { name: "Liquid Cooling Line Silt", category: "battery", rul: 48, status: "check", recommendation: "Perform loop flush in next 3,000 miles." },
    { name: "Traction Motor Bearing Wear", category: "motor", rul: 82, status: "nominal", recommendation: "No vibration sag detected. Standard service." },
    { name: "Inverter Coil Temperature", category: "motor", rul: 90, status: "nominal", recommendation: "Operating within normal thermal parameters." },
    { name: "Front Caliper Thickness", category: "brakes", rul: 18, status: "critical", recommendation: "Replace brake pad pads within 450 miles." },
    { name: "Regen Brake Coil Imbalance", category: "brakes", rul: 65, status: "check", recommendation: "Recalibrate torque margins in next depot rest." },
    { name: "Shock Absorber Leakage", category: "suspension", rul: 75, status: "nominal", recommendation: "Pressure index matches nominal logistics load." },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nominal": return "#10B981"; // Green
      case "check": return "#F59E0B"; // Gold
      case "critical": return "#ef4444"; // Red
      default: return "#AEB5C0";
    }
  };

  const filtered = components.filter(c => activeTab === "all" || c.category === activeTab);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#ef4444] uppercase tracking-widest block">
              AI DIAGNOSTICS CONTROL
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
              Predictive Maintenance
            </h2>
          </div>

          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Tracks wear metrics across key mechanical and electric drivetrains. Generates early service warnings prior to hardware fault flags.
          </p>

          <div className="flex flex-col gap-2">
            {["all", "battery", "motor", "brakes", "suspension"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-3 rounded-xl border text-left text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? "border-rose-500 bg-rose-500/10 text-white shadow-sm"
                    : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
                }`}
              >
                {tab} Category
              </button>
            ))}
          </div>
        </div>

        {/* Right column detailed list */}
        <div className="lg:col-span-7 bg-[#131722]/55 border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4 max-h-[320px] overflow-y-auto scrollbar-thin">
          
          <div className="space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-white/4 bg-black/40 flex justify-between items-start gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{item.name}</span>
                    <span
                      className="text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-full uppercase"
                      style={{
                        backgroundColor: `${getStatusColor(item.status)}15`,
                        color: getStatusColor(item.status),
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/75">{item.recommendation}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">RUL Left</span>
                  <span className="text-sm font-black text-white" style={{ color: getStatusColor(item.status) }}>
                    {item.rul}%
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
