"use client";

import React, { useState } from "react";
import { Sun, ShieldCheck, MapPin, Layers, Award } from "lucide-react";

export function SolarPlanner() {
  const [location, setLocation] = useState("San Francisco");
  const [roofArea, setRoofArea] = useState(800); // sq ft
  const [electricityBill, setElectricityBill] = useState(250); // $ / month
  const [hasEV, setHasEV] = useState(true);
  const [chargeFrequency, setChargeFrequency] = useState(4); // times per week

  // Interactive Sizing logic formulas
  const solarFactor = location === "Miami" ? 0.018 : location === "San Francisco" ? 0.015 : 0.012;
  const rawCapacity = roofArea * solarFactor;
  const maxCapacityFromBill = (electricityBill / 12) * (hasEV ? 1.25 : 1.0);
  const recommendedCapacity = Math.min(rawCapacity, maxCapacityFromBill);
  
  const numPanels = Math.max(4, Math.round((recommendedCapacity * 1000) / 400)); // 400W panels
  const inverterSize = Math.max(1.5, Number((recommendedCapacity * 0.9).toFixed(1)));
  const estimatedGen = Math.round(recommendedCapacity * 1450); // kWh / year
  const batterySize = hasEV ? Math.max(10, Math.round(chargeFrequency * 3.5)) : 10;
  const installationCost = Math.round(recommendedCapacity * 2400 + batterySize * 650);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Config Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#F4B400] uppercase tracking-widest block">
              SYSTEM CONFIGURATOR TOOL
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Sun className="w-5 h-5 text-[#F4B400]" />
              Solar Plant Planner
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            {/* Location selector */}
            <div className="space-y-2">
              <label className="text-muted-foreground/50 font-bold uppercase tracking-wider block">Target Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground/45 pointer-events-none" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/5 bg-white/2 font-bold text-white focus:outline-none focus:border-[#F4B400] transition-colors cursor-pointer"
                >
                  <option value="San Francisco">San Francisco (Moderate Sunlight)</option>
                  <option value="Miami">Miami (High Sunlight)</option>
                  <option value="Chicago">Chicago (Low Sunlight)</option>
                  <option value="New York">New York (Moderate Sunlight)</option>
                </select>
              </div>
            </div>

            {/* Roof Area slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-muted-foreground/50 uppercase tracking-wider">Available Roof Space</span>
                <span className="text-white">{roofArea} sq. ft.</span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="50"
                value={roofArea}
                onChange={(e) => setRoofArea(Number(e.target.value))}
                className="w-full accent-[#F4B400] bg-white/10 h-1.5 rounded-full cursor-pointer"
              />
            </div>

            {/* Electricity Bill slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-muted-foreground/50 uppercase tracking-wider">Monthly Utility Bill</span>
                <span className="text-white">${electricityBill} / mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={electricityBill}
                onChange={(e) => setElectricityBill(Number(e.target.value))}
                className="w-full accent-[#F4B400] bg-white/10 h-1.5 rounded-full cursor-pointer"
              />
            </div>

            {/* EV Toggles */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div>
                <label className="text-muted-foreground/50 font-bold uppercase tracking-wider block mb-2">EV Ownership</label>
                <div className="flex bg-white/2 rounded-xl p-1 border border-white/5">
                  <button
                    onClick={() => setHasEV(true)}
                    className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all cursor-pointer ${
                      hasEV ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setHasEV(false)}
                    className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all cursor-pointer ${
                      !hasEV ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {hasEV && (
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-[10.5px]">
                    <span className="text-muted-foreground/50 uppercase tracking-wider">Charge cycles</span>
                    <span className="text-white">{chargeFrequency}x / wk</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={chargeFrequency}
                    onChange={(e) => setChargeFrequency(Number(e.target.value))}
                    className="w-full accent-[#F4B400] bg-white/10 h-1.5 rounded-full cursor-pointer mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column Calculated Outputs */}
        <div className="lg:col-span-6 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div>
              <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#F4B400] uppercase tracking-widest">
                AI Optimization Proposal
              </span>
              <h3 className="text-base font-black text-white mt-2.5">Recommended Hardware Bundle</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs border-t border-white/5 pt-4">
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">PV Plant Capacity</span>
                <span className="font-extrabold text-white mt-0.5 block">{recommendedCapacity.toFixed(1)} kW DC</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Estimated generation</span>
                <span className="font-extrabold text-[#00E676] mt-0.5 block">{estimatedGen.toLocaleString()} kWh/yr</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Solar Panels count</span>
                <span className="font-extrabold text-white mt-0.5 block">{numPanels} Panels (400W)</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Recommended Battery</span>
                <span className="font-extrabold text-white mt-0.5 block">{batterySize} kWh capacity</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Recommended Inverter</span>
                <span className="font-extrabold text-white mt-0.5 block">{inverterSize} kW AC</span>
              </div>
              <div>
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Roof Coverage</span>
                <span className="font-extrabold text-[#00D4FF] mt-0.5 block">
                  {Math.min(100, Math.round((numPanels * 18 * 100) / roofArea))}%
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex justify-between items-center">
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Est. Installation Net CAPEX</span>
              <span className="text-2xl font-black text-[#00E676]">${installationCost.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[9px] text-muted-foreground/60 max-w-[200px] flex gap-2 items-start">
              <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
              <p>Includes 30% Federal ITC solar tax credit deduction.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
