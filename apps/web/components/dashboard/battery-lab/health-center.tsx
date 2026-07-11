"use client";

import { useState, useMemo } from "react";
import { HeartPulse, Sliders, Battery, Calendar, ShieldAlert } from "lucide-react";

export function HealthCenter() {
  const [cycles, setCycles] = useState(1200);
  const [fastChargeRatio, setFastChargeRatio] = useState(40);
  const [avgTemp, setAvgTemp] = useState(30);

  const analytics = useMemo(() => {
    // Basic chemistry math logic to compute mock degradation curve
    // Standard base SOH: 100%
    // Cycles penalty: 6000 cycles = 70% retention
    const cyclePenalty = (cycles / 6000) * 20; // up to 20% drop
    
    // Fast charging ratio penalty: 100% fast charging adds extra 5% penalty
    const fcPenalty = (fastChargeRatio / 100) * 6;

    // Temperature penalty: optimum is 25°C. Above 35°C adds up to 10% penalty
    const tempPenalty = avgTemp > 25 ? ((avgTemp - 25) / 25) * 8 : 0;

    const healthScore = Math.max(50, Math.round(100 - (cyclePenalty + fcPenalty + tempPenalty)));
    
    let rating = "Excellent";
    let color = "#10B981";
    if (healthScore < 70) {
      rating = "Degraded";
      color = "#EF4444";
    } else if (healthScore < 85) {
      rating = "Good";
      color = "#F59E0B";
    }

    // Lifespan estimation based on cycles (assume 1500 cycles before 80%)
    const remainingYears = Math.max(0.5, parseFloat(((2500 - cycles) / 250).toFixed(1)));

    return { healthScore, rating, color, remainingYears };
  }, [cycles, fastChargeRatio, avgTemp]);

  return (
    <section id="health" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Health Center</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Estimate battery State of Health (SOH) and degradation kinetics under custom operating conditions</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Controls inputs */}
        <div className="lg:col-span-6 rounded-[20px] border border-white/5 bg-white/2 p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Sliders className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Operational Stress Controls</span>
          </div>

          {/* Slider 1: Cycles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground/70 font-semibold">Total Charge Cycles</span>
              <span className="text-white font-extrabold">{cycles} Cycles</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={cycles}
              onChange={(e) => setCycles(parseInt(e.target.value))}
              className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between text-[9px] text-muted-foreground/40">
              <span>Fresh Pack (0)</span>
              <span>End-of-life (5,000)</span>
            </div>
          </div>

          {/* Slider 2: Fast Charge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground/70 font-semibold">Fast DC Charging Ratio</span>
              <span className="text-white font-extrabold">{fastChargeRatio}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={fastChargeRatio}
              onChange={(e) => setFastChargeRatio(parseInt(e.target.value))}
              className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between text-[9px] text-muted-foreground/40">
              <span>Mainly AC Home (0%)</span>
              <span>Always Fast DC (100%)</span>
            </div>
          </div>

          {/* Slider 3: Average Temp */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground/70 font-semibold">Average Climatic/Operating Temp</span>
              <span className="text-white font-extrabold">{avgTemp}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="1"
              value={avgTemp}
              onChange={(e) => setAvgTemp(parseInt(e.target.value))}
              className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between text-[9px] text-muted-foreground/40">
              <span>Cold (10°C)</span>
              <span>Extreme Heat (50°C)</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Outputs */}
        <div className="lg:col-span-6 rounded-[20px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Health Analysis Report</span>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${analytics.color}15`,
                color: analytics.color,
                border: `1px solid ${analytics.color}30`
              }}
            >
              {analytics.rating}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Score Ring */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/1 border border-white/5 h-[140px] relative">
              <span className="text-3xl font-extrabold text-white">{analytics.healthScore}%</span>
              <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-wider mt-1.5">Calculated SOH</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/1 border border-white/5 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#3B82F6]" />
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Est. Lifespan</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{analytics.remainingYears} Years Left</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/1 border border-white/5 flex items-center gap-2.5">
                <Battery className="w-4 h-4 text-[#10B981]" />
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Total Degradation</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">-{100 - analytics.healthScore}% Capacity</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/1 border border-white/5 text-[11px] text-muted-foreground/65 leading-normal">
            <ShieldAlert className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <span>Avoid keeping cells stored above 80% charge level in ambient temperatures exceeding 35°C to limit calendar aging.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
