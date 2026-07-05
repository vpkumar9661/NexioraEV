"use client";

import { useState } from "react";
import { Zap, Flame, Droplets, Sparkles } from "lucide-react";

type DriveType = "ev" | "ice" | "hybrid" | "diesel";

const TYPES: { id: DriveType; label: string; icon: typeof Zap; color: string; accent: string }[] = [
  { id: "ev", label: "Electric (BEV)", icon: Zap, color: "#8B5CF6", accent: "#A78BFA" },
  { id: "ice", label: "Petrol (ICE)", icon: Flame, color: "#EF4444", accent: "#FCA5A5" },
  { id: "hybrid", label: "Hybrid (HEV)", icon: Sparkles, color: "#3B82F6", accent: "#93C5FD" },
  { id: "diesel", label: "Diesel", icon: Droplets, color: "#6B7280", accent: "#9CA3AF" },
];

const METRICS: { label: string; values: Record<DriveType, { value: number; display: string }> }[] = [
  { label: "Energy Efficiency", values: { ev: { value: 92, display: "92%" }, ice: { value: 25, display: "25%" }, hybrid: { value: 40, display: "40%" }, diesel: { value: 30, display: "30%" } } },
  { label: "Fuel Cost / 100km", values: { ev: { value: 15, display: "₹40" }, ice: { value: 85, display: "₹800" }, hybrid: { value: 55, display: "₹400" }, diesel: { value: 70, display: "₹600" } } },
  { label: "CO₂ Emissions (g/km)", values: { ev: { value: 5, display: "0g" }, ice: { value: 85, display: "180g" }, hybrid: { value: 50, display: "100g" }, diesel: { value: 75, display: "160g" } } },
  { label: "Maintenance Cost / Year", values: { ev: { value: 15, display: "₹5K" }, ice: { value: 80, display: "₹25K" }, hybrid: { value: 60, display: "₹18K" }, diesel: { value: 75, display: "₹22K" } } },
  { label: "Noise Level (dB)", values: { ev: { value: 10, display: "25dB" }, ice: { value: 70, display: "80dB" }, hybrid: { value: 45, display: "50dB" }, diesel: { value: 80, display: "90dB" } } },
  { label: "Torque Response", values: { ev: { value: 95, display: "Instant" }, ice: { value: 45, display: "2-3s" }, hybrid: { value: 70, display: "1-2s" }, diesel: { value: 55, display: "2-3s" } } },
];

export function EVComparison() {
  const [selected, setSelected] = useState<DriveType[]>(["ev", "ice"]);

  const toggle = (type: DriveType) => {
    if (selected.includes(type)) {
      if (selected.length > 1) setSelected(selected.filter((t) => t !== type));
    } else {
      setSelected([...selected, type]);
    }
  };

  return (
    <section id="comparison" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">EV vs ICE Comparison</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Compare performance, cost, and environmental impact across drivetrain types</p>
      </div>

      {/* Type selector pills */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = selected.includes(type.id);
          return (
            <button
              key={type.id}
              onClick={() => toggle(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all duration-300 border ${
                isActive
                  ? `bg-opacity-15 border-opacity-30 text-white`
                  : "bg-white/[0.02] border-white/5 text-[#AEB5C0]/50 hover:border-white/10"
              }`}
              style={
                isActive
                  ? { backgroundColor: `${type.color}15`, borderColor: `${type.color}40`, color: type.accent }
                  : undefined
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Comparison bars */}
      <div className="rounded-[20px] border border-white/5 bg-white/[0.02] overflow-hidden">
        {METRICS.map((metric, idx) => (
          <div key={metric.label} className={`p-5 ${idx < METRICS.length - 1 ? "border-b border-white/5" : ""}`}>
            <span className="text-[12px] font-bold text-[#AEB5C0]/50 uppercase tracking-wider block mb-3">{metric.label}</span>
            <div className="space-y-2.5">
              {selected.map((typeId) => {
                const type = TYPES.find((t) => t.id === typeId)!;
                const data = metric.values[typeId];
                return (
                  <div key={typeId} className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold w-16 shrink-0" style={{ color: type.accent }}>
                      {type.label.split(" ")[0]}
                    </span>
                    <div className="flex-1 h-5 rounded-full bg-white/5 overflow-hidden relative">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${data.value}%`, backgroundColor: type.color, opacity: 0.7 }}
                      />
                    </div>
                    <span className="text-[12px] font-bold text-white w-14 text-right">{data.display}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
