"use client";

import React from "react";
import { Building, Award, ShieldCheck, Play, ArrowRight } from "lucide-react";

interface BusinessHeroProps {
  onOptimizeRates: () => void;
  onGenerateReport: () => void;
}

export function BusinessHero({ onOptimizeRates, onGenerateReport }: BusinessHeroProps) {
  return (
    <section className="relative p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      
      {/* Absolute grid light sweep */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-[#00E676]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-[10.5px] font-black uppercase tracking-widest shadow-xs">
            <Building className="w-3.5 h-3.5" />
            NexioraEV Business Solutions
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Workplace & Retail <br />
            <span className="bg-linear-to-r from-[#00E676] to-[#00D4FF] -webkit-background-clip: text -webkit-text-fill-color: transparent bg-clip-text text-transparent">
              Charger Command
            </span>
          </h1>

          <p className="text-muted-foreground/85 text-xs sm:text-sm leading-relaxed max-w-xl">
            Deploy, manage, and monetize EV charging systems for offices, shopping plazas, and parking garages. Set custom tariffs, analyze employee charge quotas, and optimize utility load-arbitrage.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <button
              onClick={onOptimizeRates}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-[#00E676] to-[#00D4FF] hover:from-[#00FF87] hover:to-[#00E5FF] text-black font-black text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-[0_10px_20px_rgba(0,230,118,0.25)] hover:shadow-[0_15px_30px_rgba(0,212,255,0.4)] cursor-pointer"
            >
              Optimize Charging Tariffs
            </button>
            <button
              onClick={onGenerateReport}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Build Business Case
            </button>
          </div>

          <div className="flex items-center gap-5 pt-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00E676]" /> OCPP 1.6/2.0.1 COMPLIANT</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#00D4FF]" /> LEED V4 SCORECARDS</span>
          </div>
        </div>

        {/* Right Interactive SVG column */}
        <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-[300px]">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>OFFICE PARK CHARGING GRID MODEL</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" /> LIVE DIAGNOSTICS</span>
          </div>

          <div className="flex-1 flex items-center justify-center pt-2">
            <svg viewBox="0 0 160 120" className="w-full h-full max-h-[180px] overflow-visible">
              {/* Isometric Office building backing outline */}
              <polygon points="80,15 130,40 130,85 80,105 30,85 30,40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <polygon points="80,15 80,105" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <line x1="30" y1="40" x2="80" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <line x1="130" y1="40" x2="80" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

              {/* Parking lot bays */}
              <polygon points="50,90 80,105 110,90 80,75" fill="none" stroke="#00E676" strokeWidth="1" opacity="0.4" />
              
              {/* V2G Charger nodes */}
              <circle cx="65" cy="92" r="3" fill="#00E676" className="animate-ping duration-[3s]" />
              <circle cx="65" cy="92" r="2.5" fill="#00E676" />
              
              <circle cx="95" cy="92" r="3" fill="#00D4FF" className="animate-ping duration-[4s]" />
              <circle cx="95" cy="92" r="2.5" fill="#00D4FF" />

              {/* Connecting wiring flows */}
              <path d="M80,60 L65,92" fill="none" stroke="#00E676" strokeWidth="0.8" strokeDasharray="2 3" className="animate-[energy-flow_2s_linear_infinite]" />
              <path d="M80,60 L95,92" fill="none" stroke="#00D4FF" strokeWidth="0.8" strokeDasharray="2 3" className="animate-[energy-flow_2.5s_linear_infinite]" />

              <text x="80" y="52" fill="#AEB5C0" fontSize="6" textAnchor="middle" fontWeight="bold">HQ NODE</text>
            </svg>
          </div>

          <div className="border-t border-white/5 pt-2 flex justify-between text-[9.5px] text-muted-foreground/50 font-mono">
            <span>GRID DRAW: 145 kW</span>
            <span>CAP CAPACITY: 92%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
