"use client";

import { useState } from "react";
import { ChevronRight, Calendar, Landmark, Award } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  chemistry: string;
  summary: string;
  impact: string;
  compounds: string;
}

const EVENTS: TimelineEvent[] = [
  { year: "1859", title: "Lead-Acid Battery", chemistry: "Pb + PbO2 in H2SO4", summary: "Invented by Gaston Planté. The first rechargeable battery technology. Highly robust, but heavy and low energy density.", impact: "Introduced starter motor loops; still widely utilized for 12V vehicle aux loops.", compounds: "Lead, Lead Dioxide, Sulfuric Acid" },
  { year: "1991", title: "Lithium-Ion Commercialization", chemistry: "LixC6 | Li1-xCoO2", summary: "First commercialized by Sony. Replaced heavier metals with lightweight lithium ions, enabling the portable electronics revolution.", impact: "Enabled early production EV configurations like the Tesla Roadster.", compounds: "Lithium Cobalt Oxide (LCO), Carbon/Graphite" },
  { year: "1996", title: "LFP Chemistry Development", chemistry: "LiFePO4 Cathodes", summary: "Discovered by John Goodenough's research group. Replaced volatile cobalt oxides with stable iron phosphate compounds.", impact: "Reduced manufacturing costs while dramatically upgrading battery safety profiles.", compounds: "Lithium Iron Phosphate, Graphite Anodes" },
  { year: "2008", title: "NMC Proliferation", chemistry: "LiNiMnCoO2 Alloys", summary: "Balanced Nickel (high capacity), Manganese (safety structure), and Cobalt (conductive speed). Allowed EVs to exceed 300km ranges.", impact: "Became the dominant premium EV chemistry across global automotive markets.", compounds: "Nickel, Manganese, Cobalt Oxides" },
  { year: "2024+", title: "Sodium-Ion Solid Scale", chemistry: "Na-Ion compounds", summary: "Sodium ions substitute scarce lithium resources. Extremely low production costs and excellent cold resistance profiles.", impact: "Powers entry-level compact city commuter electric vehicles and long-term grid reserves.", compounds: "Sodium transition metal oxides, Hard Carbon" },
  { year: "2026+", title: "Solid-State Batteries", chemistry: "Solid Ceramic Electrolyte", summary: "Eliminates volatile liquid solvents. Replaces polymer separators with solid glass/ceramic matrices. Achieves up to 500 Wh/kg.", impact: "Virtually eliminates charging limitations and fire safety vulnerabilities in performance cars.", compounds: "Solid electrolytes, Lithium Metal Anodes" }
];

export function InnovationTimeline() {
  const [activeIndex, setActiveIndex] = useState(2);
  const current = EVENTS[activeIndex];

  return (
    <section id="timeline" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Battery Innovation Timeline</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Trace the evolution of energy storage technologies from early lead cells to solid-state systems</p>
      </div>

      <div className="rounded-[20px] border border-white/5 bg-white/[0.02] p-6 space-y-8">
        
        {/* Timeline slider steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 pt-2">
          {/* Horizontal connecting line (desktop only) */}
          <div className="absolute left-6 right-6 top-[28px] h-0.5 bg-white/5 hidden md:block z-0" />

          {EVENTS.map((event, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={event.year}
                onClick={() => setActiveIndex(idx)}
                className={`relative z-10 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
                  isActive ? "scale-105" : "opacity-50 hover:opacity-80"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                    isActive
                      ? "bg-[#10B981] border-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                      : "bg-[#131722] border-white/10 text-[#AEB5C0]"
                  }`}
                >
                  {event.year.replace("+", "")}
                </div>
                <span className="text-[10px] font-bold text-white text-center whitespace-nowrap hidden md:inline">
                  {event.title.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Event panel */}
        {current && (
          <div className="grid md:grid-cols-12 gap-6 bg-[#131722]/50 border border-white/[0.03] p-5 sm:p-6 rounded-xl relative overflow-hidden">
            {/* Year backdrop */}
            <div className="absolute -bottom-10 -right-6 text-[80px] font-black text-white/[0.01] pointer-events-none select-none">
              {current.year}
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs text-[#AEB5C0]/60">Historical Event — Year {current.year}</span>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white">{current.title}</h4>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full inline-block mt-1">
                  Structure: {current.chemistry}
                </span>
              </div>
              <p className="text-[13px] text-[#AEB5C0]/80 leading-relaxed">
                {current.summary}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Chemical Compounds</span>
                <span className="text-xs font-bold text-white block">{current.compounds}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Industry Impact</span>
                <span className="text-xs font-bold text-[#AEB5C0]/85 leading-normal block">{current.impact}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
