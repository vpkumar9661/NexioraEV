"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ShieldAlert, Cpu, CheckCircle2, RotateCcw, Wind } from "lucide-react";

interface CellTemp {
  id: number;
  row: number;
  col: number;
  baseTemp: number;
}

export function ThermalManagement() {
  const [coolingActive, setCoolingActive] = useState(false);
  const [throtteActive, setThrottleActive] = useState(false);

  // 24 simulated battery cell configurations inside a pack
  const cells: CellTemp[] = [
    { id: 1, row: 1, col: 1, baseTemp: 24.5 },
    { id: 2, row: 1, col: 2, baseTemp: 25.0 },
    { id: 3, row: 1, col: 3, baseTemp: 26.2 },
    { id: 4, row: 1, col: 4, baseTemp: 27.8 },
    { id: 5, row: 1, col: 5, baseTemp: 29.5 },
    { id: 6, row: 1, col: 6, baseTemp: 31.0 },

    { id: 7, row: 2, col: 1, baseTemp: 24.8 },
    { id: 8, row: 2, col: 2, baseTemp: 25.5 },
    { id: 9, row: 2, col: 3, baseTemp: 27.0 },
    { id: 10, row: 2, col: 4, baseTemp: 28.5 },
    { id: 11, row: 2, col: 5, baseTemp: 30.2 },
    { id: 12, row: 2, col: 6, baseTemp: 32.5 },

    { id: 13, row: 3, col: 1, baseTemp: 25.1 },
    { id: 14, row: 3, col: 2, baseTemp: 26.0 },
    { id: 15, row: 3, col: 3, baseTemp: 38.4 }, // Hot spot
    { id: 16, row: 3, col: 4, baseTemp: 44.2 }, // Hot spot (Critical)
    { id: 17, row: 3, col: 5, baseTemp: 32.0 },
    { id: 18, row: 3, col: 6, baseTemp: 29.8 },

    { id: 19, row: 4, col: 1, baseTemp: 24.2 },
    { id: 20, row: 4, col: 2, baseTemp: 24.9 },
    { id: 21, row: 4, col: 3, baseTemp: 28.0 },
    { id: 22, row: 4, col: 4, baseTemp: 31.5 },
    { id: 23, row: 4, col: 5, baseTemp: 27.2 },
    { id: 24, row: 4, col: 6, baseTemp: 25.5 },
  ];

  // Calculate simulated cell temp based on control modes
  const getCellTemp = (cell: CellTemp) => {
    let t = cell.baseTemp;
    if (coolingActive) {
      // cooling decreases hotspots significantly
      t = t > 35 ? t - 12.5 : t - 4.2;
    }
    if (throtteActive) {
      // throttle drops remaining thermal loads
      t = t - 2.8;
    }
    return parseFloat(t.toFixed(1));
  };

  // Get color code representing temperature
  const getTempColor = (temp: number) => {
    if (temp >= 40) return "rgba(239, 68, 68, 0.75)"; // Red
    if (temp >= 32) return "rgba(245, 158, 11, 0.65)"; // Yellow/Orange
    if (temp >= 26) return "rgba(16, 185, 129, 0.5)"; // Green
    return "rgba(0, 212, 255, 0.4)"; // Cyan (Cool)
  };

  const maxTemp = Math.max(...cells.map(c => getCellTemp(c)));
  const avgTemp = parseFloat((cells.reduce((sum, c) => sum + getCellTemp(c), 0) / 24).toFixed(1));
  const coolingEfficiency = coolingActive ? (throtteActive ? 94.2 : 85.5) : 48.0;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control and Recommendation cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                THERMAL CONTROL PANEL
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
                Thermal Management Center
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Monitors pack temperature distribution. Liquid coolant pumping systems adjust automatically to manage core cells from thermal runaways.
            </p>

            {/* Simulated Alerts */}
            <div className="space-y-2">
              {maxTemp >= 40 ? (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-[11px] flex gap-2.5 items-start">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <span className="font-extrabold block">Critical Hotspot Alert</span>
                    <p className="opacity-80">Cell #16 exceeded threshold: {maxTemp}°C. Cooling recommended.</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] rounded-xl text-[11px] flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">Pack Thermal Status Nominal</span>
                    <p className="opacity-80">Average temperature is stable at {avgTemp}°C. Coolant lines open.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actuators */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <button
                onClick={() => setCoolingActive(!coolingActive)}
                className={`py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  coolingActive
                    ? "border-[#10B981] bg-[#10B981]/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
                }`}
              >
                <Wind className={`w-3.5 h-3.5 ${coolingActive ? "animate-[spin_4s_linear_infinite]" : ""}`} />
                Coolant Pumps
              </button>

              <button
                onClick={() => setThrottleActive(!throtteActive)}
                className={`py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  throtteActive
                    ? "border-amber-500 bg-amber-500/10 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Throttle Load
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4 text-center">
            <div className="bg-white/1 border border-white/5 p-2.5 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Max Temp</span>
              <span className={`text-sm font-black ${maxTemp >= 40 ? "text-rose-400" : "text-white"}`}>
                {maxTemp}°C
              </span>
            </div>
            <div className="bg-white/1 border border-white/5 p-2.5 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Avg Temp</span>
              <span className="text-sm font-black text-white">{avgTemp}°C</span>
            </div>
            <div className="bg-white/1 border border-white/5 p-2.5 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Eff. index</span>
              <span className="text-sm font-black text-[#00D4FF]">{coolingEfficiency}%</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Battery Pack Heat Map grid */}
        <div className="lg:col-span-7 flex items-center justify-center bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/50 border-b border-white/5 pb-2">
              <span>BESS PACK LAYOUT MODEL</span>
              <span>CELL MATRIX 4 x 6</span>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-6 gap-3.5">
              {cells.map((cell) => {
                const activeTemp = getCellTemp(cell);
                const color = getTempColor(activeTemp);

                return (
                  <motion.div
                    key={cell.id}
                    layout
                    className="aspect-square rounded-lg border border-white/5 flex flex-col items-center justify-center p-1.5 transition-all duration-300 shadow-inner relative overflow-hidden"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-[7px] text-muted-foreground/40 font-mono block absolute top-1 left-1">
                      #{cell.id}
                    </span>
                    <span className="text-[10px] font-black text-white z-10">{activeTemp}°</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Grid Legend bar */}
            <div className="flex justify-between items-center text-[8px] text-muted-foreground/50 pt-2 border-t border-white/5">
              <div className="flex gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500/40 border border-sky-400/50 block" />
                  &lt;26°C Cool
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/40 border border-emerald-400/50 block" />
                  26-32°C Normal
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500/40 border border-amber-400/50 block" />
                  32-40°C Warm
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/40 border border-red-400/50 block" />
                  &gt;40°C Hotspot
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
