"use client";

import React, { useState } from "react";
import { Sliders, Sun, ShieldCheck, Compass, Zap, Activity } from "lucide-react";

export function EnergyFlowCenter() {
  const [solarInput, setSolarInput] = useState(480); // kW
  const [windInput, setWindInput] = useState(320); // kW
  const [factoryLoad, setFactoryLoad] = useState(420); // kW

  // Calculations
  const buildingLoad = 320; // kW
  const evLoad = 180; // kW
  
  const totalGen = solarInput + windInput;
  const totalLoad = factoryLoad + buildingLoad + evLoad;
  const balance = totalGen - totalLoad; // positive = export, negative = import

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Config Sliders */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                GRID DISPATCH SIMULATOR
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Sliders className="w-5 h-5 text-[#00E676]" />
                Real-Time Energy Flow
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* Solar Input Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Solar PV Generation</span>
                  <span className="text-[#F4B400]">{solarInput} kW</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={solarInput}
                  onChange={(e) => setSolarInput(Number(e.target.value))}
                  className="w-full accent-[#F4B400] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>

              {/* Wind Input Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Wind Turbine Output</span>
                  <span className="text-[#00D4FF]">{windInput} kW</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="50"
                  value={windInput}
                  onChange={(e) => setWindInput(Number(e.target.value))}
                  className="w-full accent-[#00D4FF] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>

              {/* Factory Load Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Factory Operational Load</span>
                  <span className="text-white">{factoryLoad} kW</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={factoryLoad}
                  onChange={(e) => setFactoryLoad(Number(e.target.value))}
                  className="w-full accent-white bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Calculations show immediate net balance trends. Positive levels trigger battery charging buffers.</p>
          </div>
        </div>

        {/* Right Column SANKEY-style overview details */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>ACTIVE FLOW ROUTING PROFILE</span>
              <span>BALANCE RESOLUTIONS</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Total PV + Wind Gen</span>
                <span className="text-xl font-black text-[#00E676] mt-1.5 block">{totalGen} kW</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Total Consumer Loads</span>
                <span className="text-xl font-black text-white mt-1.5 block">{totalLoad} kW</span>
              </div>
            </div>

            <div className="bg-white/2 border border-white/5 p-4 rounded-xl text-center space-y-1">
              <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Net Grid Current Balance</span>
              <span className={`text-2xl font-black block ${balance >= 0 ? "text-[#00E676]" : "text-rose-400"}`}>
                {balance >= 0 ? `Exporting +${balance} kW` : `Importing ${balance} kW`}
              </span>
              <p className="text-[9.5px] text-muted-foreground/40 leading-none">
                {balance >= 0 ? "Excess power routing to commercial battery storage cells." : "Grid imports active to support heavy peak factory loads."}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-[10.5px] text-muted-foreground/50 font-mono uppercase tracking-wider">
            <span>Solar: {solarInput} kW</span>
            <span>Wind: {windInput} kW</span>
            <span>Factory: {factoryLoad} kW</span>
          </div>

        </div>

      </div>
    </section>
  );
}
