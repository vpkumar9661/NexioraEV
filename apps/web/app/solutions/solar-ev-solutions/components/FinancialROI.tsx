"use client";

import React, { useState } from "react";
import { DollarSign, ShieldCheck, TrendingUp, Sliders, Landmark } from "lucide-react";

export function FinancialROI() {
  const [inflationRate, setInflationRate] = useState(6); // % utility inflation per year
  const [feedInTariff, setFeedInTariff] = useState(0.08); // $ / kWh exported

  // Interactive calculations
  const grossCAPEX = 22400;
  const federalITC = 6720;
  const netCAPEX = grossCAPEX - federalITC;
  
  // Base annual saving is $2,400. Higher inflation rate scales savings.
  const annualSavings = 2400 * (1 + (inflationRate - 5) / 100) + 400 * (feedInTariff / 0.08);
  const paybackPeriod = Number((netCAPEX / annualSavings).toFixed(1));
  const cumulative25Yr = Math.round(annualSavings * 25 * (1 + (inflationRate / 2) / 100));

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Config Sliders */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#F4B400] uppercase tracking-widest block">
                AMORTIZATION MODEL CALCULATOR
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Landmark className="w-5 h-5 text-[#F4B400]" />
                Financial ROI Center
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* Utility Inflation Rate slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Utility Inflation Rate</span>
                  <span className="text-white">{inflationRate}% / year</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full accent-[#F4B400] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>

              {/* Feed-in Tariff slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Net Metering Export Credit</span>
                  <span className="text-white">${feedInTariff.toFixed(2)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.20"
                  step="0.01"
                  value={feedInTariff}
                  onChange={(e) => setFeedInTariff(Number(e.target.value))}
                  className="w-full accent-[#F4B400] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Calculations account for the 25-year linear performance warranty standard on tier-1 PV cells.</p>
          </div>
        </div>

        {/* Right Column Financial Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              CAPEX & ITC Deductions
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">${grossCAPEX.toLocaleString()}</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">-${federalITC.toLocaleString()} Federal Tax Credit</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Net Capital Cost
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">${netCAPEX.toLocaleString()}</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Out-of-pocket investment</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Year 1 Net Savings
            </span>
            <div>
              <span className="text-xl font-black text-[#00E676] block mt-1.5">${Math.round(annualSavings).toLocaleString()} / yr</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Utility offset + net metering</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Payback Cycle
            </span>
            <div>
              <span className="text-xl font-black text-[#00D4FF] block mt-1.5">{paybackPeriod} Years</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Breakeven amortization point</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              25-Year Cumulative
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">${cumulative25Yr.toLocaleString()}</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Lifetime asset yield value</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Internal Rate of Return
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">14.8% IRR</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Exceeds index fund standard</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
