"use client";

import React, { useState } from "react";
import { Zap, ShieldCheck, Play, ArrowRight, Activity, Cpu } from "lucide-react";

export function LoadBalancer() {
  const [smartShifting, setSmartShifting] = useState(true);
  const [priorityLevel, setPriorityLevel] = useState("High");

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Config */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#F4B400] uppercase tracking-widest block">
                INTELLIGENT PEAK CONTROLLER
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Cpu className="w-5 h-5 text-[#F4B400]" />
                Load Balancer
              </h2>
            </div>

            <div className="space-y-4 text-xs font-bold">
              {/* AI smart shifting switch */}
              <div>
                <label className="text-muted-foreground/50 font-bold uppercase tracking-wider block mb-2">AI Smart Shifting</label>
                <div className="flex bg-white/2 rounded-xl p-1 border border-white/5">
                  <button
                    onClick={() => setSmartShifting(true)}
                    className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                      smartShifting ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setSmartShifting(false)}
                    className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                      !smartShifting ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                    }`}
                  >
                    Disabled
                  </button>
                </div>
              </div>

              {/* Priority level slider */}
              <div className="space-y-2">
                <label className="text-muted-foreground/50 uppercase tracking-wider block">Emergency Loop priority</label>
                <div className="flex bg-white/2 rounded-xl p-1 border border-white/5">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setPriorityLevel(level)}
                      className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                        priorityLevel === level ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Load balancing uses edge calculations to guarantee 100% availability for server rooms.</p>
          </div>
        </div>

        {/* Right Recommendations */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>ACTIVE AI SYSTEM RECOMMENDATIONS</span>
              <span>BALANCER LOGS</span>
            </div>

            <div className="space-y-3.5">
              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-xs text-white flex gap-3 items-start">
                <Zap className="w-4.5 h-4.5 text-[#F4B400] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Reduce Peak Demand Surcharges</span>
                  <p className="text-muted-foreground/85 mt-1 leading-relaxed">
                    Factory operational load exceeds target bounds. Shifting utility billing cycles to off-peak hours cuts costs by an estimated 12%.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-xs text-white flex gap-3 items-start">
                <Zap className="w-4.5 h-4.5 text-[#00E676] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Shift EV Charging Queue Slots</span>
                  <p className="text-muted-foreground/85 mt-1 leading-relaxed">
                    14 EV dispatch slots shifted to off-peak night rate schedules (12:00 AM), saving $380 in peak load tariffs.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-xs text-white flex gap-3 items-start">
                <Zap className="w-4.5 h-4.5 text-[#00D4FF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Active Battery BESS Dispatch</span>
                  <p className="text-muted-foreground/85 mt-1 leading-relaxed">
                    Discharging 180 kW storage buffer to offset evening HVAC cooling spikes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider text-right">
            EMS Orchestrator v3.0
          </div>

        </div>

      </div>
    </section>
  );
}
