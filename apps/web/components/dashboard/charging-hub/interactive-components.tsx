"use client";

import React, { useState, useMemo } from "react";
import { 
  Zap, Info, Globe, AlertTriangle, ShieldCheck, 
  Terminal, ShieldAlert, Layers, Activity 
} from "lucide-react";
import { motion } from "framer-motion";

// ==========================================
// CHARGING STANDARDS COMPARISON
// ==========================================

interface StandardDetails {
  id: string;
  name: string;
  power: number; // max kW
  voltage: string;
  current: string;
  regions: string;
  pros: string;
  cons: string;
}

const STANDARDS_LIST: StandardDetails[] = [
  { id: "type1", name: "Type 1 (J1772)", power: 19.2, voltage: "120V - 240V AC", current: "Up to 80A", regions: "North America, Japan", pros: "Simple single-phase home charging baseline.", cons: "Does not support three-phase AC configurations." },
  { id: "type2", name: "Type 2 (Mennekes)", power: 43, voltage: "400V AC Three-Phase", current: "Up to 63A", regions: "Europe, UK, India", pros: "Supports three-phase grid, very common standard.", cons: "AC only; separate DC ports needed (CCS)." },
  { id: "ccs1", name: "CCS Combo 1", power: 350, voltage: "200V - 1000V DC", current: "Up to 500A", regions: "North America", pros: "Direct DC addition beneath Type 1 AC entry.", cons: "Extremely heavy and bulky connector frame." },
  { id: "ccs2", name: "CCS Combo 2", power: 350, voltage: "200V - 1000V DC", current: "Up to 500A", regions: "Europe, India, Australia", pros: "Global fast DC standard, high compatibility.", cons: "Large connector footprint requires vehicle inlet space." },
  { id: "chademo", name: "CHAdeMO", power: 400, voltage: "50V - 1000V DC", current: "Up to 400A", regions: "Japan (Global legacy)", pros: "Bidirectional charging V2G integrated natively.", cons: "Separate port required; phased out in western markets." },
  { id: "gbt", name: "GB/T Standard", power: 900, voltage: "Up to 1500V DC", current: "Up to 600A", regions: "China", pros: "Extremely high power potential under new ChaoJi protocol.", cons: "Separate AC and DC physical connector slots required." },
  { id: "nacs", name: "NACS (SAE J3400)", power: 350, voltage: "Up to 1000V DC / AC", current: "Up to 500A", regions: "North America", pros: "Ultra-compact single-plug handling both AC and DC.", cons: "Third-party adapters required on legacy vehicles." }
];

export function ChargingStandards() {
  const [selectedStd, setSelectedStd] = useState<StandardDetails>(STANDARDS_LIST[3]!); // default CCS2

  return (
    <section id="standards" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Charging Standards Comparison</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Analyze global connector capacities, maximum voltages, and regional grids.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Selector & Chart */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between gap-5">
          <div className="space-y-1">
            <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest block">Choose Standard</span>
            <select
              value={selectedStd.id}
              onChange={(e) => setSelectedStd(STANDARDS_LIST.find((s) => s.id === e.target.value)!)}
              className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {STANDARDS_LIST.map((std) => (
                <option key={std.id} value={std.id}>{std.name}</option>
              ))}
            </select>
          </div>

          {/* SVG Power Comparison bar chart */}
          <div className="space-y-2">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Max Power Limit (kW)</span>
            <svg viewBox="0 0 200 110" className="w-full overflow-visible">
              {STANDARDS_LIST.map((std, idx) => {
                const barWidth = (std.power / 900) * 135;
                const isSelected = std.id === selectedStd.id;
                return (
                  <g key={std.id} className="cursor-pointer" onClick={() => setSelectedStd(std)}>
                    <text x="5" y={idx * 14 + 10} fill={isSelected ? "#22D3EE" : "rgba(255,255,255,0.4)"} fontSize="7" fontWeight={isSelected ? "bold" : "normal"}>
                      {std.id.toUpperCase()}
                    </text>
                    <rect x="45" y={idx * 14 + 3} width="135" height="8" rx="2" fill="rgba(255,255,255,0.03)" />
                    <rect
                      x="45"
                      y={idx * 14 + 3}
                      width={barWidth}
                      height="8"
                      rx="2"
                      fill={isSelected ? "#22D3EE" : "rgba(168,85,247,0.4)"}
                      style={{ filter: isSelected ? "drop-shadow(0 0 5px #22D3EE40)" : "none" }}
                    />
                    <text x={barWidth + 50} y={idx * 14 + 10} fill="rgba(255,255,255,0.5)" fontSize="6">
                      {std.power} kW
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Spec readout details */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <span className="text-sm font-extrabold text-white uppercase">{selectedStd.name} Specification</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Max Power Output</span>
              <strong className="text-sm text-[#22D3EE] mt-0.5 block">{selectedStd.power} kW</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Voltage Range</span>
              <strong className="text-xs text-white mt-0.5 block">{selectedStd.voltage}</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Current Threshold</span>
              <strong className="text-xs text-white mt-0.5 block">{selectedStd.current}</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Regional Grid Deployment</span>
              <strong className="text-xs text-white mt-0.5 block">{selectedStd.regions}</strong>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 border-t border-white/5 pt-4 text-[11px] leading-relaxed">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block mb-1">Key Advantage</span>
              <p className="text-[#AEB5C0]">{selectedStd.pros}</p>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block mb-1">Grid Challenge</span>
              <p className="text-[#AEB5C0]">{selectedStd.cons}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// INTERACTIVE CHARGING STATION
// ==========================================

interface StationPart {
  id: string;
  name: string;
  purpose: string;
  material: string;
  glowColor: string;
}

const STATION_PARTS: StationPart[] = [
  { id: "screen", name: "Touch Screen Interface", purpose: "Displays user billing, real-time SoC status, power throttling levels, and diagnostics.", material: "Antireflective tempered glass, IP66 touch membrane.", glowColor: "#22D3EE" },
  { id: "cable", name: "Liquid-Cooled Cable Bundle", purpose: "Conveys high charging currents (up to 500A) without overheating cable insulation.", material: "Pure copper conductors with active ethylene-glycol coolant sleeve.", glowColor: "#10B981" },
  { id: "connector", name: "High-Voltage Plug Pinout", purpose: "Secure cellular lock coupling mating the charger with the vehicle inlet socket.", material: "Nickel-plated silver contacts, high-temperature PBT insulator housing.", glowColor: "#C084FC" },
  { id: "cooling", name: "Thermal Dissipation Radiators", purpose: "Cools the power converter modules during high-load continuous conversion cycles.", material: "Aluminium fins, dual brushless high-pressure cooling fans.", glowColor: "#3B82F6" },
  { id: "inverter", name: "Silicon Carbide Power Module", purpose: "Rectifies incoming three-phase AC grid energy to highly regulated DC power.", material: "SiC high-frequency MOSFET switches, copper heat sinks.", glowColor: "#F59E0B" },
  { id: "transformer", name: "Grid Isolation Transformer", purpose: "Steps down high grid distribution voltages and isolates the charger circuitry.", material: "Silicon steel core, copper windings, dielectric oil cooling tank.", glowColor: "#EC4899" }
];

export function InteractiveStation() {
  const [selectedPart, setSelectedPart] = useState<StationPart>(STATION_PARTS[0]!);

  return (
    <section id="station" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Interactive Charging Station</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Inspect individual hardware sub-systems in a fast-charging DC station pedestal.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* SVG Station Illustration */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex items-center justify-center relative min-h-[300px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03),transparent_70%)] pointer-events-none" />

          <svg viewBox="-80 -100 160 200" className="w-full max-w-[210px] aspect-square overflow-visible">
            {/* Charger Pedestal Base */}
            <polygon points="-40,-80 40,-80 50,85 -50,85" fill="#131722" stroke="rgba(255,255,255,0.06)" />
            <polygon points="-35,-75 35,-75 45,80 -45,80" fill="#0F172A" />

            {/* Hotspot: Grid isolation transformer (bottom box) */}
            <rect
              x="-35" y="45" width="70" height="30"
              fill={selectedPart.id === "transformer" ? "rgba(236,72,153,0.15)" : "transparent"}
              stroke="#EC4899" strokeWidth={selectedPart.id === "transformer" ? 1.5 : 0.4}
              onClick={() => setSelectedPart(STATION_PARTS[5]!)}
              className="cursor-pointer transition-colors"
            />
            <text x="0" y="63" fill="rgba(255,255,255,0.25)" fontSize="6" textAnchor="middle" pointerEvents="none">TRANSFORMER</text>

            {/* Hotspot: Power Inverter Modules (middle box) */}
            <rect
              x="-30" y="5" width="60" height="35"
              fill={selectedPart.id === "inverter" ? "rgba(245,158,11,0.15)" : "transparent"}
              stroke="#F59E0B" strokeWidth={selectedPart.id === "inverter" ? 1.5 : 0.4}
              onClick={() => setSelectedPart(STATION_PARTS[4]!)}
              className="cursor-pointer transition-colors"
            />
            <text x="0" y="26" fill="rgba(255,255,255,0.25)" fontSize="6" textAnchor="middle" pointerEvents="none">POWER MODULE</text>

            {/* Hotspot: Screen interface (top box) */}
            <rect
              x="-20" y="-60" width="40" height="25"
              fill={selectedPart.id === "screen" ? "rgba(34,211,238,0.15)" : "transparent"}
              stroke="#22D3EE" strokeWidth={selectedPart.id === "screen" ? 1.5 : 0.4}
              onClick={() => setSelectedPart(STATION_PARTS[0]!)}
              className="cursor-pointer transition-colors"
            />
            <text x="0" y="-45" fill="rgba(255,255,255,0.25)" fontSize="6" textAnchor="middle" pointerEvents="none">HUD SCREEN</text>

            {/* Hotspot: Radiator fan vents (rear backing) */}
            <path
              d="M 35,-65 L 45,-60 L 45,-20 L 35,-25 Z"
              fill={selectedPart.id === "cooling" ? "rgba(59,130,246,0.15)" : "transparent"}
              stroke="#3B82F6" strokeWidth={selectedPart.id === "cooling" ? 1.5 : 0.5}
              onClick={() => setSelectedPart(STATION_PARTS[3]!)}
              className="cursor-pointer transition-colors"
            />

            {/* Hotspot: Charging Cable (hangs out) */}
            <path
              d="M -30,-20 Q -50,-5 -38,50"
              fill="none"
              stroke={selectedPart.id === "cable" ? "#10B981" : "rgba(255,255,255,0.25)"}
              strokeWidth="2.5"
              onClick={() => setSelectedPart(STATION_PARTS[1]!)}
              className="cursor-pointer transition-colors"
            />

            {/* Hotspot: Plug connector */}
            <rect
              x="-44" y="47" width="12" height="15" rx="2"
              fill={selectedPart.id === "connector" ? "rgba(192,132,252,0.15)" : "transparent"}
              stroke="#C084FC" strokeWidth={selectedPart.id === "connector" ? 1.5 : 0.5}
              onClick={() => setSelectedPart(STATION_PARTS[2]!)}
              className="cursor-pointer transition-colors"
            />
          </svg>
        </div>

        {/* Info panel readout */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          <div className="p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 flex-1">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedPart.glowColor, boxShadow: `0 0 10px ${selectedPart.glowColor}` }} />
              <span className="text-xs font-black text-white">{selectedPart.name}</span>
            </div>
            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Operational Purpose</span>
                <p className="text-xs text-[#AEB5C0]/85 mt-1 leading-relaxed">{selectedPart.purpose}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Structural Materials</span>
                <p className="text-xs text-white font-bold mt-1">{selectedPart.material}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {STATION_PARTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p)}
                className={`py-1.5 rounded-lg border text-[9px] font-extrabold cursor-pointer transition-colors ${
                  selectedPart.id === p.id
                    ? "bg-white/5 border-cyan-500/40 text-[#22D3EE]"
                    : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                }`}
              >
                {p.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CONNECTOR PIN EXPLORER
// ==========================================

interface ConnectorDetails {
  id: string;
  name: string;
  voltageType: string;
  pins: string;
  description: string;
}

const CONNECTOR_LIST: ConnectorDetails[] = [
  { id: "ccs2", name: "CCS Combo 2 (AC + DC)", voltageType: "Up to 1000V DC / 480V Three-Phase AC", pins: "7-Pin AC section (Type 2) + 2-Pin DC power addition underneath.", description: "Standard connector for Europe and India. Integrates proximity pilot & control pilot signalling lines with secondary heavy duty DC direct feeds." },
  { id: "nacs", name: "NACS (Tesla Standard)", voltageType: "Up to 1000V DC / 240V AC", pins: "5-Pin configurations. Dynamically shares primary power pins for both AC and DC flow.", description: "Compact plug standard in North America. Utilizes digital control protocols to switch cell charging lines depending on grid source type." }
];

export function ConnectorExplorer() {
  const [selectedConn, setSelectedConn] = useState<ConnectorDetails>(CONNECTOR_LIST[0]!);

  return (
    <section id="connector" className="space-y-6 border-t border-white/5 pt-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Connector Gallery & Pinouts</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Zoom and inspect physical charging pins layout designs.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* SVG connector layout pins */}
        <div className="md:col-span-6 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block mb-2">Cross-section pin connector HUD</span>
          
          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -80 160 160" className="w-full max-w-[150px] aspect-square overflow-visible">
              {/* Main Outer Plug boundary */}
              <circle cx="0" cy="0" r="60" fill="#131722" stroke="rgba(255,255,255,0.06)" />
              <circle cx="0" cy="0" r="55" fill="#0F172A" />

              {selectedConn.id === "ccs2" ? (
                // CCS2 Pin layout
                <g>
                  {/* Top 7 AC pins layout */}
                  <circle cx="-25" cy="-25" r="7.5" fill="#4B5563" stroke="#AEB5C0" strokeWidth="0.8" />
                  <circle cx="25" cy="-25" r="7.5" fill="#4B5563" stroke="#AEB5C0" strokeWidth="0.8" />
                  <circle cx="-35" cy="5" r="7.5" fill="#4B5563" stroke="#AEB5C0" strokeWidth="0.8" />
                  <circle cx="35" cy="5" r="7.5" fill="#4B5563" stroke="#AEB5C0" strokeWidth="0.8" />
                  <circle cx="0" cy="-35" r="5.5" fill="#9CA3AF" stroke="#AEB5C0" strokeWidth="0.8" />
                  <circle cx="-12" cy="-5" r="5.5" fill="#9CA3AF" stroke="#AEB5C0" strokeWidth="0.8" />
                  <circle cx="12" cy="-5" r="5.5" fill="#9CA3AF" stroke="#AEB5C0" strokeWidth="0.8" />
                  {/* Bottom 2 DC heavy pins */}
                  <rect x="-35" y="22" width="70" height="25" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
                  <circle cx="-18" cy="34" r="11" fill="#F59E0B" stroke="#D97706" />
                  <circle cx="18" cy="34" r="11" fill="#F59E0B" stroke="#D97706" />
                </g>
              ) : (
                // NACS Pin layout
                <g>
                  {/* Top 2 Shared AC/DC Power pins */}
                  <circle cx="-20" cy="-15" r="13" fill="#F59E0B" stroke="#D97706" />
                  <circle cx="20" cy="-15" r="13" fill="#F59E0B" stroke="#D97706" />
                  {/* Ground Pin */}
                  <circle cx="0" cy="25" r="9.5" fill="#4B5563" stroke="#AEB5C0" />
                  {/* 2 Control pins */}
                  <circle cx="-15" cy="8" r="5.5" fill="#9CA3AF" stroke="#AEB5C0" />
                  <circle cx="15" cy="8" r="5.5" fill="#9CA3AF" stroke="#AEB5C0" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Readout specs */}
        <div className="md:col-span-6 flex flex-col justify-between gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Connector Model</span>
              <select
                value={selectedConn.id}
                onChange={(e) => setSelectedConn(CONNECTOR_LIST.find((c) => c.id === e.target.value)!)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="ccs2">CCS Combo 2 (AC/DC European/Indian)</option>
                <option value="nacs">NACS J3400 (Tesla Universal)</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs border-t border-white/5 pt-3">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Pins Structure Specs</span>
              <p className="text-white font-bold">{selectedConn.pins}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Grid Voltage Sizing</span>
              <p className="text-white font-bold">{selectedConn.voltageType}</p>
            </div>
          </div>

          <p className="text-[11px] text-[#AEB5C0]/75 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
            {selectedConn.description}
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CHARGING SAFETY CENTER
// ==========================================

const SAFETY_CARDS = [
  { title: "Grid Thermal Protection", desc: "Monitors connector pin temperature during DC high current transfer, throttling charging if thresholds exceed 85°C." },
  { title: "Ground Fault Isolation", desc: "Continuously checks insulation resistance boundaries to guarantee that no grid current leaks to the chassis framework." },
  { title: "Weather Active Shield", desc: "Encapsulates physical plugs with water-drain channels to ensure safe outdoor charging under heavy rain storms." }
];

export function SafetyCenter() {
  return (
    <section id="safety" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Charging Safety Center</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Learn about high-voltage isolation, active fire safeguards, and auto-cutoff parameters.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SAFETY_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:border-[#10B981]/25 hover:bg-[#10B981]/3 transition-all duration-300 space-y-3.5"
          >
            <div className="flex gap-2 items-center text-[#10B981]">
              <ShieldCheck className="w-4.5 h-4.5" />
              <h4 className="text-xs font-black uppercase tracking-wider">{card.title}</h4>
            </div>
            <p className="text-[11px] text-[#AEB5C0]/80 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// SMART CHARGING & V2G
// ==========================================

export function SmartCharging() {
  return (
    <section id="smart" className="space-y-6 border-t border-white/5 pt-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Smart Charging & V2G (Vehicle-to-Grid)</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Explore bidirectional grid integration and load balancing algorithms.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-purple-400">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Dynamic Load Balancing</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            Distributes available building power dynamically across multiple active EV charging plugs. This prevents stepping over local grid substation transformer capacity ceilings, eliminating peak-demand penalty fees.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-purple-400">
            <Activity className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Vehicle-to-Grid (V2G) Bi-Direction</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            Allows parked EVs to act as distributed grid batteries. During peak hours (e.g. 6 PM - 9 PM), the station pulls power from the vehicle, supplying grid loads. Cells are recharged at cheaper overnight rates.
          </p>
        </div>
      </div>
    </section>
  );
}
