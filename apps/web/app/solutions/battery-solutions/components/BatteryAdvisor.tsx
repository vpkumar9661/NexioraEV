"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BrainCircuit, HardDrive, Compass, ChevronRight, HelpCircle } from "lucide-react";

interface ChemistrySpec {
  id: string;
  name: string;
  full: string;
  desc: string;
  density: number; // Wh/kg (out of 500)
  cycleLife: number; // cycles
  chargeSpeed: number; // C-rate (1-10)
  safety: number; // 1-10
  cost: number; // 1-10 (10 is cheapest)
  ratings: number[]; // [density, cycleLife, chargeSpeed, safety, cost] (all 0-100)
  bestFor: string;
  apps: string[];
}

export function BatteryAdvisor() {
  const [activeChem, setActiveChem] = useState<string>("lfp");

  const chemistries: Record<string, ChemistrySpec> = {
    lfp: {
      id: "lfp",
      name: "LFP",
      full: "Lithium Iron Phosphate (LiFePO4)",
      desc: "Outstanding lifecycle durability and thermal safety. Free of cobalt and nickel, making it highly cost-effective, though energy density limits absolute range.",
      density: 160,
      cycleLife: 4500,
      chargeSpeed: 7,
      safety: 9,
      cost: 8,
      ratings: [40, 90, 65, 95, 80],
      bestFor: "Commercial Fleets & Stationary Storage",
      apps: ["Urban buses", "Delivery trucks", "Grid storage BESS", "Apartment solar buffers"],
    },
    nmc: {
      id: "nmc",
      name: "NMC",
      full: "Nickel Manganese Cobalt (LiNiMnCoO2)",
      desc: "High energy density supporting long ranges. The workhorse of passenger EVs, though thermal management requirements and material costs are higher.",
      density: 260,
      cycleLife: 2000,
      chargeSpeed: 8,
      safety: 6,
      cost: 5,
      ratings: [75, 55, 80, 65, 50],
      bestFor: "Premium Passenger EVs & Long-Range Logistics",
      apps: ["High-range SUVs", "Commercial e-vans", "Intercity distribution fleets"],
    },
    nca: {
      id: "nca",
      name: "NCA",
      full: "Nickel Cobalt Aluminum (LiNiCoAlO2)",
      desc: "Extreme energy density optimized for high-power discharge rates. Requires robust cooling loops and has shorter cycle durability.",
      density: 280,
      cycleLife: 1500,
      chargeSpeed: 9,
      safety: 5,
      cost: 4,
      ratings: [85, 45, 90, 55, 40],
      bestFor: "Performance Vehicles & Aerospace Grids",
      apps: ["Hypercars", "Performance sedans", "High-power delivery loops"],
    },
    lmfp: {
      id: "lmfp",
      name: "LMFP",
      full: "Lithium Manganese Iron Phosphate",
      desc: "Bridging the gap between LFP safety and NMC density. Adds manganese to boost cell voltage, offering solid density at lower costs.",
      density: 210,
      cycleLife: 3000,
      chargeSpeed: 7.5,
      safety: 8,
      cost: 7.5,
      ratings: [55, 75, 70, 85, 75],
      bestFor: "Mass-Market Passenger EVs & Delivery Fleets",
      apps: ["Compact passenger cars", "Light cargo vans", "Urban rideshare fleets"],
    },
    solid: {
      id: "solid",
      name: "Solid State",
      full: "Solid-State Electrolyte Li-Metal",
      desc: "The next-generation frontier. Replaces liquid electrolyte with solid state separators, offering extreme safety, double energy density, and lightning charge rates.",
      density: 450,
      cycleLife: 5000,
      chargeSpeed: 10,
      safety: 10,
      cost: 2,
      ratings: [100, 100, 100, 100, 20],
      bestFor: "Next-Gen Long-Range Luxury & Autonomous Fleets",
      apps: ["Ultra-premium EVs", "Autonomous long-haul trucks", "High-altitude drones"],
    },
    sodium: {
      id: "sodium",
      name: "Sodium-Ion",
      full: "Sodium-Ion (Na-Ion)",
      desc: "Abundant and completely cobalt/lithium-free. Works exceptionally well in freezing temperatures. Ideal for budget urban mobility and massive storage grids.",
      density: 140,
      cycleLife: 3000,
      chargeSpeed: 8.5,
      safety: 8.5,
      cost: 9.5,
      ratings: [30, 75, 85, 85, 95],
      bestFor: "Stationary Grid Buffers & Budget Urban Cars",
      apps: ["Massive grid storage BESS", "Cold-climate urban buses", "Micro-mobility"],
    },
  };

  const current = chemistries[activeChem]!;

  // Radar chart constants
  const center = 100;
  const maxRadius = 70;
  const angles = [
    -Math.PI / 2,                  // Axis 0: Energy Density (Top)
    -Math.PI / 2 + (2 * Math.PI / 5), // Axis 1: Cycle Life
    -Math.PI / 2 + (4 * Math.PI / 5), // Axis 2: Charging Speed
    -Math.PI / 2 + (6 * Math.PI / 5), // Axis 3: Safety / Thermal
    -Math.PI / 2 + (8 * Math.PI / 5), // Axis 4: Cost Efficiency
  ];

  const getRadarPath = (ratings: number[]) => {
    return ratings
      .map((val, idx) => {
        const rad = (val / 100) * maxRadius;
        const x = center + rad * Math.cos(angles[idx]!);
        const y = center + rad * Math.sin(angles[idx]!);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" L ");
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left selector sidebar column */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
              PORTFOLIO SELECTION ENGINE
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <BrainCircuit className="w-5 h-5 text-[#10B981]" />
              Battery Selection Advisor
            </h2>
          </div>

          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Compare chemistries based on energy output, life cycle counts, safety, and operational budgets to find the optimal fit.
          </p>

          <div className="flex flex-col gap-2.5">
            {Object.values(chemistries).map((spec) => (
              <button
                key={spec.id}
                onClick={() => setActiveChem(spec.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeChem === spec.id
                    ? "border-[#10B981] bg-[#10B981]/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">{spec.full}</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">Best For: {spec.bestFor}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeChem === spec.id ? "translate-x-0.5 text-[#10B981]" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Radar Plot & Details column */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
          
          {/* Details layout */}
          <div className="flex-1 flex flex-col justify-between space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#10B981] uppercase tracking-widest">
                    Active Chemistry
                  </span>
                  <h3 className="text-lg font-black text-white mt-2.5">{current.full}</h3>
                </div>

                <p className="text-xs text-muted-foreground/85 leading-relaxed">
                  {current.desc}
                </p>

                <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4 text-xs">
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Energy Density</span>
                    <span className="font-extrabold text-white mt-0.5 block">{current.density} Wh/kg</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Cycle Durability</span>
                    <span className="font-extrabold text-[#10B981] mt-0.5 block">{current.cycleLife} Cycles</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Charge Rate</span>
                    <span className="font-extrabold text-white mt-0.5 block">{current.chargeSpeed} C Max</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Cost Factor</span>
                    <span className="font-extrabold text-[#00D4FF] mt-0.5 block">{current.cost}/10 index</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-white/5 pt-4">
              <span className="text-[9px] text-muted-foreground/45 font-bold uppercase block mb-2">Core Deployments</span>
              <div className="flex flex-wrap gap-1.5">
                {current.apps.map((app, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-sm bg-white/4 text-muted-foreground text-[9.5px] font-medium border border-white/5">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Custom SVG Radar Chart */}
          <div className="w-[180px] h-[180px] mx-auto md:mx-0 shrink-0 flex items-center justify-center relative">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              {/* Radar Grid web lines (outer and inner rings) */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, gridIdx) => {
                const rad = ratio * maxRadius;
                const points = angles.map((ang) => `${(center + rad * Math.cos(ang)).toFixed(1)},${(center + rad * Math.sin(ang)).toFixed(1)}`).join(" L ");
                return (
                  <path
                    key={gridIdx}
                    d={`M ${points} Z`}
                    fill="none"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Radar Grid Axes */}
              {angles.map((ang, axisIdx) => {
                const x2 = center + maxRadius * Math.cos(ang);
                const y2 = center + maxRadius * Math.sin(ang);
                return (
                  <line
                    key={axisIdx}
                    x1={center}
                    y1={center}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Dynamic chemistry polygon path */}
              {(() => {
                const polyPath = getRadarPath(current.ratings);
                return (
                  <g>
                    {/* Glow fill underneath polygon */}
                    <path
                      d={`M ${polyPath} Z`}
                      fill="url(#radarGlowGrad)"
                      opacity="0.25"
                    />
                    {/* Polygon border */}
                    <path
                      d={`M ${polyPath} Z`}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.5"
                    />
                    
                    {/* Node points indicators */}
                    {current.ratings.map((val, idx) => {
                      const rad = (val / 100) * maxRadius;
                      const cx = center + rad * Math.cos(angles[idx]!);
                      const cy = center + rad * Math.sin(angles[idx]!);
                      return (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r="2.5"
                          fill="white"
                          stroke="#10B981"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </g>
                );
              })()}

              {/* Radar Axis labels */}
              <text x={center} y={center - maxRadius - 6} fill="rgba(255,255,255,0.4)" fontSize="6.5" textAnchor="middle" fontWeight="bold">DENSITY</text>
              <text x={center + maxRadius + 2} y={center + 12} fill="rgba(255,255,255,0.4)" fontSize="6.5" textAnchor="start" fontWeight="bold">COST</text>
              <text x={center + 30} y={center + maxRadius + 10} fill="rgba(255,255,255,0.4)" fontSize="6.5" textAnchor="middle" fontWeight="bold">SAFETY</text>
              <text x={center - 30} y={center + maxRadius + 10} fill="rgba(255,255,255,0.4)" fontSize="6.5" textAnchor="middle" fontWeight="bold">SPEED</text>
              <text x={center - maxRadius - 2} y={center + 12} fill="rgba(255,255,255,0.4)" fontSize="6.5" textAnchor="end" fontWeight="bold">CYCLE LIFE</text>

              <defs>
                <radialGradient id="radarGlowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.1" />
                </radialGradient>
              </defs>
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
