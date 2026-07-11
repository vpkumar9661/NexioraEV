"use client";

import React from "react";
import { Leaf, Award, ShieldCheck, Sun, Zap } from "lucide-react";

export function CarbonIntelligence() {
  const radius = 55;
  const strokeWidth = 8;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (84.5 / 100) * circ; // 84.5% clean renewable energy share

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Gauge */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                ESG ACCOUNTING MATRIX
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Leaf className="w-5 h-5 text-[#00E676]" />
                Carbon Intelligence
              </h2>
            </div>

            {/* Circular Gauge */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center pt-2">
              <svg className="w-full h-full -rotate-90">
                <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  fill="none"
                  stroke="url(#smartCarbonGlow)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="smartCarbonGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00E676" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
                <span className="text-2xl font-black text-white leading-none">84.5%</span>
                <span className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-1">
                  Renewable ratio
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>
              Scope 1 carbon saved values conform directly to regional clean energy utility compliance standards.
            </p>
          </div>
        </div>

        {/* Right Column ESG Metrics Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              CO₂ Saved
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">2,480.5 Tons</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Offset vs Coal generation</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Trees Equivalent
            </span>
            <div>
              <span className="text-xl font-black text-[#00E676] block mt-1.5">108,000 Trees</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Equivalent annual planting</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              ESG Score rating
            </span>
            <div>
              <span className="text-xl font-black text-[#00D4FF] block mt-1.5">AAA Grade</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">National microgrid rating</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Energy Efficiency
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">98.4% Score</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Building thermal performance</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Green Index
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">98.2 / 100</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Rooftop array utilization</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Fossil Fuel Saved
            </span>
            <div>
              <span className="text-xl font-black text-[#F4B400] block mt-1.5">220,000 Gal</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Diesel gallons unconsumed</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
