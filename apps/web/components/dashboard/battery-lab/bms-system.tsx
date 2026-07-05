"use client";

import { useState } from "react";
import { ShieldCheck, Settings, BrainCircuit, RefreshCw, MessageSquare, AlertTriangle } from "lucide-react";

interface BMSFeature {
  id: string;
  label: string;
  icon: typeof Settings;
  desc: string;
  metric: string;
  color: string;
}

const FEATURES: BMSFeature[] = [
  { id: "voltage", label: "Cell Monitoring", icon: Settings, desc: "Continuously checks each cell group's terminal voltages to prevent overcharging (>4.25V) and over-discharging (<2.5V).", metric: "3.84V Avg", color: "#10B981" },
  { id: "balancing", label: "Passive/Active Balancing", icon: RefreshCw, desc: "Equalizes internal cell voltages by discharging overcharged cells through resistors or transferring charge to lower cells.", metric: "99.8% Balanced", color: "#3B82F6" },
  { id: "temp", label: "Thermal Mapping", icon: Settings, desc: "Monitors thermistor grids to detect local hot spots and initiates safety cooling protocols or shutdowns under thermal runaway risk.", metric: "24.5°C Normal", color: "#EC4899" },
  { id: "soc", label: "State of Charge (SOC)", icon: BrainCircuit, desc: "Uses Coulomb counting and Kalman filtering algorithms to estimate remaining battery capacity, shown to users as range percentage.", metric: "85.2% SOC", color: "#8B5CF6" },
  { id: "soh", label: "State of Health (SOH)", icon: BrainCircuit, desc: "Estimates the capacity degradation and internal resistance metrics relative to a fresh battery to track cell health over time.", metric: "96.4% SOH", color: "#06B6D4" },
  { id: "comm", label: "CAN-Bus Link", icon: MessageSquare, desc: "Transmits real-time current, temperature, and status telemetry packets to the vehicle's Motor Controller (MCU) and central ECUs.", metric: "Active 500kbps", color: "#F59E0B" }
];

export function BMSSystem() {
  const [activeFeature, setActiveFeature] = useState<BMSFeature>(FEATURES[0]!);

  return (
    <section id="bms" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Management System (BMS)</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Learn how high-voltage controllers maintain safety, balancing, and state calculations</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Interactive selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            const isActive = activeFeature.id === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeature(feat)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between gap-4 ${
                  isActive
                    ? "bg-white/4"
                    : "bg-white/1 hover:bg-white/2"
                }`}
                style={{ borderColor: isActive ? `${feat.color}40` : "rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ backgroundColor: `${feat.color}15`, borderColor: `${feat.color}25` }}>
                    <Icon className="w-4 h-4" style={{ color: feat.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{feat.label}</span>
                    <span className="text-[10px] text-[#AEB5C0]/50 block mt-0.5">{feat.metric}</span>
                  </div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feat.color }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right BMS Diagram with Animated Signal Flow */}
        <div className="lg:col-span-7 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#10B981_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />

          {/* Heading Detail */}
          <div className="flex items-start justify-between border-b border-white/5 pb-3">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">{activeFeature.label} Function</span>
              <span className="text-[11px] text-[#AEB5C0]/50 mt-1 block">Live logic parameters & signal diagnostics</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> SECURE
            </div>
          </div>

          {/* Signal flow block diagram */}
          <div className="relative h-[180px] bg-[#131722]/50 border border-white/3 rounded-xl flex items-center justify-center p-4">
            <svg className="w-full h-full" viewBox="0 0 400 160">
              {/* Battery Cells array */}
              <g transform="translate(20, 45)">
                <rect x="0" y="0" width="80" height="70" rx="10" fill="#131722" stroke="#10B981" strokeWidth="1.5" />
                <text x="40" y="32" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontWeight="bold">CELL STACK</text>
                <text x="40" y="48" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="8">3.8V x 96S</text>
              </g>

              {/* BMS Control unit */}
              <g transform="translate(160, 45)">
                <rect x="0" y="0" width="80" height="70" rx="10" fill="#131722" stroke={activeFeature.color} strokeWidth="1.5" />
                <text x="40" y="32" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">BMS CORE</text>
                <text x="40" y="48" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="8">MCU Control</text>
              </g>

              {/* Dashboard telemetry / ECU */}
              <g transform="translate(300, 45)">
                <rect x="0" y="0" width="80" height="70" rx="10" fill="#131722" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="40" y="32" textAnchor="middle" fill="#60A5FA" fontSize="9" fontWeight="bold">VEC ECU</text>
                <text x="40" y="48" textAnchor="middle" fill="#AEB5C0" opacity="0.4" fontSize="8">Dashboard CAN</text>
              </g>

              {/* Pulsing Signal lines */}
              {/* Line 1: Cell stack -> BMS Core */}
              <path d="M 100,80 L 160,80" stroke={activeFeature.color} strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.8s" repeatCount="indefinite" />
              </path>

              {/* Line 2: BMS Core -> ECU */}
              <path d="M 240,80 L 300,80" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.6s" repeatCount="indefinite" />
              </path>
            </svg>

            {/* Float warning alert node if active feature is temp or balancing */}
            {activeFeature.id === "temp" && (
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-bold text-rose-400">
                <AlertTriangle className="w-3 h-3 animate-bounce" /> THERMAL SAFE LOOP ACTIVE
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-[12.5px] text-[#AEB5C0]/80 leading-relaxed bg-white/1 p-4 rounded-xl border border-white/5">
            {activeFeature.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
