"use client";

import React from "react";
import { Leaf, Award, ShieldCheck, Sun, Zap, Trash2 } from "lucide-react";

export function CarbonDashboard() {
  const radius = 55;
  const strokeWidth = 8;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (84.5 / 100) * circ; // 84.5% renewable offset share

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Gauge */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                ESG ACCOUNTING GATEWAY
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Leaf className="w-5 h-5 text-[#10B981]" />
                Carbon Impact Dashboard
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
                  stroke="url(#carbonGlow)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="carbonGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
                <span className="text-2xl font-black text-white leading-none">84.5%</span>
                <span className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-1">
                  Renewable energy
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <p>
              Corporate offsets match GHG Scope 1 logistics fleet transport accounting benchmarks.
            </p>
          </div>
        </div>

        {/* Right Column Metrics Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              CO₂ Saved
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">248.5 Tons</span>
              <span className="text-[9.5px] text-muted-foreground/65 block mt-0.5">Offset vs Diesel transport</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              ICE Fuel Saved
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">22,480 Gal</span>
              <span className="text-[9.5px] text-muted-foreground/65 block mt-0.5">Diesel gallons unconsumed</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Forest Equivalent
            </span>
            <div>
              <span className="text-xl font-black text-[#10B981] block mt-1.5">10,800 Trees</span>
              <span className="text-[9.5px] text-muted-foreground/65 block mt-0.5">Equivalent annual planting</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Power Consumption
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">142.8 MWh</span>
              <span className="text-[9.5px] text-muted-foreground/65 block mt-0.5">Total charging power draw</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              ESG Score rating
            </span>
            <div>
              <span className="text-xl font-black text-[#00D4FF] block mt-1.5">AA Grade</span>
              <span className="text-[9.5px] text-muted-foreground/65 block mt-0.5">National transport rating</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Landfill Savings
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">4,800 kg</span>
              <span className="text-[9.5px] text-muted-foreground/65 block mt-0.5">Regenerative brake pad offset</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
