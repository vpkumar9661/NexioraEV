"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Activity, Award, ArrowRight, Grid } from "lucide-react";

interface EnergyHeroProps {
  onLaunchCenter: () => void;
  onGenerateReport: () => void;
}

export function EnergyHero({ onLaunchCenter, onGenerateReport }: EnergyHeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden rounded-[32px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Glow Ambient Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00E676]/8 blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/8 blur-[120px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/15 border border-[#4F46E5]/30 text-[#00D4FF] text-[12px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(79,70,229,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
            CENTRAL GRID ENERGY SYSTEM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white"
          >
            Smart Energy <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-[#00E676] via-[#00D4FF] to-[#4F46E5] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,230,118,0.25)]">
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground/90 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Monitor, optimize and automate intelligent energy ecosystems using AI-powered grid analytics, virtual power plants and real-time energy orchestration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onLaunchCenter}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-extrabold text-black bg-linear-to-r from-[#00E676] to-[#00D4FF] hover:from-[#00FF87] hover:to-[#00E5FF] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-98 overflow-hidden cursor-pointer"
            >
              <Grid className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              Launch Energy Center
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGenerateReport}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <Activity className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              Generate Energy Report
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 items-center text-xs font-bold text-muted-foreground/55 tracking-wider uppercase"
          >
            <span>Certified Standards:</span>
            <span>Siemens Grid</span>
            <span>•</span>
            <span>Schneider Eco</span>
            <span>•</span>
            <span>ABB Ability</span>
            <span>•</span>
            <span>GE Digital</span>
          </motion.div>
        </div>

        {/* Right Side Animated Grid Panel */}
        <div className="lg:col-span-5 flex justify-center relative select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[380px] h-[400px] relative flex items-center justify-center rounded-[28px] border border-white/5 bg-linear-to-b from-white/4 to-transparent p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden"
          >
            {/* Hologram scan grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,230,118,0.015)_1px,transparent_1px)] bg-size-[100%_4px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#00E676]/3 to-transparent animate-[holo-scan_6s_linear_infinite]" />

            {/* Glowing active core glow */}
            <div className="absolute inset-16 rounded-full bg-radial from-[#00E676]/15 to-transparent blur-3xl" />

            {/* SVG Animated Grid Map */}
            <svg viewBox="0 0 200 240" className="w-full h-full relative z-10 overflow-visible">
              
              {/* Solar / Wind feeds */}
              <line x1="20" y1="20" x2="60" y2="70" stroke="rgba(244,180,0,0.3)" strokeWidth="1" strokeDasharray="3 3" className="animate-[energy-flow_2s_linear_infinite]" />
              <line x1="180" y1="20" x2="140" y2="70" stroke="rgba(0,212,255,0.3)" strokeWidth="1" strokeDasharray="3 3" className="animate-[energy-flow_2s_linear_infinite]" />
              
              {/* Sun icon */}
              <circle cx="20" cy="20" r="7" fill="#F4B400" className="animate-pulse" />
              {/* Wind turbine hub */}
              <circle cx="180" cy="20" r="6" fill="#00D4FF" />

              {/* Energy circuit lines */}
              <path d="M 60,75 H 100 V 120" fill="none" stroke="rgba(0,230,118,0.4)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_1.5s_linear_infinite]" />
              <path d="M 140,75 H 100 V 120" fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_1.5s_linear_infinite]" />
              <path d="M 100,140 V 180 H 60" fill="none" stroke="rgba(79,70,229,0.4)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_1.5s_linear_infinite]" />
              <path d="M 100,140 V 180 H 140" fill="none" stroke="rgba(244,180,0,0.4)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_1.5s_linear_infinite]" />

              {/* Generation node */}
              <g transform="translate(50, 65)">
                <rect x="0" y="0" width="20" height="20" rx="3" fill="#131722" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M 10,4 L 6,11 H 10 L 9,16 L 14,9 H 10 Z" fill="#00E676" />
              </g>

              {/* Building node */}
              <g transform="translate(130, 65)">
                <rect x="0" y="0" width="20" height="20" rx="3" fill="#131722" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="4" y="4" width="4" height="4" fill="#00D4FF" opacity="0.8" />
                <rect x="12" y="4" width="4" height="4" fill="#00D4FF" opacity="0.8" />
                <rect x="4" y="12" width="4" height="4" fill="#00D4FF" opacity="0.8" />
                <rect x="12" y="12" width="4" height="4" fill="#00D4FF" opacity="0.8" />
              </g>

              {/* Battery Center */}
              <g transform="translate(85, 110)">
                <rect x="0" y="0" width="30" height="40" rx="4" fill="#131722" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <rect x="3" y="5" width="24" height="6" rx="1.5" fill="#00E676" opacity="0.8" className="animate-pulse" />
                <rect x="3" y="15" width="24" height="6" rx="1.5" fill="#00E676" opacity="0.6" />
                <rect x="3" y="25" width="24" height="6" rx="1.5" fill="#00E676" opacity="0.2" />
              </g>

              {/* Factory block */}
              <g transform="translate(35, 170)">
                <rect x="0" y="5" width="26" height="20" rx="2" fill="#131722" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <polygon points="0,5 6,0 12,5 18,0 26,5 26,25 0,25" fill="#131722" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              </g>

              {/* Charging Station */}
              <g transform="translate(140, 170)">
                <rect x="0" y="0" width="24" height="30" rx="3" fill="#131722" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M 12,6 L 9,11 H 12 L 11,15 L 15,10 H 12 Z" fill="#00D4FF" />
              </g>

            </svg>

            {/* Float HUD Info */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground/60 backdrop-blur-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                GRID.SYNCHRONIZED
              </span>
              <span>60.00 Hz</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-2.5 text-[10px] text-white font-mono backdrop-blur-xs">
              <div>
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Grid Power Import</p>
                <p className="font-extrabold text-rose-400">12.5 kW</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Microgrid Yield</p>
                <p className="font-extrabold text-[#00E676]">242.8 kW</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
