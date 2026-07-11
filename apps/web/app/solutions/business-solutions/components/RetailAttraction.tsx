"use client";

import React from "react";
import { Compass, ShieldCheck, Zap, Activity, Store } from "lucide-react";

export function RetailAttraction() {
  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Stats Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#F4B400] uppercase tracking-widest block">
                RETAIL VISIBILITY METRICS
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Store className="w-5 h-5 text-[#F4B400]" />
                Retail Attraction & Dwell Time
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Installing EV chargers increases shopping center customer attraction indexes and increases average purchase rates.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Customer Dwell Time</span>
                <span className="text-lg font-black text-white mt-1.5 block">95 mins avg</span>
                <span className="text-[9px] text-[#00E676] block mt-0.5">+110% vs baseline</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Avg Basket size</span>
                <span className="text-lg font-black text-white mt-1.5 block">$85.20</span>
                <span className="text-[9px] text-[#00E676] block mt-0.5">+88% vs baseline</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Data compiled dynamically from active retail POS transaction integrations.</p>
          </div>
        </div>

        {/* Right Map Outline Column */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 overflow-hidden relative">
          
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>SHOPPING CENTER CHARGER LOCATIONS</span>
            <span>ACTIVE STATUS</span>
          </div>

          <div className="h-[180px] w-full relative pt-2">
            <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
              {/* Parking lot grid perspective sketch */}
              <line x1="10" y1="20" x2="190" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="10" y1="60" x2="190" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

              <line x1="40" y1="10" x2="40" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="160" y1="10" x2="160" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />

              {/* Retail store layout block */}
              <polygon points="50,20 150,20 150,50 50,50" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="100" y="38" fill="#AEB5C0" fontSize="7" textAnchor="middle" fontWeight="bold">RETAIL PLAZA MAIN HALL</text>

              {/* Front bay chargers */}
              <circle cx="60" cy="80" r="3" fill="#00E676" />
              <circle cx="60" cy="80" r="5" fill="none" stroke="#00E676" strokeWidth="0.5" className="animate-ping" />

              <circle cx="140" cy="80" r="3" fill="#00E676" />
              <circle cx="140" cy="80" r="5" fill="none" stroke="#00E676" strokeWidth="0.5" className="animate-ping" />

              <text x="60" y="93" fill="#00E676" fontSize="5" textAnchor="middle" fontWeight="bold">BAY A</text>
              <text x="140" y="93" fill="#00E676" fontSize="5" textAnchor="middle" fontWeight="bold">BAY B</text>

            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
