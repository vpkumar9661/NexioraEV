"use client";

import { useState } from "react";
import { Calculator, Zap, Clock, Compass, DollarSign, Activity } from "lucide-react";

type CalcType = "capacity" | "runtime" | "charging" | "range" | "cycles" | "cost";

interface CalcTab {
  id: CalcType;
  label: string;
  icon: typeof Calculator;
}

const TABS: CalcTab[] = [
  { id: "capacity", label: "Capacity", icon: Calculator },
  { id: "runtime", label: "Runtime", icon: Clock },
  { id: "charging", label: "Charge Time", icon: Zap },
  { id: "range", label: "Est. Range", icon: Compass },
  { id: "cycles", label: "Cycle Life", icon: Activity },
  { id: "cost", label: "Pack Cost", icon: DollarSign }
];

export function BatteryCalculators() {
  const [activeTab, setActiveTab] = useState<CalcType>("capacity");

  // capacity calculator states
  const [voltage, setVoltage] = useState(400);
  const [ampHours, setAmpHours] = useState(180);

  // runtime states
  const [capWh, setCapWh] = useState(72); // kWh
  const [loadKw, setLoadKw] = useState(25); // kW

  // charging states
  const [chargeCap, setChargeCap] = useState(72); // kWh
  const [powerKw, setPowerKw] = useState(50); // kW

  // range states
  const [rangeCap, setRangeCap] = useState(72); // kWh
  const [efficiency, setEfficiency] = useState(150); // Wh/km

  // cycle states
  const [totalCycles, setTotalCycles] = useState(1500);
  const [chemType, setChemType] = useState<"lfp" | "nmc">("lfp");

  // cost states
  const [costCap, setCostCap] = useState(72);
  const [costPerKwh, setCostPerKwh] = useState(110);

  return (
    <section id="calculators" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Intelligence Calculators</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Run mathematical computations for battery capacity, range, charging times, and lifecycle costs</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Tabs Navigator */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 font-semibold text-xs ${
                  isActive
                    ? "bg-white/4 border-[#10B981]/40 text-[#6EE7B7]"
                    : "bg-white/1 border-white/5 text-muted-foreground/60 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Calculator Input/Output Grid */}
        <div className="lg:col-span-8 rounded-[20px] border border-white/5 bg-white/2 p-6 min-h-[300px] flex flex-col justify-between gap-6">
          
          {/* Capacity Calculator */}
          {activeTab === "capacity" && (
            <div className="space-y-6">
              <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider block border-b border-white/5 pb-2">Battery Pack Capacity (Wh / kWh)</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Nominal Voltage</span>
                    <span className="text-white font-extrabold">{voltage} V</span>
                  </div>
                  <input
                    type="range" min="100" max="800" step="10" value={voltage}
                    onChange={(e) => setVoltage(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Amp Hours (Ah)</span>
                    <span className="text-white font-extrabold">{ampHours} Ah</span>
                  </div>
                  <input
                    type="range" min="10" max="300" step="5" value={ampHours}
                    onChange={(e) => setAmpHours(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#131722]/50 border border-white/3 text-center">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Calculated Total Energy</span>
                <span className="text-3xl font-black text-white mt-1.5 block">
                  {((voltage * ampHours) / 1000).toFixed(1)} kWh
                </span>
                <span className="text-[11px] text-muted-foreground/50 block mt-1">({voltage * ampHours} Watt-Hours)</span>
              </div>
            </div>
          )}

          {/* Runtime Calculator */}
          {activeTab === "runtime" && (
            <div className="space-y-6">
              <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider block border-b border-white/5 pb-2">Load Runtime Hours</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Pack Capacity</span>
                    <span className="text-white font-extrabold">{capWh} kWh</span>
                  </div>
                  <input
                    type="range" min="10" max="150" step="2" value={capWh}
                    onChange={(e) => setCapWh(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Average Discharge Load</span>
                    <span className="text-white font-extrabold">{loadKw} kW</span>
                  </div>
                  <input
                    type="range" min="1" max="100" step="1" value={loadKw}
                    onChange={(e) => setLoadKw(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#131722]/50 border border-white/3 text-center">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Estimated Run Duration</span>
                <span className="text-3xl font-black text-white mt-1.5 block">
                  {(capWh / loadKw).toFixed(2)} Hours
                </span>
                <span className="text-[11px] text-muted-foreground/50 block mt-1">(Under continuous constant draw)</span>
              </div>
            </div>
          )}

          {/* Charging Time Calculator */}
          {activeTab === "charging" && (
            <div className="space-y-6">
              <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider block border-b border-white/5 pb-2">DC / AC Charge Duration Estimator</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Pack Capacity</span>
                    <span className="text-white font-extrabold">{chargeCap} kWh</span>
                  </div>
                  <input
                    type="range" min="10" max="150" step="2" value={chargeCap}
                    onChange={(e) => setChargeCap(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Charger Output Power</span>
                    <span className="text-white font-extrabold">{powerKw} kW</span>
                  </div>
                  <input
                    type="range" min="2" max="350" step="5" value={powerKw}
                    onChange={(e) => setPowerKw(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#131722]/50 border border-white/3 text-center">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Estimated Charge Duration (10% to 80%)</span>
                <span className="text-3xl font-black text-white mt-1.5 block">
                  {/* includes typical tapering coefficient (1.15) for estimation */}
                  {(((chargeCap * 0.7) / powerKw) * 1.15 * 60).toFixed(0)} Mins
                </span>
                <span className="text-[11px] text-muted-foreground/50 block mt-1">
                  (Approx. {(((chargeCap * 0.7) / powerKw) * 1.15).toFixed(1)} Hours with charging taper curve)
                </span>
              </div>
            </div>
          )}

          {/* Range Calculator */}
          {activeTab === "range" && (
            <div className="space-y-6">
              <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider block border-b border-white/5 pb-2">Estimated Driving Range</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Pack Capacity</span>
                    <span className="text-white font-extrabold">{rangeCap} kWh</span>
                  </div>
                  <input
                    type="range" min="10" max="150" step="2" value={rangeCap}
                    onChange={(e) => setRangeCap(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Vehicle Efficiency Draw</span>
                    <span className="text-white font-extrabold">{efficiency} Wh/km</span>
                  </div>
                  <input
                    type="range" min="80" max="300" step="5" value={efficiency}
                    onChange={(e) => setEfficiency(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#131722]/50 border border-white/3 text-center">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Estimated Driving Range</span>
                <span className="text-3xl font-black text-white mt-1.5 block">
                  {Math.round((rangeCap * 1000) / efficiency)} km
                </span>
                <span className="text-[11px] text-muted-foreground/50 block mt-1">(Under combined driving drive cycles)</span>
              </div>
            </div>
          )}

          {/* Cycle Life Estimator */}
          {activeTab === "cycles" && (
            <div className="space-y-6">
              <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider block border-b border-white/5 pb-2">Lifecycle State of Health (SOH)</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Total Cycles</span>
                    <span className="text-white font-extrabold">{totalCycles} Cycles</span>
                  </div>
                  <input
                    type="range" min="0" max="6000" step="100" value={totalCycles}
                    onChange={(e) => setTotalCycles(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-muted-foreground/60 text-xs block mb-1">Cell Chemistry Profile</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setChemType("lfp")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        chemType === "lfp" ? "bg-[#10B981]/15 border-[#10B981] text-[#6EE7B7]" : "border-white/5 text-muted-foreground/60"
                      }`}
                    >
                      LFP (Cobalt-Free)
                    </button>
                    <button
                      onClick={() => setChemType("nmc")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        chemType === "nmc" ? "bg-[#10B981]/15 border-[#10B981] text-[#6EE7B7]" : "border-white/5 text-muted-foreground/60"
                      }`}
                    >
                      NMC (Long Range)
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#131722]/50 border border-white/3 text-center">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Estimated State of Health (SOH)</span>
                <span className="text-3xl font-black text-white mt-1.5 block">
                  {(() => {
                    const threshold = chemType === "lfp" ? 5000 : 2000;
                    const SOH = Math.max(50, 100 - (totalCycles / threshold) * 20);
                    return `${SOH.toFixed(1)}% SOH`;
                  })()}
                </span>
                <span className="text-[11px] text-muted-foreground/50 block mt-1">
                  (Ideal capacity retention delta)
                </span>
              </div>
            </div>
          )}

          {/* Pack Cost Calculator */}
          {activeTab === "cost" && (
            <div className="space-y-6">
              <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider block border-b border-white/5 pb-2">Estimated Raw Pack Manufacturing Cost</span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Pack Capacity</span>
                    <span className="text-white font-extrabold">{costCap} kWh</span>
                  </div>
                  <input
                    type="range" min="10" max="150" step="2" value={costCap}
                    onChange={(e) => setCostCap(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60">Chemistry Cell Cost per kWh</span>
                    <span className="text-white font-extrabold">${costPerKwh} / kWh</span>
                  </div>
                  <input
                    type="range" min="50" max="250" step="5" value={costPerKwh}
                    onChange={(e) => setCostPerKwh(parseInt(e.target.value))}
                    className="w-full accent-[#10B981] bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#131722]/50 border border-white/3 text-center">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Estimated Total Cost</span>
                <span className="text-3xl font-black text-white mt-1.5 block">
                  ${(costCap * costPerKwh).toLocaleString()}
                </span>
                <span className="text-[11px] text-muted-foreground/50 block mt-1">
                  (Approx. ₹{Math.round(costCap * costPerKwh * 85).toLocaleString()} INR)
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
