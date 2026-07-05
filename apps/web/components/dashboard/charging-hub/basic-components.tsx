"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Zap, BrainCircuit, Play, FileDown, Search, 
  HelpCircle, ChevronDown, ChevronRight, FileText, 
  BookOpen, Sparkles, AlertTriangle, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// HERO SECTION
// ==========================================

export function HeroSection() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#22D3EE]/25 bg-linear-to-b from-[#22D3EE]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[380px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      
      {/* Energy Glow mesh */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-[10px] font-bold uppercase tracking-wider">
            Nexiora Charging Ecosystem Active
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight">
            Advanced Charging Hub
          </h1>
          <p className="text-[#AEB5C0]/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Master EV charging technology through interactive simulations, grid-load calculations, AI-assisted advisors, and structural connector diagnostics.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#simulator"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#22D3EE] text-[#07090e] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
            >
              Charging Simulator
            </a>
            <a
              href="#calculator"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Cost Calculator
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-all"
            >
              Ask AI Agent
            </a>
          </div>
        </div>

        {/* Dynamic SVG EV Charger Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="0 0 200 180" className="w-full max-w-[220px] aspect-square overflow-visible">
            {/* Charger Pedestal */}
            <rect x="70" y="40" width="60" height="110" rx="10" fill="#131722" stroke="rgba(255,255,255,0.06)" />
            <rect x="75" y="45" width="50" height="100" rx="8" fill="#0F172A" />

            {/* Display screen */}
            <rect x="85" y="55" width="30" height="20" rx="2" fill="#020617" stroke="#22D3EE" strokeWidth="0.8" />
            <path d="M 90,65 L 110,65" stroke="#22D3EE" strokeWidth="1.5" className="animate-pulse" />

            {/* EV Connector Plug hanging on dock */}
            <rect x="110" y="85" width="12" height="22" rx="3" fill="#1E293B" stroke="rgba(255,255,255,0.15)" />
            
            {/* Cable wave flowing to battery */}
            <path
              d="M 116,107 Q 140,150 170,120 T 195,120"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 7"
              className="animate-pulse"
            />

            {/* Pulsing Energy particles */}
            <circle cx="140" cy="125" r="3" fill="#22D3EE" opacity="0.8" className="animate-ping" />
            <circle cx="170" cy="120" r="4" fill="#10B981" opacity="0.8" className="animate-bounce" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CHARGING STATISTICS
// ==========================================

const STATS_ITEMS = [
  { label: "Charging Standards", value: 7, suffix: " Global", color: "#22D3EE" },
  { label: "Connector Types", value: 6, suffix: " Pin Designs", color: "#C084FC" },
  { label: "Charging Stations", value: 45000, suffix: "+ Active", color: "#10B981" },
  { label: "Fast DC Chargers", value: 12500, suffix: " High Rate", color: "#EC4899" },
  { label: "Charging Networks", value: 15, suffix: " Integrations", color: "#F59E0B" },
  { label: "Learning Modules", value: 10, suffix: " Certs", color: "#3B82F6" }
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
            <span className="text-lg font-black text-white block">
              {stat.value.toLocaleString()}{stat.suffix}
            </span>
            <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ width: "65%", backgroundColor: stat.color, boxShadow: `0 0 8px ${stat.color}` }} 
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==========================================
// CHARGING TECHNOLOGY EXPLORER
// ==========================================

interface TechDetail {
  id: string;
  name: string;
  voltage: string;
  power: string;
  useCase: string;
  pros: string[];
  description: string;
  color: string;
}

const TECH_LIST: TechDetail[] = [
  {
    id: "ac",
    name: "AC Charging (Level 1/2)",
    voltage: "120V - 240V Single/Three-Phase",
    power: "3.3 kW - 22 kW",
    useCase: "Overnight residential charging and workplace parking fleets.",
    pros: ["Very low infrastructure cost", "Minimal grid load stress", "Preserves cell health cycle longevity"],
    description: "Alternating Current (AC) charging relies on the vehicle's onboard converter unit to rectify AC electricity to direct current (DC) needed by cells.",
    color: "#3B82F6"
  },
  {
    id: "dc",
    name: "DC Fast Charging (DCFC)",
    voltage: "400V - 500V Dedicated Grid Link",
    power: "50 kW - 150 kW",
    useCase: "Highway transit hubs, commercial delivery stops.",
    pros: ["Bypasses onboard charger entirely", "Charges 10% to 80% in 30-40 minutes", "Ideal for long trips"],
    description: "Direct Current (DC) chargers deliver regulated DC electricity directly to the vehicle traction pack, bypassing the onboard charger capacity constraints.",
    color: "#22D3EE"
  },
  {
    id: "ultra",
    name: "Ultra-Fast Charging (HPC)",
    voltage: "800V - 1000V Architecture",
    power: "150 kW - 350+ kW",
    useCase: "High-volume arterial transit points.",
    pros: ["Enables sub-15 minute refills", "Supports luxury long-range EVs", "Future-proof liquid-cooled cables"],
    description: "High-Power Charging (HPC) utilizes high voltage setups to deliver ultra-high currents, requiring active liquid-cooling in cables to dissipate heat.",
    color: "#10B981"
  },
  {
    id: "wireless",
    name: "Resonant Wireless Induction",
    voltage: "Magnetic coupling pad system",
    power: "11 kW - 20 kW",
    useCase: "Automated parking, transit bus stops, autonomous taxi terminals.",
    pros: ["Zero physical connectors or cables", "Hands-free operations", "Resilient against rain or snow"],
    description: "Uses a primary coil on the ground and secondary receiver coil beneath the vehicle. Transfers energy over a magnetic resonance field.",
    color: "#C084FC"
  },
  {
    id: "swapping",
    name: "Battery Swapping Nodes",
    voltage: "Stationary storage bank charge",
    power: "Swap completed in 3 minutes",
    useCase: "Urban taxi fleets, electric scooters, commercial logistics.",
    pros: ["Zero waiting for charge cycles", "Station charges cells under ideal conditions", "Separates battery cost from car buying"],
    description: "Physically drops out the depleted battery pack and inserts a fully charged pack using automated robotic mechanics under 3 minutes.",
    color: "#F59E0B"
  },
  {
    id: "pantograph",
    name: "Pantograph Overhead Charging",
    voltage: "600V - 750V DC grid connection",
    power: "150 kW - 450 kW",
    useCase: "Transit buses at stop points, heavy duty mining trucks.",
    pros: ["Automated overhead connection", "Ultra-high power charging during scheduled route stops", "Reduces necessary onboard battery sizes"],
    description: "Mechanical linkage arm drops down from an overhead gantry onto conductive rooftop rails on buses, injecting rapid energy boosts.",
    color: "#EC4899"
  }
];

export function TechExplorer() {
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);

  return (
    <section id="explorer" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Charging Technology Explorer</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Interact with core EV charging architectures and power transfer mechanics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TECH_LIST.map((tech) => (
          <div
            key={tech.id}
            onClick={() => setSelectedTech(tech)}
            className="group relative rounded-[18px] border border-white/5 bg-white/2 hover:bg-white/4 p-5 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" style={{ backgroundColor: tech.color }} />
            
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ backgroundColor: `${tech.color}15`, borderColor: `${tech.color}25` }}>
                  <Zap className="w-4.5 h-4.5" style={{ color: tech.color }} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#AEB5C0]/75">
                  {tech.power.split(" ")[0]} {tech.power.split(" ")[1]}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#22D3EE] transition-colors">{tech.name}</h3>
                <p className="text-[11.5px] text-[#AEB5C0]/50 mt-1 line-clamp-2 leading-relaxed">{tech.useCase}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Dialog panel overlay */}
      <AnimatePresence>
        {selectedTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-[24px] border border-white/10 bg-[#131722]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${selectedTech.color}15`, borderColor: `${selectedTech.color}25` }}>
                    <Zap className="w-5 h-5" style={{ color: selectedTech.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{selectedTech.name}</h3>
                    <span className="text-xs text-[#AEB5C0]/60">Technical Architecture Specifications</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-1 rounded-lg hover:bg-white/5 text-[#AEB5C0]/50 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Voltage Levels</span>
                  <span className="text-xs font-bold text-white mt-1 block">{selectedTech.voltage}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Power Ranges</span>
                  <span className="text-xs font-bold text-white mt-1 block">{selectedTech.power}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Technology Breakdown</h4>
                <p className="text-[12.5px] text-[#AEB5C0]/80 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
                  {selectedTech.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Key Engineering Advantages</h4>
                <ul className="space-y-1">
                  {selectedTech.pros.map((p, idx) => (
                    <li key={idx} className="text-xs text-[#AEB5C0] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ==========================================
// RESEARCH LIBRARY
// ==========================================

const PAPERS = [
  { title: "IEC 61851-1: conductive charging system specs", doc: "IEC-61851-1.pdf", type: "IEC Standard" },
  { title: "IEEE 2030.5: Smart Grid communications protocols", doc: "IEEE-2030.5.pdf", type: "IEEE Protocol" },
  { title: "Grid integration of ultra-fast charging stations report", doc: "Grid-Fast-Charge.pdf", type: "Grid White Paper" },
  { title: "Bidirectional V2G charging safety boundaries", doc: "V2G-Boundaries.pdf", type: "IEC Report" }
];

export function ResearchLibrary() {
  return (
    <section id="library" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Technical Research Library</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Access peer-reviewed documents, charging grid standards, and protocol white papers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAPERS.map((paper, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 flex justify-between items-center"
          >
            <div className="flex gap-3.5 items-start">
              <FileText className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase block tracking-wider">{paper.type}</span>
                <h4 className="text-xs font-bold text-white mt-1 leading-snug">{paper.title}</h4>
              </div>
            </div>
            <button
              onClick={() => alert(`Initiating mock download: ${paper.doc}`)}
              className="p-2 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <FileDown className="w-4.5 h-4.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// VIDEO LEARNING
// ==========================================

const VIDEOS = [
  { title: "Level 1 vs Level 2 AC Fundamentals", duration: "12 mins", author: "Dr. Clara Chen", level: "Beginner" },
  { title: "Anatomy of a 350kW DC Liquid Cooled Charger", duration: "18 mins", author: "Eng. Ryan Ross", level: "Intermediate" },
  { title: "Understanding CCS2 & NACS Pinouts Configuration", duration: "15 mins", author: "Eng. Ryan Ross", level: "Intermediate" },
  { title: "Smart Load Balancing & Bidirectional Grid Systems", duration: "22 mins", author: "Prof. Sarah Croft", level: "Advanced" }
];

export function VideoLearning() {
  return (
    <section id="videos" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Video Learning Courses</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Watch masterclass briefings detailing charging hardware and smart grid deployments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIDEOS.map((vid, idx) => (
          <div
            key={idx}
            className="group rounded-[20px] border border-white/5 bg-white/2 overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-video bg-black/40 border-b border-white/5 flex items-center justify-center relative group-hover:bg-black/60 transition-colors">
              <div className="w-10 h-10 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 flex items-center justify-center text-[#22D3EE] group-hover:scale-105 transition-transform">
                <Play className="w-4 h-4 fill-[#22D3EE]" />
              </div>
              <span className="absolute bottom-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/75 text-white">
                {vid.duration}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[9px] font-bold text-[#AEB5C0]/40 uppercase tracking-widest block">{vid.level}</span>
              <h4 className="text-xs font-bold text-white leading-snug group-hover:text-[#22D3EE] transition-colors">{vid.title}</h4>
              <span className="text-[10px] text-[#AEB5C0]/50 block">Speaker: {vid.author}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// DOWNLOAD CENTER
// ==========================================

export function DownloadCenter() {
  return (
    <section id="downloads" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Downloads Catalog</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Download reference charts, handbook PDFs, and installation specifications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Charging Handbook PDF", desc: "120-page comprehensive guide.", file: "Handbook" },
          { title: "EV Plug Pinout Diagram", desc: "NACS & CCS2 specs chart.", file: "Pinouts" },
          { title: "Standard Grid Config Sheets", desc: "IEC grid layout template.", file: "GridSheet" }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 flex flex-col justify-between gap-4"
          >
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
              <p className="text-[11.5px] text-[#AEB5C0]/55 mt-1 leading-normal">{item.desc}</p>
            </div>
            <button
              onClick={() => alert(`Downloading: ${item.file}`)}
              className="w-full py-2 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 hover:bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-bold transition-colors cursor-pointer"
            >
              Download Resource
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// FAQ SECTION
// ==========================================

const FAQS = [
  { q: "Is CCS2 compatible with NACS chargers?", a: "NACS is physically different, but electrical signal protocols are identical (CCS signal standard). A passive physical adapter allows full compatibility between NACS and CCS2 vehicles/chargers." },
  { q: "Does fast charging degrade my battery?", a: "Consistent DC fast charging raises cell temperature and causes local lithium plating stress. Limiting DC fast charging to under 30% of total cycles preserves long term battery health (SOH)." },
  { q: "What is Vehicle-to-Grid (V2G)?", a: "V2G allows bidirectional current flow. A parked EV can inject energy from its traction battery back to the power grid during peak loads to stabilize the electrical infrastructure." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Answers to standard queries relating to charging networks and adapters.</p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#22D3EE]/20 bg-[#22D3EE]/3"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#AEB5C0]/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#22D3EE]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-4 text-[11.5px] text-[#AEB5C0]/75 leading-relaxed pl-5 border-t border-white/5 pt-2">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// CONTINUE CTA
// ==========================================

export function ContinueCTA() {
  return (
    <section id="cta" className="p-6 sm:p-8 rounded-[24px] border border-white/5 bg-white/2 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#22D3EE]/5 blur-2xl pointer-events-none" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
        <div className="space-y-2">
          <span className="text-[9.5px] font-extrabold text-purple-400 uppercase tracking-widest block">Next Subject Module</span>
          <h3 className="text-lg font-bold text-white">EV Components & Drivetrains</h3>
          <p className="text-xs text-[#AEB5C0]/60 max-w-md leading-relaxed">
            Transition to the next module. Learn how traction motors, power inverters, and reduction gearboxes manage pack energy.
          </p>
        </div>
        <Link
          href="/evtech/components"
          className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Continue to Components <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
