"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, ShieldCheck, Zap, ToggleLeft, ToggleRight, Radio } from "lucide-react";

export function MicrogridDashboard() {
  const [islandMode, setIslandMode] = useState(false);
  const [autoSwitching, setAutoSwitching] = useState(true);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                ISLAND COMMAND PANEL
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Radio className="w-5 h-5 text-[#00E676] animate-pulse" />
                Microgrid Management
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Enforce microgrid decoupling modes. Island Mode isolates local generation nodes from utility grid voltage sags.
            </p>

            <div className="space-y-3">
              {/* Island Mode Toggle */}
              <button
                onClick={() => setIslandMode(!islandMode)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  islandMode
                    ? "border-rose-500 bg-rose-500/10 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">Decoupled Island Mode</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">Isolate critical assets from utility line fluctuations</span>
                </div>
                {islandMode ? <ToggleRight className="w-8 h-8 text-rose-500" /> : <ToggleLeft className="w-8 h-8 text-muted-foreground/40" />}
              </button>

              {/* Auto Switching Toggle */}
              <button
                onClick={() => setAutoSwitching(!autoSwitching)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  autoSwitching
                    ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">Auto Switching Mode</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">Decouple nodes automatically during voltage drop sags</span>
                </div>
                {autoSwitching ? <ToggleRight className="w-8 h-8 text-[#00E676]" /> : <ToggleLeft className="w-8 h-8 text-muted-foreground/40" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Automatic switching switches nodes in less than 8ms, keeping computers online.</p>
          </div>
        </div>

        {/* Right Column Telemetry Status */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Microgrid Health
            </span>
            <div>
              <span className="text-xl font-black text-[#00E676] block mt-1.5">99.8% SOH</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">All local relays normal</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Grid Independence
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">{islandMode ? "100%" : "82.4%"}</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Ratio of local generation</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Secured critical loads
            </span>
            <div>
              <span className="text-xl font-black text-[#00D4FF] block mt-1.5">340 kW</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">100% backup guaranteed</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Renewable Util.
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">94.5%</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Direct load consumption</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Remaining Backup
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">{islandMode ? "14.5 Hours" : "28.0 Hours"}</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Based on active storage reserve</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex flex-col justify-between h-[120px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">
              Coupling state
            </span>
            <div>
              <span className="text-xl font-black text-white block mt-1.5">{islandMode ? "Decoupled" : "Connected"}</span>
              <span className="text-[9.5px] text-muted-foreground/50 block mt-0.5">Active grid connection status</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
