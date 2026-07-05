"use client";

import React, { useState, useMemo } from "react";
import { 
  Zap, Compass, Sliders, Battery, Activity, ShieldCheck, 
  Settings, Layers, Cpu, Heart, Download 
} from "lucide-react";
import { WorkbenchSetup } from "./nav-components";

interface StudiosWorkspaceProps {
  setup: WorkbenchSetup;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function StudiosWorkspace({
  setup,
  activeTab,
  onTabChange
}: StudiosWorkspaceProps) {
  // 1. Calculations metrics shared between layouts
  const packVoltage = setup.series * 3.7;
  const totalAh = setup.parallel * 3.2;
  const capacityKwh = parseFloat(((packVoltage * totalAh) / 1000).toFixed(2));
  
  // Drag aerodynamics calculations
  const dragCoeff = setup.platform === "bus" || setup.platform === "truck" ? 0.35 : 0.24;
  const wltpRange = Math.round(capacityKwh * 5.8 * (1 - (dragCoeff - 0.2) * 1.5));

  // Charging planner outputs
  const [elecRate, setElecRate] = useState<number>(8); // ₹/kWh
  const monthlyCost = Math.round((wltpRange / 6) * elecRate * 3); // 3 fills per month estimate

  // Performance Lab
  const speed = setup.platform === "bus" || setup.platform === "truck" ? 110 : 210;

  return (
    <div className="flex-1 space-y-6 relative z-20">
      
      {/* Studio selectors Tabs */}
      <div className="flex flex-wrap border-b border-white/5 pb-2.5 gap-2 text-xs">
        {[
          { id: "battery", label: "Battery Design" },
          { id: "charging", label: "Charging Planner" },
          { id: "performance", label: "Performance Lab" },
          { id: "sustainability", label: "Sustainability" },
          { id: "report", label: "Report Gen" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-lg font-bold border transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#00C853]/15 border-[#00C853]/35 text-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.06)]"
                : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* active tab panels layout */}
      <div className="p-5 rounded-[24px] border border-white/5 bg-white/2 backdrop-blur-md min-h-[300px]">
        
        {/* Battery Design */}
        {activeTab === "battery" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Battery Pack Matrix Design</h3>
              <p className="text-xs text-[#AEB5C0]/50 mt-0.5">Cell series/parallel distributions visualizations.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Series Cells</span>
                <strong className="text-white block">{setup.series}S</strong>
              </div>
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Parallel Cells</span>
                <strong className="text-white block">{setup.parallel}P</strong>
              </div>
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Pack Energy</span>
                <strong className="text-[#00C853] block">{capacityKwh} kWh</strong>
              </div>
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Continuous Capacity</span>
                <strong className="text-white block">{totalAh} Ah</strong>
              </div>
            </div>

            {/* Matrix Visual */}
            <div className="border border-white/5 rounded-xl bg-black/40 p-4 flex flex-col justify-center min-h-[120px]">
              <span className="text-[9px] font-bold text-[#AEB5C0]/40 uppercase tracking-widest block mb-3">Series-Parallel configuration board</span>
              <svg viewBox="-80 -30 160 60" className="w-full max-w-[180px] mx-auto overflow-visible">
                {/* Visual rendering cells blocks */}
                <rect x="-45" y="-12" width="22" height="24" rx="2" fill="rgba(0,200,83,0.15)" stroke="#00C853" strokeWidth="0.8" />
                <rect x="-15" y="-12" width="22" height="24" rx="2" fill="rgba(0,200,83,0.15)" stroke="#00C853" strokeWidth="0.8" />
                <rect x="15" y="-12" width="22" height="24" rx="2" fill="rgba(0,200,83,0.15)" stroke="#00C853" strokeWidth="0.8" />
                {/* Dots indicating parallel arrays */}
                <circle cx="-34" cy="0" r="1.5" fill="white" />
                <circle cx="-4" cy="0" r="1.5" fill="white" />
                <circle cx="26" cy="0" r="1.5" fill="white" />
              </svg>
            </div>
          </div>
        )}

        {/* Charging Planner */}
        {activeTab === "charging" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Charging Cost & Planner</h3>
              <p className="text-xs text-[#AEB5C0]/50 mt-0.5">Estimate charging budget offsets compared to petrol equivalents.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Home Electricity Rate</span>
                <input
                  type="number"
                  value={elecRate}
                  onChange={(e) => setElecRate(parseFloat(e.target.value) || 0)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#00C853] w-full"
                />
              </div>

              <div className="p-5 rounded-xl border border-white/5 bg-black/40 space-y-4">
                <span className="text-[9.5px] font-bold text-[#AEB5C0]/40 uppercase tracking-widest block border-b border-white/5 pb-2">Estimated charging cost bills</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Monthly Charge bill</span>
                    <strong className="text-sm text-white block mt-0.5">₹{monthlyCost}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Annual Petrol savings</span>
                    <strong className="text-sm text-[#00C853] block mt-0.5">₹{Math.round(monthlyCost * 4.2 * 12)} saved</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Lab */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Vehicle Performance & Speed estimations</h3>
              <p className="text-xs text-[#AEB5C0]/50 mt-0.5">Observe estimated speed bounds and drag reduction ranges.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Top Speed</span>
                <strong className="text-white block">{speed} km/h</strong>
              </div>
              <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Estimated Drag Coefficient</span>
                <strong className="text-white block">{dragCoeff} Cd</strong>
              </div>
            </div>
          </div>
        )}

        {/* Sustainability */}
        {activeTab === "sustainability" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Sustainability Analyzer</h3>
              <p className="text-xs text-[#AEB5C0]/50 mt-0.5">Calculate tailpipe emissions reductions indexes.</p>
            </div>

            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs rounded-xl">
              * Pine-tree equivalence: Sizing a carbon offsets rate of 120g CO₂/km against 1000 km monthly travel matches planting ~42 trees annually.
            </div>
          </div>
        )}

        {/* Report Generator */}
        {activeTab === "report" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Engineering Report Generator</h3>
                <p className="text-xs text-[#AEB5C0]/50 mt-0.5">Compile configurator parameters to export technical reports.</p>
              </div>
              <button
                onClick={() => alert("Initiating Workbench compiled specifications exports...")}
                className="px-3 py-1.5 rounded-lg bg-[#00C853] text-[#07090e] font-black text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>

            <div className="border border-white/5 p-4 rounded-xl bg-black/40 text-xs font-mono space-y-1 text-[#AEB5C0]">
              <span className="text-[#00C853] font-bold block mb-1">&gt;&gt; NexioraEV compiled diagnostics reports:</span>
              <div>* Platform: {setup.platform.toUpperCase()}</div>
              <div>* Battery: {setup.chemistry.toUpperCase()} ({capacityKwh} kWh energy)</div>
              <div>* Config: {setup.series}S series cells - {setup.parallel}P parallel arrays</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
export type { StudiosWorkspaceProps };
