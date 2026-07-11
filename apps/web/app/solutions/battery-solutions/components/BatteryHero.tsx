"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Zap, BatteryCharging, ArrowRight } from "lucide-react";

interface BatteryHeroProps {
  onAnalyzeBattery: () => void;
  onGenerateReport: () => void;
}

export function BatteryHero({ onAnalyzeBattery, onGenerateReport }: BatteryHeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden rounded-[32px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Glow Ambient Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#10B981]/8 blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/8 blur-[120px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[12px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            ENTERPRISE BESS OPERATING SYSTEM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white"
          >
            Battery <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-[#10B981] via-[#84CC16] to-[#00D4FF] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.25)]">
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground/90 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Optimize battery performance, monitor health, extend lifecycle, reduce operating costs and make intelligent deployment decisions using AI-powered battery diagnostics and asset optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onAnalyzeBattery}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-extrabold text-black bg-linear-to-r from-[#10B981] to-[#00D4FF] hover:from-[#00E676] hover:to-[#00D4FF] transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-98 overflow-hidden cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              Analyze Battery
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGenerateReport}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              Generate Battery Report
            </button>
          </motion.div>

          {/* Industry standard indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 items-center text-xs font-bold text-muted-foreground/50 tracking-wider uppercase"
          >
            <span>Supported Standards:</span>
            <span>Tesla Energy</span>
            <span>•</span>
            <span>CATL Grid</span>
            <span>•</span>
            <span>LG Energy</span>
            <span>•</span>
            <span>UN 38.3</span>
          </motion.div>
        </div>

        {/* Right Side 3D Battery Pack Hologram */}
        <div className="lg:col-span-5 flex justify-center relative select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[380px] h-[400px] relative flex items-center justify-center rounded-[28px] border border-white/5 bg-linear-to-b from-white/4 to-transparent p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden"
          >
            {/* Holographic grid scan overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px)] bg-size-[100%_4px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#10B981]/3 to-transparent animate-[holo-scan_6s_linear_infinite]" />

            {/* Glowing active center radial core */}
            <div className="absolute inset-12 rounded-full bg-radial from-[#10B981]/15 to-transparent blur-3xl" />

            {/* SVG Animated Battery Pack */}
            <svg viewBox="0 0 200 240" className="w-full h-full relative z-10 overflow-visible">
              
              {/* Outer grid circuit tracks */}
              <path d="M 20,40 L 40,40 L 40,80 L 20,80" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="0.8" />
              <path d="M 180,40 L 160,40 L 160,80 L 180,80" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="0.8" />

              {/* Battery Module Shell (isometric outline style) */}
              <rect x="35" y="45" width="130" height="150" rx="12" fill="url(#moduleBgGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" filter="url(#glowFilter)" />
              <rect x="42" y="37" width="116" height="8" rx="2" fill="#0c0e14" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

              {/* Battery Cells (Grid matrix inside shell, with balancing glows) */}
              {(() => {
                const cells = [
                  { x: 50, y: 65, active: true, color: "#10B981" },
                  { x: 80, y: 65, active: true, color: "#10B981" },
                  { x: 110, y: 65, active: true, color: "#00D4FF" },
                  { x: 140, y: 65, active: true, color: "#10B981" },
                  
                  { x: 50, y: 105, active: true, color: "#10B981" },
                  { x: 80, y: 105, active: true, color: "#84CC16" }, // Balancing cell
                  { x: 110, y: 105, active: true, color: "#10B981" },
                  { x: 140, y: 105, active: true, color: "#10B981" },

                  { x: 50, y: 145, active: true, color: "#00D4FF" },
                  { x: 80, y: 145, active: true, color: "#10B981" },
                  { x: 110, y: 145, active: true, color: "#10B981" },
                  { x: 140, y: 145, active: true, color: "#84CC16" }, // Balancing cell
                ];

                return cells.map((cell, idx) => (
                  <g key={idx} transform={`translate(${cell.x}, ${cell.y})`}>
                    {/* Cell Cylinder outer wall */}
                    <rect x="0" y="0" width="12" height="24" rx="2.5" fill="#0a0d14" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
                    
                    {/* Cell charge indicators */}
                    <motion.rect
                      x="1"
                      y="1"
                      width="10"
                      height="22"
                      rx="1.5"
                      fill={cell.color}
                      initial={{ opacity: 0.2 }}
                      animate={{
                        opacity: cell.color === "#84CC16" ? [0.4, 0.9, 0.4] : [0.7, 1, 0.7],
                        height: cell.color === "#00D4FF" ? [4, 22, 4] : 22,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: cell.color === "#84CC16" ? 2 : 4,
                        delay: idx * 0.25,
                      }}
                    />
                  </g>
                ));
              })()}

              {/* Cell Balancing Wire Lines (Dashed electric particles) */}
              <path d="M 56,89 L 146,89" fill="none" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />
              <path d="M 56,129 L 146,129" fill="none" stroke="#84CC16" strokeWidth="0.8" opacity="0.6" strokeDasharray="3 6" className="animate-[energy-flow_2s_linear_infinite]" />
              <path d="M 56,169 L 146,169" fill="none" stroke="#00D4FF" strokeWidth="0.8" opacity="0.4" strokeDasharray="5 15" className="animate-[energy-flow_1.5s_linear_infinite]" />

              {/* Central BESS Controller Microchip */}
              <rect x="85" y="110" width="30" height="20" rx="3" fill="#07090e" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="100" cy="120" r="3.5" fill="#10B981" className="animate-pulse" />

              {/* Definitions */}
              <defs>
                <linearGradient id="moduleBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                </linearGradient>
                <filter id="glowFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Float HUD Information */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground/60 backdrop-blur-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                BMS.BALANCED
              </span>
              <span>4.2V CELL MAX</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-2 text-[10px] text-white font-mono backdrop-blur-xs">
              <div>
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Pack SOH</p>
                <p className="font-extrabold text-[#10B981]">98.6%</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">BMS Temp</p>
                <p className="font-extrabold text-[#00D4FF]">28.4 °C</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
