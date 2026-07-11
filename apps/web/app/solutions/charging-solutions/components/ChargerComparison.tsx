"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Compass, DollarSign, Cpu, Check, HelpCircle, HardDrive } from "lucide-react";

interface ChargerType {
  id: string;
  name: string;
  sub: string;
  power: string;
  powerVal: number; // 0-100 for visual bar
  speed: string; // Range per hour
  speedVal: number; // 0-100
  efficiency: string;
  installationCost: string;
  maintenance: string;
  bestFor: string;
  cases: string[];
}

export function ChargerComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["dc-fast", "ultra-fast"]);

  const chargers: ChargerType[] = [
    {
      id: "level-1",
      name: "Level 1 AC",
      sub: "Household Standard",
      power: "1.4 kW - 1.9 kW",
      powerVal: 10,
      speed: "6 - 8 km / hour",
      speedVal: 5,
      efficiency: "90%",
      installationCost: "Minimal ($0 - $500)",
      maintenance: "Almost Zero",
      bestFor: "Overnight Home Parking",
      cases: ["Residential Garages", "Emergency Backup Charging"],
    },
    {
      id: "level-2",
      name: "Level 2 AC",
      sub: "Destination Charger",
      power: "7.2 kW - 22 kW",
      powerVal: 25,
      speed: "40 - 100 km / hour",
      speedVal: 20,
      efficiency: "92%",
      installationCost: "Low ($800 - $3,000)",
      maintenance: "Low (Annual inspections)",
      bestFor: "Workplace & Retail Hubs",
      cases: ["Corporate Offices", "Shopping Mall Lots", "Apartments"],
    },
    {
      id: "dc-fast",
      name: "DC Fast Charger",
      sub: "High Power Corridor",
      power: "50 kW - 150 kW",
      powerVal: 65,
      speed: "250 - 600 km / hour",
      speedVal: 70,
      efficiency: "94%",
      installationCost: "Medium ($20,000 - $50,000)",
      maintenance: "Medium (Filter cleaning, cable checks)",
      bestFor: "Fleet Depots & Highway Stops",
      cases: ["Logistics Depots", "Inter-city Rest Stops", "Fuel Stations"],
    },
    {
      id: "ultra-fast",
      name: "Ultra Fast DC",
      sub: "Liquid Cooled Grid",
      power: "150 kW - 350+ kW",
      powerVal: 100,
      speed: "Up to 1,200 km / hour",
      speedVal: 100,
      efficiency: "95%",
      installationCost: "High ($60,000 - $150,000+)",
      maintenance: "High (Coolant levels, cable cooling loops)",
      bestFor: "High-Frequency Expressways",
      cases: ["Highway Corridors", "Commercial Fleet Depots"],
    },
    {
      id: "wireless",
      name: "Wireless Charging",
      sub: "Induction Ground Pad",
      power: "3.2 kW - 11 kW",
      powerVal: 20,
      speed: "20 - 60 km / hour",
      speedVal: 15,
      efficiency: "88% (Air gap loss)",
      installationCost: "Medium ($4,000 - $12,000)",
      maintenance: "Low (Pad inspections, alignment tech)",
      bestFor: "Premium Residential & Autonomous Fleets",
      cases: ["Luxury Garage Parking", "Autonomous Taxi Ranks"],
    },
  ];

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // replace first item
        setSelectedIds([selectedIds[1]!, id]);
      }
    }
  };

  const selectedChargers = chargers.filter((c) => selectedIds.includes(c.id));

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-6">
        
        <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#A78BFA] uppercase tracking-widest block">
              HARDWARE SPECIFICATION SYSTEM
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <HardDrive className="w-5 h-5 text-[#A78BFA]" />
              Charger Comparison Center
            </h2>
          </div>

          {/* Quick selection tags */}
          <div className="flex flex-wrap gap-2">
            {chargers.map((c) => {
              const active = selectedIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => handleToggleSelect(c.id)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? "border-[#00E676] bg-[#00E676]/10 text-white"
                      : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 text-[#00E676]" />}
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison grid panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedChargers.map((charger) => (
            <div
              key={charger.id}
              className="p-5 rounded-[22px] border border-white/6 bg-white/3 flex flex-col justify-between space-y-5 shadow-lg relative"
            >
              {/* Decorative side accent based on charging power */}
              <div
                className="absolute top-0 left-5 w-10 h-0.5"
                style={{
                  background: charger.id === "ultra-fast" ? "#00E676" : charger.id === "dc-fast" ? "#00D4FF" : "#3B82F6",
                }}
              />

              <div className="space-y-1">
                <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">
                  {charger.sub}
                </p>
                <h3 className="text-lg font-black text-white">{charger.name}</h3>
              </div>

              {/* Bar charts indicators */}
              <div className="space-y-3 bg-black/35 p-3.5 rounded-xl border border-white/4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-muted-foreground/65 uppercase">
                    <span>Power Delivery</span>
                    <span className="text-white">{charger.power}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#00D4FF] to-[#3B82F6]"
                      style={{ width: `${charger.powerVal}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-muted-foreground/65 uppercase">
                    <span>Charging Speed</span>
                    <span className="text-white">{charger.speed}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#00E676] to-[#00D4FF]"
                      style={{ width: `${charger.speedVal}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Comparison list grid */}
              <div className="space-y-3.5 text-[11px] border-t border-white/5 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">SLA Efficiency</span>
                  <span className="font-extrabold text-white">{charger.efficiency}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">Installation Cost</span>
                  <span className="font-extrabold text-[#00E676]">{charger.installationCost}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">O&M Overhead</span>
                  <span className="font-extrabold text-white">{charger.maintenance}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground/45 font-bold uppercase text-[9px]">Best For</span>
                  <span className="font-extrabold text-[#00D4FF] text-right">{charger.bestFor}</span>
                </div>
              </div>

              {/* Specific cases tagging */}
              <div className="space-y-1.5 border-t border-white/5 pt-4">
                <span className="text-[9px] text-muted-foreground/45 font-bold uppercase block">Core Deployments</span>
                <div className="flex flex-wrap gap-1.5">
                  {charger.cases.map((cs, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-sm bg-white/4 text-muted-foreground text-[9.5px] font-medium"
                    >
                      {cs}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
