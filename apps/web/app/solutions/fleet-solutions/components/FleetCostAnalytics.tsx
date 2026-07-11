"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Landmark, TrendingUp, Compass, AlertCircle } from "lucide-react";

export function FleetCostAnalytics() {
  const [fleetSize, setFleetSize] = useState(50); // number of vans
  const [dailyMiles, setDailyMiles] = useState(80); // miles/day per van
  const [elecRate, setElecRate] = useState(0.12); // $/kWh
  const [dieselPrice, setDieselPrice] = useState(4.20); // $/gallon

  // Outputs
  const [evCost, setEvCost] = useState(0); // annual
  const [iceCost, setIceCost] = useState(0); // annual
  const [annualSavings, setAnnualSavings] = useState(0);
  const [paybackYears, setPaybackYears] = useState(0);

  useEffect(() => {
    // EV metrics: assume 0.35 kWh per mile average
    const evKwhPerMile = 0.35;
    const annualEvFuel = fleetSize * dailyMiles * 300 * evKwhPerMile * elecRate;
    
    // EV maintenance is roughly $0.05 per mile
    const annualEvMaint = fleetSize * dailyMiles * 300 * 0.05;
    const totalEv = annualEvFuel + annualEvMaint;

    // ICE metrics: assume 15 MPG average for diesel vans
    const iceMpg = 15;
    const annualIceFuel = (fleetSize * dailyMiles * 300 / iceMpg) * dieselPrice;
    
    // ICE maintenance is roughly $0.12 per mile
    const annualIceMaint = fleetSize * dailyMiles * 300 * 0.12;
    const totalIce = annualIceFuel + annualIceMaint;

    // Sizing price: assume EV premium is $15,000 extra per van
    const capexPremium = fleetSize * 15000;
    const savings = totalIce - totalEv;
    const payback = savings > 0 ? capexPremium / savings : 10;

    setEvCost(Math.round(totalEv));
    setIceCost(Math.round(totalIce));
    setAnnualSavings(Math.round(savings));
    setPaybackYears(parseFloat(payback.toFixed(1)));
  }, [fleetSize, dailyMiles, elecRate, dieselPrice]);

  // SVG Chart constants
  const width = 280;
  const height = 110;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Inputs column */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] font-extrabold text-[#3B82F6] uppercase tracking-widest block">
              LOGISTICS PORTFOLIO VALUATION
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Landmark className="w-5 h-5 text-[#3B82F6]" />
              Fleet Cost Analytics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/1 border border-white/5 p-5 rounded-2xl">
            {/* Fleet sizing */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Fleet size</span>
                <span className="text-white">{fleetSize} vans</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={fleetSize}
                onChange={(e) => setFleetSize(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Daily range */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Daily mileage</span>
                <span className="text-white">{dailyMiles} miles/van</span>
              </div>
              <input
                type="range"
                min="30"
                max="150"
                step="5"
                value={dailyMiles}
                onChange={(e) => setDailyMiles(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* electricity rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Electricity Tariff</span>
                <span className="text-white">${elecRate} / kWh</span>
              </div>
              <input
                type="range"
                min="0.06"
                max="0.25"
                step="0.01"
                value={elecRate}
                onChange={(e) => setElecRate(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* diesel price */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted-foreground/60 uppercase">
                <span>Diesel Fuel Rate</span>
                <span className="text-white">${dieselPrice} / gallon</span>
              </div>
              <input
                type="range"
                min="2.50"
                max="6.00"
                step="0.10"
                value={dieselPrice}
                onChange={(e) => setDieselPrice(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>
          </div>
        </div>

        {/* Right Financial summaries */}
        <div className="w-full lg:w-[440px] rounded-[24px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between space-y-6 relative">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Annual EV Ops Cost</span>
              <span className="text-xl font-black text-white">${evCost.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Annual Diesel Cost</span>
              <span className="text-xl font-black text-rose-400">${iceCost.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/10">
              <span className="text-[9px] text-[#10B981]/65 font-bold uppercase block flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Annual Net Profit
              </span>
              <span className="text-xl font-black text-[#10B981]">${annualSavings.toLocaleString()}</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/4">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Payback duration</span>
              <span className="text-xl font-black text-[#00D4FF] flex items-baseline gap-1">
                {paybackYears} <span className="text-xs font-normal text-muted-foreground/60">years</span>
              </span>
            </div>
          </div>

          {/* Simple financial line graph graphic */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground/40 font-bold uppercase">
              <span>Cumulative EV vs Diesel Cost Projection</span>
            </div>

            <div className="h-[50px] w-full">
              <svg viewBox={`0 0 ${width} ${height - 60}`} className="w-full h-full overflow-visible">
                {/* Diesel line */}
                <path d={`M 20,40 Q 140,28 260,10`} fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* EV line */}
                <path d={`M 20,40 Q 140,38 260,35`} fill="none" stroke="#10B981" strokeWidth="2" />
                
                <circle cx="260" cy="35" r="2.5" fill="#10B981" />
                <circle cx="260" cy="10" r="2" fill="rgba(239,68,68,0.8)" />
              </svg>
            </div>

            <div className="flex justify-between text-[8px] text-muted-foreground/40 font-mono">
              <span>Year 0 (Deploy)</span>
              <span>Year 5 (Amortized)</span>
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10px] text-muted-foreground/75 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              Includes standard vehicle tax credits of $7,500 under federal clean commercial transport grants.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
