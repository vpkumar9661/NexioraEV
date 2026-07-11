"use client";

import React, { useState } from "react";
import { Activity, ShieldCheck, Zap, Sliders } from "lucide-react";

export function PredictiveAnalytics() {
  const [metricScope, setMetricScope] = useState<"battery" | "grid" | "solar">("battery");

  // SVG points definitions
  const actualPoints = "0,110 30,115 60,90 90,60 100,85";
  const forecastPoints = "100,85 120,95 140,80 160,50 180,30 200,80";
  const confidenceBand = "100,85 120,115 140,105 160,75 180,50 200,105 L 200,55 L 180,10 L 160,25 L 140,55 L 120,75 Z";

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Config Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-widest block">
                MACHINE LEARNING TREND FORECASTS
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-[#8B5CF6]" />
                Predictive Analytics
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Models evaluate historical charge cycles, driver regen behaviors, and solar trends to forecast future parameters.
            </p>

            <div className="flex bg-white/2 rounded-xl p-1 border border-white/5 text-xs font-bold">
              {["battery", "grid", "solar"].map((scope) => (
                <button
                  key={scope}
                  onClick={() => setMetricScope(scope as any)}
                  className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer capitalize ${
                    metricScope === scope ? "bg-[#8B5CF6] text-white shadow-xs" : "text-muted-foreground/60 hover:text-white"
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-white block">Confidence Ratio: 99.78%</span>
              <span className="text-muted-foreground/45 block mt-0.5">Calculated using LSTM model projections.</span>
            </div>
          </div>
        </div>

        {/* Right SVGs Plot */}
        <div className="lg:col-span-8 bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>PREDICTIVE SHIELD MATRIX ({metricScope.toUpperCase()})</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" /> HISTORIC</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] border border-dashed border-white/20" /> FORECASTED</span>
            </div>
          </div>

          <div className="h-[200px] w-full relative pt-2">
            <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
              <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1="135" x2="200" y2="135" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

              {/* Confidence Band shading */}
              <polygon points={confidenceBand} fill="url(#aiConfidenceGrad)" opacity="0.08" />

              {/* Actual history path */}
              <path d={`M ${actualPoints}`} fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />

              {/* AI forecast path */}
              <path d={`M ${forecastPoints}`} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />

              {/* Division line */}
              <line x1="100" y1="10" x2="100" y2="135" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
              <text x="105" y="20" fill="#8B5CF6" fontSize="6" fontWeight="bold">AI PROJECTION</text>

              <text x="5" y="20" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">Max Range</text>
              <text x="5" y="75" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">Nominal</text>
              <text x="5" y="130" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">0.0</text>

              <text x="0" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="start">Cycle -10</text>
              <text x="100" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="middle">Current (Now)</text>
              <text x="200" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="end">Cycle +10</text>

              <defs>
                <linearGradient id="aiConfidenceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
