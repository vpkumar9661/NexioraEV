"use client";

import React, { useState } from "react";
import { 
  GraduationCap, Award, BookOpen, Clock, Layers, Sliders, CheckCircle, 
  MapPin, Play, Star, ChevronRight, CheckSquare, Zap, Activity, FileText 
} from "lucide-react";

// ==========================================
// HERO SECTION
// ==========================================

export function CareerHero() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#F4B400]/25 bg-linear-to-b from-[#F4B400]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[360px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#F4B400]/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/20 text-[#F4B400] text-[10px] font-bold uppercase tracking-wider">
            Nexiora Career Engine Active
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight font-sans">
            NexioraEV Career & Skill Development Hub™
          </h1>
          <p className="text-[#AEB5C0]/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Transform your EV knowledge into industry-ready skills through structured career roadmaps, practical projects, certifications, portfolio development, and AI career guidance.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#roadmaps"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#F4B400] text-[#07090e] hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] transition-all"
            >
              Explore Careers
            </a>
            <a
              href="#skills"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Competency Matrix
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/10 text-[#F4B400] hover:bg-[#F4B400]/20 transition-all"
            >
              Ask Career AI
            </a>
          </div>
        </div>

        {/* Vector SVG Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="-80 -80 160 80" className="w-full max-w-[220px] overflow-visible">
            {/* Hologram rings layers */}
            <ellipse cx="0" cy="15" rx="55" ry="22" fill="none" stroke="rgba(244,180,0,0.15)" strokeWidth="0.8" />
            <ellipse cx="0" cy="15" rx="45" ry="18" fill="none" stroke="rgba(244,180,0,0.1)" strokeWidth="0.8" strokeDasharray="3 3" />
            
            {/* Hologram core building block */}
            <g transform="translate(0, -10)">
              <rect x="-18" y="-6" width="36" height="12" rx="2" fill="#131722" stroke="rgba(244,180,0,0.3)" strokeWidth="0.8" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="white" strokeWidth="0.8" className="animate-pulse" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CAREER STATISTICS
// ==========================================

const STATS_ITEMS = [
  { label: "Career Tracks", value: "10 Tracks", desc: "Beginner to Lead", color: "#F4B400" },
  { label: "Industry Skills", value: "15 Domains", desc: "Standard catalog", color: "#3B82F6" },
  { label: "Projects Briefs", value: "12 Projects", desc: "Design sandboxes", color: "#10B981" },
  { label: "Credentials size", value: "6 Certificates", desc: "Online issued", color: "#A855F7" },
  { label: "Portfolio Items", value: "8 Modules", desc: "Technical files", color: "#EC4899" },
  { label: "Interview Questions", value: "150 Questions", desc: "Systems design", color: "#F59E0B" }
];

export function StatsBar() {
  return (
    <section id="stats" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STATS_ITEMS.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 rounded-[16px] border border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col justify-between"
        >
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest leading-none block">
            {stat.label}
          </span>
          <div className="mt-3.5">
            <span className="text-xs font-black text-white block">
              {stat.value}
            </span>
            <span className="text-[9.5px] text-[#AEB5C0]/50 block mt-1">
              {stat.desc}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==========================================
// PERSONAL CAREER DASHBOARD
// ==========================================

export function PersonalDashboard() {
  return (
    <section id="personal" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">Career Progress Dashboard</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Track your ongoing tracks accomplishments, portfolio strength index, and checklist goals.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Core panel Left */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[9.5px] font-extrabold text-[#F4B400] uppercase tracking-widest block">Active Career Path Target</span>
            <h3 className="text-sm font-black text-white mt-1">High-Voltage Battery Engineer</h3>
            <p className="text-xs text-[#AEB5C0]/60 mt-1 leading-normal">BMS safety balancing algorithms, pack liquid cooling integration strategies.</p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#AEB5C0]/50">Path Readiness Score</span>
              <span className="text-white">72% Ready</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-[#F4B400] rounded-full" style={{ width: "72%" }} />
            </div>
          </div>
        </div>

        {/* Readiness grid right */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Portfolio Strength</span>
            <strong className="text-lg text-white block mt-2">Level 4 (Strong)</strong>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Completed Projects</span>
            <strong className="text-lg text-[#F4B400] block mt-2">4 designs</strong>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// EV CAREER ROADMAPS
// ==========================================

const ROADMAPS = [
  { id: "battery", name: "Battery Engineer", duration: "240 hrs", demand: "Critical High", growth: "+45% YoY" },
  { id: "design", name: "EV Chassis Design Engineer", duration: "320 hrs", demand: "High", growth: "+28% YoY" },
  { id: "bms", name: "BMS firmware Engineer", duration: "180 hrs", demand: "Critical High", growth: "+38% YoY" },
  { id: "charging", name: "Charging Systems Architect", duration: "150 hrs", demand: "High", growth: "+22% YoY" }
];

export function CareerRoadmaps() {
  const [selectedTrack, setSelectedTrack] = useState<string>("battery");

  return (
    <section id="roadmaps" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">EV Career Pathways</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Toggle career roadmap cards to track target hours, industry demand levels, and annual growth indicators.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ROADMAPS.map((r) => {
          const isSelected = r.id === selectedTrack;
          return (
            <div
              key={r.id}
              onClick={() => setSelectedTrack(r.id)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-[#F4B400]/10 border-[#F4B400]/30 text-[#F4B400] shadow-[0_4px_24px_rgba(244,180,0,0.06)]"
                  : "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/4"
              }`}
            >
              <span className="text-[9px] font-bold text-[#AEB5C0]/40 uppercase tracking-widest block">{r.demand} Demand</span>
              <h4 className="text-xs font-black text-white mt-1 leading-snug">{r.name}</h4>
              <span className="text-[10px] text-[#AEB5C0]/50 block mt-2">
                {r.duration} • Growth {r.growth}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// SKILLS MATRIX Competency Dashboard
// ==========================================

const SKILLS = [
  { name: "High-Voltage Cells Chemistry", current: 80, target: 95 },
  { name: "BMS balancing algorithms", current: 65, target: 90 },
  { name: "Thermal liquid cooling loops", current: 70, target: 85 },
  { name: "Power inverters switching", current: 45, target: 80 }
];

export function SkillsMatrix() {
  return (
    <section id="skills" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Competency Skills Matrix</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Track your proficiency levels relative to target levels standard across manufacturers.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {SKILLS.map((s, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#AEB5C0]/80 font-bold block">{s.name}</span>
              <span className="text-white font-bold">{s.current}% / {s.target}% Target</span>
            </div>
            
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
              {/* Target benchmark node lines */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-red-400 opacity-60" style={{ left: `${s.target}%` }} />
              {/* Current level progress */}
              <div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${s.current}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// PORTFOLIO & PROJECTS SHOWCASE
// ==========================================

const PROJECTS = [
  { title: "Tesla-equivalent 75 kWh battery module design", type: "Virtual Lab Report", size: "1.2 MB" },
  { title: "Dynamic charging network layout proposal", type: "Simulation Summary", size: "850 KB" }
];

export function PortfolioBuilder() {
  return (
    <section id="portfolio" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Engineering Portfolio Builder</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Link laboratory simulations, technical sheets drafts, and blueprints files to generate exportable technical portfolios.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Showcase left */}
        <div id="showcase" className="md:col-span-7 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Active portfolio items</span>
          <div className="space-y-2">
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-white/1 border border-white/5">
                <div className="flex items-start gap-3">
                  <FileText className="w-4.5 h-4.5 text-[#F4B400] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9.5px] font-bold text-purple-400 block uppercase tracking-wider">{p.type}</span>
                    <strong className="text-white block mt-0.5 font-sans leading-snug">{p.title}</strong>
                  </div>
                </div>
                <span className="text-[#AEB5C0]/50 font-bold shrink-0">{p.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export center right */}
        <div className="md:col-span-5 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Technical Portfolio Exports</span>
            <p className="text-xs text-[#AEB5C0]/60 mt-3 leading-relaxed">
              Compile your virtual lab reports, battery simulations, and credentials to export as a formatted PDF for employers.
            </p>
          </div>
          <button
            onClick={() => alert("Compiling engineering portfolio assets PDF reports...")}
            className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Export Portfolio PDF
          </button>
        </div>

      </div>
    </section>
  );
}
