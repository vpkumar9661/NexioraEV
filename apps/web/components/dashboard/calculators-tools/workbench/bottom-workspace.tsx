"use client";

import React, { useState } from "react";
import { BrainCircuit, BookOpen, AlertTriangle } from "lucide-react";
import { WorkbenchSetup } from "./nav-components";

interface BottomWorkspaceProps {
  setup: WorkbenchSetup;
}

export function BottomWorkspace({ setup }: BottomWorkspaceProps) {
  const [selectedFormula, setSelectedFormula] = useState<string>("balancing");

  const balancingFormula = `Balancing Current (I_bal) = (V_cell_max - V_cell_min) / R_shunt`;
  const specificEnergy = `Specific Energy = Pack Energy (Wh) / Pack Mass (kg)`;

  return (
    <div className="grid md:grid-cols-12 gap-6 items-stretch relative z-25">
      
      {/* AI Engineering Copilot Left */}
      <div className="md:col-span-7 p-5 rounded-[24px] border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
        <div className="flex gap-2 items-center text-[#00C853]">
          <BrainCircuit className="w-5 h-5 animate-pulse" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-sans">AI Engineering Copilot</h3>
        </div>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3 bg-[#00C853]/5 border border-[#00C853]/15 rounded-xl">
            <div className="flex justify-between font-bold">
              <span className="text-white">Cooling optimization rating</span>
              <span className="text-[#00C853]">94% Confidence</span>
            </div>
            <p className="text-[#AEB5C0]/75 mt-1">
              * Sizing {setup.series}S cell series arrays under {setup.cooling} cooling thresholds. Liquid cooling is recommended to prevent hot spot decay spikes.
            </p>
          </div>

          <div className="p-3 bg-purple-500/5 border border-purple-500/15 rounded-xl">
            <div className="flex justify-between font-bold">
              <span className="text-white">Chemistry selection feedback</span>
              <span className="text-purple-300">89% Confidence</span>
            </div>
            <p className="text-[#AEB5C0]/75 mt-1">
              * Choosing {setup.chemistry.toUpperCase()} chemistry provides high energy densities but requires close temperature balance monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Formula Library Right */}
      <div className="md:col-span-5 p-5 rounded-[24px] border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-between gap-4">
        <div>
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">
            Formula Reference sheets
          </span>

          <div className="grid grid-cols-2 gap-1.5 mt-3 text-xs">
            <button
              onClick={() => setSelectedFormula("balancing")}
              className={`py-1 rounded font-bold border transition-colors cursor-pointer text-[10px] ${
                selectedFormula === "balancing"
                  ? "bg-[#00C853]/15 border-[#00C853]/35 text-[#00C853]"
                  : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
              }`}
            >
              Cell Balancing
            </button>
            <button
              onClick={() => setSelectedFormula("energy")}
              className={`py-1 rounded font-bold border transition-colors cursor-pointer text-[10px] ${
                selectedFormula === "energy"
                  ? "bg-[#00C853]/15 border-[#00C853]/35 text-[#00C853]"
                  : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
              }`}
            >
              Specific Energy
            </button>
          </div>
        </div>

        <div className="border border-white/5 p-3.5 rounded-xl bg-black/40 text-xs font-mono text-[#AEB5C0] min-h-[70px] flex items-center justify-center text-center leading-normal">
          {selectedFormula === "balancing" ? balancingFormula : specificEnergy}
        </div>
      </div>

    </div>
  );
}
