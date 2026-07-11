"use client";

import React from "react";
import { 
  Zap, Compass, Sliders, Battery, Cpu, Activity, Info 
} from "lucide-react";

export interface SimulatorSetup {
  platform: string;
  chemistry: string;
  capacity: number;
  motor: string;
  cooling: string;
  suspension: string;
}

// ==========================================
// PRE-START HEADER / VEHICLE SUMMARY
// ==========================================

interface PreStartHeaderProps {
  setup: SimulatorSetup;
  onLaunch: () => void;
  onConfigChange: () => void;
}

export function PreStartHeader({ setup, onLaunch, onConfigChange }: PreStartHeaderProps) {
  // Approximate static metrics based on setup
  const power = setup.platform === "bus" || setup.platform === "truck" ? 350 : 150;
  const torque = setup.platform === "bus" || setup.platform === "truck" ? 850 : 310;
  const weight = setup.platform === "bus" || setup.platform === "truck" ? 9500 : 1850;

  return (
    <div className="w-full p-6 rounded-[24px] border border-white/5 bg-white/2 backdrop-blur-md space-y-6 shadow-2xl relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] text-[#22D3EE] font-extrabold uppercase tracking-widest block">
            Drive Proving Grounds
          </span>
          <h1 className="text-2xl font-black text-white mt-1">NexioraEV Drive Simulator™</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onLaunch}
            className="px-5 py-2.5 rounded-xl bg-[#22D3EE] hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] text-[#07090e] text-xs font-black transition-all cursor-pointer"
          >
            Launch Proving Simulation
          </button>
          <button
            onClick={onConfigChange}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Adjust Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Chassis Platform</span>
          <strong className="text-white text-xs block uppercase">{setup.platform}</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Battery chemistry</span>
          <strong className="text-white text-xs block uppercase">{setup.chemistry} ({setup.capacity} kWh)</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Traction Motor</span>
          <strong className="text-white text-xs block uppercase">{setup.motor}</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Cooling Method</span>
          <strong className="text-white text-xs block uppercase">{setup.cooling}</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Continuous Power</span>
          <strong className="text-white text-xs block">{power} kW</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Continuous Torque</span>
          <strong className="text-white text-xs block">{torque} Nm</strong>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ENVIRONMENT SELECTOR
// ==========================================

export interface DrivingEnvironment {
  id: string;
  name: string;
  desc: string;
  ambientTemp: number; // °C
  dragCoeff: number; // Cd multiplier
  grip: number; // multiplier 0.1 to 1.0
  iconColor: string;
}

export const ENVIRONMENTS_LIST: DrivingEnvironment[] = [
  { id: "city", name: "City Driving", desc: "Urban traffic congestion, stoplights, low speeds. Ideal for regenerative braking recapture tests.", ambientTemp: 25, dragCoeff: 1.0, grip: 1.0, iconColor: "#3B82F6" },
  { id: "highway", name: "Highway Cruise", desc: "High constant speeds, aerodynamic drag limits. Evaluate long-term pack efficiency.", ambientTemp: 22, dragCoeff: 1.1, grip: 1.0, iconColor: "#22D3EE" },
  { id: "hillclimb", name: "Hill Climb Gradient", desc: "Steep upward slopes requiring continuous peak torque. Accelerates battery heat spikes.", ambientTemp: 18, dragCoeff: 1.0, grip: 0.95, iconColor: "#F59E0B" },
  { id: "rain", name: "Heavy Downpours", desc: "Wet asphalt, slippery grip. Measures electronic traction stability controls (TCS).", ambientTemp: 15, dragCoeff: 1.05, grip: 0.65, iconColor: "#C084FC" },
  { id: "snow", name: "Sub-Zero Snow", desc: "Frozen roads, freezing cells. Increased heating requirements cut SOH range limits.", ambientTemp: -5, dragCoeff: 1.0, grip: 0.25, iconColor: "#10B981" },
  { id: "desert", name: "Desert Heat", desc: "Extreme hot environment. High stress on active liquid radiators and cabin HVAC.", ambientTemp: 45, dragCoeff: 1.0, grip: 0.85, iconColor: "#EF4444" }
];

interface EnvironmentSelectorProps {
  selectedEnv: DrivingEnvironment;
  onSelect: (env: DrivingEnvironment) => void;
}

export function EnvironmentSelector({ selectedEnv, onSelect }: EnvironmentSelectorProps) {
  return (
    <section id="environments" className="space-y-6 relative z-20">
      <div>
        <h2 className="text-xl font-black text-white">Select Simulation Proving Ground</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Pick target environments. Different slopes, drag scales, and ambient limits change thermodynamics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ENVIRONMENTS_LIST.map((env) => {
          const isSelected = env.id === selectedEnv.id;
          return (
            <div
              key={env.id}
              onClick={() => onSelect(env)}
              className={`group p-5 rounded-[20px] border transition-all duration-300 cursor-pointer overflow-hidden relative ${
                isSelected
                  ? "border-[#22D3EE]/30 bg-[#22D3EE]/5 shadow-[0_8px_32px_rgba(34,211,238,0.06)]"
                  : "border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4"
              }`}
            >
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-[0.05] transition-opacity" 
                style={{ backgroundColor: env.iconColor }} 
              />
              
              <div className="flex flex-col h-full justify-between gap-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ backgroundColor: `${env.iconColor}15`, borderColor: `${env.iconColor}25` }}>
                    <Compass className="w-4 h-4" style={{ color: env.iconColor }} />
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground/70">
                    Ambient: {env.ambientTemp}°C
                  </span>
                </div>
                <div>
                  <h3 className={`text-xs font-bold transition-colors ${isSelected ? "text-[#22D3EE]" : "text-white group-hover:text-[#22D3EE]"}`}>
                    {env.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground/50 mt-1 leading-relaxed line-clamp-2">
                    {env.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
