"use client";

import React, { useState } from "react";
import { 
  Sparkles, BrainCircuit, Play, FileDown, Search, 
  HelpCircle, ChevronDown, ChevronRight, FileText, 
  Globe, Bot, Activity, Sliders, MessageSquare, Terminal 
} from "lucide-react";

// ==========================================
// AI HERO
// ==========================================

export function AIHero() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#7C4DFF]/25 bg-linear-to-b from-[#7C4DFF]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[360px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#7C4DFF]/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C4DFF]/10 border border-[#7C4DFF]/20 text-[#7C4DFF] text-[10px] font-bold uppercase tracking-wider">
            Nexiora AI Command OS Active
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight font-sans">
            NexioraEV AI Command Center™
          </h1>
          <p className="text-muted-foreground/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Your intelligent EV co-pilot for learning, battery engineering design, charging planner simulation optimization, and decision making.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#chat"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#7C4DFF] text-white hover:shadow-[0_0_20px_rgba(124,77,255,0.4)] transition-all"
            >
              Start Conversation
            </a>
            <a
              href="#voice"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Voice Mode
            </a>
            <a
              href="#planner"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#7C4DFF]/30 bg-[#7C4DFF]/10 text-[#7C4DFF] hover:bg-[#7C4DFF]/20 transition-all"
            >
              Trip Planner
            </a>
          </div>
        </div>

        {/* Vector SVG Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="-80 -80 160 80" className="w-full max-w-[220px] overflow-visible">
            {/* Hologram rings layers */}
            <ellipse cx="0" cy="15" rx="55" ry="22" fill="none" stroke="rgba(124,77,255,0.15)" strokeWidth="0.8" />
            <ellipse cx="0" cy="15" rx="45" ry="18" fill="none" stroke="rgba(124,77,255,0.1)" strokeWidth="0.8" strokeDasharray="3 3" />
            
            {/* Hologram center spark */}
            <circle cx="0" cy="15" r="4" fill="#7C4DFF" className="animate-ping" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// QUICK ACTIONS
// ==========================================

interface AIQuickActionsProps {
  onSelectAction: (prompt: string) => void;
}

const SHORTCUTS = [
  { label: "BMS Active Balancing", prompt: "Explain the architectural difference between active and passive cell balancing in a BMS." },
  { label: "Solid-State SOH", prompt: "What are the core dendrites elimination boundaries inside Solid-state battery cells?" },
  { label: "Dynamic Highway coils", prompt: "How does wireless dynamic highway induction charging couple power at 120 km/h?" },
  { label: "V2G Grid feeds", prompt: "What are the utility stabilization advantages of Vehicle-to-Grid (V2G) systems?" }
];

export function AIQuickActions({ onSelectAction }: AIQuickActionsProps) {
  return (
    <section id="quickactions" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">AI Quick Actions</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Select a shortcut template to pre-fill prompts inside the conversation workspace.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SHORTCUTS.map((s, idx) => (
          <div
            key={idx}
            onClick={() => onSelectAction(s.prompt)}
            className="p-4 rounded-xl border border-white/5 bg-white/2 hover:border-[#7C4DFF]/20 hover:bg-[#7C4DFF]/5 hover:shadow-[0_4px_24px_rgba(124,77,255,0.04)] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px]"
          >
            <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block">Prompt template</span>
            <h4 className="text-xs font-bold text-white mt-1.5 leading-snug">{s.label}</h4>
            <span className="text-[9px] text-muted-foreground/50 block mt-2">Activate prompt →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// PROMPT LIBRARY
// ==========================================

const PROMPTS = [
  { title: "Battery Degradation SOH predictions formula", text: "How is SOH calendar capacity fading calculated over 15 years?" },
  { title: "SiC inverter continuous switching frequency limits", text: "What is the switching efficiency comparison between SiC and IGBT inverters?" }
];

export function PromptLibrary({ onSelectPrompt }: { onSelectPrompt: (p: string) => void }) {
  return (
    <section id="prompts" className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {PROMPTS.map((p, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-white/5 bg-black/40 flex justify-between items-center"
          >
            <div className="flex gap-3 items-start">
              <Terminal className="w-5 h-5 text-[#7C4DFF] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white leading-snug">{p.title}</h4>
              </div>
            </div>
            <button
              onClick={() => onSelectPrompt(p.text)}
              className="text-[10.5px] font-black text-[#7C4DFF] hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
            >
              Fill Prompt
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
