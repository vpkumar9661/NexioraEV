"use client";

import React, { useState, useMemo } from "react";
import { 
  BrainCircuit, ShieldAlert, Award, FileDown, 
  Layers, CheckCircle2, ChevronRight 
} from "lucide-react";

interface AIReportsProps {
  config: {
    platform: string;
    chemistry: string;
    capacity: number;
    motor: string;
    cooling: string;
    suspension: string;
  };
  telemetry: {
    range: number;
    weight: number;
    cg: string;
  };
  onExport: () => void;
}

export function AIReports({ config, telemetry, onExport }: AIReportsProps) {
  const ratings = useMemo(() => {
    let perf = 85;
    let eff = 88;
    let cost = 75;
    let safety = 90;

    if (config.chemistry === "lfp") {
      cost = 92; // LFP is cheap
      safety = 96; // LFP is safe
      perf = 78; // LFP is less energy dense
    }
    if (config.motor === "induction") {
      perf = 82;
      eff = 82;
    }
    if (config.platform === "bus" || config.platform === "truck") {
      eff = 70;
      perf = 65;
    }

    return { perf, eff, cost, safety };
  }, [config]);

  return (
    <div className="w-full space-y-6 relative z-20">
      
      {/* AI Engineering Evaluation scores */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Scores & Text summary */}
        <div className="md:col-span-8 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
            <BrainCircuit className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest block">AI Engineering Specialist</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[8.5px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Performance</span>
              <strong className="text-white block mt-1">{ratings.perf} / 100</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[8.5px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Efficiency</span>
              <strong className="text-cyan-300 block mt-1">{ratings.eff} / 100</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[8.5px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Cost Rating</span>
              <strong className="text-white block mt-1">{ratings.cost} / 100</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[8.5px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Safety index</span>
              <strong className="text-[#10B981] block mt-1">{ratings.safety} / 100</strong>
            </div>
          </div>

          <div className="p-4 bg-white/1 rounded-xl border border-white/5 space-y-2 text-xs leading-relaxed text-[#AEB5C0]/85">
            <p>
              * Your <strong>{config.platform.toUpperCase()}</strong> uses a <strong>{config.chemistry.toUpperCase()}</strong> battery module with {config.cooling} loop cooling and {config.motor.toUpperCase()} drive linkage.
            </p>
            <p>
              * Expected Range: <strong>{telemetry.range} km</strong>. Estimated cost: <strong>{config.chemistry === "lfp" ? "Low-to-Medium cost" : "High premium cost"}</strong>. expected lifespan: <strong>12 to 15 years</strong> continuous grid usage.
            </p>
            <p>
              * Suggested upgrades: 
              {config.chemistry === "nmc" && " Switch to LFP chemistry for lower production pricing limits if range constraints permit."}
              {config.chemistry === "lfp" && " Switch to Solid State cells for high speed highway performance ranges."}
            </p>
          </div>
        </div>

        {/* Branded Reports export panel */}
        <div className="md:col-span-4 p-5 rounded-[20px] border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-between gap-4">
          <div>
            <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest block border-b border-white/5 pb-2">Technical Reports HUD</span>
            <p className="text-[11.5px] text-[#AEB5C0]/65 mt-2.5 leading-relaxed">
              Export CAD configurations specifications summaries, structural lists, cost bounds analysis, and efficiency charts.
            </p>
          </div>

          <button
            onClick={onExport}
            className="w-full py-2.5 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 hover:bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
          >
            <FileDown className="w-4 h-4" />
            Generate Summary PDF
          </button>
        </div>
      </div>

      {/* Comparison table configurations matrices */}
      <div className="p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-4">
        <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest block border-b border-white/5 pb-2">Active Designs Matrix</span>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5 text-[#AEB5C0]/40 text-[9px] uppercase font-bold tracking-wider">
                <th className="pb-3">Design Version</th>
                <th className="pb-3">Platform</th>
                <th className="pb-3">Chemistry</th>
                <th className="pb-3">Capacity</th>
                <th className="pb-3">Motor Link</th>
                <th className="pb-3">Range Target</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-white/90">
              <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="py-3 font-bold text-cyan-300">Design v1 (Active)</td>
                <td className="py-3 uppercase">{config.platform}</td>
                <td className="py-3 uppercase">{config.chemistry}</td>
                <td className="py-3">{config.capacity} kWh</td>
                <td className="py-3 uppercase">{config.motor}</td>
                <td className="py-3">{telemetry.range} km</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/2 transition-colors opacity-50">
                <td className="py-3 font-bold text-purple-300">Design v0 (Archived)</td>
                <td className="py-3">SEDAN</td>
                <td className="py-3">LFP</td>
                <td className="py-3">60 kWh</td>
                <td className="py-3">PMSM</td>
                <td className="py-3">380 km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
