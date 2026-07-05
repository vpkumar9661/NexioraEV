"use client";

import { useState } from "react";
import { X, BrainCircuit, ShieldAlert, Cpu, Zap, Activity, FlameKindling } from "lucide-react";

interface ChemistryDetail {
  id: string;
  name: string;
  energyDensity: string;
  safetyScore: string;
  cycleLife: string;
  cost: string;
  pros: string[];
  cons: string[];
  desc: string;
  color: string;
}

const CHEM_DETAILS: ChemistryDetail[] = [
  {
    id: "li-ion",
    name: "Lithium-Ion (Standard)",
    energyDensity: "150-200 Wh/kg",
    safetyScore: "Moderate",
    cycleLife: "500 - 1,500 Cycles",
    cost: "Moderate ($130/kWh)",
    pros: ["High energy density", "Mature technology", "No memory effect"],
    cons: ["Thermal runaway risks", "Limited cycle life at high temperature"],
    desc: "The standard energy storage technology for portable electronics and early EVs. Primarily utilizes liquid electrolytes and metal oxide cathodes.",
    color: "#3B82F6"
  },
  {
    id: "lfp",
    name: "Lithium Iron Phosphate (LFP)",
    energyDensity: "120-160 Wh/kg",
    safetyScore: "High (Non-flammable)",
    cycleLife: "3,000 - 6,000 Cycles",
    cost: "Low ($85/kWh)",
    pros: ["Superb safety profile", "Ultra long cycle life", "Cobalt-free chemistry"],
    cons: ["Lower energy density", "Poor performance in sub-zero cold"],
    desc: "A highly robust and safe chemistry that replaces expensive nickel/cobalt with abundant iron and phosphate. Ideal for budget EVs and grid storage.",
    color: "#10B981"
  },
  {
    id: "nmc",
    name: "Nickel Manganese Cobalt (NMC)",
    energyDensity: "200-250 Wh/kg",
    safetyScore: "Moderate-Low",
    cycleLife: "1,000 - 2,000 Cycles",
    cost: "High ($110/kWh)",
    pros: ["High voltage and capacity", "Good cold-weather range", "Compact packaging"],
    cons: ["Shorter lifespan than LFP", "Relies on expensive Cobalt/Nickel"],
    desc: "The dominant chemistry for premium, long-range EVs. Balance of Nickel (for capacity), Manganese (for stability), and Cobalt (for high-current output).",
    color: "#8B5CF6"
  },
  {
    id: "nca",
    name: "Nickel Cobalt Aluminum (NCA)",
    energyDensity: "220-260 Wh/kg",
    safetyScore: "Moderate-Low",
    cycleLife: "1,000 - 1,500 Cycles",
    cost: "Very High ($120/kWh)",
    pros: ["Extremely high density", "Great discharge power", "Compact footprint"],
    cons: ["Poorer safety/thermal stability", "Degrades faster under rapid DC charging"],
    desc: "NCA offers the highest energy capacity for consumer electric passenger vehicles. Pioneered heavily by brands like Tesla for maximum driving range.",
    color: "#EC4899"
  },
  {
    id: "solid-state",
    name: "Solid-State Battery",
    energyDensity: "350-500 Wh/kg",
    safetyScore: "Excellent (No liquid)",
    cycleLife: "5,000+ Cycles",
    cost: "Extremely High (Pilot scale)",
    pros: ["Double the range of NMC", "10-minute fast charging", "Non-flammable solid electrolyte"],
    cons: ["High manufacturing cost", "Susceptible to dendrite growth at high rates"],
    desc: "The holy grail of EV batteries. Replaces the liquid organic solvent electrolyte with a solid ceramic or polymer, eliminating thermal runaway entirely.",
    color: "#F59E0B"
  },
  {
    id: "sodium-ion",
    name: "Sodium-Ion (Na-Ion)",
    energyDensity: "100-140 Wh/kg",
    safetyScore: "Excellent",
    cycleLife: "2,000 - 3,000 Cycles",
    cost: "Very Low ($40/kWh)",
    pros: ["Abundant sodium resources", "Superior sub-zero operation", "Fast charge capable"],
    cons: ["Heavy weight / low range", "Early commercialization phase"],
    desc: "Utilizes sodium ions instead of scarce lithium. Offering unparalleled price stability and resource independence, perfect for entry-level city cars.",
    color: "#06B6D4"
  },
  {
    id: "lead-acid",
    name: "Lead Acid (EV Auxiliary)",
    energyDensity: "30-50 Wh/kg",
    safetyScore: "Moderate",
    cycleLife: "300 - 500 Cycles",
    cost: "Extremely Low",
    pros: ["High surge currents", "99% recyclable", "Simple manufacturing"],
    cons: ["Very heavy", "Very short lifespan", "Environmental lead toxins"],
    desc: "The oldest battery technology. While not used for EV traction, it remains the standard for 12V auxiliary starting/systems in modern vehicles.",
    color: "#6B7280"
  },
  {
    id: "graphene",
    name: "Graphene Super-Battery",
    energyDensity: "150-180 Wh/kg",
    safetyScore: "Very High",
    cycleLife: "10,000+ Cycles",
    cost: "High (Experimental)",
    pros: ["Ultra fast charging (seconds)", "Incredible heat dissipation", "Zero degradation"],
    cons: ["Low volumetric density", "High mass-production complexity"],
    desc: "Utilizes graphene structures to enable rapid electrostatic charge/discharge kinetics. Unmatched thermal cooling and cycle capability.",
    color: "#10B981"
  }
];

export function TechExplorer() {
  const [selectedChem, setSelectedChem] = useState<ChemistryDetail | null>(null);

  return (
    <section id="explorer" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Technology Explorer</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Interact with core EV cell configurations and structural chemistries</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHEM_DETAILS.map((chem) => (
          <div
            key={chem.id}
            onClick={() => setSelectedChem(chem)}
            className="group relative rounded-[18px] border border-white/5 bg-white/2 hover:bg-white/4 p-5 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" style={{ backgroundColor: chem.color }} />
            
            <div className="flex flex-col h-full justify-between gap-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${chem.color}15`, borderColor: `${chem.color}25` }}>
                  <BrainCircuit className="w-4 h-4" style={{ color: chem.color }} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#AEB5C0]/75">
                  {chem.energyDensity.split(" ")[0]} Wh/kg
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#6EE7B7] transition-colors">{chem.name}</h3>
                <p className="text-[11.5px] text-[#AEB5C0]/50 mt-1 line-clamp-2 leading-relaxed">{chem.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pop up Overlay detail panel */}
      {selectedChem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl rounded-[24px] border border-white/10 bg-[#131722]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${selectedChem.color}15`, borderColor: `${selectedChem.color}25` }}>
                  <BrainCircuit className="w-5 h-5" style={{ color: selectedChem.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedChem.name}</h3>
                  <span className="text-xs text-[#AEB5C0]/60">Structural Cell Chemistry Details</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedChem(null)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-[#AEB5C0]/40 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Energy Density</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{selectedChem.energyDensity}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Safety Profile</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{selectedChem.safetyScore}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Cycle Life</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{selectedChem.cycleLife}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Typical Cost</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{selectedChem.cost}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#AEB5C0]/80 leading-relaxed bg-white/1 p-4 rounded-xl border border-white/5">
              {selectedChem.desc}
            </p>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#10B981] uppercase tracking-wider block">Advantages</span>
                <ul className="space-y-1.5 text-xs text-[#AEB5C0]/75 list-disc pl-4">
                  {selectedChem.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                </ul>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#EF4444] uppercase tracking-wider block">Limitations</span>
                <ul className="space-y-1.5 text-xs text-[#AEB5C0]/75 list-disc pl-4">
                  {selectedChem.cons.map((con, i) => <li key={i}>{con}</li>)}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
