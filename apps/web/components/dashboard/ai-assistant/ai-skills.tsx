"use client";

import React, { useState, useMemo } from "react";
import { 
  Compass, Sliders, Battery, Plug, Cpu, ShieldCheck, 
  Map, Activity, Layers, Mic, RefreshCw, ChevronDown 
} from "lucide-react";

// ==========================================
// TRIP PLANNER
// ==========================================

export function TripPlanner() {
  const [origin, setOrigin] = useState<string>("Delhi");
  const [destination, setDestination] = useState<string>("Jaipur");
  const [capacity, setCapacity] = useState<number>(75);

  const tripStats = useMemo(() => {
    // Distance estimate
    const dist = 270; // km
    // Consumption 6 km/kWh average
    const totalEnergy = Math.round(dist / 6); // kWh
    const cost = totalEnergy * 8; // ₹8 per kWh

    // Remaining SOC after trip
    const remainingKwh = capacity - totalEnergy;
    const socPercent = Math.max(0, Math.round((remainingKwh / capacity) * 100));

    return { dist, totalEnergy, cost, socPercent };
  }, [origin, destination, capacity]);

  return (
    <section id="planner" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">AI Trip & Route Planner</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Plan long distance journeys. AI calculates estimated energy consumption, charging stops, and arrival state-of-charge.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Form Inputs Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Origin City</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#7C4DFF]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Destination City</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#7C4DFF]"
            />
          </div>
        </div>

        {/* Diagnostic Output Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <span className="text-xs font-bold text-white uppercase border-b border-white/5 pb-2 block">Trip Diagnostics Summary</span>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Travel Distance</span>
              <strong className="text-sm text-white block mt-0.5">{tripStats.dist} km</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Energy Consumption</span>
              <strong className="text-sm text-white block mt-0.5">~{tripStats.totalEnergy} kWh</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Arrival SOC</span>
              <strong className="text-sm text-[#7C4DFF] block mt-0.5">{tripStats.socPercent}% remaining</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Charging stops</span>
              <strong className="text-sm text-white block mt-0.5">0 Stops (Within Range)</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// ADVISORS (BATTERY & CHARGING)
// ==========================================

export function AdvisorsSection() {
  const [chem, setChem] = useState<string>("nmc");

  return (
    <section id="battery" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">AI Specialized Advisors</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Select a chemistry to query the AI Battery & Charging Advisor.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Toggle Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 space-y-4 text-xs">
          <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Sized Chemistry</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setChem("nmc")}
              className={`py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                chem === "nmc"
                  ? "bg-[#7C4DFF]/15 border-[#7C4DFF]/30 text-purple-300"
                  : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
              }`}
            >
              NMC cells
            </button>
            <button
              onClick={() => setChem("lfp")}
              className={`py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                chem === "lfp"
                  ? "bg-[#7C4DFF]/15 border-[#7C4DFF]/30 text-purple-300"
                  : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
              }`}
            >
              LFP Prismatic
            </button>
          </div>
        </div>

        {/* Text Output Right */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[140px] text-xs">
          <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Advisor Recommendation</span>
          <p className="text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5 mt-2 font-semibold">
            {chem === "nmc" && "NMC battery configurations feature high energy density, but require active liquid cooling radiators to stabilize cell balancing temperatures."}
            {chem === "lfp" && "LFP chemistry provides high cycle longevity and safety boundaries, making it ideal for standard sedan platforms where volume constraints are lower."}
          </p>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// VOICE MODE & DOCUMENT ANALYZER
// ==========================================

export function VoiceModeSection() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setTranscript("BMS passive cell balancing shunts efficiency calculations.");
    } else {
      setIsRecording(true);
      setTranscript("");
    }
  };

  return (
    <section id="voice" className="space-y-6 border-t border-white/5 pt-6">
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Voice push to talk Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">AI Voice Mode</span>
            <p className="text-xs text-[#AEB5C0]/65 mt-2 leading-relaxed">
              Activate the microphone to transcribe technical EV queries verbally.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={handleRecord}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isRecording
                  ? "bg-rose-500 border-rose-500 text-white animate-pulse"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }`}
            >
              <Mic className="w-4.5 h-4.5" />
            </button>
            <span className="text-xs font-bold text-white">
              {isRecording ? "Listening active... Click microphone to complete transcript" : "Push to talk"}
            </span>
          </div>
        </div>

        {/* Document summarizer Right */}
        <div id="document" className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Technical Document Summarizer</span>
            <p className="text-xs text-[#AEB5C0]/65 mt-2 leading-relaxed">
              Upload technical documents (PDF notes, CAD spreadsheets) to generate structured bullet summaries.
            </p>
          </div>

          <button
            onClick={() => alert("Initiating mock document upload browser dialog...")}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Upload Document (PDF/DOCX)
          </button>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// FAQ SECTION
// ==========================================

const FAQS = [
  { q: "How is the EV range estimated?", a: "AI calculates WLTP ranges using cell energy capacities (kWh) scaled against platform weights and aerodynamic drag coefficients." },
  { q: "What is document scanning limit sizes?", a: "The technical document summarizer parses text reports up to 20MB, extracting balancing formulas and BMS safety codes." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">Frequently Asked Questions</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Explore standard LLM advisory queries.</p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#7C4DFF]/20 bg-[#7C4DFF]/3"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#AEB5C0]/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#7C4DFF]" : ""}`} />
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
