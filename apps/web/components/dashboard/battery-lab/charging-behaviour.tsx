"use client";

import { useState } from "react";
import { Zap, AlertTriangle, ShieldCheck, Thermometer } from "lucide-react";

interface PhaseData {
  percent: number;
  phase: string;
  power: string;
  stress: "Low" | "Medium" | "High";
  desc: string;
  timeEstimate: string;
  temp: string;
  color: string;
}

const PHASES: PhaseData[] = [
  { percent: 0, phase: "Initialization", power: "20 kW", stress: "Low", desc: "Low-current safety checks to pre-heat cells and test internal resistance before initiating full fast-charging.", timeEstimate: "2 mins to start", temp: "22°C", color: "#3B82F6" },
  { percent: 20, phase: "Constant Current (CC)", power: "150 kW", stress: "High", desc: "Maximum current charging. The charger pumps full amperage into cells. Voltage climbs rapidly and heat increases.", timeEstimate: "8 mins to 50%", temp: "38°C", color: "#EF4444" },
  { percent: 50, phase: "Constant Current (CC)", power: "120 kW", stress: "High", desc: "Bulk charging continues. BMS monitors thermal thresholds, slowly tapering current to protect cathode structures.", timeEstimate: "12 mins to 80%", temp: "42°C", color: "#F59E0B" },
  { percent: 80, phase: "Constant Voltage (CV)", power: "45 kW", stress: "Medium", desc: "Voltage limits reached. BMS keeps voltage stable while allowing current to naturally drop, protecting cell chemistry from plating.", timeEstimate: "30 mins to 100%", temp: "35°C", color: "#10B981" },
  { percent: 100, phase: "Trickle & Top Off", power: "3 kW", stress: "Low", desc: "Saturation phase. Cell balancing completes. Charger draws micro-currents to fully saturate LFP/NMC active particles.", timeEstimate: "Fully Charged", temp: "26°C", color: "#10B981" }
];

export function ChargingBehaviour() {
  const [selectedPhase, setSelectedPhase] = useState<PhaseData>(PHASES[2]!);

  return (
    <section id="charging" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Charging Behaviour</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Understand constant current/voltage curves and battery health degradation during rapid charging</p>
      </div>

      {/* Selector percentages tabs */}
      <div className="grid grid-cols-5 gap-2">
        {PHASES.map((p) => {
          const isActive = selectedPhase.percent === p.percent;
          return (
            <button
              key={p.percent}
              onClick={() => setSelectedPhase(p)}
              className={`py-3.5 rounded-xl border text-center transition-all duration-300 font-black text-sm flex flex-col items-center justify-center gap-1.5 ${
                isActive
                  ? "bg-white/4"
                  : "bg-white/1 hover:bg-white/2"
              }`}
              style={{ borderColor: isActive ? p.color : "rgba(255,255,255,0.05)" }}
            >
              <span className="text-white text-base">{p.percent}%</span>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider hidden sm:inline">Charge</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Detail specs */}
        <div className="lg:col-span-6 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#AEB5C0]/40 uppercase tracking-wider">Current Phase</span>
                <h4 className="text-base font-extrabold text-white mt-1">{selectedPhase.phase}</h4>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${selectedPhase.color}15`,
                  color: selectedPhase.color,
                  border: `1px solid ${selectedPhase.color}30`
                }}
              >
                {selectedPhase.power}
              </span>
            </div>

            <p className="text-sm text-[#AEB5C0]/85 leading-relaxed">
              {selectedPhase.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white/1 border border-white/5">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Remaining Time</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{selectedPhase.timeEstimate}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/1 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Cell Temperature</span>
                  <span className="text-sm font-extrabold text-white mt-1 block">{selectedPhase.temp}</span>
                </div>
                <Thermometer className="w-4 h-4 text-[#3B82F6]" />
              </div>
            </div>
          </div>

          {/* Stress alert indicator */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/1">
            <AlertTriangle className={`w-5 h-5 ${selectedPhase.stress === "High" ? "text-rose-400" : selectedPhase.stress === "Medium" ? "text-amber-400" : "text-emerald-400"}`} />
            <div>
              <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Thermal Stress Level</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{selectedPhase.stress} Stress Phase</span>
            </div>
          </div>
        </div>

        {/* Interactive graphical visualization */}
        <div className="lg:col-span-6 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6 relative">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">DC Fast Charging Curve Simulation</span>

          <div className="relative h-[200px] border border-white/3 bg-[#131722]/50 rounded-xl overflow-hidden p-4">
            <svg className="w-full h-full" viewBox="0 0 300 120" fill="none">
              {/* Grid Background lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Charging Curve path */}
              <path d="M 10,110 Q 30,30 90,30 L 180,30 Q 230,80 290,110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              
              {/* Highlight Curve path up to selected percentage */}
              <path
                d={`M 10,110 Q 30,30 90,30 L 180,30 Q 230,80 290,110`}
                fill="none"
                stroke="url(#chargingGradient)"
                strokeWidth="3.5"
                strokeDasharray="300"
                strokeDashoffset={300 - (300 * (selectedPhase.percent / 100))}
                className="transition-all duration-700"
              />

              {/* Indicator dot */}
              {/* Simple math lookup to position dot */}
              {(() => {
                const getCoords = (pct: number) => {
                  if (pct === 0) return { x: 10, y: 110 };
                  if (pct === 20) return { x: 50, y: 40 };
                  if (pct === 50) return { x: 135, y: 30 };
                  if (pct === 80) return { x: 230, y: 80 };
                  return { x: 290, y: 110 };
                };
                const { x, y } = getCoords(selectedPhase.percent);
                return (
                  <circle cx={x} cy={y} r="6" fill={selectedPhase.color} className="transition-all duration-700 animate-pulse" />
                );
              })()}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#AEB5C0]/40">
            <span>0% SOC</span>
            <span>50% (Peak CC)</span>
            <span>80% (CV Threshold)</span>
            <span>100% SOC</span>
          </div>

          <defs>
            <linearGradient id="chargingGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="80%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </div>
      </div>
    </section>
  );
}
