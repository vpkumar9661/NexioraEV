"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sun, ShieldCheck, Clock, Sliders, Play, AlertCircle } from "lucide-react";

interface ScheduleTask {
  id: string;
  name: string;
  startHour: number;
  duration: number;
  color: string;
}

export function ChargingManagement() {
  const [gridLimit, setGridLimit] = useState(150); // kW
  const [chargingVehicles, setChargingVehicles] = useState(6);

  const tasks: ScheduleTask[] = [
    { id: "t-1", name: "Transit-01 (Urban)", startHour: 22, duration: 4, color: "#00E676" },
    { id: "t-2", name: "Logistics-02 (Cargo)", startHour: 0, duration: 6, color: "#8B5CF6" },
    { id: "t-3", name: "Transit-03 (Local)", startHour: 2, duration: 4, color: "#00D4FF" },
    { id: "t-4", name: "Logistics-04 (Inter)", startHour: 11, duration: 5, color: "#00E676" },
    { id: "t-5", name: "Transit-05 (Heavy)", startHour: 13, duration: 3, color: "#F59E0B" },
    { id: "t-6", name: "Transit-06 (Emergency)", startHour: 16, duration: 2, color: "#ef4444" },
  ];

  const gridDemand = (chargingVehicles * 22); // assume 22kW average AC charger draw
  const capacityPct = Math.min(100, Math.round((gridDemand / gridLimit) * 100));

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left load metrics column */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-widest block">
                BESS COORDINATION GATEWAY
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Zap className="w-5 h-5 text-[#8B5CF6]" />
                Charging Management
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Monitors aggregate fleet charging draw. Automatically balances grid loads against corporate capacity bounds to avoid high demand surcharges.
            </p>

            <div className="space-y-3.5 bg-black/45 p-4 rounded-xl border border-white/4">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-muted-foreground/65 uppercase">
                  <span>Active Grid Demand</span>
                  <span className="text-white">{gridDemand} kW</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[#8B5CF6] to-[#00D4FF] transition-all duration-300"
                    style={{ width: `${capacityPct}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-xs font-bold">
                <span className="text-muted-foreground/60">Total Active chargers:</span>
                <span className="text-white">{chargingVehicles} / 12 units</span>
              </div>
            </div>

            {/* Slider to adjust limit */}
            <div className="bg-white/1 border border-white/5 p-4 rounded-xl space-y-2.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Peak load threshold limit</span>
                <span className="text-white">{gridLimit} kW</span>
              </div>
              <input
                type="range"
                min="100"
                max="300"
                step="25"
                value={gridLimit}
                onChange={(e) => setGridLimit(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
              />
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10px] text-muted-foreground/75 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <p>
              Smart scheduler automatically shifts heavy cargo trucks to night loops starting at 10 PM.
            </p>
          </div>
        </div>

        {/* Right timeline grid column */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4 bg-black/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
          
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2 shrink-0">
            <span>24-HOUR FLEET CHARGING TIMELINE</span>
            <span>GRID DEMAND PLOTS</span>
          </div>

          {/* Timeline schedule visualization */}
          <div className="flex-1 overflow-y-auto space-y-3 pt-2 max-h-[220px]">
            {tasks.map((task) => {
              // Convert start hour and duration to percentage offsets
              const leftOffset = (task.startHour / 24) * 100;
              const widthPct = (task.duration / 24) * 100;

              return (
                <div key={task.id} className="space-y-1">
                  <div className="flex justify-between text-[9px] text-muted-foreground/50 font-bold uppercase">
                    <span>{task.name}</span>
                    <span>{task.startHour}:00 ({task.duration} hrs)</span>
                  </div>

                  <div className="w-full h-5 bg-white/2 border border-white/4 rounded-md relative overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="h-full absolute rounded-sm shadow-md"
                      style={{
                        left: `${leftOffset}%`,
                        width: `${widthPct}%`,
                        backgroundColor: `${task.color}25`,
                        border: `1px solid ${task.color}45`,
                      }}
                    >
                      <div className="h-full w-0.5 absolute left-0" style={{ backgroundColor: task.color }} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X Axis Hours */}
          <div className="flex justify-between border-t border-white/5 pt-2 text-[9px] text-muted-foreground/40 font-mono">
            <span>00:00 Night</span>
            <span>06:00 Morning</span>
            <span>12:00 Noon</span>
            <span>18:00 Peak</span>
            <span>24:00 Mid</span>
          </div>
        </div>

      </div>
    </section>
  );
}
