"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldCheck, ChevronRight, HelpCircle, HardDrive, Cpu, Compass } from "lucide-react";

interface GuideTopic {
  id: string;
  name: string;
  category: string;
  details: string;
  tips: string[];
}

export function KnowledgeCenter() {
  const [activeTopic, setActiveTopic] = useState<string>("bms");

  const topics: Record<string, GuideTopic> = {
    bms: {
      id: "bms",
      name: "BMS Active Balancing Algorithms",
      category: "BMS Overview",
      details: "Battery Management Systems maintain cell equilibrium using either passive balancing (shunting excess energy via heat resistors) or active balancing (transferring charge from high cells to low cells via capacitors or inductors). Active balancing maximizes usable pack capacity and extends calendar lifespan.",
      tips: [
        "Enforce active balancing cycles weekly when pack is resting.",
        "Maintain voltage imbalances below 15mV for optimal lifespan.",
        "Keep balancing limits within 50mA to prevent thermal spikes.",
      ],
    },
    safety: {
      id: "safety",
      name: "UN 38.3 Lithium Transport Compliance",
      category: "Battery Safety",
      details: "UN 38.3 compliance mandates eight rigorous testing procedures (thermal test, vibration check, shock, external short circuit, impact/crush, overcharge, forced discharge) before any battery module pack can be legally transported globally.",
      tips: [
        "Ensure third-party lab certification seals are active.",
        "Pack charge level must stay below 30% SOC during flight transports.",
        "Inspect isolation resistance values prior to boxing.",
      ],
    },
    thermal: {
      id: "thermal",
      name: "Coolant Loop Flush & Maintenance",
      category: "Thermal Management",
      details: "Liquid-cooled battery packs rely on glycol-water mixtures. Flushing thermal coolant loops removes sediment buildup and prevents pump blockages that create local cell hotspots.",
      tips: [
        "Flush coolant tubes every 60,000 miles or 3 BESS operational years.",
        "Monitor pump flow rates; drops below 5 L/min create hotspot risks.",
        "Ensure glycol concentration matches local winter freezing bounds.",
      ],
    },
  };

  const current = topics[activeTopic]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Topics selector */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
              BESS COMPLIANCE MANUALS
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <BookOpen className="w-5 h-5 text-[#10B981]" />
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
                    ? "border-[#10B981] bg-[#10B981]/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">{topic.name}</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">{topic.category}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTopic === topic.id ? "translate-x-0.5 text-[#10B981]" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details overlay */}
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
                <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#10B981] uppercase tracking-widest">
                  Compliance Topic Details
                </span>
                <h3 className="text-lg font-black text-white mt-2.5">{current.name}</h3>
              </div>

              <p className="text-xs text-muted-foreground/85 leading-relaxed">
                {current.details}
              </p>

              {/* Specific tips checklists */}
              <div className="border-t border-white/5 pt-4 space-y-2">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Safety Checklist Tips</span>
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
              <span className="font-extrabold text-white block">Continuous Safety Diagnostic Routine</span>
              <p className="text-muted-foreground/70 leading-relaxed">
                Nexiora BESS models execute a telemetry ping scan every 10 seconds. Voltage sag alerts automatically route to local grid operator SCADA consoles.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
