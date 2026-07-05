"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, BatteryCharging, ShieldAlert } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 sm:p-12 shadow-[0_16px_64px_rgba(0,0,0,0.3)]">
      {/* Ambient background glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#3B82F6]/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#6EE7B7] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            EV Battery Intelligence Center
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight text-white leading-[1.1]">
            Battery{" "}
            <span className="bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Lab
            </span>
          </h1>

          <p className="text-[#AEB5C0]/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Explore battery chemistry, performance, charging behaviour, thermal management, safety and the future of EV battery technology.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#explorer"
              className="px-5 py-3 rounded-xl font-bold bg-[#10B981] text-white hover:bg-[#059669] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_24px_rgba(16,185,129,0.3)] flex items-center gap-2 group text-sm"
            >
              Explore Batteries
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#calculators"
              className="px-5 py-3 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 text-sm"
            >
              Battery Calculator
            </a>
            <a
              href="#ai"
              className="px-5 py-3 rounded-xl font-bold bg-transparent border border-white/15 hover:border-[#10B981]/40 text-[#AEB5C0] hover:text-white transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#6EE7B7]" />
              Ask AI
            </a>
          </div>
        </div>

        {/* Right Animated SVG Battery Illustration */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[360px]">
          {/* Floating diagnostic indicators */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 z-20 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-xl p-3 shadow-lg flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
              <BatteryCharging className="w-4 h-4 text-[#6EE7B7]" />
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/50 font-bold uppercase tracking-wider block">Temp Control</span>
              <span className="text-[11px] font-bold text-white block">24.5°C Active</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-6 left-4 z-20 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-xl p-3 shadow-lg flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#60A5FA]" />
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/50 font-bold uppercase tracking-wider block">BMS Status</span>
              <span className="text-[11px] font-bold text-white block">SOC: 98% (CC/CV)</span>
            </div>
          </motion.div>

          {/* Hologram battery container */}
          <div className="w-full h-full relative border border-white/[0.04] rounded-[20px] bg-white/[0.01] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10B981_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <svg className="w-[85%] h-[85%] p-4" viewBox="0 0 350 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Electric glow line grid */}
              <g opacity="0.08">
                <line x1="0" y1="50" x2="350" y2="50" stroke="#10B981" strokeWidth="0.5" />
                <line x1="0" y1="100" x2="350" y2="100" stroke="#3B82F6" strokeWidth="0.5" />
                <line x1="0" y1="150" x2="350" y2="150" stroke="#8B5CF6" strokeWidth="0.5" />
                <line x1="0" y1="200" x2="350" y2="200" stroke="#10B981" strokeWidth="0.5" />
              </g>

              {/* Battery Outer Pack */}
              <rect x="50" y="40" width="250" height="150" rx="16" fill="#131722" fillOpacity="0.7" stroke="#10B981" strokeWidth="2" strokeDasharray="5 3" />
              <rect x="155" y="28" width="40" height="12" rx="4" fill="#131722" stroke="#10B981" strokeWidth="1.5" />

              {/* Glowing cells inside battery */}
              <g transform="translate(70, 60)">
                {/* Row 1 */}
                <rect x="0" y="0" width="45" height="30" rx="6" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="55" y="0" width="45" height="30" rx="6" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="2.2s" repeatCount="indefinite" />
                </rect>
                <rect x="110" y="0" width="45" height="30" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="1.8s" repeatCount="indefinite" />
                </rect>
                <rect x="165" y="0" width="45" height="30" rx="6" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="2.5s" repeatCount="indefinite" />
                </rect>

                {/* Row 2 */}
                <rect x="0" y="45" width="45" height="30" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="2.4s" repeatCount="indefinite" />
                </rect>
                <rect x="55" y="45" width="45" height="30" rx="6" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="1.9s" repeatCount="indefinite" />
                </rect>
                <rect x="110" y="45" width="45" height="30" rx="6" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="2.1s" repeatCount="indefinite" />
                </rect>
                <rect x="165" y="45" width="45" height="30" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1">
                  <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur="2.3s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Energy Flow Animation lines */}
              <path d="M 60,165 L 140,165 L 175,165" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* Cooling lines flow */}
              <path d="M 290,165 L 210,165 L 175,165" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* Charge level indicator at bottom */}
              <rect x="70" y="160" width="210" height="8" rx="4" fill="white" fillOpacity="0.05" />
              <rect x="70" y="160" width="180" height="8" rx="4" fill="url(#energyGlow)">
                <animate attributeName="width" values="10;210;10" dur="8s" repeatCount="indefinite" />
              </rect>

              <defs>
                <linearGradient id="energyGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
