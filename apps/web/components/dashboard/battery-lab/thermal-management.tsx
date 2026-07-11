"use client";

import { useState } from "react";
import { Thermometer, Zap, AlertTriangle, Wind, Droplet, Layers } from "lucide-react";

type CoolingType = "air" | "liquid" | "pcm";

interface CoolingData {
  id: CoolingType;
  label: string;
  icon: typeof Wind;
  desc: string;
  efficiency: string;
  complexity: string;
  cost: string;
  color: string;
  accent: string;
}

const SYSTEMS: CoolingData[] = [
  { id: "air", label: "Forced Air Cooling", icon: Wind, desc: "Uses blowers to draw ambient or cabin air over module surfaces. Simple, lightweight, but exhibits poor thermal consistency across large battery pack setups.", efficiency: "Low-Moderate", complexity: "Minimal", cost: "Very Low", color: "#F59E0B", accent: "#FDE68A" },
  { id: "liquid", label: "Active Liquid Cooling", icon: Droplet, desc: "Circulates ethylene-glycol solution through cooling channels surrounding cell profiles. High thermal performance and uniform heat extraction.", efficiency: "Excellent", complexity: "High (Plumbing & Pumps)", cost: "High", color: "#3B82F6", accent: "#93C5FD" },
  { id: "pcm", label: "Phase Change Material", icon: Layers, desc: "Surrounds cells with wax/hydrocarbon compounds that melt at specific target limits, absorbing massive heat latent energy to regulate thermal runaway.", efficiency: "Outstanding", complexity: "Moderate (Passive)", cost: "Very High", color: "#10B981", accent: "#6EE7B7" }
];

export function ThermalManagement() {
  const [selectedSystem, setSelectedSystem] = useState<CoolingData>(SYSTEMS[1]!);

  return (
    <section id="thermal" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Thermal Management</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Compare thermal control configurations and observe cell heat distribution anomalies</p>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap gap-2">
        {SYSTEMS.map((sys) => {
          const Icon = sys.icon;
          const isActive = selectedSystem.id === sys.id;
          return (
            <button
              key={sys.id}
              onClick={() => setSelectedSystem(sys)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold border transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "bg-white/2 border-white/5 text-muted-foreground/50 hover:border-white/10"
              }`}
              style={
                isActive
                  ? { backgroundColor: `${sys.color}15`, borderColor: `${sys.color}40`, color: sys.accent }
                  : undefined
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {sys.label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Specs detail card */}
        <div className="lg:col-span-6 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-white">{selectedSystem.label} Parameters</h4>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{selectedSystem.desc}</p>
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/1 border border-white/5">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Heat Capture</span>
                <span className="text-xs font-bold text-white mt-1 block">{selectedSystem.efficiency}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/1 border border-white/5">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">System Complexity</span>
                <span className="text-xs font-bold text-white mt-1 block">{selectedSystem.complexity}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/1 border border-white/5">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Relative Cost</span>
                <span className="text-xs font-bold text-white mt-1 block">{selectedSystem.cost}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/1">
            <Thermometer className="w-5 h-5 text-[#3B82F6]" />
            <div>
              <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Thermal Gradient Delta</span>
              <span className="text-xs font-bold text-white mt-0.5 block">
                {selectedSystem.id === "liquid" ? "< 2°C Variance (Ideal)" : selectedSystem.id === "air" ? "> 8°C Variance (Critical hotspots)" : "Passive regulation"}
              </span>
            </div>
          </div>
        </div>

        {/* Heat Map SVG */}
        <div className="lg:col-span-6 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">Cell Module Heat Map Simulation</span>

          <div className="relative h-[180px] bg-[#131722]/50 border border-white/3 rounded-xl flex items-center justify-center p-4">
            <svg className="w-full h-full" viewBox="0 0 300 120">
              {/* Cooling channel flow indicator */}
              {selectedSystem.id === "liquid" && (
                <path d="M 10,105 H 290" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
                </path>
              )}

              {/* Cell modules array colored based on selected systems */}
              <g transform="translate(30, 20)">
                {/* Cell 1 */}
                <rect x="0" y="0" width="40" height="70" rx="8" fill={selectedSystem.id === "air" ? "url(#airHot)" : selectedSystem.id === "liquid" ? "url(#liquidCool)" : "url(#pcmMedium)"} stroke="white" strokeOpacity="0.05" />
                
                {/* Cell 2 */}
                <rect x="50" y="0" width="40" height="70" rx="8" fill={selectedSystem.id === "air" ? "url(#airHotCenter)" : selectedSystem.id === "liquid" ? "url(#liquidCool)" : "url(#pcmMedium)"} stroke="white" strokeOpacity="0.05" />
                
                {/* Cell 3 */}
                <rect x="100" y="0" width="40" height="70" rx="8" fill={selectedSystem.id === "air" ? "url(#airCritical)" : selectedSystem.id === "liquid" ? "url(#liquidCool)" : "url(#pcmMedium)"} stroke="white" strokeOpacity="0.05" />
                
                {/* Cell 4 */}
                <rect x="150" y="0" width="40" height="70" rx="8" fill={selectedSystem.id === "air" ? "url(#airHotCenter)" : selectedSystem.id === "liquid" ? "url(#liquidCool)" : "url(#pcmMedium)"} stroke="white" strokeOpacity="0.05" />

                {/* Cell 5 */}
                <rect x="200" y="0" width="40" height="70" rx="8" fill={selectedSystem.id === "air" ? "url(#airHot)" : selectedSystem.id === "liquid" ? "url(#liquidCool)" : "url(#pcmMedium)"} stroke="white" strokeOpacity="0.05" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="liquidCool" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
                </linearGradient>

                <linearGradient id="pcmMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                </linearGradient>

                <linearGradient id="airHot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
                </linearGradient>

                <linearGradient id="airHotCenter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="airCritical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
                  <stop offset="50%" stopColor="#EF4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground/40">
            <span>Cool (15°C)</span>
            <span>Ideal (25°C)</span>
            <span>Overheating (55°C)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
