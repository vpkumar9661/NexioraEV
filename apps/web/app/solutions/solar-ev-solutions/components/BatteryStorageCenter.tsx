"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, ShieldCheck, Compass, Heart, Award } from "lucide-react";

interface BatteryCompareRow {
  name: string;
  brand: string;
  capacity: string;
  maxPower: string;
  chemistry: string;
  warranty: string;
  costEstimate: string;
}

export function BatteryStorageCenter() {
  const [chargeLevel, setChargeLevel] = useState(82);

  const compareModels: BatteryCompareRow[] = [
    {
      name: "Powerwall 3",
      brand: "Tesla Energy",
      capacity: "13.5 kWh",
      maxPower: "11.5 kW",
      chemistry: "LFP (Lithium Iron Phosphate)",
      warranty: "10 Years (70% capacity)",
      costEstimate: "$9,200",
    },
    {
      name: "EnerOne",
      brand: "CATL",
      capacity: "15.0 kWh",
      maxPower: "10.0 kW",
      chemistry: "LFP",
      warranty: "12 Years",
      costEstimate: "$9,800",
    },
    {
      name: "Battery-Box Premium",
      brand: "BYD",
      capacity: "13.8 kWh",
      maxPower: "9.6 kW",
      chemistry: "LFP",
      warranty: "10 Years",
      costEstimate: "$8,900",
    },
    {
      name: "RESU Prime 16H",
      brand: "LG Energy Solution",
      capacity: "16.0 kWh",
      maxPower: "7.0 kW",
      chemistry: "NMC (Nickel Manganese Cobalt)",
      warranty: "10 Years (60% capacity)",
      costEstimate: "$10,500",
    },
    {
      name: "EverVolt Home",
      brand: "Panasonic",
      capacity: "17.1 kWh",
      maxPower: "7.6 kW",
      chemistry: "NMC",
      warranty: "10 Years",
      costEstimate: "$11,200",
    },
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Active Telemetry */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                STORAGE STORAGE MONITOR
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Battery className="w-5 h-5 text-[#00E676]" />
                Battery Storage Center
              </h2>
            </div>

            {/* Custom Battery Visual Representation */}
            <div className="flex items-center gap-5 bg-white/2 border border-white/5 p-5 rounded-2xl">
              <div className="w-16 h-28 border-2 border-white/20 rounded-xl relative p-1.5 flex flex-col justify-end shrink-0">
                {/* Battery Cap */}
                <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-5 h-1.5 bg-white/30 rounded-t-sm" />
                <motion.div
                  className="w-full rounded-lg bg-linear-to-t from-[#00E676] to-[#00D4FF]"
                  initial={{ height: 0 }}
                  animate={{ height: `${chargeLevel}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="space-y-2">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Active Capacity</span>
                <span className="text-3xl font-black text-white block">{chargeLevel}%</span>
                <div className="text-xs space-y-0.5 text-muted-foreground/75">
                  <p>Remaining: <span className="font-extrabold text-white">36.9 kWh</span></p>
                  <p>Backup Duration: <span className="font-extrabold text-[#00E676]">14.5 Hours</span></p>
                </div>
              </div>
            </div>

            {/* Diagnostic stats */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-bold">
              <div className="bg-white/1 border border-white/5 p-2 rounded-xl">
                <span className="text-[7.5px] text-muted-foreground/40 uppercase block">R-Trip Eff.</span>
                <span className="text-white block mt-0.5">92.5%</span>
              </div>
              <div className="bg-white/1 border border-white/5 p-2 rounded-xl">
                <span className="text-[7.5px] text-muted-foreground/40 uppercase block">Cycles</span>
                <span className="text-white block mt-0.5">480 / 6000</span>
              </div>
              <div className="bg-white/1 border border-white/5 p-2 rounded-xl">
                <span className="text-[7.5px] text-muted-foreground/40 uppercase block">Second Life</span>
                <span className="text-[#00D4FF] block mt-0.5">$3,420</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Second Life residual value is derived dynamically based on SOH remaining logs.</p>
          </div>
        </div>

        {/* Right Column Comparison Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-b border-white/5 pb-2 flex justify-between items-center">
            <span className="text-xs font-black text-white">Compare Battery Storage Systems</span>
            <span className="text-[9px] text-[#00D4FF] uppercase tracking-wider font-mono">Market Index 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-muted-foreground/45 text-[8.5px] uppercase font-bold tracking-wider">
                  <th className="pb-2.5">Model</th>
                  <th className="pb-2.5">Capacity</th>
                  <th className="pb-2.5">Max Output</th>
                  <th className="pb-2.5">Chemistry</th>
                  <th className="pb-2.5 text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {compareModels.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 font-extrabold text-white">
                      {item.name}
                      <span className="block text-[9px] font-medium text-muted-foreground/40">{item.brand}</span>
                    </td>
                    <td className="py-3 text-muted-foreground/80">{item.capacity}</td>
                    <td className="py-3 text-muted-foreground/80">{item.maxPower}</td>
                    <td className="py-3 text-[10px] text-muted-foreground/60">{item.chemistry}</td>
                    <td className="py-3 text-right font-bold text-[#00E676]">{item.costEstimate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
