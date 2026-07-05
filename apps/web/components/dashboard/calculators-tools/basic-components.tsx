"use client";

import React, { useState, useMemo } from "react";
import { 
  Sparkles, Sliders, Battery, Play, Cpu, Zap, Activity, ShieldCheck 
} from "lucide-react";

// ==========================================
// TOOLKIT HERO
// ==========================================

export function HeroSection() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#00C853]/25 bg-linear-to-b from-[#00C853]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[360px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#00C853]/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/20 text-[#00C853] text-[10px] font-bold uppercase tracking-wider">
            Engineering Toolset Active
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight font-sans">
            NexioraEV Engineering Toolkit™
          </h1>
          <p className="text-[#AEB5C0]/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Professional engineering calculators, simulations, optimization tools, and technical references for Electric Vehicle design and cell chemistry analysis.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#categories"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#00C853] text-[#07090e] hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all"
            >
              Open Toolbox
            </a>
            <a
              href="#battery"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Battery Calculator
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#00C853]/30 bg-[#00C853]/10 text-[#00C853] hover:bg-[#00C853]/20 transition-all"
            >
              Ask AI Engineer
            </a>
          </div>
        </div>

        {/* Vector SVG Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="-80 -80 160 80" className="w-full max-w-[220px] overflow-visible">
            {/* Hologram rings layers */}
            <ellipse cx="0" cy="15" rx="55" ry="22" fill="none" stroke="rgba(0,200,83,0.15)" strokeWidth="0.8" />
            <ellipse cx="0" cy="15" rx="45" ry="18" fill="none" stroke="rgba(0,200,83,0.1)" strokeWidth="0.8" strokeDasharray="3 3" />
            
            {/* Hologram core building block */}
            <g transform="translate(0, -10)">
              <rect x="-18" y="-6" width="36" height="12" rx="2" fill="#131722" stroke="rgba(0,200,83,0.3)" strokeWidth="0.8" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="white" strokeWidth="0.8" className="animate-pulse" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// QUICK STATS
// ==========================================

const STATS_ITEMS = [
  { label: "Engineering Tools", value: "8 Modules", desc: "Interactive", color: "#00C853" },
  { label: "Calculators Loaded", value: "32 Equations", desc: "WLTP compliant", color: "#3B82F6" },
  { label: "Reference Tables", value: "14 Tables", desc: "Global standards", color: "#10B981" },
  { label: "Formula Sheets", value: "24 Formulas", desc: "LaTeX format", color: "#A855F7" },
  { label: "Converters", value: "11 Converters", desc: "Physics values", color: "#EC4899" },
  { label: "Simulators", value: "4 sandboxes", desc: "Client-side computations", color: "#F59E0B" }
];

export function StatsBar() {
  return (
    <section id="stats" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STATS_ITEMS.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 rounded-[16px] border border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col justify-between"
        >
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest leading-none block">
            {stat.label}
          </span>
          <div className="mt-3.5">
            <span className="text-xs font-black text-white block">
              {stat.value}
            </span>
            <span className="text-[9.5px] text-[#AEB5C0]/50 block mt-1">
              {stat.desc}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==========================================
// TOOLBOX CATEGORIES
// ==========================================

const WORKSPACES = [
  { id: "battery", label: "Battery Chemistry Tools" },
  { id: "charging", label: "Charging Speed Calculators" },
  { id: "motor", label: "Motor & Torque Diagnostics" },
  { id: "performance", label: "Chassis Range Estimators" }
];

export function ToolCategories() {
  return (
    <section id="categories" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Engineering Toolbox Categories</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Quickly scroll down to specific calculation workspaces.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {WORKSPACES.map((w) => (
          <a
            key={w.id}
            href={`#${w.id}`}
            className="p-4 rounded-xl border border-white/5 bg-white/2 hover:border-[#00C853]/20 hover:bg-[#00C853]/5 hover:shadow-[0_4px_24px_rgba(0,200,83,0.04)] text-center transition-all duration-300 font-bold text-xs text-[#AEB5C0] hover:text-white"
          >
            {w.label}
          </a>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// BATTERY PACK CALCULATORS
// ==========================================

export function BatteryTools() {
  const [series, setSeries] = useState<number>(96);
  const [parallel, setParallel] = useState<number>(4);
  const [cellCap, setCellCap] = useState<number>(3.2); // Ah

  const packStats = useMemo(() => {
    // Nominal voltage 3.7V per series cell
    const voltage = parseFloat((series * 3.7).toFixed(1));
    const totalAh = parseFloat((parallel * cellCap).toFixed(1));
    // Pack capacity kWh = Voltage * Ah / 1000
    const capacityKwh = parseFloat(((voltage * totalAh) / 1000).toFixed(2));
    
    // Weight index 6.2 kg per kWh
    const weight = Math.round(capacityKwh * 6.2);

    return { voltage, totalAh, capacityKwh, weight };
  }, [series, parallel, cellCap]);

  return (
    <section id="battery" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Battery Pack Configuration</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Design series-parallel cell matrices. Calculates total nominal voltage, total Ah capacity, and estimated pack weight.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Sliders Inputs Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Series Cells (S)</span>
              <span className="text-white">{series} cells</span>
            </div>
            <input
              type="range"
              min="12"
              max="200"
              value={series}
              onChange={(e) => setSeries(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Parallel Cells (P)</span>
              <span className="text-white">{parallel} cells</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={parallel}
              onChange={(e) => setParallel(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Readout stats Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <span className="text-xs font-bold text-white uppercase border-b border-white/5 pb-2 block">Pack output indicators</span>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Nominal Voltage</span>
              <strong className="text-sm text-white block mt-0.5">{packStats.voltage} V</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Continuous Capacity</span>
              <strong className="text-sm text-white block mt-0.5">{packStats.totalAh} Ah</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Energy Stored</span>
              <strong className="text-sm text-[#00C853] block mt-0.5">{packStats.capacityKwh} kWh</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Estimated Weight</span>
              <strong className="text-sm text-white block mt-0.5">~{packStats.weight} kg</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// CHARGING TIME CALCULATOR
// ==========================================

export function ChargingTools() {
  const [power, setPower] = useState<number>(50); // kW
  const [packSize, setPackSize] = useState<number>(75); // kWh

  const chargeTime = useMemo(() => {
    // WLTP efficiency factor 90%
    const realPower = power * 0.9;
    const duration = packSize / realPower;
    const hours = Math.floor(duration);
    const mins = Math.round((duration - hours) * 60);

    return { hours, mins };
  }, [power, packSize]);

  return (
    <section id="charging" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Charging Time Calculator</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Input charger grid output power against target pack size. WLTP 90% converter efficiency is modeled.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Sliders Inputs Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Charger Output Power</span>
              <span className="text-white">{power} kW</span>
            </div>
            <input
              type="range"
              min="7"
              max="250"
              step="7"
              value={power}
              onChange={(e) => setPower(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Pack Capacity Size</span>
              <span className="text-white">{packSize} kWh</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={packSize}
              onChange={(e) => setPackSize(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Readout stats Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[140px]">
          <div className="space-y-1">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Estimated Duration (10% to 100%)</span>
            <strong className="text-xl font-black text-white block mt-2">
              {chargeTime.hours} hours {chargeTime.mins} minutes
            </strong>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// MOTOR DIAGNOSTICS & ACCELERATION
// ==========================================

export function MotorTools() {
  const [rpm, setRpm] = useState<number>(6000);
  const [ratio, setRatio] = useState<number>(9.5);

  const wheelSpeed = useMemo(() => {
    // Wheel rpm = motor rpm / gear ratio
    const wheelRpm = rpm / ratio;
    // Assuming tire circumference is 2.1 meters
    const mPerMin = wheelRpm * 2.1;
    const kmPerHour = Math.round((mPerMin * 60) / 1000);

    return { wheelRpm: Math.round(wheelRpm), kmPerHour };
  }, [rpm, ratio]);

  return (
    <section id="motor" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Motor Speed & Transmission</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Calculate target output wheel speeds based on continuous motor RPM and transmission gear ratios.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Sliders Inputs Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Motor Rotor RPM</span>
              <span className="text-white">{rpm} rpm</span>
            </div>
            <input
              type="range"
              min="1000"
              max="16000"
              step="500"
              value={rpm}
              onChange={(e) => setRpm(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Gear Reduction Ratio</span>
              <span className="text-white">{ratio} : 1</span>
            </div>
            <input
              type="range"
              min="4"
              max="16"
              step="0.5"
              value={ratio}
              onChange={(e) => setRatio(parseFloat(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Readout stats Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <span className="text-xs font-bold text-white uppercase border-b border-white/5 pb-2 block">Traction outputs</span>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Wheel Output Speed</span>
              <strong className="text-sm text-white block mt-0.5">{wheelSpeed.wheelRpm} rpm</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Calculated Vehicle Speed</span>
              <strong className="text-sm text-white block mt-0.5">{wheelSpeed.kmPerHour} km/h</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// VEHICLE DRAG & RANGE ESTIMATOR
// ==========================================

export function PerformanceTools() {
  const [drag, setDrag] = useState<number>(0.24); // Cd
  const [pack, setPack] = useState<number>(75); // kWh

  const wltpRange = useMemo(() => {
    // Base efficiency 5.5 km/kWh
    const baseEff = 5.8;
    // Aerodynamic drag scaling range reduction factor
    const dragFactor = 1 - (drag - 0.2) * 1.5;
    const range = Math.round(pack * baseEff * dragFactor);

    return range;
  }, [drag, pack]);

  return (
    <section id="performance" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">Aerodynamics & Range Estimator</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Calculates estimated WLTP driving range based on aerodynamic drag (Cd) and pack energy sizing.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Sliders Inputs Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Drag Coefficient (Cd)</span>
              <span className="text-white">{drag} Cd</span>
            </div>
            <input
              type="range"
              min="0.18"
              max="0.45"
              step="0.01"
              value={drag}
              onChange={(e) => setDrag(parseFloat(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Pack capacity</span>
              <span className="text-white">{pack} kWh</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={pack}
              onChange={(e) => setPack(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Readout stats Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[140px]">
          <div className="space-y-1">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Estimated WLTP Driving Range</span>
            <strong className="text-2xl font-black text-[#00C853] block mt-2">
              ~{wltpRange} km
            </strong>
          </div>
        </div>

      </div>
    </section>
  );
}
