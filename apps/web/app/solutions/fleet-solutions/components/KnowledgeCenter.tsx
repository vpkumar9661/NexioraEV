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
  const [activeTopic, setActiveTopic] = useState<string>("conversion");

  const topics: Record<string, GuideTopic> = {
    conversion: {
      id: "conversion",
      name: "Commercial EV Fleet Conversion Checklist",
      category: "Fleet Expansion Guide",
      details: "Moving a commercial fleet from ICE to EV requires detailed planning: (1) Grid power capacity assessments at depot points, (2) Route telemetry analysis to match battery sizes, (3) Setting up off-peak charging profiles, and (4) Conducting driver acceleration regen harvesting training.",
      tips: [
        "Upgrade depot grid connections to handle multiple 150kW DC chargers.",
        "Incentivize driver efficiency targets to increase range yields.",
        "Map standard delivery loops to battery range limits.",
      ],
    },
    policy: {
      id: "policy",
      name: "Federal Commercial Clean Truck Tax Credits",
      category: "Government Policies",
      details: "Federal tax incentives provide up to $7,500 credits for light commercial EVs and up to $40,000 for heavy-duty EV haulers (like class 8 tractors). Additional regional carbon offsets can be traded directly under Scope 1 GHG accounting systems.",
      tips: [
        "File clean commercial transport grants prior to shipping units.",
        "Track Scope 1 CO2 offsets to generate tradeable carbon certificates.",
        "Check regional utility rebate loops for grid connection discounts.",
      ],
    },
    safety: {
      id: "safety",
      name: "High-Voltage Depot Safety & Protocols",
      category: "Fleet Safety",
      details: "Fleet depots deploying DC fast chargers must enforce strict electrical safety rules: isolated grounding tracks, automated coolant leakage sensors, high-voltage manual shutoffs, and emergency isolation blankets to handle thermal events.",
      tips: [
        "Conduct monthly insulation checks on all depot charging handles.",
        "Keep emergency battery isolation blankets within 30 feet of fast chargers.",
        "Integrate local charger cooling alerts directly with building safety SCADA systems.",
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
              LOGISTICS COMPLIANCE HANDBOOKS
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
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Conversion Recommendations</span>
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
              <span className="font-extrabold text-white block">Active Telemetry Diagnostic Updates</span>
              <p className="text-muted-foreground/70 leading-relaxed">
                Depot fast charging configurations update daily. Surcharges curves are optimized via connected regional BESS models automatically.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
