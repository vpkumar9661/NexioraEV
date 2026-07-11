"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldCheck, ChevronRight, HelpCircle, HardDrive, Cpu, Compass } from "lucide-react";

interface StandardSpec {
  id: string;
  name: string;
  pins: string;
  maxPower: string;
  voltage: string;
  desc: string;
  regions: string;
}

export function KnowledgeCenter() {
  const [activeStandard, setActiveStandard] = useState<string>("ccs");

  const standards: Record<string, StandardSpec> = {
    ccs: {
      id: "ccs",
      name: "CCS (Combined Charging System)",
      pins: "7 Pin combo configuration (AC pins + DC pins below)",
      maxPower: "350 kW - 450 kW",
      voltage: "Up to 1000 V DC",
      regions: "Europe, North America, India (CCS2)",
      desc: "The global benchmark for public passenger car fast charging. Combines type 2 AC pins with dual high-current DC pins below. Liquid cooled cords support up to 500A.",
    },
    nacs: {
      id: "nacs",
      name: "NACS (North American Charging Standard)",
      pins: "5 Pin slim configuration (shared AC and DC pins)",
      maxPower: "250 kW - 350 kW",
      voltage: "Up to 1000 V DC",
      regions: "North America, Global Tesla network",
      desc: "Originally Tesla connector, standardized as SAE J3400. Extremely slim handle, uses same pins for both AC charging and high speed DC fast charging. Major manufacturers are adopting this.",
    },
    gbt: {
      id: "gbt",
      name: "GB/T Standard",
      pins: "9 Pin AC / 5 Pin DC (separate ports)",
      maxPower: "250 kW (ChaoJi supports 900kW)",
      voltage: "Up to 750 V - 1000 V",
      regions: "China, select Asian corridors",
      desc: "China's national charging standard. Separates AC port from DC port. The next-generation ChaoJi project updates this to support ultra-fast thermal-monitored charging.",
    },
    chademo: {
      id: "chademo",
      name: "CHAdeMO Protocol",
      pins: "10 Pin connector (integrated CAN-Bus signaling)",
      maxPower: "100 kW - 400 kW",
      voltage: "Up to 1000 V",
      regions: "Japan, legacy chargers worldwide",
      desc: "Japan's signature DC charging standard. Features advanced bidirectional charging out of the box (V2X support). Primarily being phased out in Europe and Americas for CCS/NACS.",
    },
    bharat: {
      id: "bharat",
      name: "Bharat AC001 & DC001",
      pins: "Type 2 AC / GB/T DC localized mapping",
      maxPower: "15 kW DC / 22 kW AC",
      voltage: "72 V - 200 V Low Voltage DC",
      regions: "India (Fleet & 3-wheeler loops)",
      desc: "India's localized low voltage standards built for fleet cars, 2-wheelers, and 3-wheelers. Offers highly cost-effective depot installation with minimal substation overhead.",
    },
  };

  const currentSpec = standards[activeStandard]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Standards Selector Tabs */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              INFRASTRUCTURE LIBRARY
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <BookOpen className="w-5 h-5 text-[#00E676]" />
              Knowledge Center
            </h2>
          </div>

          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Detailed mechanical specifications, pinout guidelines, and grid safety codes for global vehicle standard connectors.
          </p>

          {/* Connectors specifications tabs list */}
          <div className="flex flex-col gap-2.5">
            {Object.values(standards).map((spec) => (
              <button
                key={spec.id}
                onClick={() => setActiveStandard(spec.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeStandard === spec.id
                    ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.1)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">{spec.name}</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">{spec.regions}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeStandard === spec.id ? "translate-x-0.5 text-[#00E676]" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Specification Details overlay */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpec.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <span className="text-[8px] font-black text-[#00E676] px-2 py-0.5 rounded bg-[#00E676]/10 border border-[#00E676]/20 uppercase tracking-widest">
                  Specifications Guide
                </span>
                <h3 className="text-lg font-black text-white mt-2.5">{currentSpec.name}</h3>
              </div>

              <p className="text-xs text-muted-foreground/85 leading-relaxed">
                {currentSpec.desc}
              </p>

              {/* Specific table */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs">
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Connector Pins</span>
                  <span className="font-extrabold text-white mt-0.5 block">{currentSpec.pins}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Max power SLA</span>
                  <span className="font-extrabold text-[#00E676] mt-0.5 block">{currentSpec.maxPower}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Voltage Grid Range</span>
                  <span className="font-extrabold text-white mt-0.5 block">{currentSpec.voltage}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[9px] block">Target region</span>
                  <span className="font-extrabold text-[#00D4FF] mt-0.5 block">{currentSpec.regions}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Installation Safety guidance */}
          <div className="bg-white/1 border border-white/5 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[10.5px]">
              <span className="font-extrabold text-white block">Installation Code & Safety Notice</span>
              <p className="text-muted-foreground/70 leading-relaxed">
                Substations over 100 kVA require automatic isolation circuit breakers, surge protectors, and continuous thermal monitoring along the liquid-cooled charging cables.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
