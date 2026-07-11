"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Battery, Home, Zap, ShieldAlert, Sliders, ArrowRight } from "lucide-react";

type FlowMode = "self" | "storm" | "shaving";

export function EnergyFlowCenter() {
  const [activeMode, setActiveMode] = useState<FlowMode>("self");

  // Telemetry rates depending on active configuration
  const flowRates = {
    self: { solar: 8.4, battery: -3.2, home: 3.5, charger: 7.2, grid: 0.0, battStatus: "Discharging" },
    storm: { solar: 2.1, battery: 11.5, home: 4.2, charger: 0.0, grid: 13.6, battStatus: "Charging" },
    shaving: { solar: 5.8, battery: -7.5, home: 5.2, charger: 7.2, grid: -0.9, battStatus: "Discharging (Exporting)" },
  };

  const rates = flowRates[activeMode];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#F4B400] uppercase tracking-widest block">
                CORE FLOW BALANCER
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Sliders className="w-5 h-5 text-[#F4B400]" />
                Smart Energy Flow
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Toggle smart battery and inverter rules to balance solar generation, Powerwall backup levels, and EV charging cycles.
            </p>

            {/* Mode selection buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setActiveMode("self")}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeMode === "self"
                    ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">Self-Powered Mode</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">Maximize solar usage, minimize grid imports</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00E676]" />
              </button>

              <button
                onClick={() => setActiveMode("storm")}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeMode === "storm"
                    ? "border-rose-500 bg-rose-500/10 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block flex items-center gap-1.5">
                    Storm Watch Mode
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  </span>
                  <span className="text-[9px] opacity-50 block mt-0.5">Charge battery from grid prior to outages</span>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-500" />
              </button>

              <button
                onClick={() => setActiveMode("shaving")}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeMode === "shaving"
                    ? "border-[#F4B400] bg-[#F4B400]/10 text-white shadow-[0_0_15px_rgba(244,180,0,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">Peak Shaving Mode</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">Discharge battery during high peak evening rates</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#F4B400]" />
              </button>
            </div>
          </div>

          {/* Quick Metrics display */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4 text-xs font-bold">
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Battery State</span>
              <span className="text-xs font-black text-white mt-1 block">{rates.battStatus}</span>
            </div>
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Net Grid Current</span>
              <span className={`text-xs font-black mt-1 block ${rates.grid >= 0 ? "text-rose-400" : "text-[#00E676]"}`}>
                {rates.grid >= 0 ? `Import ${rates.grid} kW` : `Export ${Math.abs(rates.grid)} kW`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Custom SVG Flow Diagram */}
        <div className="lg:col-span-8 flex items-center justify-center bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>SMART MICROGRID GRAPH</span>
              <span>LIVE CURRENT ROUTING</span>
            </div>

            <div className="h-[220px] w-full relative">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                {/* Node coordinates:
                    Solar: (100, 30)
                    Battery: (40, 100)
                    Home: (160, 100)
                    EV Charger: (100, 170)
                    Grid: (160, 170)
                */}
                {/* Connecting flow lines */}
                {/* Solar to Battery */}
                <path d="M 100,30 L 40,100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {activeMode !== "storm" && (
                  <path d="M 100,30 L 40,100" fill="none" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2s_linear_infinite]" />
                )}

                {/* Solar to Home */}
                <path d="M 100,30 L 160,100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {activeMode !== "storm" && (
                  <path d="M 100,30 L 160,100" fill="none" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2s_linear_infinite]" />
                )}

                {/* Battery to Home / Home to Battery */}
                <path d="M 40,100 H 160" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {activeMode === "self" && (
                  <path d="M 40,100 H 160" fill="none" stroke="#00E676" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2.5s_linear_infinite]" />
                )}
                {activeMode === "shaving" && (
                  <path d="M 40,100 H 160" fill="none" stroke="#00E676" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2s_linear_infinite]" />
                )}

                {/* Grid to Battery (Storm mode) */}
                <path d="M 160,170 L 40,100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {activeMode === "storm" && (
                  <path d="M 160,170 L 40,100" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow-reverse_2s_linear_infinite]" />
                )}

                {/* Battery to EV Charger */}
                <path d="M 40,100 L 100,170" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {activeMode === "shaving" && (
                  <path d="M 40,100 L 100,170" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2s_linear_infinite]" />
                )}

                {/* Home to EV Charger */}
                <path d="M 160,100 L 100,170" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

                {/* Grid to Home (Storm Watch) */}
                <path d="M 160,170 V 100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {activeMode === "storm" && (
                  <path d="M 160,170 V 100" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow-reverse_2s_linear_infinite]" />
                )}

                {/* Nodes rendering */}
                {/* Solar Panels (100, 30) */}
                <g transform="translate(100, 30)">
                  <circle cx="0" cy="0" r="14" fill="#05070d" stroke="#F4B400" strokeWidth="1.5" />
                  <Sun className="w-5 h-5 text-[#F4B400] -translate-x-2.5 -translate-y-2.5" />
                </g>

                {/* Battery Storage (40, 100) */}
                <g transform="translate(40, 100)">
                  <circle cx="0" cy="0" r="14" fill="#05070d" stroke="#00E676" strokeWidth="1.5" />
                  <Battery className="w-5 h-5 text-[#00E676] -translate-x-2.5 -translate-y-2.5" />
                </g>

                {/* Home (160, 100) */}
                <g transform="translate(160, 100)">
                  <circle cx="0" cy="0" r="14" fill="#05070d" stroke="#00D4FF" strokeWidth="1.5" />
                  <Home className="w-5 h-5 text-[#00D4FF] -translate-x-2.5 -translate-y-2.5" />
                </g>

                {/* EV Charger (100, 170) */}
                <g transform="translate(100, 170)">
                  <circle cx="0" cy="0" r="14" fill="#05070d" stroke="#FF9800" strokeWidth="1.5" />
                  <Zap className="w-5 h-5 text-[#FF9800] -translate-x-2.5 -translate-y-2.5" />
                </g>

                {/* Grid (160, 170) */}
                <g transform="translate(160, 170)">
                  <circle cx="0" cy="0" r="12" fill="#05070d" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="0" y="3" fill="#AEB5C0" fontSize="7" textAnchor="middle" fontWeight="bold">GRID</text>
                </g>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
