"use client";

import React, { useState, useMemo } from "react";
import { 
  Award, BrainCircuit, Play, FileDown, Search, HelpCircle, 
  ChevronDown, ChevronRight, FileText, Globe, Sparkles 
} from "lucide-react";

// ==========================================
// ENERGY & COST CALCULATOR
// ==========================================

export function EnergyCostTools() {
  const [miles, setMiles] = useState<number>(1000); // km/month
  const [fuelPrice, setFuelPrice] = useState<number>(100); // ₹/L
  const [elecRate, setElecRate] = useState<number>(8); // ₹/kWh

  const costStats = useMemo(() => {
    // ICE cost: assumption 15 km/L average efficiency
    const iceCost = (miles / 15) * fuelPrice;
    // EV cost: assumption 6 km/kWh average efficiency
    const evCost = (miles / 6) * elecRate;
    const savings = Math.round(iceCost - evCost);

    return { iceCost: Math.round(iceCost), evCost: Math.round(evCost), savings };
  }, [miles, fuelPrice, elecRate]);

  return (
    <section id="energy" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">EV vs ICE Fuel Cost Savings</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Calculate monthly cost differences and annual net financial savings.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Sliders Inputs Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Monthly Distance</span>
              <span className="text-white">{miles} km</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={miles}
              onChange={(e) => setMiles(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Petrol/Diesel Price</span>
              <span className="text-white">₹{fuelPrice} /L</span>
            </div>
            <input
              type="range"
              min="80"
              max="150"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(parseInt(e.target.value))}
              className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Readout stats Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <span className="text-xs font-bold text-white uppercase border-b border-white/5 pb-2 block">Monthly savings ledger</span>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">ICE Fuel Cost</span>
              <strong className="text-sm text-white block mt-0.5">₹{costStats.iceCost}</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">EV charging electricity cost</span>
              <strong className="text-sm text-white block mt-0.5">₹{costStats.evCost}</strong>
            </div>
            <div className="col-span-2 border-t border-white/5 pt-3">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Net Savings</span>
              <strong className="text-lg text-[#00C853] block mt-0.5">₹{costStats.savings} / month</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// ENVIRONMENTAL OFFSETS
// ==========================================

export function EnvironmentalTools() {
  return (
    <section id="environment" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Environmental Carbon Offsets</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Understand tailpipe emission savings indices standard across WLTP calculators.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#00C853]">
            <Globe className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">CO₂ Savings Index</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            The average petrol passenger car emits ~120 grams of CO₂ per km. Transitioning to EV eliminates tailpipe emissions directly, offset only by the grid&apos;s local energy mix index.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#00C853]">
            <Award className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Tree absorption equivalence</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            A mature pine tree absorbs ~22 kg of carbon dioxide annually. Saving 1,000 kg of carbon emissions annually yields the offset equivalent of planting ~45 trees.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ENGINEERING CONVERTERS
// ==========================================

export function ConvertersSection() {
  const [val, setVal] = useState<string>("100");
  const [unit, setUnit] = useState<string>("kw-hp");

  const converted = useMemo(() => {
    const num = parseFloat(val) || 0;
    if (unit === "kw-hp") {
      return (num * 1.341).toFixed(2) + " hp";
    } else if (unit === "nm-lbft") {
      return (num * 0.7375).toFixed(2) + " lb-ft";
    }
    return val;
  }, [val, unit]);

  return (
    <section id="converters" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Engineering Converters</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Quickly translate units between SI and Imperial scales (Power, Torque).</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Form Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between min-h-[160px]">
          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#00C853]"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="kw-hp">kW to Horsepower (hp)</option>
                <option value="nm-lbft">Nm to Torque (lb-ft)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Readout Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[130px]">
          <div className="space-y-1">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Conversion Output</span>
            <strong className="text-xl font-black text-[#00C853] block mt-2">
              {converted}
            </strong>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// FORMULA LIBRARY & REFERENCES
// ==========================================

export function FormulaLibrary() {
  return (
    <section id="formulas" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Formula & Technical References Library</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Inspect physical equations and chemical limits reference sheets.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Equations Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase block tracking-wider">Electrochemical Cell Balancing</span>
          <p className="text-xs text-[#AEB5C0]/75 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
            Equation: <strong>Q = I * t</strong><br />
            Units: Ampere-seconds (As) or Ampere-hours (Ah). Balances cells variance capacities relative to shunt currents profiles.
          </p>
        </div>

        {/* Reference Tables Right */}
        <div id="references" className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase block tracking-wider">Cell chemistry benchmarks</span>
          <p className="text-xs text-[#AEB5C0]/75 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
            NMC Cells: 3.7 Nominal Volts. High specific energy density.<br />
            LFP Cells: 3.2 Nominal Volts. High lifecycle safety profiles, lower costs.
          </p>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// AI ENGINEERING ASSISTANT & DOWNLOADS
// ==========================================

export function AIPlanner() {
  const [selectedCalc, setSelectedCalc] = useState<string>("");
  const [advice, setAdvice] = useState<string>("");

  const adviceMap: Record<string, string> = {
    "capacity": "Verify series battery cell count Nominal Volts multipliers (e.g. 96S yields 355V nominal outputs limits) when sizing pack capacity targets.",
    "drag": "A low aerodynamic coefficient (e.g. 0.20 Cd instead of 0.28 Cd) yields about 15% range improvements on high-speed WLTP drive cycles.",
    "torque": "Rotor torque scales directly with stator phase currents. Inverter SiC modules must carry enough continuous current limits under high loads."
  };

  const handleAsk = (key: string) => {
    setSelectedCalc(key);
    setAdvice(adviceMap[key] || "");
  };

  return (
    <section id="ai" className="space-y-6 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-[#00C853] animate-pulse" />
        <h2 className="text-xl font-black text-white">AI Engineering Assistant</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Buttons Left */}
        <div className="md:col-span-5 flex flex-col gap-2 p-3 rounded-2xl border border-white/5 bg-black/40">
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">Select Equation Workspace</span>
          {[
            { id: "capacity", label: "Recommend battery pack sizing cells spacing" },
            { id: "drag", label: "Analyze aerodynamic drag range impacts" },
            { id: "torque", label: "Analyze stator torque rotor rpm boundaries" }
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => handleAsk(q.id)}
              className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                selectedCalc === q.id
                  ? "bg-[#00C853]/15 border-[#00C853]/30 text-[#00C853]"
                  : "bg-white/2 border-white/5 text-[#AEB5C0] hover:text-white"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Advisor text Right */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[150px]">
          {advice ? (
            <div className="space-y-2 text-xs">
              <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider block">AI Advisor diagnostics</span>
              <p className="text-xs text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
                {advice}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/35 text-xs">
              Select an engineering equation workspace profile on the left to consult the AI Assistant.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// DOWNLOADS & FAQ
// ==========================================

export function DownloadsCenter() {
  return (
    <section id="downloads" className="space-y-6">
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* PDF Downloads Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Downloads Center</span>
          
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => alert("Downloading: Engineering-Formula-Book.pdf")}
              className="py-2.5 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all text-[11px] cursor-pointer"
            >
              Formula Handbook PDF
            </button>
            <button
              onClick={() => alert("Downloading: Standards-Guide.pdf")}
              className="py-2.5 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all text-[11px] cursor-pointer"
            >
              SAE Standards Guide
            </button>
          </div>
        </div>

        {/* CTA Redirect Right */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-[#00C853]/25 bg-linear-to-b from-[#00C853]/5 to-transparent backdrop-blur-md flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[9px] text-[#00C853] font-extrabold uppercase tracking-wider block">Conclude Toolkit Analysis</span>
            <h4 className="text-xs font-black text-white mt-1.5 uppercase tracking-wide">Continue to AI EV Assistant</h4>
            <p className="text-[11.5px] text-[#AEB5C0]/65 mt-2 leading-relaxed">
              Transition to the main platform AI interface. Prompt queries to draft summary reports.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = "/evtech/learning-center";
            }}
            className="w-full mt-3 py-2 bg-[#00C853] text-[#07090e] font-black text-xs rounded-xl hover:shadow-[0_0_15px_rgba(0,200,83,0.3)] transition-all cursor-pointer"
          >
            Open AI Assistant
          </button>
        </div>

      </div>
    </section>
  );
}

// FAQs Accordions
const FAQS = [
  { q: "How accurate are the range calculations?", a: "Estimates align with WLTP conversion scales under average cruising patterns. Local cabin climate HVAC draws or heavy headwinds will cut real range boundaries." },
  { q: "What charger efficiency metrics are modeled?", a: "Charging speed formulas assume a standard 90% AC-to-DC rectification efficiency. DC fast charging bypasses onboard converters, yielding 95%+ efficiency parameters." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">Frequently Asked Questions</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Explore standard equations assumptions queries.</p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#00C853]/20 bg-[#00C853]/3"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#AEB5C0]/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#00C853]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-4 text-[11.5px] text-[#AEB5C0]/75 leading-relaxed pl-5 border-t border-white/5 pt-2">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export type { FAQS };
