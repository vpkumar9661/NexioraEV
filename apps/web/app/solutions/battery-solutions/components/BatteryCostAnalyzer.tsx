"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Landmark, TrendingUp, Calendar, AlertCircle } from "lucide-react";

export function BatteryCostAnalyzer() {
  const [capacity, setCapacity] = useState(80); // kWh
  const [dailyThroughput, setDailyThroughput] = useState(60); // kWh
  const [tariff, setTariff] = useState(0.15); // $/kWh
  const [maintIndex, setMaintIndex] = useState(4); // % of capex per year

  // Calculated values
  const [packCost, setPackCost] = useState(0); // CAPEX
  const [annualOpex, setAnnualOpex] = useState(0); // Maintenance + charging
  const [paybackPeriod, setPaybackPeriod] = useState(0); // Years
  const [lifetimeSavings, setLifetimeSavings] = useState(0);
  const [roi, setRoi] = useState(0); // %

  useEffect(() => {
    // Battery cells pricing: assume LFP chemistry averages $125 / kWh
    const capex = capacity * 135;
    
    // Operating cost = energy throughput * utility tariff * 365 days
    // Maintenance = capex * maintIndex%
    const chargingCost = dailyThroughput * tariff * 350;
    const maintenance = capex * (maintIndex / 100);
    const opex = chargingCost + maintenance;

    // Peak Shaving savings logic: BESS offsets peak evening tariffs
    // Net daily savings = throughput * ($0.28 peak rate - tariff offpeak rate)
    const markupDiff = 0.28 - tariff;
    const annualSavings = dailyThroughput * markupDiff * 350;
    const netProfit = annualSavings - maintenance; // net savings minus maintenance overhead

    const payback = netProfit > 0 ? capex / netProfit : 15;
    const roiVal = capex > 0 ? (netProfit / capex) * 100 : 0;
    const tenYearSavings = (annualSavings * 10) - (opex * 10) - capex;

    setPackCost(capex);
    setAnnualOpex(Math.round(opex));
    setPaybackPeriod(parseFloat(payback.toFixed(1)));
    setLifetimeSavings(Math.round(tenYearSavings > 0 ? tenYearSavings : 0));
    setRoi(parseFloat(roiVal.toFixed(1)));
  }, [capacity, dailyThroughput, tariff, maintIndex]);

  // Generate 10-year cumulative costs
  const width = 280;
  const height = 110;

  const getCashFlow = () => {
    const flows: number[] = [];
    let cumulative = -packCost;
    flows.push(cumulative);

    for (let yr = 1; yr <= 10; yr++) {
      // cumulative is capex offset by net annual savings
      const annualSavings = dailyThroughput * (0.28 - tariff) * 350;
      const maintenance = packCost * (maintIndex / 100);
      cumulative += (annualSavings - maintenance);
      flows.push(cumulative);
    }
    return flows;
  };

  const cashFlows = getCashFlow();
  const maxFlow = Math.max(...cashFlows, packCost * 2);
  const minFlow = Math.min(...cashFlows, -packCost * 1.5);
  const range = maxFlow - minFlow || 1;

  const pointsString = cashFlows
    .map((val, idx) => {
      const x = 20 + (idx / 10) * (width - 40);
      const y = height - 15 - ((val - minFlow) / range) * (height - 30);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" L ");

  const zeroY = height - 15 - ((0 - minFlow) / range) * (height - 30);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Input Configuration Column */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] font-extrabold text-[#3B82F6] uppercase tracking-widest block">
              BESS DEPLOYMENT FINANCIALS
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Landmark className="w-5 h-5 text-[#3B82F6]" />
              Battery Cost Analyzer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/1 border border-white/5 p-5 rounded-2xl">
            {/* Sizing Capacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Storage Sizing</span>
                <span className="text-white">{capacity} kWh</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Daily throughput */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Daily Energy Dispensed</span>
                <span className="text-white">{dailyThroughput} kWh</span>
              </div>
              <input
                type="range"
                min="10"
                max={capacity}
                step="5"
                value={dailyThroughput}
                onChange={(e) => setDailyThroughput(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Utility rates */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Electricity Tariff rate</span>
                <span className="text-white">${tariff} / kWh</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.01"
                value={tariff}
                onChange={(e) => setTariff(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* maintenance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Annual O&M Overhead</span>
                <span className="text-white">{maintIndex}% of CAPEX</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={maintIndex}
                onChange={(e) => setMaintIndex(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>
          </div>
        </div>

        {/* Right Financial summaries & Line Graph */}
        <div className="w-full lg:w-[440px] rounded-[24px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between space-y-6 relative">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">CAPEX Pack Cost</span>
              <span className="text-xl font-black text-white">${packCost.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Annual OPEX</span>
              <span className="text-xl font-black text-rose-400">${annualOpex.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/10">
              <span className="text-[9px] text-[#10B981]/65 font-bold uppercase block flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                10-Yr Net Profit
              </span>
              <span className="text-xl font-black text-[#10B981]">${lifetimeSavings.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Payback duration</span>
              <span className="text-xl font-black text-[#00D4FF] flex items-baseline gap-1">
                {paybackPeriod} <span className="text-xs font-normal text-muted-foreground/60">years</span>
              </span>
            </div>
          </div>

          {/* Cumulative Cash Flow SVG Chart */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
                10-Year Cumulative Cash Flow
              </span>
              <span className="text-[9px] text-[#10B981] font-bold">
                ROI: {roi}%
              </span>
            </div>

            <div className="h-[110px] w-full flex items-center justify-center">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <line x1="20" y1={zeroY} x2={width - 20} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
                
                <path
                  d={`M ${pointsString}`}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {cashFlows.length > 0 && (
                  <circle
                    cx={20 + (10 / 10) * (width - 40)}
                    cy={height - 15 - (((cashFlows[10] ?? 0) - minFlow) / range) * (height - 30)}
                    r="3.5"
                    fill="#00D4FF"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                )}

                <text x="20" y={height - 2} fill="rgba(255,255,255,0.3)" fontSize="7">Year 0</text>
                <text x={width - 20} y={height - 2} fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="end">Year 10</text>
              </svg>
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10px] text-muted-foreground/80 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Excludes regional utility grid connectivity connection charges. Estimates LFP cell aging profiles based on standard operating rates.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
