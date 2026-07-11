"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HardDrive, Check, ShieldCheck, Flame, Compass, RefreshCcw } from "lucide-react";

interface SpecData {
  id: string;
  name: string;
  density: string;
  densityVal: number;
  cycles: string;
  cyclesVal: number;
  tempRange: string;
  safety: string;
  safetyVal: number;
  maintenance: string;
  bestUse: string;
}

export function BatteryComparison() {
  const [selectedChems, setSelectedChems] = useState<string[]>(["lfp", "nmc"]);

  const data: Record<string, SpecData> = {
    lfp: {
      id: "lfp",
      name: "LFP (Iron Phosphate)",
      density: "160 Wh/kg",
      densityVal: 40,
      cycles: "4,000 - 6,000 cycles",
      cyclesVal: 90,
      tempRange: "-20°C to 60°C",
      safety: "Extreme (Non-flammable)",
      safetyVal: 95,
      maintenance: "Very Low",
      bestUse: "Buses, delivery vans, grid storage",
    },
    nmc: {
      id: "nmc",
      name: "NMC (Nickel Manganese)",
      density: "260 Wh/kg",
      densityVal: 75,
      cycles: "1,500 - 2,500 cycles",
      cyclesVal: 55,
      tempRange: "-20°C to 55°C",
      safety: "Moderate (Requires active cooling)",
      safetyVal: 65,
      maintenance: "Medium (Thermal checks)",
      bestUse: "Long-range passenger cars, light logistics",
    },
    sodium: {
      id: "sodium",
      name: "Sodium-Ion",
      density: "140 Wh/kg",
      densityVal: 30,
      cycles: "3,000 cycles",
      cyclesVal: 70,
      tempRange: "-40°C to 60°C (Cold resilient)",
      safety: "High (Minimal runaway risk)",
      safetyVal: 85,
      maintenance: "Low",
      bestUse: "Massive stationary grids, urban micro cars",
    },
    solid: {
      id: "solid",
      name: "Solid State (Next-Gen)",
      density: "450 Wh/kg",
      densityVal: 100,
      cycles: "5,000+ cycles",
      cyclesVal: 100,
      tempRange: "-30°C to 70°C",
      safety: "Extreme (No liquid electrolyte)",
      safetyVal: 100,
      maintenance: "Low (Self monitoring BMS)",
      bestUse: "Luxury passenger cars, autonomous trucks",
    },
  };

  const handleToggleSelect = (id: string) => {
    if (selectedChems.includes(id)) {
      if (selectedChems.length > 1) {
        setSelectedChems(selectedChems.filter((item) => item !== id));
      }
    } else {
      if (selectedChems.length < 3) {
        setSelectedChems([...selectedChems, id]);
      } else {
        setSelectedChems([selectedChems[1]!, id]);
      }
    }
  };

  const activeSpecs = Object.values(data).filter((item) => selectedChems.includes(item.id));

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-6">
        
        <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#00D4FF] uppercase tracking-widest block">
              BESS SPECIFICATION COMPARATOR
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <HardDrive className="w-5 h-5 text-[#00D4FF]" />
              Chemistry Comparison Center
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.values(data).map((chem) => {
              const active = selectedChems.includes(chem.id);
              return (
                <button
                  key={chem.id}
                  onClick={() => handleToggleSelect(chem.id)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? "border-[#10B981] bg-[#10B981]/10 text-white"
                      : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                  {chem.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spec Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSpecs.map((spec) => (
            <div
              key={spec.id}
              className="p-5 rounded-[22px] border border-white/6 bg-white/3 flex flex-col justify-between space-y-5 shadow-lg relative"
            >
              <div
                className="absolute top-0 left-5 w-10 h-0.5"
                style={{
                  background: spec.id === "solid" ? "#10B981" : spec.id === "nmc" ? "#00D4FF" : "#84CC16",
                }}
              />

              <div className="space-y-1">
                <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">
                  Deployment Specs
                </span>
                <h3 className="text-base font-black text-white">{spec.name}</h3>
              </div>

              {/* Progress visual metrics */}
              <div className="space-y-3 bg-black/35 p-3.5 rounded-xl border border-white/4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-muted-foreground/65 uppercase">
                    <span>Specific Energy</span>
                    <span className="text-white">{spec.density}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#00D4FF] to-[#3B82F6]"
                      style={{ width: `${spec.densityVal}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-muted-foreground/65 uppercase">
                    <span>Cycle Lifespan</span>
                    <span className="text-white">{spec.cycles.split(" ")[0]} cycles</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#10B981] to-[#84CC16]"
                      style={{ width: `${spec.cyclesVal}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Comparison parameters list */}
              <div className="space-y-3 text-[11px] border-t border-white/5 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">Thermal Limits</span>
                  <span className="font-extrabold text-white text-right">{spec.tempRange}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">Safety profile</span>
                  <span className="font-extrabold text-[#10B981] text-right">{spec.safety.split(" ")[0]}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">O&M Maintenance</span>
                  <span className="font-extrabold text-white text-right">{spec.maintenance}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">Optimal Use Case</span>
                  <span className="font-extrabold text-[#00D4FF] text-right">{spec.bestUse}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
