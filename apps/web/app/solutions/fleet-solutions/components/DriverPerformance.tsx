"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, TrendingUp, User, ChevronRight, HelpCircle } from "lucide-react";

interface DriverRow {
  rank: number;
  id: string;
  name: string;
  safetyScore: number;
  efficiency: number; // miles / kWh (higher is better)
  violations: number;
  idleHours: number;
  tips: string[];
}

export function DriverPerformance() {
  const [selectedDriver, setSelectedDriver] = useState<string>("dr-1");

  const drivers: DriverRow[] = [
    {
      rank: 1,
      id: "dr-1",
      name: "Marcus Aurelius",
      safetyScore: 98,
      efficiency: 3.45,
      violations: 0,
      idleHours: 1.2,
      tips: [
        "Excellent gentle brake regenerator harvesting.",
        "Maintain current cruising speed profiles on highways.",
        "Idle hours are 40% below fleet average."
      ],
    },
    {
      rank: 2,
      id: "dr-2",
      name: "Hadrian",
      safetyScore: 94,
      efficiency: 3.20,
      violations: 0,
      idleHours: 1.8,
      tips: [
        "Optimal energy output on delivery loops.",
        "Smooth acceleration profiles.",
        "Slightly high cabin AC usage during hot weather loads."
      ],
    },
    {
      rank: 3,
      id: "dr-3",
      name: "Trajan",
      safetyScore: 88,
      efficiency: 2.95,
      violations: 1,
      idleHours: 3.4,
      tips: [
        "Warning: Sudden acceleration wear detected on freeway exits.",
        "Incentivize smoother braking inputs to capture kinetic regeneration.",
        "Avoid keeping vehicle idle during intermediate package pickups."
      ],
    },
    {
      rank: 4,
      id: "dr-4",
      name: "Commodus",
      safetyScore: 76,
      efficiency: 2.42,
      violations: 3,
      idleHours: 5.6,
      tips: [
        "Critical Warning: Repeated speeding triggers on US-101 loop.",
        "High mechanical friction braking; limited regen capture.",
        "Schedule EV smooth driving training loop."
      ],
    },
  ];

  const active = drivers.find((d) => d.id === selectedDriver) ?? drivers[0]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Leaderboard */}
        <div className="lg:col-span-7 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-widest block">
              LOGISTICS LABORS PERFORMANCE
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Award className="w-5 h-5 text-[#8B5CF6]" />
              Driver Performance Leaderboard
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {drivers.map((driver) => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriver(driver.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  selectedDriver === driver.id
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-xs font-black font-mono text-muted-foreground/40 w-4">#{driver.rank}</span>
                  <div>
                    <span className="text-xs font-black block">{driver.name}</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">Efficiency: {driver.efficiency} mi/kWh</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black" style={{ color: driver.safetyScore >= 90 ? "#10B981" : driver.safetyScore >= 80 ? "#F59E0B" : "#ef4444" }}>
                    {driver.safetyScore} pts
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Details recommendations */}
        <div className="lg:col-span-5 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#8B5CF6] uppercase tracking-widest">
                  Diagnostic Ratings
                </span>
                <h3 className="text-base font-black text-white mt-2.5">{active.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/5 pt-4">
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Safety Index</span>
                  <span className="font-extrabold text-white mt-0.5 block">{active.safetyScore} / 100</span>
                </div>
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Energy Efficiency</span>
                  <span className="font-extrabold text-[#10B981] mt-0.5 block">{active.efficiency} mi/kWh</span>
                </div>
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Speed Violations</span>
                  <span className="font-extrabold text-white mt-0.5 block">{active.violations} count</span>
                </div>
                <div>
                  <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Idle hours</span>
                  <span className="font-extrabold text-white mt-0.5 block">{active.idleHours} hrs</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Training Suggestions</span>
                <div className="space-y-1.5 text-xs text-white">
                  {active.tips.map((tip, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
