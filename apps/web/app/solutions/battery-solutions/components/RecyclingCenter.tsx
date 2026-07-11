"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Landmark, Leaf, Settings, ShieldCheck, HelpCircle } from "lucide-react";

export function RecyclingCenter() {
  const [retCapacity, setRetCapacity] = useState(60); // retired pack capacity (kWh)
  const [remainingSoh, setRemainingSoh] = useState(76); // % SOH remaining

  const [secondLifeScore, setSecondLifeScore] = useState(0); // 0-100 compatibility
  const [salvageValue, setSalvageValue] = useState(0); // $
  const [co2Credit, setCo2Credit] = useState(0); // Tons of CO2 offset

  useEffect(() => {
    // Second-life suitability is high if SOH > 75%
    let score = remainingSoh * 1.15;
    if (score > 100) score = 100;
    if (remainingSoh < 70) score = score * 0.7; // sharp drop below 70% SOH for stationary storage

    // Salvage metal index: LFP vs NMC
    // Lithium is roughly $14/kg, Cobalt $32/kg, Nickel $18/kg.
    // Average 100kWh pack contains roughly $3,000 worth of raw salvageable metals.
    const metalSalvage = retCapacity * 24.5 * (1 - remainingSoh / 100);

    // Environmental offsets: 1 kWh of recycled pack saves roughly 65kg of mining CO2 offsets
    const co2 = (retCapacity * 68) / 1000; // Tons

    setSecondLifeScore(Math.round(score));
    setSalvageValue(Math.round(metalSalvage));
    setCo2Credit(parseFloat(co2.toFixed(1)));
  }, [retCapacity, remainingSoh]);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Configuration Column */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest block">
              CIRCULAR ECONOMY PLATFORM
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <RefreshCcw className="w-5 h-5 text-[#10B981] animate-[spin_10s_linear_infinite]" />
              Second-Life & Recycling
            </h2>
          </div>

          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Assess Retired EV battery packs to calculate suitability indices for stationary grid backup structures and evaluate raw metal recycling valuations.
          </p>

          <div className="space-y-4 bg-white/1 border border-white/5 p-4 rounded-xl">
            {/* Retired pack capacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Retired Pack Capacity</span>
                <span className="text-[#00D4FF] font-black">{retCapacity} kWh</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={retCapacity}
                onChange={(e) => setRetCapacity(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
            </div>

            {/* SOH remaining */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Remaining Health (SOH)</span>
                <span className="text-[#10B981] font-black">{remainingSoh}% SOH</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={remainingSoh}
                onChange={(e) => setRemainingSoh(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />
            </div>
          </div>
        </div>

        {/* Right Output Analytical Card */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
              Circular Compatibility Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Compatibility rating progress ring */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">BESS Suitability</span>
                  <span className="text-sm font-black text-white mt-1 block">
                    {secondLifeScore >= 80 ? "Optimal Grid Buffer" : secondLifeScore >= 60 ? "Residential Backup Only" : "Direct Metal Salvage"}
                  </span>
                </div>
                <div className="text-xs font-black text-[#10B981] px-2 py-0.5 rounded-sm bg-[#10B981]/10 border border-[#10B981]/20">
                  {secondLifeScore}% Index
                </div>
              </div>

              {/* Salvage cash value */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Recycled Salvage Value</span>
                  <span className="text-sm font-black text-[#00D4FF] mt-1 block">${salvageValue.toLocaleString()}</span>
                </div>
                <Landmark className="w-5 h-5 text-[#00D4FF] opacity-60" />
              </div>
            </div>
          </div>

          {/* Environmental Carbon savings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div className="bg-white/1 border border-white/5 p-4 rounded-xl flex items-center gap-3">
              <Leaf className="w-5 h-5 text-[#10B981] shrink-0" />
              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Carbon Offset Credits</span>
                <span className="text-sm font-black text-white mt-0.5 block">{co2Credit} Tons CO2</span>
              </div>
            </div>

            <div className="bg-[#10B981]/5 border border-[#10B981]/15 p-4 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0" />
              <p className="text-[10px] text-muted-foreground/80 leading-normal">
                Approved for direct trade in national clean credit exchanges matching UNECE parameters.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
