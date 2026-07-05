"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Cpu, Rotate3d, BrainCircuit, Play, FileDown, Wrench, 
  HelpCircle, ChevronDown, ChevronRight, FileText, 
  Sparkles, ShieldCheck, CheckSquare, Award, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// HERO SECTION
// ==========================================

export function HeroSection() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#22D3EE]/25 bg-linear-to-b from-[#22D3EE]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[380px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      {/* Glow mesh */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-[10px] font-bold uppercase tracking-wider">
            Nexiora Engineering Node Active
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight">
            EV Components Studio
          </h1>
          <p className="text-[#AEB5C0]/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Discover every component inside an Electric Vehicle through immersive 3D exploded visualizations, powertrain power-flow simulations, and AI-powered diagnostic advisors.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#exploded"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#22D3EE] text-[#07090e] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
            >
              3D Exploded chassis
            </a>
            <a
              href="#powerflow"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Power Flow Sim
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-all"
            >
              Ask AI Specialist
            </a>
          </div>
        </div>

        {/* Vector SVG Chassis Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="-90 -90 180 180" className="w-full max-w-[210px] aspect-square overflow-visible">
            {/* Outlined Car body silhouette */}
            <path
              d="M -70,20 C -70,-30 -30,-50 0,-50 C 30,-50 70,-30 70,20 C 70,35 60,40 50,40 C 40,40 35,30 25,30 C 15,30 10,40 -10,40 C -30,40 -35,30 -45,30 C -55,30 -60,40 -70,20 Z"
              fill="none"
              stroke="rgba(34,211,238,0.15)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            {/* Front & Rear Wheels */}
            <circle cx="-45" cy="30" r="14" fill="#131722" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <circle cx="45" cy="30" r="14" fill="#131722" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            
            {/* Battery Pack in the floor */}
            <rect x="-32" y="15" width="64" height="10" rx="2" fill="rgba(168,85,247,0.1)" stroke="#8B5CF6" strokeWidth="1" />
            
            {/* Motor & Inverter unit on front axle */}
            <rect x="-55" y="-5" width="18" height="15" rx="3" fill="rgba(34,211,238,0.15)" stroke="#22D3EE" strokeWidth="1" />
            <circle cx="-46" cy="2" r="5" fill="#10B981" />

            {/* Glowing signal flow paths */}
            <path
              d="M -20,15 Q -40,15 -46,7"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENT STATISTICS
// ==========================================

const STATS_ITEMS = [
  { label: "Traction Motor Types", value: "PMSM / Induction", desc: "Brushless AC", color: "#22D3EE" },
  { label: "Battery Pack Blocks", value: "Cell-to-Pack Integration", desc: "Structured LFP", color: "#C084FC" },
  { label: "Power Electronics Modules", value: "SiC MOSFET Inverters", desc: "High Hertz", color: "#10B981" },
  { label: "Cooling Circuit Nodes", value: "Dual Plate Loop", desc: "Ethylene glycol", color: "#3B82F6" },
  { label: "Sensors & Diagnostics", value: "CAN-Bus Telemetry", desc: "Redundant", color: "#EC4899" },
  { label: "Engineering Labs", value: "6 Dynamic Modules", desc: "Active Sim", color: "#F59E0B" }
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
            <span className="text-[12px] font-black text-white block">
              {stat.value}
            </span>
            <span className="text-[10px] text-[#AEB5C0]/50 block mt-1">
              {stat.desc}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==========================================
// COMPONENT GALLERY
// ==========================================

interface ComponentCard {
  id: string;
  name: string;
  desc: string;
  techSpec: string;
}

const GALLERY_CARDS: ComponentCard[] = [
  { id: "battery", name: "High Voltage Battery Pack", desc: "Stores direct current (DC) chemical power. Acting as structural chassis reinforcement.", techSpec: "350V-800V DC operating limits" },
  { id: "motor", name: "Traction Motor", desc: "Converts high voltage 3-phase AC voltage to continuous rotating torque outputs.", techSpec: "PMSM, 150 kW peak output rating" },
  { id: "inverter", name: "Power Inverter Hub", desc: "Rectifies battery DC output into variable frequency AC output using SiC switches.", techSpec: "SiC switching speeds up to 20kHz" },
  { id: "controller", name: "Central Drive Controller", desc: "Computes accelerator inputs and commands inverter torque phases.", techSpec: "DSP core processor, CAN-bus linkage" },
  { id: "charger", name: "Onboard AC Charger (OBC)", desc: "Rectifies grid AC power to battery DC levels during home charging sessions.", techSpec: "11 kW - 22 kW AC inputs support" },
  { id: "dcdc", name: "DC/DC Low-Power Converter", desc: "Steps down high traction voltage to 12V DC auxiliary vehicle sub-systems.", techSpec: "Steps down 400V to 13.8V auxiliary" },
  { id: "gearbox", name: "Single-Speed Reduction Gearbox", desc: "Reduces motor high RPM outputs, multiplying torque sent to vehicle axles.", techSpec: "9.5:1 standard gear reduction ratio" },
  { id: "thermal", name: "Liquid Thermal Pumps", desc: "Circulates coolant through cell pack jackets and motor heat sinks.", techSpec: "Dual loop, ethylene-glycol medium" }
];

export function ComponentGallery() {
  const [selectedComp, setSelectedComp] = useState<ComponentCard | null>(null);

  return (
    <section id="gallery" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Engineering Component Gallery</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Discover structural parameters, voltage thresholds, and purposes of EV mechanics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GALLERY_CARDS.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setSelectedComp(comp)}
            className="group rounded-[20px] border border-white/5 bg-white/2 hover:bg-white/4 p-5 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] cursor-pointer flex flex-col justify-between min-h-[145px]"
          >
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#22D3EE] transition-colors uppercase tracking-wider">{comp.name}</h3>
              <p className="text-[11.5px] text-[#AEB5C0]/55 mt-2 line-clamp-2 leading-relaxed">{comp.desc}</p>
            </div>
            <span className="text-[9.5px] font-bold text-cyan-400 mt-2 block">
              Learn Specs →
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#131722]/95 backdrop-blur-xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">{selectedComp.name}</h4>
                <button
                  onClick={() => setSelectedComp(null)}
                  className="text-xs text-[#AEB5C0]/50 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Description Details</span>
                  <p className="text-[#AEB5C0]/85 mt-1">{selectedComp.desc}</p>
                </div>
                <div>
                  <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Engineering Limits</span>
                  <strong className="text-[#22D3EE] mt-0.5 block">{selectedComp.techSpec}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ==========================================
// MAINTENANCE CENTER
// ==========================================

const SCHEDULE = [
  { item: "HV Battery Health Diagnostic Sweep", interval: "Every 15,000 miles", priority: "High Check" },
  { item: "Power electronics coolant level top-up", interval: "Every 30,000 miles", priority: "Routine Medium" },
  { item: "Reduction gearbox fluid inspection", interval: "Every 50,000 miles", priority: "Low Maintenance" }
];

export function MaintenanceCenter() {
  return (
    <section id="maintenance" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Maintenance Center</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Review standard diagnostic cycles and drive system fluid replacement parameters.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Periodic inspection checklist</span>
          <div className="space-y-2">
            {SCHEDULE.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/2 border border-white/5 flex justify-between items-center text-xs">
                <div className="flex gap-2.5 items-center">
                  <CheckSquare className="w-4.5 h-4.5 text-[#22D3EE] shrink-0" />
                  <div>
                    <h5 className="font-bold text-white leading-snug">{s.item}</h5>
                    <span className="text-[10px] text-[#AEB5C0]/50">{s.interval}</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 shrink-0">
                  {s.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance tips */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 text-xs">
          <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block tracking-wider border-b border-white/5 pb-2">Diagnostic Tips</span>
          <div className="space-y-3 font-semibold text-[#AEB5C0]/85 leading-relaxed">
            <p>
              * <strong>Coolant Flushing:</strong> Inadequate flushing leads to localized hotspot clusters within cells, causing thermal runaway triggers.
            </p>
            <p>
              * <strong>Insulation checks:</strong> Orange high-voltage cables must be monitored for chassis grounding fault leakages using isolation relays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// RESEARCH LIBRARY
// ==========================================

const PAPERS = [
  { title: "Silicon Carbide (SiC) MOSFET switching losses analysis", doc: "SiC-Losses.pdf", type: "SiC Report" },
  { title: "PMSM vs Induction: electric traction comparison", doc: "PMSM-Induction.pdf", type: "Traction Guide" },
  { title: "Active liquid plate cooling design metrics", doc: "Plate-Cooling.pdf", type: "Thermal Standard" },
  { title: "Isolation safety limits in 800V architecture", doc: "Isolation-Safety.pdf", type: "HV White Paper" }
];

export function ResearchLibrary() {
  return (
    <section id="library" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Technical Research Library</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Review publications covering silicon-carbide, thermal fluids, and isolations safety.</p>
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
  { title: "Anatomy of an EV Drivetrain", duration: "10 mins", author: "Dr. Ryan Ross", level: "Beginner" },
  { title: "PMSM Stator Magnetic Vector Fields", duration: "20 mins", author: "Eng. Ryan Ross", level: "Intermediate" },
  { title: "High Voltage Contactors Isolation Mechanics", duration: "15 mins", author: "Prof. Clara Chen", level: "Intermediate" },
  { title: "Active Liquid Cooling Loop Pump Sizing", duration: "25 mins", author: "Prof. Sarah Croft", level: "Advanced" }
];

export function VideoLearning() {
  return (
    <section id="videos" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Video Learning Courses</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Review lecture video guides covering drive systems configurations.</p>
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Download CAD technical blueprints, equations worksheets, and standard schematics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Traction Motor CAD (STEP)", desc: "PMSM 150kW housing CAD file.", file: "PMSM-CAD" },
          { title: "Drivetrain Schematic PDF", desc: "High-voltage routing blueprint.", file: "HV-Schematic" },
          { title: "Thermal Loop Design Excel", desc: "Cooling plates capacity math.", file: "Thermal-Cool" }
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
              onClick={() => alert(`Downloading file: ${item.file}`)}
              className="w-full py-2 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 hover:bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-bold transition-colors cursor-pointer"
            >
              Download File
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
  { q: "Why is a single-speed gearbox used in most EVs?", a: "Electric motors produce maximum torque at zero RPM and remain efficient up to 15,000+ RPM. This wide power band eliminates the weight, friction, and manufacturing cost of multi-ratio transmissions." },
  { q: "What role does Silicon Carbide play in inverters?", a: "SiC MOSFET semiconductors switch current on and off faster than legacy silicon IGBTs. This reduces switching heat loss by up to 70%, boosting vehicle efficiency and range by 5% to 8%." },
  { q: "How does regenerative braking charge the battery?", a: "When the driver lifts off the accelerator, the motor controller reverses the current flow. The vehicle's kinetic momentum forces the motor to act as an generator, converting mechanical rotation back into high-voltage DC electricity." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Answers to standard queries relating to inverters and transmissions.</p>
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
          <h3 className="text-lg font-bold text-white">Future Electric Mobility</h3>
          <p className="text-xs text-[#AEB5C0]/60 max-w-md leading-relaxed">
            Transition to the next module. Explore solid-state cells, megawatt dynamic charging pads, and hyper-efficient hub-motors.
          </p>
        </div>
        <Link
          href="/evtech/future-tech"
          className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Continue to Future Tech <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
