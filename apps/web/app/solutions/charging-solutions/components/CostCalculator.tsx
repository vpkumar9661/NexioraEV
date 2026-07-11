"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Landmark, TrendingUp, Calendar, AlertCircle } from "lucide-react";

export function CostCalculator() {
  // Slider Inputs
  const [civilWork, setCivilWork] = useState(15000); // $
  const [electricalWork, setElectricalWork] = useState(25000); // $
  const [transformerCost, setTransformerCost] = useState(35000); // $
  const [cableCost, setCableCost] = useState(8000); // $
  const [chargerUnits, setChargerUnits] = useState(60000); // $ (Multiple charging stations)
  const [softwareLicensing, setSoftwareLicensing] = useState(3000); // $ per year
  const [maintenancePercent, setMaintenancePercent] = useState(5); // % of CAPEX per year

  // Calculated States
  const [capex, setCapex] = useState(0);
  const [opex, setOpex] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0); // Years
  const [annualRevenue, setAnnualRevenue] = useState(0);
  const [annualProfit, setAnnualProfit] = useState(0);
  const [roi, setRoi] = useState(0); // %

  // Heuristics for Revenue Calculation
  // Assume charger units value determines charger counts (e.g. $10k per unit = 6 chargers)
  // Each charger drives average 150 kWh/day of traffic.
  useEffect(() => {
    const calculatedCapex = civilWork + electricalWork + transformerCost + cableCost + chargerUnits;
    
    // Software is annual, maintenance is calculated as % of physical CAPEX
    const physicalCapex = civilWork + electricalWork + transformerCost + cableCost + chargerUnits;
    const calculatedOpex = softwareLicensing + (physicalCapex * (maintenancePercent / 100));

    // Assume 6 units deployed based on unit values
    const chargerCount = Math.max(2, Math.floor(chargerUnits / 12000));
    const dailyVolume = chargerCount * 140; // 140 kWh per charger per day
    const electricityMarkup = 0.11; // Net profit markup per kWh ($0.11 / kWh)
    const dailyRevenue = dailyVolume * electricityMarkup;
    const calculatedAnnualRevenue = dailyRevenue * 345; // 345 active days
    const calculatedAnnualProfit = calculatedAnnualRevenue - calculatedOpex;

    const calculatedPayback = calculatedAnnualProfit > 0 ? calculatedCapex / calculatedAnnualProfit : 15;
    const calculatedRoi = calculatedCapex > 0 ? (calculatedAnnualProfit / calculatedCapex) * 100 : 0;

    setCapex(calculatedCapex);
    setOpex(calculatedOpex);
    setPaybackPeriod(parseFloat(calculatedPayback.toFixed(1)));
    setAnnualRevenue(Math.round(calculatedAnnualRevenue));
    setAnnualProfit(Math.round(calculatedAnnualProfit));
    setRoi(parseFloat(calculatedRoi.toFixed(1)));
  }, [civilWork, electricalWork, transformerCost, cableCost, chargerUnits, softwareLicensing, maintenancePercent]);

  // Generate cash flow points for 10-year cumulative chart
  const getCashFlowPoints = () => {
    const points: number[] = [];
    let cumulative = -capex;
    points.push(cumulative);

    for (let yr = 1; yr <= 10; yr++) {
      cumulative += annualProfit;
      points.push(cumulative);
    }
    return points;
  };

  const cashFlows = getCashFlowPoints();
  const maxCashFlow = Math.max(...cashFlows, capex * 2);
  const minCashFlow = Math.min(...cashFlows, -capex * 1.5);
  const range = maxCashFlow - minCashFlow || 1;

  // SVG Coordinates mapping
  const width = 280;
  const height = 110;
  const pointsString = cashFlows
    .map((val, idx) => {
      const x = 20 + (idx / 10) * (width - 40);
      const y = height - 15 - ((val - minCashFlow) / range) * (height - 30);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" L ");

  // Zero-line coordinate
  const zeroY = height - 15 - ((0 - minCashFlow) / range) * (height - 30);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Input Sliders Column */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] font-extrabold text-[#3B82F6] uppercase tracking-widest block">
              CAPITAL ALLOCATION SIMULATOR
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Landmark className="w-5 h-5 text-[#3B82F6]" />
              Infrastructure Cost Calculator
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/1 border border-white/5 p-5 rounded-2xl">
            {/* Civil Prep */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Civil Site Prep</span>
                <span className="text-white">${civilWork.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={civilWork}
                onChange={(e) => setCivilWork(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Electrical Prep */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Electrical Cabling & Panels</span>
                <span className="text-white">${electricalWork.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="80000"
                step="1000"
                value={electricalWork}
                onChange={(e) => setElectricalWork(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Transformer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Substation Transformer</span>
                <span className="text-white">${transformerCost.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={transformerCost}
                onChange={(e) => setTransformerCost(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Cables */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Liquid Cooled Cabling</span>
                <span className="text-white">${cableCost.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="5000"
                value={cableCost}
                onChange={(e) => setCableCost(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Charger Hardware */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Charger Hardware Fleet</span>
                <span className="text-white">${chargerUnits.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={chargerUnits}
                onChange={(e) => setChargerUnits(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Software */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>SaaS CMS Software</span>
                <span className="text-white">${softwareLicensing.toLocaleString()} / yr</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={softwareLicensing}
                onChange={(e) => setSoftwareLicensing(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Maintenance */}
            <div className="space-y-1.5 md:col-span-2">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Annual Maintenance Reserve</span>
                <span className="text-white">{maintenancePercent}% of CAPEX</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                step="1"
                value={maintenancePercent}
                onChange={(e) => setMaintenancePercent(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>
          </div>
        </div>

        {/* Right Outputs and Cumulative Chart Column */}
        <div className="w-full lg:w-[440px] rounded-[24px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between space-y-6 relative">
          
          {/* Key outputs summary grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Total CAPEX</span>
              <span className="text-xl font-black text-white">${capex.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Annual OPEX</span>
              <span className="text-xl font-black text-rose-400">${opex.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#00E676]/5 border border-[#00E676]/10">
              <span className="text-[9px] text-[#00E676]/65 font-bold uppercase block flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Annual Net Profit
              </span>
              <span className="text-xl font-black text-[#00E676]">${annualProfit.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Payback Period</span>
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
              <span className="text-[9px] text-[#00E676] font-bold">
                ROI: {roi}%
              </span>
            </div>

            <div className="h-[110px] w-full flex items-center justify-center">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {/* Horizontal reference grid lines */}
                <line x1="20" y1={zeroY} x2={width - 20} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
                
                {/* Cash Flow Line Path */}
                <path
                  d={`M ${pointsString}`}
                  fill="none"
                  stroke="#00E676"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Shimmer dot on active path */}
                {cashFlows.length > 0 && (
                  <circle
                    cx={20 + (10 / 10) * (width - 40)}
                    cy={height - 15 - (((cashFlows[10] ?? 0) - minCashFlow) / range) * (height - 30)}
                    r="3.5"
                    fill="#00D4FF"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                )}

                {/* X Axis Labels */}
                <text x="20" y={height - 2} fill="rgba(255,255,255,0.3)" fontSize="7">Year 0</text>
                <text x={width - 20} y={height - 2} fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="end">Year 10</text>
                
                {/* Y Axis Max / Min marker labels */}
                <text x="18" y="15" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">+$500k</text>
                <text x="18" y={height - 18} fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">-$250k</text>
              </svg>
            </div>
          </div>

          {/* Alert check details */}
          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10px] text-muted-foreground/80 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Excludes land procurement costs. Assumes standard commercial demand markup parameters within standard inter-city operational hubs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
