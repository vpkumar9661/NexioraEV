"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Zap, Sliders, Battery, Calendar, HelpCircle, 
  MapPin, BrainCircuit, RefreshCcw, Award, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// LIVE CHARGING SIMULATOR
// ==========================================

export function ChargingSimulator() {
  const [capacity, setCapacity] = useState<number>(75);
  const [soc, setSoc] = useState<number>(30);
  const [speed, setSpeed] = useState<"ac" | "dc" | "hpc">("dc");
  const [temperature, setTemperature] = useState<number>(25);

  const physics = useMemo(() => {
    // Determine power capabilities in kW
    let basePower = 11; // AC
    if (speed === "dc") basePower = 150; // DCFC
    if (speed === "hpc") basePower = 350; // HPC Ultra

    // CC/CV Curve transition throttling
    let powerFactor = 1.0;
    if (soc > 80) {
      powerFactor = Math.max(0.1, (100 - soc) / 20); // CV Decay
    }

    // Temperature throttling
    if (temperature > 40) {
      powerFactor *= Math.max(0.3, 1.0 - (temperature - 40) * 0.035);
    } else if (temperature < 0) {
      powerFactor *= 0.6; // Cold electrolyte Viscosity penalty
    }

    const power = parseFloat((basePower * powerFactor).toFixed(1));
    const volt = 400; // Pack Voltage baseline
    const current = Math.round((power * 1000) / volt);
    const timeMinutes = Math.round((((100 - soc) / 100) * capacity / (power || 1)) * 60 * 1.15);

    return { power, current, volt, time: timeMinutes };
  }, [capacity, soc, speed, temperature]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">Live Session Charging Simulator</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Adjust operational grid parameters to observe thermal throttling responses.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        {/* Interactive panel left */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">Charging loop timeline graph</span>
            <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              CC/CV Active
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="0 0 200 100" className="w-full h-full max-h-[120px] overflow-visible">
              <line x1="15" y1="10" x2="15" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
              <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />

              {/* CC/CV Power Throttling line */}
              {(() => {
                const points = Array.from({ length: 11 }, (_, i) => {
                  const s = i * 10;
                  const x = 15 + (s / 100) * 175;
                  let pFactor = 1.0;
                  if (s > 80) pFactor = Math.max(0.1, (100 - s) / 20);
                  if (temperature > 40) pFactor *= Math.max(0.3, 1.0 - (temperature - 40) * 0.035);
                  const y = 85 - (pFactor * 70);
                  return `${x},${y}`;
                });
                return <path d={`M ${points.join(" L ")}`} fill="none" stroke="#22D3EE" strokeWidth="1.5" />;
              })()}

              {/* Tracker Node */}
              {(() => {
                const dotX = 15 + (soc / 100) * 175;
                let pFactor = 1.0;
                if (soc > 80) pFactor = Math.max(0.1, (100 - soc) / 20);
                if (temperature > 40) pFactor *= Math.max(0.3, 1.0 - (temperature - 40) * 0.035);
                const dotY = 85 - (pFactor * 70);
                return <circle cx={dotX} cy={dotY} r="3" fill="#22D3EE" stroke="white" strokeWidth="0.8" />;
              })()}

              <text x="15" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">0%</text>
              <text x="155" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">80%</text>
              <text x="190" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">100%</text>
            </svg>
          </div>
        </div>

        {/* Sliders right */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#AEB5C0]/40 uppercase tracking-wider block text-[9px]">Battery State of Charge</span>
                <span className="text-white">{soc}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soc}
                onChange={(e) => setSoc(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#AEB5C0]/40 uppercase tracking-wider block text-[9px]">Pack Temperature</span>
                <span className="text-white">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="-10"
                max="65"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[#AEB5C0]/40 uppercase tracking-wider block text-[9px]">Grid Power Interface</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "ac", label: "AC 11kW" },
                  { id: "dc", label: "DC 150kW" },
                  { id: "hpc", label: "HPC 350kW" }
                ].map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => setSpeed(sp.id as any)}
                    className={`py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                      speed === sp.id
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                        : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                    }`}
                  >
                    {sp.label.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Time Remaining</span>
                <span className="text-xs font-black text-white">{physics.time} mins</span>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Current Power</span>
                <span className="text-xs font-black text-white">{physics.power} kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CHARGING COST CALCULATOR
// ==========================================

export function CostCalculator() {
  const [packKwh, setPackKwh] = useState<number>(75);
  const [electricityPrice, setElectricityPrice] = useState<number>(0.15); // USD/kWh
  const [milesPerYear, setMilesPerYear] = useState<number>(12000);

  const stats = useMemo(() => {
    // EV Cost: Assumes vehicle efficiency is 3.5 miles per kWh.
    const totalKwhPerYear = milesPerYear / 3.5;
    const evYearlyCost = totalKwhPerYear * electricityPrice;

    // Petrol Cost: Assumes petrol car gets 30 MPG, fuel cost is $3.50 per gallon.
    const petrolYearlyCost = (milesPerYear / 30) * 3.50;
    const yearlySavings = Math.round(petrolYearlyCost - evYearlyCost);

    // CO2 offset: 0.41 kg CO2 per mile for average combustion car
    const co2Reduction = parseFloat(((milesPerYear * 0.000411) * 0.85).toFixed(1)); // tons

    return {
      evYearlyCost: Math.round(evYearlyCost),
      yearlySavings,
      co2Reduction
    };
  }, [packKwh, electricityPrice, milesPerYear]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">Charging Cost & Savings Calculator</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Calculate monthly charge bills and environmental carbon offsets.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-4 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Financial Predictions HUD</span>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">EV Yearly Electricity Cost</span>
              <strong className="text-sm text-white block mt-0.5">${stats.evYearlyCost.toLocaleString()} USD</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Annual Petrol Savings</span>
              <strong className="text-sm text-[#10B981] block mt-0.5">${stats.yearlySavings.toLocaleString()} Savings</strong>
            </div>
          </div>

          <div className="p-3 bg-[#10B981]/5 border border-[#10B981]/15 rounded-xl flex gap-2 items-center text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-[#AEB5C0]/85">CO₂ Reduction: <strong>{stats.co2Reduction} Tons</strong> offsets annually.</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3 text-xs">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#AEB5C0]/40 uppercase tracking-wider block text-[9px]">Grid Electricity Price</span>
                <span className="text-white">${electricityPrice}/kWh</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.01"
                value={electricityPrice}
                onChange={(e) => setElectricityPrice(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#AEB5C0]/40 uppercase tracking-wider block text-[9px]">Annual Commute Mileage</span>
                <span className="text-white">{milesPerYear.toLocaleString()} miles</span>
              </div>
              <input
                type="range"
                min="3000"
                max="25000"
                step="1000"
                value={milesPerYear}
                onChange={(e) => setMilesPerYear(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// TRIP CHARGING PLANNER
// ==========================================

export function TripPlanner() {
  const [distance, setDistance] = useState<number>(350);
  const [vehicleType, setVehicleType] = useState<string>("car");

  const plan = useMemo(() => {
    // Base vehicle range (assume standard 75kWh pack)
    let rangeLimit = 250;
    if (vehicleType === "scooter") rangeLimit = 60;
    if (vehicleType === "bus" || vehicleType === "truck") rangeLimit = 180;

    let stops = 0;
    let chargingTime = 0;
    if (distance > rangeLimit) {
      stops = Math.floor(distance / rangeLimit);
      chargingTime = stops * 35; // 35 minutes per DC fast charging stop
    }

    const totalHours = parseFloat((distance / 65 + chargingTime / 60).toFixed(1));

    return {
      stops,
      chargingTime,
      totalHours
    };
  }, [distance, vehicleType]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">AI Trip Route Charging Planner</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Estimate charge stops and durations along custom long distance routes.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-4 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Plan Diagnostics Report</span>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Charging Stops</span>
              <strong className="text-sm text-[#22D3EE] block mt-1">{plan.stops} Stops required</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Charging Idle Time</span>
              <strong className="text-xs text-white block mt-1">{plan.chargingTime} mins total</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Total Trip Duration</span>
              <strong className="text-xs text-white block mt-1">{plan.totalHours} hours</strong>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3 text-xs">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Vehicle Sizing Profile</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="scooter">Electric Scooter</option>
                <option value="car">Standard Passenger Car</option>
                <option value="truck">Heavy Duty Cargo Truck</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#AEB5C0]/40 uppercase block text-[9px]">Destination Distance</span>
                <span className="text-white">{distance} mi</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CHARGING NETWORK DASHBOARD
// ==========================================

export function NetworkDashboard() {
  return (
    <section id="network" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Charging Network Dashboard</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Interactive map and occupancy distribution of nearby charging nodes.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Graphical Map representation */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center text-[10px] text-[#AEB5C0]/40 font-bold uppercase">
            <span>Dynamic Grid Load Mapping</span>
            <span className="text-[#10B981] animate-pulse">Live Connected</span>
          </div>

          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -50 160 100" className="w-full h-full max-h-[150px] overflow-visible">
              {/* Map grid circles representation */}
              <circle cx="-50" cy="-20" r="4" fill="#10B981" />
              <line x1="-50" y1="-20" x2="-20" y2="10" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              
              <circle cx="-20" cy="10" r="6" fill="#22D3EE" stroke="white" strokeWidth="0.5" className="animate-pulse" />
              <line x1="-20" y1="10" x2="30" y2="-15" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

              <circle cx="30" cy="-15" r="4" fill="#F59E0B" />
              <line x1="30" y1="-15" x2="45" y2="25" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

              <circle cx="45" cy="25" r="4.5" fill="#EF4444" />
            </svg>

            {/* Floating indicator logs */}
            <div className="absolute bottom-2 left-6 flex items-center gap-4 text-[9px] font-bold">
              <span className="flex items-center gap-1 text-[#10B981]">
                <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" /> Available
              </span>
              <span className="flex items-center gap-1 text-[#EF4444]">
                <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" /> Occupied
              </span>
            </div>
          </div>
        </div>

        {/* Readout statistics */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 text-xs">
          <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block tracking-wider border-b border-white/5 pb-2">Network Diagnostics</span>
          
          <div className="space-y-3 font-semibold text-[#AEB5C0]/85">
            <div className="flex justify-between">
              <span>CCS2 Fast Connectors:</span>
              <strong className="text-white">1,842 Ports Available</strong>
            </div>
            <div className="flex justify-between">
              <span>NACS Connectors:</span>
              <strong className="text-white">2,410 Ports Available</strong>
            </div>
            <div className="flex justify-between">
              <span>Average Occupancy Rate:</span>
              <strong className="text-purple-300">42% Current load</strong>
            </div>
            <div className="flex justify-between">
              <span>Uptime SLA Rating:</span>
              <strong className="text-[#10B981]">99.98% SLA</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// AI CHARGING ASSISTANT
// ==========================================

export function AIAssistant() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const qnaMap: Record<string, string> = {
    "charger": "For home, a 7kW or 11kW AC Type 2 charger is recommended. On long road trips, CCS2 or NACS DC fast chargers are best for 15-30 minute stops.",
    "ccs2": "CCS Combo 2 is the standard DC fast charging interface globally, combining Type 2 AC pins with 2 heavy duty DC direct pins.",
    "daily": "Limit fast DC charging to trip requirements. Consistent daily fast charging accelerates anode lithiation wear, reducing battery lifespan.",
    "v2g": "Vehicle-to-Grid (V2G) allows bidirectional charging. Your EV supplies stored energy back to the power grid during high load peaks."
  };

  const handleSelectQuestion = (key: string) => {
    setSelectedQuestion(key);
    setAnswer(qnaMap[key] || "");
  };

  return (
    <section id="ai" className="space-y-6 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-purple-400 animate-pulse" />
        <h2 className="text-2xl font-extrabold text-white">AI Charging Advisor</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Buttons list */}
        <div className="md:col-span-5 flex flex-col gap-2 p-3 rounded-2xl border border-white/5 bg-black/40">
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">Select Query Profile</span>
          {[
            { id: "charger", label: "Which charger is best for my EV?" },
            { id: "ccs2", label: "What is CCS2 Standard?" },
            { id: "daily", label: "Should I fast charge every day?" },
            { id: "v2g", label: "What is V2G Bidirectional?" }
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => handleSelectQuestion(q.id)}
              className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                selectedQuestion === q.id
                  ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE]"
                  : "bg-white/2 border-white/5 text-[#AEB5C0] hover:text-white"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Readout answer panel */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[160px]">
          {answer ? (
            <div className="space-y-2">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">AI Agent Diagnosis</span>
              <p className="text-xs text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
                {answer}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/45 text-xs flex flex-col items-center justify-center gap-2">
              <BrainCircuit className="w-8 h-8 text-[#AEB5C0]/20" />
              <span>Select an EV engineering question profile on the left to activate AI advisor simulation.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CHARGING QUIZ
// ==========================================

const QUESTIONS = [
  {
    q: "Which connector pins dynamically share electrical lines for both AC and DC charging?",
    options: ["CCS Combo 2", "Type 1 J1772", "NACS (SAE J3400)", "CHAdeMO"],
    ans: 2,
    exp: "NACS uses a compact 5-pin layout that dynamically switches functions to deliver either AC or DC current over the same pins."
  },
  {
    q: "Why do fast charging speeds drop dramatically after the battery reach 80% State of Charge?",
    options: ["To prevent cell voltage over-saturation", "Grid power limitation presets", "Onboard inverter throttling", "Viscous coolant temperature drop"],
    ans: 0,
    exp: "After 80% SOC, the charger switches from Constant Current (CC) to Constant Voltage (CV). Current must decay to avoid exceeding safe cell voltage limits."
  }
];

export function ChargingQuiz() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleOptionClick = (optIdx: number) => {
    if (showFeedback) return;
    setSelectedOpt(optIdx);
    setShowFeedback(true);
    if (optIdx === QUESTIONS[activeIdx]!.ans) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowFeedback(false);
    if (activeIdx < QUESTIONS.length - 1) {
      setActiveIdx((i) => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setActiveIdx(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Interactive Certification Quiz</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Test your EV charging engineering knowledge to unlock certification badges.</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md p-5 sm:p-6 space-y-6">
        {quizFinished ? (
          <div className="text-center py-6 space-y-4">
            <Award className="w-12 h-12 text-[#22D3EE] mx-auto animate-bounce" />
            <h4 className="text-base font-extrabold text-white">Quiz Module Complete!</h4>
            <p className="text-xs text-[#AEB5C0]/75">
              Score achieved: <strong>{score} / {QUESTIONS.length}</strong> correct answers.
            </p>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-[#22D3EE] text-[#07090e] font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">
              <span>Question {activeIdx + 1} of {QUESTIONS.length}</span>
              <span>Score: {score}</span>
            </div>

            <h4 className="text-xs font-bold text-white leading-relaxed">
              {QUESTIONS[activeIdx]!.q}
            </h4>

            <div className="space-y-2">
              {QUESTIONS[activeIdx]!.options.map((opt, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const isCorrect = oIdx === QUESTIONS[activeIdx]!.ans;
                let optStyle = "bg-white/2 border-white/5 hover:border-white/10";
                if (showFeedback) {
                  if (isCorrect) optStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
                  else if (isSelected) optStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300";
                  else optStyle = "bg-white/1 border-white/5 opacity-55";
                }
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionClick(oIdx)}
                    disabled={showFeedback}
                    className={`w-full py-2.5 px-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${optStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="space-y-3 border-t border-white/5 pt-4">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Electrochemical Explanation</span>
                <p className="text-xs text-[#AEB5C0]/80 leading-relaxed bg-white/1 p-3 rounded-xl border border-white/5">
                  {QUESTIONS[activeIdx]!.exp}
                </p>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-purple-500 text-white font-bold text-xs rounded-xl hover:bg-purple-600 transition-colors cursor-pointer"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
