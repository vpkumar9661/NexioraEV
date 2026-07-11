"use client";

import React from "react";
import { Activity, ShieldCheck, Zap, Sliders } from "lucide-react";

export function InsightsDashboard() {
  const radius = 36;
  const strokeWidth = 5;
  const circ = 2 * Math.PI * radius;
  
  // Progress circles
  const accuracyOffset = circ - 0.9978 * circ;
  const successOffset = circ - 0.984 * circ;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Diagnostics column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-widest block">
                COGNITIVE SLA COMPILER
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-[#8B5CF6]" />
                Insights Dashboard
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Verify real-time model accuracy metrics. AI evaluates predictions outputs against ground-truth physical sensor readings.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/5 pt-4 font-bold">
              <div>
                <span className="text-muted-foreground/50 uppercase text-[8px] block">AI Accuracy Rate</span>
                <span className="text-white mt-0.5 block">99.78% SLA</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase text-[8px] block">System Savings index</span>
                <span className="text-[#00E676] mt-0.5 block">+$18,420 / mo</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Accuracy conformance complies with IEEE cognitive benchmarks.</p>
          </div>
        </div>

        {/* Right Gauges column */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6 bg-black/40 border border-white/5 p-6 rounded-2xl items-center text-center">
          
          {/* Accuracy Gauge */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={accuracyOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
                <span className="text-sm font-black text-white leading-none">99.7%</span>
                <span className="text-[7px] text-muted-foreground/45 font-bold uppercase tracking-widest mt-1">ACCURACY</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-white">SLA Verification</span>
          </div>

          {/* Success Gauge */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={successOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
                <span className="text-sm font-black text-white leading-none">98.4%</span>
                <span className="text-[7px] text-muted-foreground/45 font-bold uppercase tracking-widest mt-1">SUCCESS</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-white">Automation Success</span>
          </div>

        </div>

      </div>
    </section>
  );
}
