"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Battery, Flame, Compass, RefreshCcw } from "lucide-react";

export function BatteryHealthCenter() {
  // Simulator load state: negative = discharging, positive = charging (kW)
  const [load, setLoad] = useState(-45); 

  // Telemetry states affected by load
  const [voltage, setVoltage] = useState(398.2);
  const [current, setCurrent] = useState(-113);
  const [temp, setTemp] = useState(28.4);
  const [resistance, setResistance] = useState(1.85);
  const [cellImbalance, setCellImbalance] = useState(12); // mV

  // Run dynamic calculation simulator
  useEffect(() => {
    // Basic heuristics: voltage drops on load, temp rises on high load, current maps load directly
    // Voltage drop = resistance * current. V = V_nominal - I * R
    const r = 0.00185; // Ω (1.85 mΩ)
    const nominalV = 400.0;
    const calcCurrent = (load * 1000) / nominalV; // I = P / V
    const calcV = nominalV + (calcCurrent * r); // V_actual = V_nom + I * R (charging increases voltage, discharging drops it)
    
    // Temp increases over time based on current magnitude
    const absCurrent = Math.abs(calcCurrent);
    const targetTemp = 25.0 + (absCurrent * 0.04);

    setCurrent(Math.round(calcCurrent));
    setVoltage(parseFloat(calcV.toFixed(1)));
    setResistance(parseFloat((r * 1000 + (absCurrent * 0.0002)).toFixed(2))); // slight rise in resistance at high loads
    setCellImbalance(Math.round(10 + (absCurrent * 0.015)));

    // Smooth temperature interpolation
    const timeout = setTimeout(() => {
      setTemp((prev) => {
        const diff = targetTemp - prev;
        return parseFloat((prev + diff * 0.15).toFixed(1));
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [load]);

  // Telemetry items array
  const metrics = [
    { label: "Voltage Output", value: `${voltage} V`, sub: "Nominal 400V" },
    { label: "Active Current", value: `${current} A`, sub: load >= 0 ? "Charging Grid" : "Discharging Loop" },
    { label: "Internal Resistance", value: `${resistance} mΩ`, sub: "Nominal < 2.0 mΩ" },
    { label: "Cell Imbalance", value: `${cellImbalance} mV`, sub: "Safety limit < 50mV" },
    { label: "Remaining Capacity", value: "98.4 kWh", sub: "Max Limit 100 kWh" },
    { label: "Battery Temp", value: `${temp} °C`, sub: "Optimal range: 15-35°C" },
  ];

  // Circular gauge parameters
  const radius = 60;
  const strokeWidth = 8;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (94.8 / 100) * circ; // 94.8% SOH

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: SOH Gauge & Load Controller */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                CORE DIAGNOSTIC TELEMETRY
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                Battery Health Monitor
              </h2>
            </div>

            {/* Circular SOH Gauge */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center pt-2">
              <svg className="w-full h-full -rotate-90">
                {/* Back circle */}
                <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth} />
                {/* Active circle */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  fill="none"
                  stroke="url(#sohGlow)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sohGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner Text info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
                <span className="text-2xl font-black text-white leading-none">94.8%</span>
                <span className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest mt-1">
                  State of Health
                </span>
              </div>
            </div>
          </div>

          {/* Interactive load simulator slider */}
          <div className="bg-white/1 border border-white/5 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Simulate Grid Load</span>
              <span className={`font-black ${load >= 0 ? "text-[#10B981]" : "text-rose-400"}`}>
                {load >= 0 ? `Charging +${load} kW` : `Discharging ${load} kW`}
              </span>
            </div>
            
            <input
              type="range"
              min="-150"
              max="150"
              value={load}
              onChange={(e) => setLoad(parseInt(e.target.value))}
              className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${
                load >= 0 ? "accent-[#10B981]" : "accent-rose-500"
              }`}
            />
            
            <div className="flex justify-between text-[8px] text-muted-foreground/40 font-mono">
              <span>-150 kW (Discharge)</span>
              <span>0 kW (Idle)</span>
              <span>+150 kW (Charge)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Grid Cards */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[100px]"
              >
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
                  {metric.label}
                </span>
                <div>
                  <span className="text-lg font-black text-white block mt-1.5">{metric.value}</span>
                  <span className="text-[9px] text-muted-foreground/65 block mt-0.5">{metric.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* SVG Micro oscillation telemetry trend graph */}
          <div className="p-4 rounded-[20px] border border-white/5 bg-black/40 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground/65 uppercase">
              <span>Voltage Stability Curve</span>
              <span className="text-white font-mono">{voltage} V</span>
            </div>
            
            <div className="h-[60px] w-full">
              <svg viewBox="0 0 400 60" className="w-full h-full overflow-visible">
                {/* Reference baseline */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="3 3" />
                {/* Stability oscilating path */}
                {(() => {
                  const points = Array.from({ length: 20 }, (_, idx) => {
                    const x = (idx / 19) * 400;
                    // generate small oscilations around middle (y=30)
                    const osc = Math.sin(idx * 1.5) * (cellImbalance * 0.15) + (load * 0.05);
                    const y = 30 + osc;
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  });
                  return (
                    <path
                      d={`M ${points.join(" L ")}`}
                      fill="none"
                      stroke={load >= 0 ? "#10B981" : "#00D4FF"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
