"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, FileSpreadsheet, Zap, BatteryCharging, ArrowRight } from "lucide-react";

interface ChargingHeroProps {
  onExplorePlanner: () => void;
  onGenerateProposal: () => void;
}

export function ChargingHero({ onExplorePlanner, onGenerateProposal }: ChargingHeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden rounded-[32px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Premium Ambient Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00E676]/10 blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/10 blur-[120px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-[12px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(0,230,118,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
            AI-POWERED EV COMMAND CENTER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white"
          >
            Smart EV <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-[#00E676] via-[#00D4FF] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,212,255,0.2)]">
              Charging Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground/90 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Plan, deploy and optimize world-class EV charging infrastructure using AI-powered planning tools, dynamic grid simulations, and commercial-grade engineering analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onExplorePlanner}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-extrabold text-black bg-linear-to-r from-[#00E676] to-[#00D4FF] hover:from-[#00FF87] hover:to-[#00E5FF] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-98 overflow-hidden cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              Explore Planner
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGenerateProposal}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              Generate Proposal
            </button>
          </motion.div>

          {/* Core partners indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 items-center text-xs font-bold text-muted-foreground/50 tracking-wider uppercase"
          >
            <span>Compatible Specs:</span>
            <span>Tesla Energy</span>
            <span>•</span>
            <span>ABB E-Mobility</span>
            <span>•</span>
            <span>Siemens Grid</span>
            <span>•</span>
            <span>CCS2/NACS</span>
          </motion.div>
        </div>

        {/* Right Animated Column */}
        <div className="lg:col-span-5 flex justify-center relative select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[380px] h-[400px] relative flex items-center justify-center rounded-[28px] border border-white/5 bg-linear-to-b from-white/4 to-transparent p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden"
          >
            {/* Hologram scan lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,230,118,0.02)_1px,transparent_1px)] bg-size-[100%_4px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#00E676]/3 to-transparent animate-[holo-scan_6s_linear_infinite]" />

            {/* Glowing active core grid */}
            <div className="absolute inset-10 rounded-full bg-radial from-[#00E676]/10 to-transparent blur-3xl" />

            {/* Concentric Charging Rings */}
            <div className="absolute w-56 h-56 rounded-full border border-dashed border-[#00E676]/10 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#00D4FF]/20 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute w-32 h-32 rounded-full border border-white/5" />

            {/* SVG Interactive Model */}
            <svg viewBox="0 0 200 240" className="w-full h-full relative z-10 overflow-visible">
              {/* Outer pulsing ring */}
              <circle cx="100" cy="110" r="42" fill="none" stroke="#00E676" strokeWidth="0.8" strokeDasharray="4 6" className="animate-[spin_30s_linear_infinite]" />
              <circle cx="100" cy="110" r="30" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity="0.3" />

              {/* Station Body */}
              <path
                d="M 85,210 L 115,210 L 110,65 L 90,65 Z"
                fill="url(#glassGrad)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                filter="url(#glowFilter)"
              />
              {/* Pedestal Base */}
              <rect x="75" y="210" width="50" height="8" rx="2" fill="#0c0e14" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              
              {/* Glowing Core Indicator */}
              <circle cx="100" cy="90" r="10" fill="url(#coreGlow)" />
              <circle cx="100" cy="90" r="4" fill="#00E676" />
              
              {/* Interactive Pulsing Ring around core */}
              <circle cx="100" cy="90" r="18" fill="none" stroke="#00E676" strokeWidth="1" opacity="0.6">
                <animate attributeName="r" values="8;24;8" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
              </circle>

              {/* Battery charging symbol inside screen */}
              <g transform="translate(90, 125)">
                <rect x="0" y="0" width="20" height="35" rx="3" fill="#05070d" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <rect x="7" y="-3" width="6" height="3" rx="1" fill="rgba(255,255,255,0.15)" />
                {/* Charge Level */}
                <motion.rect
                  x="2"
                  y="2"
                  width="16"
                  height="31"
                  rx="1.5"
                  fill="url(#batteryGrad)"
                  initial={{ height: 2 }}
                  animate={{ height: [4, 31, 4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />
              </g>

              {/* Animated Cable Loops */}
              <path
                d="M 87,90 Q 55,100 50,150 T 90,205"
                fill="none"
                stroke="url(#cableGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-90"
              />
              {/* Glowing Charge Line Flows (particles along path) */}
              <path
                d="M 87,90 Q 55,100 50,150 T 90,205"
                fill="none"
                stroke="#00E676"
                strokeWidth="1.5"
                strokeDasharray="4 15"
                strokeLinecap="round"
                className="animate-[energy-flow_1.5s_linear_infinite]"
              />

              {/* Definitions */}
              <defs>
                {/* Battery gradient */}
                <linearGradient id="batteryGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00E676" />
                  <stop offset="60%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                {/* Glass core gradient */}
                <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                </linearGradient>
                {/* Cable flowing gradient */}
                <linearGradient id="cableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00E676" />
                  <stop offset="50%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#0c0e14" />
                </linearGradient>
                {/* Glowing Core */}
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00E676" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                {/* Standard Glow Filter */}
                <filter id="glowFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Float HUD Details */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground/60 backdrop-blur-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                SYS.CONNECTED
              </span>
              <span>350 kW MAX</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-2 text-[10px] text-white font-mono backdrop-blur-xs">
              <div>
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Grid Uptime</p>
                <p className="font-extrabold text-[#00E676]">99.98%</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Active Load</p>
                <p className="font-extrabold text-[#00D4FF]">248.6 kW</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
