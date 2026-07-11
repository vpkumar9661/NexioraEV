"use client";

import React from "react";
import { Activity, ShieldCheck, Compass, Award } from "lucide-react";

export function PowerQuality() {
  const radius = 36;
  const strokeWidth = 5;
  const circ = 2 * Math.PI * radius;
  
  // Gauges values:
  // Frequency: 60Hz (100% of nominal)
  // Power Factor: 0.98 (98% of perfect 1.00)
  // THD: 1.8% (1.8% of max allowable 5.0%)
  const thdOffset = circ - (1.8 / 5.0) * circ;
  const pfOffset = circ - 0.98 * circ;
  const hzOffset = circ - 1.0 * circ; // perfect 60Hz

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Diagnostics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-widest block">
                GRID WAVEFORM OSCILLOSCOPE
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-[#4F46E5]" />
                Power Quality Analytics
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Verify pure sine wave synchronization. Edge nodes monitor voltage sags, phase distortion angles, and total harmonics.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/5 pt-4">
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Voltage Stability</span>
                <span className="font-extrabold text-[#00E676] mt-0.5 block">99.98% Nominal</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Grid Disturbances</span>
                <span className="font-extrabold text-white mt-0.5 block">0 active sags</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Waveform conforms to IEEE 519 harmonics limit guidelines.</p>
          </div>
        </div>

        {/* Right Column Gauges */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-4 bg-black/40 border border-white/5 p-6 rounded-2xl items-center">
          
          {/* Frequency Gauge */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="none"
                  stroke="#00E676"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={hzOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
                <span className="text-sm font-black text-white leading-none">60.00</span>
                <span className="text-[7px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-1">Hz</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-white">Frequency</span>
          </div>

          {/* Power Factor Gauge */}
          <div className="flex flex-col items-center text-center space-y-2">
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
                  strokeDashoffset={pfOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
                <span className="text-sm font-black text-white leading-none">0.98</span>
                <span className="text-[7px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-1">PF</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-white">Power Factor</span>
          </div>

          {/* THD Gauge */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  fill="none"
                  stroke="#F4B400"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={thdOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
                <span className="text-sm font-black text-white leading-none">1.8%</span>
                <span className="text-[7px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-1">THD</span>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-white">Harmonics</span>
          </div>

        </div>

      </div>
    </section>
  );
}
