"use client";

import React, { useState } from "react";
import { Zap, Sun, ShieldCheck, Compass, Clock, Battery } from "lucide-react";

export function EVChargingIntegration() {
  const [plugInTime, setPlugInTime] = useState(18); // 6 PM
  const [targetSoc, setTargetSoc] = useState(80); // %

  // Calculated values depending on options
  const chargeDurationHours = Math.ceil(((targetSoc - 20) * 75) / 100 / 7.2); // 75kWh pack, 7.2kW charger
  const completionTime = (plugInTime + chargeDurationHours) % 24;

  const timelineBlocks = [
    { hour: "00:00", source: "grid", rate: "$0.08 / kWh", desc: "Night Charging (Grid)" },
    { hour: "04:00", source: "grid", rate: "$0.08 / kWh", desc: "Night Charging (Grid)" },
    { hour: "08:00", source: "idle", rate: "$0.00 / kWh", desc: "System Idle" },
    { hour: "10:00", source: "solar", rate: "$0.00 / kWh", desc: "100% Solar Charge" },
    { hour: "13:00", source: "solar", rate: "$0.00 / kWh", desc: "100% Solar Charge" },
    { hour: "17:00", source: "battery", rate: "$0.00 / kWh", desc: "Powerwall Discharge" },
    { hour: "21:00", source: "grid", rate: "$0.24 / kWh", desc: "Off-Peak Night Grid" },
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Config */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#FF9800] uppercase tracking-widest block">
                GRID BALANCING GATEWAY
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Zap className="w-5 h-5 text-[#FF9800]" />
                EV Charging Integration
              </h2>
            </div>

            {/* Inputs sliders */}
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Vehicle Plug-In Time</span>
                  <span className="text-white">
                    {plugInTime === 12 ? "12:00 PM" : plugInTime > 12 ? `${plugInTime - 12}:00 PM` : `${plugInTime}:00 AM`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  step="1"
                  value={plugInTime}
                  onChange={(e) => setPlugInTime(Number(e.target.value))}
                  className="w-full accent-[#FF9800] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Target Battery SOC</span>
                  <span className="text-white">{targetSoc}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={targetSoc}
                  onChange={(e) => setTargetSoc(Number(e.target.value))}
                  className="w-full accent-[#FF9800] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sizing calculations */}
          <div className="border-t border-white/5 pt-4 text-xs font-bold space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground/50">Est. Charge Duration:</span>
              <span className="text-white">{chargeDurationHours} hrs (at 7.2 kW)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/50">Completion Time:</span>
              <span className="text-[#00E676]">
                {completionTime === 0 ? "12:00 AM" : completionTime > 12 ? `${completionTime - 12}:00 PM` : `${completionTime}:00 AM`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Source Timeline */}
        <div className="lg:col-span-7 space-y-5">
          <div className="border-b border-white/5 pb-2 flex justify-between items-center text-xs">
            <span className="font-extrabold text-white">Smart Charging Energy Source Distribution</span>
            <span className="text-[10px] font-mono text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-2 py-0.5 rounded-full">
              Optimized Charging Schedule Active
            </span>
          </div>

          <div className="space-y-3">
            {timelineBlocks.map((block, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 text-[11px] font-mono text-muted-foreground/50 font-bold">{block.hour}</div>
                  <div>
                    <span className="text-xs font-black text-white block">{block.desc}</span>
                    <span className="text-[9px] text-muted-foreground/40 font-mono">Utility rate: {block.rate}</span>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                    block.source === "solar"
                      ? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20"
                      : block.source === "battery"
                      ? "bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20"
                      : block.source === "idle"
                      ? "bg-white/5 text-muted-foreground/45 border-white/5"
                      : "bg-[#FF9800]/10 text-[#FF9800] border-[#FF9800]/20"
                  }`}
                >
                  {block.source}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
