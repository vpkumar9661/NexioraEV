"use client";

import React, { useState, useEffect } from "react";
import { Building, MapPin, Zap, Info, ShieldCheck, DollarSign, Trees, Settings } from "lucide-react";

export function ChargingPlanner() {
  // Input states
  const [propertyName, setPropertyName] = useState("Nexiora Hub Alpha");
  const [propertyType, setPropertyType] = useState("Commercial");
  const [parkingCapacity, setParkingCapacity] = useState(50);
  const [expectedVehicles, setExpectedVehicles] = useState(20);
  const [chargingDemand, setChargingDemand] = useState(450); // kWh/day
  const [chargingType, setChargingType] = useState("DC Fast");
  const [budget, setBudget] = useState(150000); // $

  // Output states (dynamically calculated)
  const [recommendedChargers, setRecommendedChargers] = useState(0);
  const [powerFootprint, setPowerFootprint] = useState(0); // kW
  const [transformerSize, setTransformerSize] = useState(0); // kVA
  const [landRequirement, setLandRequirement] = useState(0); // sq ft
  const [installationCost, setInstallationCost] = useState(0); // $
  const [expectedROI, setExpectedROI] = useState(0); // %
  const [carbonReduction, setCarbonReduction] = useState(0); // Tons/year

  useEffect(() => {
    // Basic calculation heuristics based on properties
    let chargerPower = 7.4; // AC
    if (chargingType === "DC Fast") chargerPower = 60;
    if (chargingType === "Ultra Fast") chargerPower = 150;
    if (chargingType === "Dual Gun") chargerPower = 120; // 2x 60kW

    // Calculate recommended chargers
    // Heuristic: expectedVehicles * 0.25 chargers minimum, or based on demand
    const hourlyThroughput = chargingDemand / 8; // average 8 active charging hours
    let qty = Math.ceil(hourlyThroughput / chargerPower);
    if (qty < 2) qty = 2;
    // cap by parking capacity
    if (qty > parkingCapacity * 0.4) qty = Math.max(2, Math.floor(parkingCapacity * 0.4));

    // Power Footprint = Qty * power per charger * simultaneous usage factor (e.g. 0.8)
    const power = qty * chargerPower * 0.85;

    // Grid Transformer sizing: power footprint / power factor (0.9) * safety factor (1.2)
    const transformer = Math.ceil((power / 0.9) * 1.15);

    // Land Requirement: 120 sq ft per charger space (including civil spacing)
    const land = qty * 150;

    // Cost heuristic
    let unitCost = 2500; // AC
    if (chargingType === "DC Fast") unitCost = 28000;
    if (chargingType === "Ultra Fast") unitCost = 65000;
    if (chargingType === "Dual Gun") unitCost = 45000;

    const baseCivil = qty * 3500;
    const gridPrep = transformer > 100 ? 25000 : 8000;
    const estCost = qty * unitCost + baseCivil + gridPrep;

    // ROI heuristic
    // Revenue per day = demand * charging markup ($0.08 / kWh)
    const markup = chargingType === "AC" ? 0.05 : 0.12;
    const dailyRev = chargingDemand * markup;
    const annualRev = dailyRev * 340; // 340 active operational days
    const annualOpex = estCost * 0.06; // 6% maintenance
    const netProfit = annualRev - annualOpex;
    const roiVal = estCost > 0 ? (netProfit / estCost) * 100 : 0;

    // Carbon reduction: 0.4kg CO2 saved per electric km driven vs petrol
    // Average 1 kWh = 5 km driven. 450 kWh = 2250 km. 2250 * 0.4 = 900 kg CO2 / day = 0.9 Tons/day
    const carbon = (chargingDemand * 5 * 0.43 * 365) / 1000; // Tons per year

    setRecommendedChargers(qty);
    setPowerFootprint(Math.round(power));
    setTransformerSize(transformer);
    setLandRequirement(land);
    setInstallationCost(Math.round(estCost));
    setExpectedROI(parseFloat(roiVal.toFixed(1)));
    setCarbonReduction(Math.round(carbon));
  }, [propertyType, parkingCapacity, expectedVehicles, chargingDemand, chargingType]);

  const propertyTypes = ["Residential", "Commercial", "Office", "Highway", "Mall", "Hospital", "Fleet Depot"];
  const chargingTypes = [
    { name: "AC Charger (22kW)", value: "AC" },
    { name: "DC Fast (60kW)", value: "DC Fast" },
    { name: "Ultra Fast (150kW)", value: "Ultra Fast" },
    { name: "Dual Gun DC (120kW)", value: "Dual Gun" }
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Input Configuration Column */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#00E676] animate-[spin_8s_linear_infinite]" />
              Smart Infrastructure Configuration
            </h2>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Adjust parameters to simulate charging site layouts and grid power footprints in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-muted-foreground/50 uppercase tracking-wider block">
                Project Site Name
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 focus:bg-black/40 focus:border-[#00E676]/50 text-sm text-white outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-muted-foreground/50 uppercase tracking-wider block">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/2 focus:border-[#00E676]/50 text-sm text-white outline-hidden transition-all [&_option]:bg-[#0c0e14] [&_option]:text-white"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sliders Block */}
          <div className="space-y-5 bg-white/1 border border-white/5 p-4 rounded-2xl">
            {/* Parking Capacity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Total Parking Slots</span>
                <span className="text-[#00D4FF] font-black">{parkingCapacity} bays</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                value={parkingCapacity}
                onChange={(e) => setParkingCapacity(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
            </div>

            {/* Expected Daily Vehicles */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Expected Daily EV Inflow</span>
                <span className="text-[#00E676] font-black">{expectedVehicles} EVs</span>
              </div>
              <input
                type="range"
                min="2"
                max="150"
                value={expectedVehicles}
                onChange={(e) => setExpectedVehicles(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
            </div>

            {/* Daily Energy Demand */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-muted-foreground/60 uppercase tracking-wider">Target Grid Energy Supply</span>
                <span className="text-[#3B82F6] font-black">{chargingDemand} kWh / day</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={chargingDemand}
                onChange={(e) => setChargingDemand(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>
          </div>

          {/* Charging Hardware Config selector */}
          <div className="space-y-3">
            <label className="text-[11px] font-extrabold text-muted-foreground/50 uppercase tracking-wider block">
              Preferred Charging Speeds
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {chargingTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setChargingType(type.value)}
                  className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    chargingType === type.value
                      ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                      : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4 hover:border-white/10"
                  }`}
                >
                  <p className="text-[11px] font-bold tracking-tight">{type.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Analytical Column */}
        <div className="w-full lg:w-[420px] rounded-[24px] border border-white/5 bg-white/2 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Glass highlight */}
          <div className="absolute top-[-20%] right-[-20%] w-48 h-48 rounded-full bg-[#00E676]/5 blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <p className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-wider">Simulation Output</p>
                <h3 className="text-base font-extrabold text-white">Recommended Sizing</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                AI Sizing Optimal
              </span>
            </div>

            {/* Sizing outputs list */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-black/45 border border-white/4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-10 rounded-full bg-[#00D4FF]" />
                  <div>
                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Recommended Units</span>
                    <span className="text-sm font-black text-white">{recommendedChargers} Chargers</span>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#00D4FF] opacity-60" />
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-black/45 border border-white/4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-10 rounded-full bg-[#00E676]" />
                  <div>
                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Power Requirement</span>
                    <span className="text-sm font-black text-white">{powerFootprint} kW Peak</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/60">
                  Grid Load
                </div>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-black/45 border border-white/4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-10 rounded-full bg-[#3B82F6]" />
                  <div>
                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Substation Transformer</span>
                    <span className="text-sm font-black text-white">{transformerSize} kVA Grid</span>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-[#3B82F6] px-1.5 py-0.5 rounded-sm bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                  Level 3
                </div>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-black/45 border border-white/4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-10 rounded-full bg-indigo-400" />
                  <div>
                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Land Space footprint</span>
                    <span className="text-sm font-black text-white">{landRequirement} sq ft</span>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground/60 font-mono">
                  Civil space
                </div>
              </div>
            </div>
          </div>

          {/* Sizing Financial / Carbon Summary cards */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4">
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
              <div>
                <DollarSign className="w-4 h-4 text-[#F59E0B] mb-2" />
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Budget CAPEX</span>
                <span className="text-sm font-black text-white">${installationCost.toLocaleString()}</span>
              </div>
              <span className="text-[9px] font-extrabold text-[#00E676] mt-2 block">
                ROI: {expectedROI}% / yr
              </span>
            </div>

            <div className="bg-white/1 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
              <div>
                <Trees className="w-4 h-4 text-[#00E676] mb-2" />
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Carbon Offset</span>
                <span className="text-sm font-black text-[#00E676]">{carbonReduction} Tons CO2</span>
              </div>
              <span className="text-[9px] text-muted-foreground/40 mt-2 block">
                per annum saved
              </span>
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10px] text-muted-foreground/80 flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
            <p>
              Carbon projection matches global emission coefficients for grid replacement by local clean vehicle charging hubs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
