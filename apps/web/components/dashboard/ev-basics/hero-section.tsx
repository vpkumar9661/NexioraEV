"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Battery } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden rounded-[24px] border border-white/5 bg-white/2 backdrop-blur-md p-8 sm:p-12 shadow-[0_16px_64px_rgba(0,0,0,0.3)]">
      {/* Ambient purple glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#8B5CF6]/8 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#3B82F6]/6 rounded-full blur-[80px]" />

      <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA] text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Interactive Learning Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight text-white leading-[1.1]">
            Electric Vehicle{" "}
            <span className="bg-linear-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
              Fundamentals
            </span>
          </h1>

          <p className="text-muted-foreground/80 text-sm sm:text-base leading-relaxed max-w-lg">
            Learn everything about Electric Vehicles through immersive learning, interactive visualizations, AI guidance and real-world examples.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#modules"
              className="px-5 py-3 rounded-xl font-bold bg-[#8B5CF6] text-white hover:bg-[#7C3AED] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_24px_rgba(139,92,246,0.3)] flex items-center gap-2 group text-sm"
            >
              Start Learning
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/evtech/battery-lab"
              className="px-5 py-3 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 text-sm"
            >
              Battery Lab
            </Link>
            <Link
              href="/evtech/ai-assistant"
              className="px-5 py-3 rounded-xl font-bold bg-transparent border border-white/15 hover:border-[#8B5CF6]/40 text-muted-foreground hover:text-white transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI
            </Link>
          </div>
        </div>

        {/* Right Animated SVG Illustration */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[360px]">
          {/* Floating data cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 z-20 backdrop-blur-md bg-white/3 border border-white/10 rounded-xl p-3 shadow-lg flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
              <Battery className="w-4 h-4 text-[#A78BFA]" />
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-wider block">Battery</span>
              <span className="text-[11px] font-bold text-white block">72 kWh LFP</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-6 left-4 z-20 backdrop-blur-md bg-white/3 border border-white/10 rounded-xl p-3 shadow-lg flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-wider block">Efficiency</span>
              <span className="text-[11px] font-bold text-white block">92% Motor</span>
            </div>
          </motion.div>

          {/* Core SVG EV Hologram */}
          <div className="w-full h-full relative border border-white/4 rounded-[20px] bg-white/1 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] bg-size-[20px_20px]" />
            
            <svg className="w-full h-full p-6" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Electric grid background */}
              <g opacity="0.06">
                <line x1="0" y1="50" x2="400" y2="50" stroke="#8B5CF6" strokeWidth="0.5" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#8B5CF6" strokeWidth="0.5" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#8B5CF6" strokeWidth="0.5" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="#8B5CF6" strokeWidth="0.5" />
                <line x1="0" y1="250" x2="400" y2="250" stroke="#8B5CF6" strokeWidth="0.5" />
              </g>

              {/* Battery pack */}
              <g transform="translate(40, 120)">
                <rect x="0" y="0" width="70" height="45" rx="8" fill="#131722" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.8" />
                <rect x="8" y="8" width="54" height="10" rx="2" fill="#8B5CF6" opacity="0.6" />
                <rect x="8" y="22" width="40" height="10" rx="2" fill="#8B5CF6" opacity="0.4" />
                <text x="35" y="-6" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="bold">BATTERY</text>
              </g>

              {/* Energy flow line from battery to motor */}
              <path d="M 110,142 Q 150,142 170,155 Q 190,168 200,168" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6 4" opacity="0.5">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
              </path>

              {/* Motor/Controller */}
              <g transform="translate(200, 135)">
                <circle cx="30" cy="30" r="28" fill="#131722" stroke="#A78BFA" strokeWidth="1.5" />
                <circle cx="30" cy="30" r="18" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                <circle cx="30" cy="30" r="8" fill="#8B5CF6" opacity="0.3" />
                <circle cx="30" cy="30" r="4" fill="#A78BFA" />
                <text x="30" y="68" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="bold">MOTOR</text>
              </g>

              {/* Energy flow line from motor to wheels */}
              <path d="M 260,165 Q 280,165 300,180 Q 315,192 325,200" fill="none" stroke="#A78BFA" strokeWidth="2" strokeDasharray="6 4" opacity="0.5">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* Wheel */}
              <g transform="translate(310, 195)">
                <circle cx="20" cy="20" r="22" fill="#07090e" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="14" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                <circle cx="20" cy="20" r="5" fill="#8B5CF6" opacity="0.5" />
              </g>

              {/* Charging port */}
              <g transform="translate(60, 70)">
                <rect x="0" y="0" width="22" height="30" rx="4" fill="#131722" stroke="#3B82F6" strokeWidth="1.2" />
                <line x1="7" y1="10" x2="15" y2="10" stroke="#3B82F6" strokeWidth="1.5" />
                <line x1="7" y1="18" x2="15" y2="18" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="11" y="-4" textAnchor="middle" fill="#60A5FA" fontSize="8" fontWeight="bold">CHARGE</text>
              </g>

              {/* Car body silhouette */}
              <path d="M 100,210 C 130,195 180,180 230,175 C 280,170 320,180 350,200 L 360,210 L 90,215 Z" fill="#131722" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
              
              {/* Ground shadow */}
              <ellipse cx="220" cy="240" rx="120" ry="8" fill="#8B5CF6" opacity="0.08" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
