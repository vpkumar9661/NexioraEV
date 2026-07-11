"use client";

import React, { useMemo } from "react";
import { Battery, ShieldCheck, Thermometer, Wind, Zap, Cpu } from "lucide-react";

interface TelemetryData {
  speed: number;
  rpm: number;
  torque: number;
  power: number;
  soc: number;
  range: number;
  voltage: number;
  current: number;
  tempCells: number;
  tempMotor: number;
  tempInverter: number;
  regenRecovered: number;
  efficiencyScore: number;
}

interface TelemetryHudProps {
  telemetry: TelemetryData;
  coolingActive: boolean;
}

export function TelemetryHud({ telemetry, coolingActive }: TelemetryHudProps) {
  return (
    <section id="telemetry" className="space-y-6 relative z-20">
      <div>
        <h2 className="text-xl font-black text-white font-sans">Active Engineering Telemetry</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Real-time parameters tracing cells temperatures, rotor torque distributions, and current draws.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Speed Dial */}
        <div className="p-4 rounded-[16px] border border-white/5 bg-white/2 space-y-2">
          <span className="text-[9.5px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Vehicle Speed</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-black text-white">{telemetry.speed}</strong>
            <span className="text-[10px] text-muted-foreground/50 font-bold">km/h</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(telemetry.speed / 260) * 100}%` }} />
          </div>
        </div>

        {/* Battery SOC */}
        <div className="p-4 rounded-[16px] border border-white/5 bg-white/2 space-y-2">
          <span className="text-[9.5px] text-muted-foreground/40 font-bold uppercase tracking-wider block">State of Charge</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-black text-cyan-300">{telemetry.soc}%</strong>
            <span className="text-[10px] text-muted-foreground/50 font-bold">{telemetry.range} km range</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${telemetry.soc}%` }} />
          </div>
        </div>

        {/* Continuous Power */}
        <div className="p-4 rounded-[16px] border border-white/5 bg-white/2 space-y-2">
          <span className="text-[9.5px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Inverter Output</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-black text-white">{telemetry.power}</strong>
            <span className="text-[10px] text-muted-foreground/50 font-bold">kW power</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, (telemetry.power / 400) * 100)}%` }} />
          </div>
        </div>

        {/* Regen recovered */}
        <div className="p-4 rounded-[16px] border border-white/5 bg-white/2 space-y-2">
          <span className="text-[9.5px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Regenerative Recovery</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl font-black text-emerald-400">+{telemetry.regenRecovered.toFixed(2)}</strong>
            <span className="text-[10px] text-muted-foreground/50 font-bold">kWh back</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "45%" }} />
          </div>
        </div>
      </div>

      {/* Detail temperatures diagnostics bar */}
      <div className="grid sm:grid-cols-3 gap-4">
        
        {/* Cell temperature */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground/55 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-purple-400" /> Battery Cells
            </span>
            <span className="text-white font-bold">{telemetry.tempCells}°C</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${(telemetry.tempCells / 65) * 100}%`,
                backgroundColor: telemetry.tempCells > 42 ? "#EF4444" : "#A855F7" 
              }} 
            />
          </div>
        </div>

        {/* Motor core temp */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground/55 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Traction Motor
            </span>
            <span className="text-white font-bold">{telemetry.tempMotor}°C</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${(telemetry.tempMotor / 120) * 100}%`,
                backgroundColor: telemetry.tempMotor > 95 ? "#EF4444" : "#22D3EE" 
              }} 
            />
          </div>
        </div>

        {/* Cooling loops indicator status */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-muted-foreground/55 font-bold uppercase tracking-wider text-[9px] block">Active Cooling Loop</span>
            <span className="text-xs font-black text-white">{coolingActive ? "Liquid Pumps 100% On" : "Air Cooled Standby"}</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
            <Wind className={`w-4.5 h-4.5 text-cyan-400 ${coolingActive ? "animate-spin" : "opacity-35"}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
export type { TelemetryData };
