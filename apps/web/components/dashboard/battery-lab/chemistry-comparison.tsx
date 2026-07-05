"use client";

import { useState } from "react";
import { Zap, Flame, ShieldAlert, DollarSign, Scale, Layers } from "lucide-react";

type ChemType = "lfp" | "nmc" | "nca" | "solid-state" | "sodium-ion";

const CHEMS: { id: ChemType; label: string; color: string; accent: string }[] = [
  { id: "lfp", label: "LFP", color: "#10B981", accent: "#6EE7B7" },
  { id: "nmc", label: "NMC", color: "#8B5CF6", accent: "#C4B5FD" },
  { id: "nca", label: "NCA", color: "#EC4899", accent: "#FBCFE8" },
  { id: "solid-state", label: "Solid State", color: "#F59E0B", accent: "#FDE68A" },
  { id: "sodium-ion", label: "Sodium Ion", color: "#06B6D4", accent: "#AED9E0" }
];

interface ParameterData {
  label: string;
  icon: typeof DollarSign;
  values: Record<ChemType, { score: number; display: string }>;
}

const PARAMETERS: ParameterData[] = [
  { label: "Energy Density", icon: Layers, values: { lfp: { score: 55, display: "140 Wh/kg" }, nmc: { score: 85, display: "240 Wh/kg" }, nca: { score: 92, display: "260 Wh/kg" }, "solid-state": { score: 100, display: "450 Wh/kg" }, "sodium-ion": { score: 45, display: "120 Wh/kg" } } },
  { label: "Safety Profile", icon: ShieldAlert, values: { lfp: { score: 95, display: "Excellent" }, nmc: { score: 55, display: "Moderate" }, nca: { score: 45, display: "Low" }, "solid-state": { score: 100, display: "Outstanding" }, "sodium-ion": { score: 90, display: "Excellent" } } },
  { label: "Charging Speed", icon: Zap, values: { lfp: { score: 70, display: "Rapid" }, nmc: { score: 80, display: "Fast" }, nca: { score: 75, display: "Fast" }, "solid-state": { score: 95, display: "Ultra-Fast" }, "sodium-ion": { score: 85, display: "Very Fast" } } },
  { label: "Cycle Life Capacity", icon: Scale, values: { lfp: { score: 95, display: "5,000+ Cycles" }, nmc: { score: 65, display: "1,500 Cycles" }, nca: { score: 60, display: "1,200 Cycles" }, "solid-state": { score: 90, display: "4,000 Cycles" }, "sodium-ion": { score: 80, display: "2,500 Cycles" } } },
  { label: "Unit Cost / kWh", icon: DollarSign, values: { lfp: { score: 90, display: "$80/kWh" }, nmc: { score: 60, display: "$110/kWh" }, nca: { score: 50, display: "$120/kWh" }, "solid-state": { score: 20, display: "Pilot Scale" }, "sodium-ion": { score: 98, display: "$40/kWh" } } },
  { label: "Temperature Range", icon: Flame, values: { lfp: { score: 50, display: "Poor Cold" }, nmc: { score: 80, display: "Good" }, nca: { score: 75, display: "Moderate" }, "solid-state": { score: 85, display: "Outstanding" }, "sodium-ion": { score: 90, display: "Excellent Cold" } } }
];

export function ChemistryComparison() {
  const [selected, setSelected] = useState<ChemType[]>(["lfp", "nmc", "solid-state"]);

  const toggle = (id: ChemType) => {
    if (selected.includes(id)) {
      if (selected.length > 2) setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <section id="comparison" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Chemistry Comparison</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Cross-compare core attributes of current and future battery configurations</p>
      </div>

      {/* Select buttons */}
      <div className="flex flex-wrap gap-2">
        {CHEMS.map((chem) => {
          const isActive = selected.includes(chem.id);
          return (
            <button
              key={chem.id}
              onClick={() => toggle(chem.id)}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold border transition-all duration-300 ${
                isActive
                  ? `text-white`
                  : "bg-white/[0.02] border-white/5 text-[#AEB5C0]/50 hover:border-white/10"
              }`}
              style={
                isActive
                  ? { backgroundColor: `${chem.color}20`, borderColor: `${chem.color}40`, color: chem.accent }
                  : undefined
              }
            >
              {chem.label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Table representation */}
        <div className="lg:col-span-8 rounded-[20px] border border-white/5 bg-white/[0.02] overflow-hidden">
          {PARAMETERS.map((param, index) => {
            const Icon = param.icon;
            return (
              <div
                key={param.label}
                className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  index < PARAMETERS.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="flex items-center gap-2.5 w-48 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-[#AEB5C0]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-bold text-white uppercase tracking-wider">{param.label}</span>
                </div>

                <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))` }}>
                  {selected.map((id) => {
                    const chem = CHEMS.find((c) => c.id === id)!;
                    const val = param.values[id];
                    return (
                      <div key={id} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold">
                          <span style={{ color: chem.accent }}>{chem.label}</span>
                          <span className="text-white font-bold">{val.display}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${val.score}%`, backgroundColor: chem.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Graphic Radar/Bar visual placeholder */}
        <div className="lg:col-span-4 rounded-[20px] border border-white/5 bg-white/[0.02] p-5 space-y-4">
          <div className="border-b border-white/5 pb-3">
            <span className="text-xs font-bold text-white block">Density vs. Cost Benchmark</span>
            <span className="text-[10px] text-[#AEB5C0]/50 mt-1 block">Higher density & higher score is optimal</span>
          </div>

          <div className="relative h-[220px] flex items-center justify-center border border-white/[0.04] bg-[#131722]/40 rounded-xl overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(#fff_1px,transparent_1px)] bg-[size:10px_10px]" />
            
            <svg className="w-full h-full p-4" viewBox="0 0 200 200" fill="none">
              {/* Polar background grids */}
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />

              {/* Cross axis lines */}
              <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />

              {/* Draw dots based on selected chemistries */}
              {selected.map((id, index) => {
                const chem = CHEMS.find((c) => c.id === id)!;
                // mock coordinates for visualization mapping
                const densities = { lfp: 55, nmc: 85, nca: 92, "solid-state": 100, "sodium-ion": 45 };
                const costs = { lfp: 90, nmc: 60, nca: 50, "solid-state": 20, "sodium-ion": 98 };
                
                const density = densities[id];
                const cost = costs[id];

                // Polar math conversion mockup
                const angle = (index * 2 * Math.PI) / selected.length;
                const r = 20 + 60 * (density / 100);
                const cx = 100 + r * Math.cos(angle);
                const cy = 100 + r * Math.sin(angle);

                return (
                  <g key={id}>
                    <circle cx={cx} cy={cy} r="6" fill={chem.color} fillOpacity="0.8" />
                    <line x1="100" y1="100" x2={cx} y2={cy} stroke={chem.color} strokeWidth="1" strokeOpacity="0.5" />
                    <text x={cx > 100 ? cx + 8 : cx - 18} y={cy + 3} fill={chem.accent} fontSize="8" fontWeight="bold">{chem.label}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
