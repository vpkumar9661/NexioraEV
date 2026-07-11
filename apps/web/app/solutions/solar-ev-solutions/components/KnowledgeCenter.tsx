"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldCheck, ChevronRight, HardDrive, Cpu, Compass } from "lucide-react";

interface GuideTopic {
  id: string;
  name: string;
  category: string;
  details: string;
  tips: string[];
}

export function KnowledgeCenter() {
  const [activeTopic, setActiveTopic] = useState<string>("metering");

  const topics: Record<string, GuideTopic> = {
    metering: {
      id: "metering",
      name: "Net Metering & Grid Interconnection Codes",
      category: "Solar PV Basics",
      details: "Net metering (NEM 3.0) allows solar owners to export excess daytime generation to the grid in exchange for credits. Crucial requirements: (1) Dual-register bi-directional smart meters, (2) Anti-islanding grid safety protocols, and (3) Rapid shutdown switches for emergency protection.",
      tips: [
        "Select UL 1741 SB certified smart inverters to handle transient grid sweeps.",
        "Program battery packs to charge from solar when export credits are low.",
        "File net metering interconnection agreements prior to panel mounts.",
      ],
    },
    subsidy: {
      id: "subsidy",
      name: "Federal & Regional Solar Tax Credits",
      category: "Government Schemes",
      details: "The Residential Clean Energy Credit (Section 25D) provides a uncapped 30% tax credit for rooftop solar, micro-inverters, electrical panel upgrades, and battery storage. Regional utility companies frequently offer additional rebates for BESS grid-connected services.",
      tips: [
        "File IRS Form 5695 during annual tax returns to claim solar ITC credits.",
        "Ensure battery storage size is at least 3 kWh to qualify for the 30% credit.",
        "Enroll in Virtual Power Plant (VPP) events to earn passive grid rewards.",
      ],
    },
    safety: {
      id: "safety",
      name: "Rooftop PV High-Voltage Safety Guidelines",
      category: "Solar Safety",
      details: "High-voltage DC lines from solar strings carry safety risks. Standard protection: (1) Rapid shutdown devices (RSD) to reduce panel voltages to safe levels under 30V within 30 seconds, (2) Ground fault protection, and (3) Fire-resistant conduit routings.",
      tips: [
        "Incorporate individual micro-inverters to convert DC to AC directly on the roof.",
        "Conduct annual insulation checks on copper conduit paths.",
        "Establish visible manual AC disconnect switches near utility meters.",
      ],
    },
  };

  const current = topics[activeTopic]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Selector */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              RENEWABLE COMPLIANCE HANDBOOKS
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <BookOpen className="w-5 h-5 text-[#00E676]" />
              Knowledge Center
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {Object.values(topics).map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeTopic === topic.id
                    ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">{topic.name}</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">{topic.category}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTopic === topic.id ? "translate-x-0.5 text-[#00E676]" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#00E676] uppercase tracking-widest">
                  Compliance Guide Details
                </span>
                <h3 className="text-lg font-black text-white mt-2.5">{current.name}</h3>
              </div>

              <p className="text-xs text-muted-foreground/85 leading-relaxed">
                {current.details}
              </p>

              {/* Specific guidelines checklist */}
              <div className="border-t border-white/5 pt-4 space-y-2">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Core Recommendations</span>
                <div className="space-y-1.5 text-xs text-white">
                  {current.tips.map((tip, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3.5 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[10.5px]">
              <span className="font-extrabold text-white block">Active Grid Interconnection Standard</span>
              <p className="text-muted-foreground/70 leading-relaxed">
                Inverter grid sync metrics updates dynamically based on regional safety standards and local distribution parameters.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
