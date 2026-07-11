"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Battery, ShieldCheck, Zap, Sliders, Activity } from "lucide-react";

export function EnergyStorageCenter() {
  const [soc, setSoc] = useState(92);

  // Hourly utilization states for the 24-hour heatmap:
  // "charge" (from solar), "discharge" (VPP/peak shaving), "idle" (hold)
  const hourlyStates = [
    { hour: 0, state: "charge", desc: "Off-Peak Charge" },
    { hour: 2, state: "charge", desc: "Off-Peak Charge" },
    { hour: 4, state: "idle", desc: "Buffer Standby" },
    { hour: 6, state: "idle", desc: "Buffer Standby" },
    { hour: 8, state: "discharge", desc: "Peak Load Shave" },
    { hour: 10, state: "charge", desc: "Excess Solar Charge" },
    { hour: 12, state: "charge", desc: "Excess Solar Charge" },
    { hour: 14, state: "charge", desc: "Excess Solar Charge" },
    { hour: 16, state: "idle", desc: "Buffer Standby" },
    { hour: 18, state: "discharge", desc: "HVAC Peak Dispatch" },
    { hour: 20, state: "discharge", desc: "HVAC Peak Dispatch" },
    { hour: 22, state: "charge", desc: "Off-Peak Grid Charge" },
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Active Telemetry */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                BESS CONTROLLER INTERFACE
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Battery className="w-5 h-5 text-[#00E676]" />
                Energy Storage Command Center
              </h2>
            </div>

            {/* Custom Battery Visual Representation */}
            <div className="flex items-center gap-5 bg-white/2 border border-white/5 p-5 rounded-2xl">
              <div className="w-16 h-28 border-2 border-white/20 rounded-xl relative p-1.5 flex flex-col justify-end shrink-0">
                {/* Battery Cap */}
                <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-5 h-1.5 bg-white/30 rounded-t-sm" />
                <motion.div
                  className="w-full rounded-lg bg-linear-to-t from-[#00E676] to-[#00D4FF]"
                  initial={{ height: 0 }}
                  animate={{ height: `${soc}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="space-y-2">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Battery Bank SOC</span>
                <span className="text-3xl font-black text-white block">{soc}%</span>
                <div className="text-xs space-y-0.5 text-muted-foreground/75">
                  <p>Storage Capacity: <span className="font-extrabold text-white">450 kWh</span></p>
                  <p>Remaining backup: <span className="font-extrabold text-[#00E676]">28.0 Hours</span></p>
                </div>
              </div>
            </div>

            {/* Diagnostic stats */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-bold">
              <div className="bg-white/1 border border-white/5 p-2 rounded-xl">
                <span className="text-[7.5px] text-muted-foreground/40 uppercase block">State of Health</span>
                <span className="text-white block mt-0.5">98.4% SOH</span>
              </div>
              <div className="bg-white/1 border border-white/5 p-2 rounded-xl">
                <span className="text-[7.5px] text-muted-foreground/40 uppercase block">Charge Rate</span>
                <span className="text-white block mt-0.5">120 kW</span>
              </div>
              <div className="bg-white/1 border border-white/5 p-2 rounded-xl">
                <span className="text-[7.5px] text-muted-foreground/40 uppercase block">Discharge Rate</span>
                <span className="text-white block mt-0.5">85 kW</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Critical threshold overrides are managed via building SCADA panels automatically.</p>
          </div>
        </div>

        {/* Right Column Utilization Heatmap */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-b border-white/5 pb-2 flex justify-between items-center text-xs">
            <span className="font-extrabold text-white">24-Hour Battery Utilization Heatmap</span>
            <div className="flex items-center gap-3 text-[9px] font-mono">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#00E676]" /> CHARGE</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#4F46E5]" /> DISCHARGE</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-white/10" /> IDLE</span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {hourlyStates.map((block, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-white/5 flex flex-col justify-between h-[85px] transition-all"
                style={{
                  background: block.state === "charge" ? "rgba(0,230,118,0.06)" : block.state === "discharge" ? "rgba(79,70,229,0.06)" : "rgba(255,255,255,0.02)",
                  borderColor: block.state === "charge" ? "rgba(0,230,118,0.15)" : block.state === "discharge" ? "rgba(79,70,229,0.15)" : "rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-[10px] font-mono text-muted-foreground/40 font-bold">
                  {block.hour < 10 ? `0${block.hour}:00` : `${block.hour}:00`}
                </span>
                <span className="text-[10px] font-black text-white block mt-1 leading-tight">{block.desc}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 block self-end"
                  style={{
                    backgroundColor: block.state === "charge" ? "#00E676" : block.state === "discharge" ? "#4F46E5" : "#AEB5C0",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
