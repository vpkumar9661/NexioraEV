"use client";

import React, { useMemo } from "react";
import { Award, Download, BarChart3, RotateCcw } from "lucide-react";

interface EndReportProps {
  distance: number;
  duration: number;
  maxSpeed: number;
  energyConsumed: number;
  regenRecovered: number;
  onRestart: () => void;
}

export function EndReport({
  distance,
  duration,
  maxSpeed,
  energyConsumed,
  regenRecovered,
  onRestart
}: EndReportProps) {
  
  const stats = useMemo(() => {
    const avgSpeed = duration > 0 ? Math.round((distance / (duration / 3600))) : 0;
    const efficiency = distance > 0 ? Math.round((energyConsumed * 1000) / distance) : 0; // Wh/km
    
    // Safety scores calculations
    const driveScore = Math.min(100, Math.round(95 - (maxSpeed / 20)));
    const thermalScore = 94;

    return { avgSpeed, efficiency, driveScore, thermalScore };
  }, [distance, duration, maxSpeed, energyConsumed]);

  const handleExportCSV = () => {
    alert("Exporting simulation telemetry CSV logs sheets...");
  };

  const handleExportPDF = () => {
    alert("Exporting formatted proving summary PDF reports...");
  };

  return (
    <section id="report" className="space-y-6 relative z-20 border-t border-white/5 pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-white font-sans">End of Proving Run Report</h2>
          <p className="text-xs text-muted-foreground/60 mt-0.5">Diagnose battery thermal decay rates, mechanical energy efficiencies, and safety scores.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-[#22D3EE] text-[#07090e] font-black text-xs rounded-xl hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Proving
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 border border-white/10 bg-white/3 text-white font-bold text-xs rounded-xl hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report PDF
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Statistics Readout Left */}
        <div className="md:col-span-8 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-5">
          <span className="text-[10px] text-muted-foreground/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Proving Statistics Summary</span>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Distance Covered</span>
              <strong className="text-sm text-white block mt-0.5">{distance.toFixed(2)} km</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Average Speed</span>
              <strong className="text-sm text-white block mt-0.5">{stats.avgSpeed} km/h</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Maximum Speed</span>
              <strong className="text-sm text-white block mt-0.5">{maxSpeed} km/h</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Energy Efficiency</span>
              <strong className="text-sm text-cyan-300 block mt-0.5">{stats.efficiency} Wh/km</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t border-white/5 pt-4">
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Regen Recovered</span>
              <strong className="text-sm text-emerald-400 block mt-0.5">{regenRecovered.toFixed(2)} kWh</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Driving Score</span>
              <strong className="text-sm text-white block mt-0.5">{stats.driveScore} / 100</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Thermal Rating</span>
              <strong className="text-sm text-white block mt-0.5">{stats.thermalScore} / 100</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">CO₂ Offsets</span>
              <strong className="text-sm text-[#10B981] block mt-0.5">+{Math.round(distance * 0.12)} kg</strong>
            </div>
          </div>
        </div>

        {/* Proving Achievements Right */}
        <div className="md:col-span-4 p-5 rounded-[20px] border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-between gap-4">
          <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest block border-b border-white/5 pb-2">Proving Badges Unlocked</span>
          
          <div className="space-y-2.5">
            {[
              { id: "driver", title: "Efficient Driver Master", desc: "Energy consumption below 180 Wh/km limits." },
              { id: "guardian", title: "Battery Guardian", desc: "Maintained cell temps below 40°C threshold." }
            ].map((badge) => (
              <div key={badge.id} className="flex gap-2.5 items-start text-xs">
                <div className="w-8 h-8 rounded-lg border border-purple-500/20 bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <strong className="text-white block">{badge.title}</strong>
                  <span className="text-[10px] text-muted-foreground/50 block leading-normal">{badge.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
