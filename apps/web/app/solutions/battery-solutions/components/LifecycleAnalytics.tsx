"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, Sliders, Eye, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export function LifecycleAnalytics() {
  const [activeTab, setActiveTab] = useState<"fade" | "aging" | "timeline">("fade");
  const [simYears, setSimYears] = useState(8);

  // Heuristic math data for 15 years capacity fade curves
  const years = Array.from({ length: 16 }, (_, i) => i);
  
  // SOH prediction curves for different chemistries
  const lfpFade = years.map((yr) => 100 * Math.exp(-0.012 * yr)); // LFP is highly durable
  const nmcFade = years.map((yr) => 100 * Math.exp(-0.025 * yr)); // NMC degrades slightly faster
  const sodiumFade = years.map((yr) => 100 * Math.exp(-0.02 * yr));

  const currentSoh = parseFloat((100 * Math.exp(-0.018 * simYears)).toFixed(1));

  // Convert points to SVG coordinates
  const svgW = 480;
  const svgH = 150;

  const getPointsString = (data: number[]) => {
    return data
      .map((val, idx) => {
        const x = (idx / 15) * svgW;
        const y = svgH - 10 - ((val - 60) / 40) * (svgH - 25); // map 60%-100% SOH to vertical space
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" L ");
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Control Card & Simulation */}
        <div className="xl:w-[320px] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                AI LIFECYCLE MONITORING
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Clock className="w-5 h-5 text-[#10B981]" />
                Lifecycle & Aging
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Analyze battery capacity fade over 15 operational years to predict replacement cycles and prevent critical field failures.
            </p>

            {/* Tabs */}
            <div className="flex bg-white/2 border border-white/5 p-1 rounded-xl">
              {(["fade", "aging", "timeline"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-center rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white/5 border border-white/10 text-[#10B981] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                      : "text-muted-foreground/50 hover:text-white"
                  }`}
                >
                  {tab === "fade" ? "Capacity Fade" : tab === "aging" ? "Calendar Aging" : "Timeline"}
                </button>
              ))}
            </div>

            {/* Slider to simulate year focus */}
            <div className="bg-white/1 border border-white/5 p-4 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Predictive Horizon</span>
                <span className="text-[#00D4FF] font-black">Year {simYears}</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={simYears}
                onChange={(e) => setSimYears(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
            </div>
          </div>

          {/* Diagnostic indicators */}
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground/40 font-bold uppercase">
              <span>Diagnostics Check</span>
              <span className="text-[#10B981] font-black">PASS</span>
            </div>
            
            <div className="flex justify-between text-xs font-bold">
              <span className="text-muted-foreground/75">Predicted SOH:</span>
              <span className="text-white">{currentSoh}% SOH</span>
            </div>

            <div className="flex justify-between text-xs font-bold">
              <span className="text-muted-foreground/75">Amortization status:</span>
              <span className="text-[#00D4FF]">{simYears < 10 ? "Optimal Yield" : "Replacement Prep"}</span>
            </div>
          </div>
        </div>

        {/* Right Graph panel */}
        <div className="flex-1 rounded-[24px] border border-white/5 bg-black/40 p-5 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex flex-wrap gap-4 text-[10px] font-bold text-muted-foreground/65 uppercase">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#10B981] block" />
                LFP Battery (Grid Standard)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#00D4FF] block" />
                NMC Battery (High Density)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#84CC16] block" style={{ borderStyle: "dashed" }} />
                Sodium-Ion (Abundant Grid)
              </div>
            </div>
            <span className="text-muted-foreground/50 font-mono text-[9px]">SOH % vs Operational Years</span>
          </div>

          {/* SVG Custom Graph */}
          <div className="h-[150px] w-full flex items-center justify-center relative">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full overflow-visible">
              {/* Reference Grid lines */}
              <line x1="0" y1={svgH - 10} x2={svgW} y2={svgH - 10} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <line x1="0" y1={svgH - 10 - (20 / 40) * (svgH - 25)} x2={svgW} y2={svgH - 10 - (20 / 40) * (svgH - 25)} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1={15} x2={svgW} y2={15} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />

              {/* Critical replacement threshold boundary at 70% SOH */}
              <line x1="0" y1={svgH - 10 - (10 / 40) * (svgH - 25)} x2={svgW} y2={svgH - 10 - (10 / 40) * (svgH - 25)} stroke="rgba(239,68,68,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
              
              {/* Curves */}
              <path d={`M ${getPointsString(lfpFade)}`} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
              <path d={`M ${getPointsString(nmcFade)}`} fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M ${getPointsString(sodiumFade)}`} fill="none" stroke="#84CC16" strokeWidth="1.2" strokeDasharray="4 4" />

              {/* Year Focus Indicator vertical bar */}
              {(() => {
                const xVal = (simYears / 15) * svgW;
                return (
                  <g>
                    <line x1={xVal} y1="10" x2={xVal} y2={svgH - 10} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
                    
                    {/* Active coordinate intersection dot */}
                    {(() => {
                      const activeLfpVal = 100 * Math.exp(-0.012 * simYears);
                      const cyLfp = svgH - 10 - ((activeLfpVal - 60) / 40) * (svgH - 25);
                      return (
                        <circle cx={xVal} cy={cyLfp} r="3" fill="#10B981" stroke="white" strokeWidth="0.8" />
                      );
                    })()}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* X Axis Years */}
          <div className="flex justify-between border-t border-white/5 pt-2 text-[9px] text-muted-foreground/40 font-mono">
            <span>Year 0</span>
            <span>Year 3</span>
            <span>Year 6</span>
            <span>Year 9</span>
            <span>Year 12</span>
            <span>Year 15 (EndOfLife)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
