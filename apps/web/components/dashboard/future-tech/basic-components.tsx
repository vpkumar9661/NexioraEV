"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, BrainCircuit, Play, FileDown, Search, 
  HelpCircle, ChevronDown, ChevronRight, FileText, 
  Globe, Orbit, Zap, Milestone, Layers 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// HERO SECTION
// ==========================================

export function HeroSection() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#22D3EE]/25 bg-linear-to-b from-[#22D3EE]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[380px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-[10px] font-bold uppercase tracking-wider">
            Nexiora Innovation Lab Active
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight font-sans">
            Future Tech Lab
          </h1>
          <p className="text-muted-foreground/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Discover the next generation of electric mobility through immersive simulations, artificial intelligence, smart cities grid layouts, and emerging battery chemistries.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#timeline"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#22D3EE] text-[#07090e] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
            >
              Technology Timeline
            </a>
            <a
              href="#hub"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Innovation Hub
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-all"
            >
              Ask AI Futurist
            </a>
          </div>
        </div>

        {/* Vector SVG Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="-90 -90 180 180" className="w-full max-w-[210px] aspect-square overflow-visible">
            {/* Hologram Rings */}
            <circle cx="0" cy="0" r="55" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="25" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" className="animate-pulse" />

            {/* Floating particles orbits */}
            <motion.circle
              cx="0"
              cy="0"
              r="2.5"
              fill="#22D3EE"
              animate={{
                cx: [0, 55, 0, -55, 0],
                cy: [-55, 0, 55, 0, -55]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="2.5"
              fill="#A855F7"
              animate={{
                cx: [0, -40, 0, 40, 0],
                cy: [40, 0, -40, 0, 40]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Center Core */}
            <circle cx="0" cy="0" r="10" fill="#111" stroke="#22D3EE" strokeWidth="1" />
            <Sparkles className="w-4 h-4 text-cyan-400 absolute top-[calc(50%-8px)] left-[calc(50%-8px)] animate-spin" style={{ animationDuration: "10s" }} />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// INNOVATION STATS
// ==========================================

const STATS_ITEMS = [
  { label: "Emerging Tech Fields", value: "8 Active", desc: "Under testing", color: "#22D3EE" },
  { label: "R&D Projects", value: "14 Nodes", desc: "Global trials", color: "#C084FC" },
  { label: "Future Concept Cars", value: "12 Designs", desc: "Virtual Blueprints", color: "#10B981" },
  { label: "AI Fleet Nodes", value: "1,250 Nodes", desc: "Optimizing grid", color: "#3B82F6" },
  { label: "Pending Patents", value: "32 Patents", desc: "Filing active", color: "#EC4899" },
  { label: "Innovation Modules", value: "6 Lab modules", desc: "Interactive", color: "#F59E0B" }
];

export function StatsBar() {
  return (
    <section id="stats" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STATS_ITEMS.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 rounded-[16px] border border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col justify-between"
        >
          <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest leading-none block">
            {stat.label}
          </span>
          <div className="mt-3.5">
            <span className="text-xs font-black text-white block">
              {stat.value}
            </span>
            <span className="text-[9.5px] text-muted-foreground/50 block mt-1">
              {stat.desc}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==========================================
// TECHNOLOGY TIMELINE
// ==========================================

interface TimelineNode {
  year: string;
  title: string;
  desc: string;
  color: string;
}

const TIMELINE: TimelineNode[] = [
  { year: "2027", title: "Solid-State SOH Production", desc: "Transitioning liquid cells to solid polymer anodes, doubling energy densities.", color: "#8B5CF6" },
  { year: "2030", title: "Smart City Load balance V2G", desc: "100% vehicle to grid bidirectional feeds stabilize municipal sub-stations.", color: "#22D3EE" },
  { year: "2035", title: "Inductive Dynamic charging lanes", desc: "Embedding magnetic pads along highways. EVs charge while driving at 120 km/h.", color: "#10B981" },
  { year: "2040", title: "Autonomous Robotaxi fleets", desc: "Removal of steering consoles. AI fleet controllers navigate municipal routing.", color: "#F59E0B" },
  { year: "2050", title: "Quantum battery designs", desc: "Nano-cellular configurations utilizing quantum entanglement states for sub-minute fills.", color: "#EC4899" }
];

export function TechTimeline() {
  const [selectedNode, setSelectedNode] = useState<TimelineNode>(TIMELINE[0]!);

  return (
    <section id="timeline" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Innovation Timeline</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Explore estimated timelines of upcoming electric mobility breakthroughs.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Nodes lists */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col gap-3 justify-between">
          <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest block mb-1">Select Year Milestone</span>
          {TIMELINE.map((n) => (
            <button
              key={n.year}
              onClick={() => setSelectedNode(n)}
              className={`w-full py-2.5 px-4 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex justify-between items-center ${
                selectedNode.year === n.year
                  ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.06)]"
                  : "bg-white/2 border-white/5 text-muted-foreground hover:text-white"
              }`}
            >
              <span>{n.year} Milestone</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        {/* Readout panel */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[160px]">
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest block" style={{ color: selectedNode.color }}>
              Year {selectedNode.year} Target
            </span>
            <h4 className="text-sm font-black text-white">{selectedNode.title}</h4>
            <p className="text-xs text-muted-foreground/75 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
              {selectedNode.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// INNOVATION HUB
// ==========================================

const INNOVATIONS = [
  { title: "Solid-State Battery", spec: "450 Wh/kg target", desc: "No liquid electrolyte, eliminating fires." },
  { title: "Hydrogen Fuel Cell", spec: "700 bar tank standard", desc: "Combines H2 and O2 for pure water emissions." },
  { title: "Inductive charging pads", spec: "92% magnetic transfer", desc: "Power transferred wirelessly across space gaps." },
  { title: "Quantum Battery cells", spec: "Entanglement charging", desc: "Charges array cells simultaneously via quantum physics." },
  { title: "Smart Solar roads", spec: "Micro-inverter tiles", desc: "Dynamic pavement tiles capturing solar energy directly." },
  { title: "V2G Bidirectional link", spec: "ISO 15118 compliance", desc: "EV traction batteries feed energy back to municipality grids." }
];

export function InnovationHub() {
  return (
    <section id="hub" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Interactive Innovation Hub</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Dissect operational specifications and grids configurations of next-gen techs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INNOVATIONS.map((inn, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[20px] border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[145px]"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider">{inn.title}</h4>
              </div>
              <p className="text-[11.5px] text-muted-foreground/55 leading-relaxed">{inn.desc}</p>
            </div>
            <span className="text-[9.5px] font-bold text-cyan-400 mt-2 block">
              Specs: {inn.spec}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// FUTURE CONCEPT GALLERY
// ==========================================

const CONCEPTS = [
  { title: "Flying EV (eVTOL)", desc: "Vertical takeoffs using modular multi-rotors assemblies." },
  { title: "Autonomous Robotaxis", desc: "No cockpit steering consoles. Fleet coordination routing." },
  { title: "Solar Cruiser RV", desc: "Light-weight body wrapping solar paint to recharge batteries." },
  { title: "Robotic Cargo Pods", desc: "Autonomous sidewalk logistics vehicles delivering retail goods." }
];

export function FutureConceptGallery() {
  return (
    <section id="concepts" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Future Concepts Gallery</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">View speculative design outlines and visual vehicle mockups.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONCEPTS.map((c, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="text-[9px] text-purple-400 font-extrabold uppercase tracking-widest block">Nexiora Studio Concept</span>
              <h4 className="text-xs font-bold text-white mt-1 uppercase tracking-wide">{c.title}</h4>
              <p className="text-[11.5px] text-muted-foreground/55 mt-2 leading-relaxed">{c.desc}</p>
            </div>
            <span className="text-[9.5px] font-bold text-cyan-400 block cursor-pointer">View Blueprint →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// RESEARCH LIBRARY
// ==========================================

const PAPERS = [
  { title: "Quantum battery energy densities analysis", doc: "Quantum-Cells.pdf", type: "Quantum Physics" },
  { title: "Dynamic wireless highway induction coil spacing", doc: "Wireless-Induction.pdf", type: "Wireless Charging" },
  { title: "V2G grid stabilization margins report", doc: "V2G-Grid.pdf", type: "Smart Grid" },
  { title: "Solid-state dendrites elimination barriers", doc: "Solid-Dendrites.pdf", type: "Materials" }
];

export function ResearchLibrary() {
  return (
    <section id="library" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Technical Publications Library</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Read peer-reviewed research papers and global engineering documentation.</p>
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
              className="p-2 rounded-xl border border-white/5 bg-white/3 text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer"
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
// VIDEO CENTER
// ==========================================

const VIDEOS = [
  { title: "Solid-State Ceramic Electrolyte Stacking", duration: "14 mins", author: "Dr. Clara Chen", level: "Beginner" },
  { title: "Dynamic Highway Inductive Spacing Math", duration: "18 mins", author: "Eng. Ryan Ross", level: "Intermediate" },
  { title: "Quantum Batteries Charging Time Metrics", duration: "22 mins", author: "Prof. Sarah Croft", level: "Advanced" }
];

export function VideoCenter() {
  return (
    <section id="videos" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Innovation Video Center</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Watch video lectures covering next-generation cells and smart infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest block">{vid.level}</span>
              <h4 className="text-xs font-bold text-white leading-snug group-hover:text-[#22D3EE] transition-colors">{vid.title}</h4>
              <span className="text-[10px] text-muted-foreground/50 block">Speaker: {vid.author}</span>
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
        <h2 className="text-xl font-black text-white">Download Center</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Download reference documents and technology maps.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Solid-State Design Guide PDF", desc: "Cell assembly specification sheets.", file: "Solid-State-Guide" },
          { title: "Smart City Grid Blueprint", desc: "V2G communication loop templates.", file: "V2G-Blueprint" },
          { title: "Autonomous Drive Maps", desc: "ADAS sensor spacing CAD references.", file: "ADAS-Maps" }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 flex flex-col justify-between gap-4"
          >
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
              <p className="text-[11.5px] text-muted-foreground/55 mt-1 leading-normal">{item.desc}</p>
            </div>
            <button
              onClick={() => alert(`Downloading: ${item.file}`)}
              className="w-full py-2 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 hover:bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-bold transition-colors cursor-pointer"
            >
              Download Reference
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
  { q: "What limits solid-state battery deployment?", a: "High manufacturing costs of pure lithium metal anodes and solid ceramic electrolyte layers. Additionally, local volume changes during cycles can spark structural cracks." },
  { q: "How does wireless dynamic highway charging work?", a: "Copper coils embedded in highways convert grid current to high hertz magnetic waves. Receiver pads on car frames convert those back into high voltage DC to charge batteries at speed." },
  { q: "What is quantum battery entanglement?", a: "Entangled particles can transfer charge states simultaneously rather than sequentially. Allowing cells to charge in seconds." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Frequently Asked Questions</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Dissect standard queries relating to solid state chemistry and smart microgrids.</p>
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
                <ChevronDown className={`w-4 h-4 text-muted-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#22D3EE]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-4 text-[11.5px] text-muted-foreground/75 leading-relaxed pl-5 border-t border-white/5 pt-2">
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
          <h3 className="text-lg font-bold text-white">General Learning Center</h3>
          <p className="text-xs text-muted-foreground/60 max-w-md leading-relaxed">
            Transition to the main learning center module. Explore courses, tutorials, and certifications for engineers and buyers.
          </p>
        </div>
        <Link
          href="/evtech/learning-center"
          className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Continue to Learning Center <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
