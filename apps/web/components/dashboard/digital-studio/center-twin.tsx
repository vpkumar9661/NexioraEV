"use client";

import React, { useState } from "react";
import { 
  RotateCw, ZoomIn, ZoomOut, Layers, EyeOff, Tag, Info 
} from "lucide-react";
import { motion } from "framer-motion";

interface CenterTwinProps {
  platform: string;
  chemistry: string;
  motor: string;
  cooling: string;
  suspension: string;
}

interface ComponentTwinDetail {
  id: string;
  name: string;
  color: string;
  material: string;
  specs: string;
}

const COMPONENT_DETAILS: Record<string, ComponentTwinDetail> = {
  shell: { id: "shell", name: "Outlined Body Frame", color: "#6B7280", material: "Extruded Aluminium 6000-series alloy", specs: "Laser-welded aerodynamic profile structure" },
  battery: { id: "battery", name: "High Voltage Battery Module", color: "#8B5CF6", material: "LFP / NMC Prismatic stack cell blocks", specs: "Integrated pack with thermal structural adhesive coatings" },
  motor: { id: "motor", name: "Traction Motor Assembly", color: "#22D3EE", material: "Copper stator winding, Neodymium rotor core", specs: "3-phase brushless synchronization linkage" },
  cooling: { id: "cooling", name: "Active Heat-Exchanger Plates", color: "#3B82F6", material: "Ethylene-glycol pump water jackets", specs: "Preheats cells at -10°C, cools modules at 45°C limits" },
  brakes: { id: "brakes", name: "Regenerative Caliper disc", color: "#EF4444", material: "Carbon-ceramic composite discs", specs: "Synchronized ABS kinetic feedback coils" }
};

export function CenterTwin({
  platform,
  chemistry,
  motor,
  cooling,
  suspension
}: CenterTwinProps) {
  const [explode, setExplode] = useState<boolean>(false);
  const [crossSection, setCrossSection] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [selectedPart, setSelectedPart] = useState<ComponentTwinDetail>(COMPONENT_DETAILS.battery!);
  const [rotation, setRotation] = useState<number>(30); // angle in degrees

  const rotateLeft = () => setRotation((r) => r - 15);
  const rotateRight = () => setRotation((r) => r + 15);

  return (
    <div className="flex-1 rounded-[24px] border border-white/5 bg-black/40 p-6 flex flex-col justify-between min-h-[420px] relative">
      {/* Blueprint Grid background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[15px_15px] pointer-events-none rounded-[24px]" />
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block">3D Engineering Configurator</span>
        <h3 className="text-xs font-bold text-white uppercase mt-0.5">{platform} Platform Digital Twin</h3>
      </div>

      {/* Control buttons toolbar */}
      <div className="absolute top-4 right-4 z-10 flex gap-1.5 flex-wrap">
        <button
          onClick={rotateLeft}
          title="Rotate Left"
          className="p-1.5 rounded-lg border border-white/5 bg-white/2 text-[#AEB5C0]/60 hover:text-white hover:bg-white/5 cursor-pointer"
        >
          <RotateCw className="w-4 h-4 -scale-x-100" />
        </button>
        <button
          onClick={rotateRight}
          title="Rotate Right"
          className="p-1.5 rounded-lg border border-white/5 bg-white/2 text-[#AEB5C0]/60 hover:text-white hover:bg-white/5 cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setExplode(!explode)}
          className={`px-3 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
            explode
              ? "bg-[#22D3EE]/25 border-[#22D3EE]/40 text-cyan-300"
              : "border-white/5 bg-white/2 text-[#AEB5C0]/65 hover:text-white"
          }`}
        >
          Explode
        </button>
        <button
          onClick={() => setCrossSection(!crossSection)}
          className={`px-3 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
            crossSection
              ? "bg-purple-500/25 border-purple-500/40 text-purple-300"
              : "border-white/5 bg-white/2 text-[#AEB5C0]/65 hover:text-white"
          }`}
        >
          Cross-Sec
        </button>
        <button
          onClick={() => setShowLabels(!showLabels)}
          title="Toggle Component Labels"
          className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
            showLabels
              ? "bg-white/5 border-white/10 text-white"
              : "border-white/5 bg-white/2 text-[#AEB5C0]/50"
          }`}
        >
          <Tag className="w-4 h-4" />
        </button>
      </div>

      {/* Center assembly viewer viewport */}
      <div className="flex-1 flex items-center justify-center relative py-12">
        <motion.g
          animate={{ rotate: rotation }}
          className="origin-center"
          transition={{ type: "spring", stiffness: 60 }}
        >
          <svg viewBox="-120 -80 240 160" className="w-full max-w-[340px] aspect-square overflow-visible">
            {/* Ambient chassis boundary (outer casing shell) */}
            <motion.path
              d="M -75,-25 Q 0,-60 75,-25 L 85,15 L -85,15 Z"
              fill="none"
              stroke="#6B7280"
              strokeWidth={selectedPart.id === "shell" ? 2 : 0.8}
              strokeDasharray="4 4"
              animate={{ y: explode ? -55 : 0 }}
              onClick={() => setSelectedPart(COMPONENT_DETAILS.shell!)}
              className="cursor-pointer transition-all"
              opacity={explode ? 0.3 : 0.8}
            />
            {showLabels && explode && (
              <motion.g animate={{ y: explode ? -55 : 0 }} opacity={explode ? 1 : 0}>
                <line x1="75" y1="-25" x2="105" y2="-45" stroke="#6B7280" strokeWidth="0.5" />
                <text x="108" y="-45" fill="#AEB5C0" fontSize="5" fontWeight="bold" textAnchor="start">
                  OUTLINED BODY SHELL
                </text>
              </motion.g>
            )}

            {/* Inverter Stator Engine blocks (middle layer) */}
            <motion.g
              animate={{ y: explode ? -15 : 0 }}
              onClick={() => setSelectedPart(COMPONENT_DETAILS.motor!)}
              className="cursor-pointer"
            >
              {/* Traction engine cylinder */}
              <rect x="-53" y="-8" width="22" height="18" rx="4" fill="#132732" stroke="#22D3EE" strokeWidth={selectedPart.id === "motor" ? 2 : 0.8} />
              {/* Inside stator windings */}
              {crossSection && (
                <circle cx="-42" cy="1" r="5" fill="#D97706" opacity="0.65" />
              )}
            </motion.g>
            {showLabels && explode && (
              <motion.g animate={{ y: explode ? -15 : 0 }} opacity={explode ? 1 : 0}>
                <line x1="-53" y1="-8" x2="-80" y2="-25" stroke="#22D3EE" strokeWidth="0.5" />
                <text x="-83" y="-25" fill="#22D3EE" fontSize="5" fontWeight="bold" textAnchor="end">
                  PMSM ENGINE & CONTROLLERS
                </text>
              </motion.g>
            )}

            {/* Battery array compartment blocks (bottom layer) */}
            <motion.g
              animate={{ y: explode ? 25 : 0 }}
              onClick={() => setSelectedPart(COMPONENT_DETAILS.battery!)}
              className="cursor-pointer"
            >
              <rect x="-60" y="15" width="120" height="12" rx="4" fill="#1F1235" stroke="#8B5CF6" strokeWidth={selectedPart.id === "battery" ? 2 : 0.8} />
              
              {/* Cross-section details Jelly rolls cells */}
              {crossSection && (
                <g>
                  <circle cx="-40" cy="21" r="2.5" fill="#C084FC" />
                  <circle cx="-15" cy="21" r="2.5" fill="#C084FC" />
                  <circle cx="15" cy="21" r="2.5" fill="#C084FC" />
                  <circle cx="40" cy="21" r="2.5" fill="#C084FC" />
                </g>
              )}
            </motion.g>
            {showLabels && explode && (
              <motion.g animate={{ y: explode ? 25 : 0 }} opacity={explode ? 1 : 0}>
                <line x1="60" y1="21" x2="85" y2="35" stroke="#8B5CF6" strokeWidth="0.5" />
                <text x="88" y="35" fill="#C084FC" fontSize="5" fontWeight="bold" textAnchor="start">
                  HV CELL CASE MATRIX
                </text>
              </motion.g>
            )}
          </svg>
        </motion.g>
      </div>

      {/* Component telemetry detail cards bottom */}
      <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/85 backdrop-blur-md space-y-2 z-10">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: selectedPart.color }} />
          <h4 className="text-xs font-black text-white uppercase tracking-wider">{selectedPart.name}</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-[11px] leading-relaxed">
          <div>
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Structural Materials</span>
            <p className="text-white font-bold">{selectedPart.material}</p>
          </div>
          <div>
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Diagnostics Specifications</span>
            <p className="text-[#AEB5C0]/85">{selectedPart.specs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
