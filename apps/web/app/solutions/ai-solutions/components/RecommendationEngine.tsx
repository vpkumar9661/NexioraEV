"use client";

import React from "react";
import { Zap, ShieldCheck, Compass, DollarSign, Activity, AlertTriangle } from "lucide-react";

export function RecommendationEngine() {
  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Stats Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                INTELLIGENT INSIGHTS RESOLUTIONS
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Compass className="w-5 h-5 text-[#00E676]" />
                Smart Recommendations
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Cognitive layer scans cross-module data streams daily to resolve load peaks, detect thermal cell degradation sags, and maximize clean energy fractions.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase text-[8px] block">Active Recommendations</span>
                <span className="text-lg font-black text-white mt-1.5 block">14 actions</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase text-[8px] block">Est. Monthly Savings</span>
                <span className="text-lg font-black text-[#00E676] mt-1.5 block">$18,420</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Recommendations verify OCPP smart charger compliance standards automatically.</p>
          </div>
        </div>

        {/* Right Advice list */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>ACTIVE SYSTEM ADVISORY ACTION LOG</span>
              <span>RESOLVED CATEGORIES</span>
            </div>

            <div className="space-y-3">
              {/* Cost Shaving advice */}
              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-xs flex gap-3 items-start">
                <DollarSign className="w-4.5 h-4.5 text-[#00E676] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Optimize Spot Tariff Rates (Smart Energy)</span>
                  <p className="text-muted-foreground/80 mt-1 leading-relaxed">
                    Shift BESS charging schedules to off-peak periods (12:00 AM - 5:00 AM) to shave daily demand peaks, saving up to **14.8%** in utility rates.
                  </p>
                </div>
              </div>

              {/* Maintenance Alert advice */}
              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-xs flex gap-3 items-start">
                <AlertTriangle className="w-4.5 h-4.5 text-[#F4B400] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Thermal Anomaly Detected (Battery Lab)</span>
                  <p className="text-muted-foreground/80 mt-1 leading-relaxed">
                    Cell block #4 on BESS storage bank A shows resistance shifts (+14%). Schedule inspection to avoid degradation sags.
                  </p>
                </div>
              </div>

              {/* Subsidy advice */}
              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-xs flex gap-3 items-start">
                <Activity className="w-4.5 h-4.5 text-[#00D4FF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">PM E-Drive Subsidy Grant (Government schemes)</span>
                  <p className="text-muted-foreground/80 mt-1 leading-relaxed">
                    10 planned AC workplace ports qualify for state capital offsets. Complete LEED LT scorecard checks to secure maximum credits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider text-right">
            Nexiora Advisory Core v3.0
          </div>

        </div>

      </div>
    </section>
  );
}
