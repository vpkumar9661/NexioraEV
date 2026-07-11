"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Zap, BarChart3, Navigation, ArrowRight } from "lucide-react";

interface FleetHeroProps {
  onManageFleet: () => void;
  onGenerateReport: () => void;
}

export function FleetHero({ onManageFleet, onGenerateReport }: FleetHeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden rounded-[32px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Glow Ambient Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B82F6]/8 blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/8 blur-[120px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#00D4FF] text-[12px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
            ENTERPRISE EV FLEET CONTROLLER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white"
          >
            Fleet <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-[#00E676] via-[#00D4FF] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,212,255,0.25)]">
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground/90 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Manage, optimize and scale intelligent EV fleets using AI-powered telemetry analytics, predictive maintenance, charging coordination and real-time route optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onManageFleet}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-extrabold text-black bg-linear-to-r from-[#00E676] to-[#00D4FF] hover:from-[#00FF87] hover:to-[#00E5FF] transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-98 overflow-hidden cursor-pointer"
            >
              <Truck className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
              Manage Fleet
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGenerateReport}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              Generate Fleet Report
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 items-center text-xs font-bold text-muted-foreground/50 tracking-wider uppercase"
          >
            <span>Partners & Platforms:</span>
            <span>Tesla Fleet API</span>
            <span>•</span>
            <span>Rivian Commercial</span>
            <span>•</span>
            <span>Amazon Logistics</span>
            <span>•</span>
            <span>DHL Smart Transit</span>
          </motion.div>
        </div>

        {/* Right Side Animated Fleet Control panel */}
        <div className="lg:col-span-5 flex justify-center relative select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[380px] h-[400px] relative flex items-center justify-center rounded-[28px] border border-white/5 bg-linear-to-b from-white/4 to-transparent p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden"
          >
            {/* Hologram scan grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.015)_1px,transparent_1px)] bg-size-[100%_4px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#00D4FF]/3 to-transparent animate-[holo-scan_6s_linear_infinite]" />

            {/* Glowing active core glow */}
            <div className="absolute inset-16 rounded-full bg-radial from-[#3B82F6]/15 to-transparent blur-3xl" />

            {/* SVG Animated Logistics Map */}
            <svg viewBox="0 0 200 240" className="w-full h-full relative z-10 overflow-visible">
              
              {/* Route lines paths */}
              <path d="M 20,180 Q 80,140 100,80 T 180,40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <path id="routePath" d="M 20,40 Q 60,100 100,120 T 180,180" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1.5" />
              <path d="M 100,120 Q 140,80 180,80" fill="none" stroke="rgba(0,230,118,0.15)" strokeWidth="1.2" />

              {/* Station location nodes */}
              <g transform="translate(20, 40)">
                <circle cx="0" cy="0" r="4.5" fill="#05070d" stroke="#3B82F6" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="1.5" fill="#3B82F6" />
              </g>
              <g transform="translate(100, 120)">
                <circle cx="0" cy="0" r="5" fill="#05070d" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
                <circle cx="0" cy="0" r="2" fill="#00E676" />
              </g>
              <g transform="translate(180, 180)">
                <circle cx="0" cy="0" r="4.5" fill="#05070d" stroke="#00D4FF" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="1.5" fill="#00D4FF" />
              </g>

              {/* Moving Vehicle Dot along routePath */}
              <circle cx="0" cy="0" r="4" fill="#00D4FF">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#routePath" />
                </animateMotion>
              </circle>

              {/* Satellite comms lines */}
              <line x1="100" y1="20" x2="100" y2="120" stroke="rgba(0,212,255,0.25)" strokeWidth="0.8" strokeDasharray="2 4" className="animate-[energy-flow_2s_linear_infinite]" />
              
              {/* Satellite dish schematic representation */}
              <g transform="translate(100, 20)">
                <circle cx="0" cy="0" r="3" fill="#3B82F6" />
                <path d="M -6,-2 Q 0,-8 6,-2" fill="none" stroke="#3B82F6" strokeWidth="1" />
              </g>

              {/* HUD grid information lines */}
              <path d="M 10,200 L 190,200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <path d="M 100,200 L 100,225" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

            </svg>

            {/* Float HUD Information */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground/60 backdrop-blur-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                GPS.CONNECT
              </span>
              <span>42 ACTIVE NODES</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/2 border border-white/5 rounded-lg px-3 py-2.5 text-[10px] text-white font-mono backdrop-blur-xs">
              <div>
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Fleet Availability</p>
                <p className="font-extrabold text-[#00E676]">98.4%</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase">Avg SOH</p>
                <p className="font-extrabold text-[#00D4FF]">94.2%</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
