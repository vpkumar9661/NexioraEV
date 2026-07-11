"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Sun, ShieldCheck, Info, DollarSign, Calendar, TrendingUp } from "lucide-react";

export function ChargingOptimization() {
  const [commute, setCommute] = useState(60); // miles/day
  const [chargerSpeed, setChargerSpeed] = useState(50); // kW
  const [chargeStartHour, setChargeStartHour] = useState(22); // 10 PM default

  const [longevityScore, setLongevityScore] = useState(90);
  const [chargingCost, setChargingCost] = useState(0); // $ per month
  const [energySavings, setEnergySavings] = useState(0); // $ per month

  useEffect(() => {
    // Basic heuristics: high charger speeds degrade battery slightly more
    // charging during solar peak or off-peak night is cheaper
    // daily commute determines net energy demand
    const dailyDemandKwh = (commute * 0.3); // assume 0.3 kWh per mile
    
    // Longevity deductions
    let score = 98;
    if (chargerSpeed > 100) score -= 12; // supercharging penalty
    else if (chargerSpeed > 22) score -= 5;
    
    // charging pattern penalty (deep discharging/charging cycles)
    if (dailyDemandKwh > 50) score -= 8;

    // Cost calculations
    let gridRate = 0.16; // $0.16 / kWh average
    if (chargeStartHour >= 22 || chargeStartHour <= 6) {
      gridRate = 0.08; // night off-peak discount
    } else if (chargeStartHour >= 10 && chargeStartHour <= 15) {
      gridRate = 0.06; // solar peak discount
    } else if (chargeStartHour >= 17 && chargeStartHour <= 21) {
      gridRate = 0.28; // evening grid peak tariff peak
    }

    const monthlyDemand = dailyDemandKwh * 30.5;
    const cost = monthlyDemand * gridRate;
    
    // Savings compared to flat peak rate ($0.22/kWh)
    const baseCost = monthlyDemand * 0.22;
    const savings = Math.max(0, baseCost - cost);

    setLongevityScore(score);
    setChargingCost(Math.round(cost));
    setEnergySavings(Math.round(savings));
  }, [commute, chargerSpeed, chargeStartHour]);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Input Configuration Column */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] font-extrabold text-[#84CC16] uppercase tracking-widest block">
              BMS GRID BALANCER
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Sun className="w-5 h-5 text-[#84CC16]" />
              Smart Charging Optimization
            </h2>
          </div>

          <div className="space-y-5 bg-white/1 border border-white/5 p-4 rounded-2xl">
            {/* commute slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Daily Commute Distance</span>
                <span className="text-[#00D4FF] font-black">{commute} miles</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                value={commute}
                onChange={(e) => setCommute(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
            </div>

            {/* charger speed slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Charging Station Power</span>
                <span className="text-[#10B981] font-black">{chargerSpeed} kW (DC)</span>
              </div>
              <input
                type="range"
                min="7"
                max="350"
                value={chargerSpeed}
                onChange={(e) => setChargerSpeed(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>

            {/* time selection slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Scheduled Charge Start</span>
                <span className="text-amber-400 font-black">
                  {chargeStartHour === 12 ? "12:00 PM (Noon)" : chargeStartHour === 0 ? "12:00 AM (Midnight)" : chargeStartHour > 12 ? `${chargeStartHour - 12}:00 PM` : `${chargeStartHour}:00 AM`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                value={chargeStartHour}
                onChange={(e) => setChargeStartHour(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[7px] text-muted-foreground/40 font-mono">
                <span>00:00 Night Rate</span>
                <span>12:00 Solar Peak</span>
                <span>18:00 Grid Peak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Outputs & Timeline view */}
        <div className="w-full lg:w-[420px] rounded-[24px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between space-y-6 relative">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-wider">Optimizer Engine</p>
                <h3 className="text-base font-extrabold text-white">Grid Charging Forecast</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                Optimization Optimal
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Longevity Card */}
              <div className="flex justify-between items-center p-3 rounded-xl bg-black/45 border border-white/4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-10 rounded-full bg-[#10B981]" />
                  <div>
                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Longevity Score</span>
                    <span className="text-sm font-black text-white">{longevityScore} / 100</span>
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#10B981] opacity-60" />
              </div>

              {/* Recommended schedule window */}
              <div className="flex justify-between items-center p-3 rounded-xl bg-black/45 border border-white/4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-10 rounded-full bg-amber-400" />
                  <div>
                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Recommended Window</span>
                    <span className="text-xs font-extrabold text-white">
                      {chargeStartHour >= 10 && chargeStartHour <= 15
                        ? "11:00 AM - 03:00 PM (Solar Peak Shift)"
                        : chargeStartHour >= 22 || chargeStartHour <= 6
                        ? "10:00 PM - 06:00 AM (Off-Peak Night)"
                        : "Shift to Night/Solar to optimize SOH"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing indicators */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4">
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <DollarSign className="w-4 h-4 text-rose-400 mb-2" />
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Charging Cost</span>
              <span className="text-sm font-black text-white">${chargingCost} / mo</span>
            </div>

            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 text-[#10B981] mb-2" />
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Estimated Savings</span>
              <span className="text-sm font-black text-[#10B981]">${energySavings} / mo</span>
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10px] text-muted-foreground/80 flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
            <p>
              High C-rate DC fast charging over 150 kW creates local cathode thermal wear. Maintain Level 2 AC when parking stays &gt; 3 hours.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
