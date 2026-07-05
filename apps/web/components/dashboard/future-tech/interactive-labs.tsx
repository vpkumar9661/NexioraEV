"use client";

import React, { useState, useMemo } from "react";
import { 
  Zap, Info, Sparkles, AlertTriangle, ShieldCheck, 
  Map, Activity, Layers, Cpu, Eye, EyeOff 
} from "lucide-react";
import { motion } from "framer-motion";

// ==========================================
// SOLID-STATE BATTERY LAB
// ==========================================

export function SolidStateBatteryCenter() {
  const [chem, setChem] = useState<"li" | "solid">("solid");

  return (
    <section id="solidstate" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Solid-State Battery Center</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Compare parameters of traditional liquid electrolyte cells against solid-state ceramic modules.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Toggle & Graph Visual */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between gap-5 min-h-[200px]">
          <div className="space-y-1">
            <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest block">Choose Battery Type</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setChem("li")}
                className={`py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                  chem === "li"
                    ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                    : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                }`}
              >
                Liquid Li-Ion
              </button>
              <button
                onClick={() => setChem("solid")}
                className={`py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                  chem === "solid"
                    ? "bg-[#22D3EE]/25 border-[#22D3EE]/40 text-cyan-300"
                    : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                }`}
              >
                Solid-State (Ceramic)
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -40 160 80" className="w-full max-w-[150px] aspect-square overflow-visible">
              {/* Outer shell cell */}
              <rect x="-50" y="-20" width="100" height="40" rx="3" fill="#131722" stroke="rgba(255,255,255,0.06)" />
              <rect x="-46" y="-16" width="92" height="32" rx="2" fill="#0F172A" />

              {/* Anode & Cathode plates */}
              <rect x="-42" y="-12" width="10" height="24" fill="#10B981" />
              <rect x="32" y="-12" width="10" height="24" fill="#3B82F6" />

              {/* Electrolyte separator block */}
              {chem === "li" ? (
                <rect x="-26" y="-12" width="52" height="24" fill="rgba(168,85,247,0.15)" stroke="#A855F7" strokeWidth="0.5" />
              ) : (
                <rect x="-26" y="-12" width="52" height="24" fill="rgba(34,211,238,0.25)" stroke="#22D3EE" strokeWidth="1.2" className="animate-pulse" />
              )}
            </svg>
          </div>
        </div>

        {/* Readout panel specs */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <span className="text-xs font-extrabold text-white uppercase border-b border-white/5 pb-2.5 block">
            {chem === "li" ? "Liquid Lithium-Ion Spec" : "Solid-State Specification"}
          </span>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Energy Density Target</span>
              <strong className="text-xs text-white block mt-1">
                {chem === "li" ? "250 - 280 Wh/kg" : "450 - 500+ Wh/kg"}
              </strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Thermal Runaway Risk</span>
              <strong className="text-xs text-white block mt-1">
                {chem === "li" ? "High (Liquid Flammable)" : "Zero (Solid Inert Ceramic)"}
              </strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">10-80% Fast Charge</span>
              <strong className="text-xs text-white block mt-1">
                {chem === "li" ? "25 - 35 minutes" : "8 - 12 minutes"}
              </strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Cycle Life Sizing</span>
              <strong className="text-xs text-[#22D3EE] block mt-1">
                {chem === "li" ? "1,500 Cycles" : "4,000+ Cycles (Extended)"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// HYDROGEN LAB
// ==========================================

export function HydrogenLab() {
  return (
    <section id="hydrogen" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Hydrogen Fuel Cell Lab</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Explore hydrogen electricity production structures, step down valves, and air intake converters.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-purple-400">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">700-Bar Storage Tanks</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            Hydrogen is compressed and stored in carbon-fiber reinforced tanks. Pressure valves step down the hydrogen before feeding it into the membrane stacks.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-purple-400">
            <Zap className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Proton Exchange Membrane (PEM)</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            Combines hydrogen with oxygen from the air. Passing through a PEM membrane strips electrons, producing electricity and water emissions.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// WIRELESS CHARGING LAB
// ==========================================

export function WirelessChargingLab() {
  const [alignment, setAlignment] = useState<number>(0); // 0 is aligned, higher is misaligned

  const efficiency = useMemo(() => {
    // 92% max, decreases with misalignment
    return Math.max(45, 92 - Math.round(alignment * 4.2));
  }, [alignment]);

  return (
    <section id="wireless" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Dynamic Wireless Charging</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Observe magnetic field lines coupling adjustments relative to pad alignments.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* SVG coil visualization */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Induction magnetic flux alignment HUD</span>

          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -50 160 100" className="w-full max-w-[180px] aspect-square overflow-visible">
              
              {/* Primary coil pad (ground) */}
              <rect x="-40" y="25" width="80" height="10" rx="2" fill="#131722" stroke="rgba(255,255,255,0.06)" />
              <rect x="-35" y="28" width="70" height="4" fill="#3F3F46" />

              {/* Secondary receiver pad (vehicle) moves based on alignment */}
              <motion.g animate={{ x: alignment * 3 }}>
                <rect x="-40" y="-35" width="80" height="10" rx="2" fill="#131722" stroke="#22D3EE" strokeWidth="0.8" />
                <rect x="-35" y="-32" width="70" height="4" fill="#0891B2" />
              </motion.g>

              {/* Coupling magnetic flux curves */}
              {alignment < 5 && (
                <path
                  d="M -20,20 Q 0,-10 -20,-20 M 0,20 Q 15,-10 0,-20 M 20,20 Q 30,-10 20,-20"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="animate-pulse"
                  opacity={1 - alignment * 0.1}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Sliders and specs */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          <div className="p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-[10px]">
                <span className="text-[#AEB5C0]/40 uppercase tracking-wider">Pad Offset Misalignment</span>
                <span className="text-white">{alignment} cm</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={alignment}
                onChange={(e) => setAlignment(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Transfer Efficiency</span>
                <strong className="text-sm text-cyan-300 block mt-0.5">{efficiency}%</strong>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Coupling status</span>
                <strong className={`text-xs block mt-0.5 ${alignment > 6 ? "text-red-400" : "text-[#10B981]"}`}>
                  {alignment > 6 ? "Weak Coupling" : "Stable Phase link"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// AUTONOMOUS DRIVING PERCEPTION LAB
// ==========================================

export function AutonomousDrivingLab() {
  const [activeSensor, setActiveSensor] = useState<"lidar" | "radar" | "camera">("lidar");

  return (
    <section id="autonomous" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Autonomous Perception Lab</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Toggle sensor suites scans overlay to examine Lidar vector sweeps and Radar target tracking.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* SVG scan window left */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block mb-2">Sensor fusion coordinate tracking HUD</span>

          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -50 160 100" className="w-full max-w-[200px] aspect-square overflow-visible">
              {/* Proving road path */}
              <line x1="-50" y1="35" x2="0" y2="-35" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              
              {/* Target obstacles */}
              <circle cx="-10" cy="-10" r="5" fill="#EF4444" />
              
              {activeSensor === "lidar" && (
                // Sweeping lines
                <path d="M -80,45 L -10,-10 M -80,45 L -25,10 M -80,45 L 20,10" stroke="#22D3EE" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />
              )}
              {activeSensor === "radar" && (
                // Radar rings
                <g>
                  <circle cx="-80" cy="45" r="30" fill="none" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="-80" cy="45" r="60" fill="none" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="3 3" />
                </g>
              )}
              {activeSensor === "camera" && (
                // Target tracking boxes
                <rect x="-18" y="-18" width="16" height="16" fill="none" stroke="#10B981" strokeWidth="0.8" />
              )}
              
              {/* Main vehicle tracker */}
              <circle cx="-80" cy="45" r="7" fill="#131722" stroke="white" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Buttons and diagnostics right */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Active perception sensor</span>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {[
                { id: "lidar", label: "LiDAR Sweep" },
                { id: "radar", label: "Radar range" },
                { id: "camera", label: "Vision cam" }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSensor(s.id as any)}
                  className={`py-1.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                    activeSensor === s.id
                      ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-300"
                      : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#AEB5C0]/70 leading-relaxed bg-white/1 p-3 rounded-xl border border-white/5">
            {activeSensor === "lidar" && "LiDAR pulses infrared lasers to map three-dimensional space with millimetric accuracy, defining obstacle boundaries."}
            {activeSensor === "radar" && "Radar shoots radio waves to measure the speed and distance of target obstacles. Performs reliably under heavy fog or rain."}
            {activeSensor === "camera" && "Optical high-definition cameras capture visual data. AI computer engines analyze visual frames to read road signs and lanes."}
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SMART CITY EXPLORER
// ==========================================

export function SmartCityExplorer() {
  const [solarRoads, setSolarRoads] = useState<boolean>(true);
  const [v2gActive, setV2gActive] = useState<boolean>(false);

  return (
    <section id="smartcity" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Smart City Infrastructure</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Toggle solar road generation grids and V2G energy offsets to analyze grid loads.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Smart city microgrid distribution map</span>

          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -50 160 100" className="w-full h-full max-h-[150px] overflow-visible">
              {/* Solar panels grid */}
              <polygon points="-50,-20 -20,-30 0,-15 -30,-5" fill={solarRoads ? "rgba(34,211,238,0.15)" : "transparent"} stroke="#22D3EE" strokeWidth="0.8" />
              
              {/* Direct flow paths */}
              <line x1="-30" y1="-15" x2="20" y2="10" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              
              {/* Bidirectional V2G houses */}
              <polygon points="20,10 45,0 60,15 35,25" fill={v2gActive ? "rgba(16,185,129,0.15)" : "transparent"} stroke="#10B981" strokeWidth="0.8" />
              
              {/* Pulse flows */}
              {solarRoads && (
                <circle cx="-30" cy="-15" r="2" fill="#22D3EE" className="animate-ping" />
              )}
              {v2gActive && (
                <circle cx="37" cy="18" r="2.5" fill="#10B981" className="animate-bounce" />
              )}
            </svg>
          </div>
        </div>

        {/* Selectors and stats */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Active grid components</span>
            
            <div className="space-y-2">
              <button
                onClick={() => setSolarRoads(!solarRoads)}
                className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex justify-between items-center ${
                  solarRoads
                    ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-300"
                    : "bg-white/2 border-white/5 text-[#AEB5C0]"
                }`}
              >
                <span>Solar Road Tiles</span>
                <span className="text-[9px] font-extrabold uppercase">{solarRoads ? "Active Generation" : "Offline"}</span>
              </button>

              <button
                onClick={() => setV2gActive(!v2gActive)}
                className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex justify-between items-center ${
                  v2gActive
                    ? "bg-[#10B981]/15 border-[#10B981]/30 text-emerald-300"
                    : "bg-white/2 border-white/5 text-[#AEB5C0]"
                }`}
              >
                <span>V2G Bidirectional</span>
                <span className="text-[9px] font-extrabold uppercase">{v2gActive ? "Power Feed Active" : "Standby"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// V2G & V2H LAB
// ==========================================

export function V2G_V2H_Lab() {
  return (
    <section id="v2g" className="space-y-6 border-t border-white/5 pt-6">
      <div>
        <h2 className="text-xl font-black text-white">Bidirectional Power Loop (V2G & V2H)</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Explore standard bidirectional power paths and local battery setups.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-purple-400">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Vehicle-to-Home (V2H)</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            Enables using the EV's traction battery to power auxiliary home appliances. Acts as an emergency backup generator during grid blackouts.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-purple-400">
            <Activity className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Vehicle-to-Grid (V2G)</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            Feeds battery power back to the municipal grid during high load peaks (e.g. late afternoon/evening), stabilizing grid frequencies and generating revenue for EV owners.
          </p>
        </div>
      </div>
    </section>
  );
}
