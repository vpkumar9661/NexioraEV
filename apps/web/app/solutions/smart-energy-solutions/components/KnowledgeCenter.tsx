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
  const [activeTopic, setActiveTopic] = useState<string>("standard");

  const topics: Record<string, GuideTopic> = {
    standard: {
      id: "standard",
      name: "IEEE 1547 Grid Interconnection Codes",
      category: "Smart Grid",
      details: "IEEE 1547 defines standard requirements for interconnecting distributed resources (DERs) with the electric power system: (1) Anti-islanding disconnect timings within 2 seconds of utility line dropouts, (2) Voltage ride-through boundaries to prevent premature asset decoupling during transient sweeps, and (3) Smart inverter volt-var control curves.",
      tips: [
        "Select UL 1741 SB certified smart inverters to comply with the latest IEEE 1547.1 testing regulations.",
        "Program battery banks to discharge reactive power to assist local voltage recovery profiles.",
        "Enforce rapid shutdown switches on all rooftop solar strings.",
      ],
    },
    response: {
      id: "response",
      name: "OpenADR 2.0 Demand Response Protocols",
      category: "Demand Response",
      details: "OpenADR (Open Automated Demand Response) is an open standard allowing utility companies to send electronic load-shed notifications directly to consumer EMS controllers during peak grid loads. The EMS automatically curtails thermal loops and shifts EV charging slots based on clearance pricing structures.",
      tips: [
        "Implement OpenADR 2.0b VEN client software on local building EMS systems.",
        "Configure automated load curtailment blocks for non-essential HVAC fans.",
        "Enroll battery reserves to dispatch VPP bids during active utility load events.",
      ],
    },
    quality: {
      id: "quality",
      name: "IEEE 519 Harmonic Control Limits",
      category: "Power Quality",
      details: "Heavy industrial loads and non-linear fast charger rectifiers introduce harmonic current distortions. IEEE 519 mandates that Total Harmonic Distortion (THD) for voltage must not exceed 5.0% at the Point of Common Coupling (PCC) to prevent utility transformer overheating.",
      tips: [
        "Incorporate active harmonic filters (AHF) near heavy DC charger loops.",
        "Maintain power factor angles above 0.95 to avoid utility reactive power penalties.",
        "Conduct annual wave analysis using certified high-speed PQ analyzers.",
      ],
    },
  };

  const current = topics[activeTopic]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left selector */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              GRID COMPLIANCE HANDBOOKS
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

        {/* Right details */}
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
                Interconnection parameter checks compile daily. Dynamic voltage and power factors are synchronized via connected regional substation inverters automatically.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
