"use client";

import React from "react";
import { Bot, Award, ShieldCheck, Play, ArrowRight } from "lucide-react";

interface AIHeroProps {
  onLaunchAI: () => void;
  onStartAnalysis: () => void;
}

export function AIHero({ onLaunchAI, onStartAnalysis }: AIHeroProps) {
  return (
    <section className="relative p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      
      {/* Absolute grid light sweep */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-[#8B5CF6]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-[10.5px] font-black uppercase tracking-widest shadow-xs animate-pulse">
            <Bot className="w-3.5 h-3.5" />
            Nexiora AI Flagship Core
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            AI Solutions <br />
            <span className="bg-linear-to-r from-[#00D4FF] to-[#8B5CF6] -webkit-background-clip: text -webkit-text-fill-color: transparent bg-clip-text text-transparent">
              Operating System
            </span>
          </h1>

          <p className="text-muted-foreground/85 text-xs sm:text-sm leading-relaxed max-w-xl">
            The Intelligent Brain powering every NexioraEV solution using enterprise-grade artificial intelligence. Unify charging telemetry, battery diagnostics, fleet routing, and smart energy grids.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <button
              onClick={onLaunchAI}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-[#00D4FF] to-[#8B5CF6] hover:from-[#00E676] hover:to-[#00D4FF] text-black font-black text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-[0_10px_20px_rgba(139,92,246,0.25)] hover:shadow-[0_15px_30px_rgba(0,212,255,0.4)] cursor-pointer"
            >
              Launch AI Workspace
            </button>
            <button
              onClick={onStartAnalysis}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Start Doc Analysis
            </button>
          </div>

          <div className="flex items-center gap-5 pt-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00E676]" /> COGNITIVE LAYER 3.0</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#00D4FF]" /> 99.7% ANOMALY ACCURACY</span>
          </div>
        </div>

        {/* Right Interactive SVG column */}
        <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-[300px]">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>COGNITIVE NEURAL HOLOGRAM CORE</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" /> ENGINE ACTIVE</span>
          </div>

          <div className="flex-1 flex items-center justify-center pt-2">
            <svg viewBox="0 0 160 120" className="w-full h-full max-h-[180px] overflow-visible">
              {/* Animated Neural network node rings */}
              <circle cx="80" cy="60" r="28" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
              <circle cx="80" cy="60" r="42" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.8" strokeDasharray="3 6" className="animate-[spin_20s_linear_infinite]" />
              
              {/* Neural Node Points */}
              <circle cx="80" cy="60" r="14" fill="#05070d" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
              <circle cx="80" cy="60" r="8" fill="#8B5CF6" className="animate-ping" />
              <circle cx="80" cy="60" r="4" fill="#8B5CF6" />

              {/* Connecting synapsis points */}
              <circle cx="52" cy="60" r="3" fill="#00D4FF" />
              <line x1="52" y1="60" x2="66" y2="60" stroke="#00D4FF" strokeWidth="1" strokeDasharray="1 2" />

              <circle cx="108" cy="60" r="3" fill="#00E676" />
              <line x1="108" y1="60" x2="94" y2="60" stroke="#00E676" strokeWidth="1" strokeDasharray="1 2" />

              <circle cx="80" cy="32" r="3" fill="#8B5CF6" />
              <line x1="80" y1="32" x2="80" y2="46" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="1 2" />

              <circle cx="80" cy="88" r="3" fill="#F4B400" />
              <line x1="80" y1="88" x2="80" y2="74" stroke="#F4B400" strokeWidth="1" strokeDasharray="1 2" />

              <text x="80" y="63" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">AI</text>
            </svg>
          </div>

          <div className="border-t border-white/5 pt-2 flex justify-between text-[9.5px] text-muted-foreground/50 font-mono">
            <span>MODELS ACTIVE: 12</span>
            <span>TOKEN DISPATCH: 14.8k/s</span>
          </div>
        </div>

      </div>
    </section>
  );
}
