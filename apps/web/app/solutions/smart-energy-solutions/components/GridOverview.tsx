"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Battery, Building, Zap, Compass, Activity, ShieldCheck } from "lucide-react";

interface GridNode {
  id: string;
  name: string;
  type: string;
  voltage: string;
  current: string;
  frequency: string;
  powerFactor: string;
  load: string;
  status: "Nominal" | "Warning" | "Critical";
}

export function GridOverview() {
  const [selectedNode, setSelectedNode] = useState<string>("grid");

  const nodes: Record<string, GridNode> = {
    solar: { id: "solar", name: "Solar Arrays Cluster", type: "Generator", voltage: "480 V AC", current: "185 A", frequency: "60.02 Hz", powerFactor: "0.99", load: "84%", status: "Nominal" },
    battery: { id: "battery", name: "BESS Storage Bank", type: "Storage Buffer", voltage: "520 V DC", current: "320 A", frequency: "N/A (DC Link)", powerFactor: "1.00", load: "92%", status: "Nominal" },
    chargers: { id: "chargers", name: "V2G EV Charging Hub", type: "Flexible Load", voltage: "400 V AC", current: "410 A", frequency: "59.98 Hz", powerFactor: "0.97", load: "78%", status: "Nominal" },
    buildings: { id: "buildings", name: "HQ Building Complex", type: "Commercial Load", voltage: "208 V AC", current: "1150 A", frequency: "60.00 Hz", powerFactor: "0.91", load: "64%", status: "Nominal" },
    factory: { id: "factory", name: "Heavy Industry Plant 1", type: "Industrial Load", voltage: "4160 V AC", current: "840 A", frequency: "59.99 Hz", powerFactor: "0.88", load: "92%", status: "Warning" },
    grid: { id: "grid", name: "Regional Utility Grid", type: "Utility Source", voltage: "115 kV AC", current: "48 A", frequency: "60.00 Hz", powerFactor: "0.98", load: "34%", status: "Nominal" },
  };

  const active = (nodes[selectedNode] ?? nodes.grid) as GridNode;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive SVG map */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4 bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>SMART INTERACTION OVERVIEW</span>
            <span>CLICK NODE TO INSPECT LIVE DATA</span>
          </div>

          <div className="h-[280px] w-full relative">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              
              {/* Connecting circuit lines */}
              <line x1="40" y1="50" x2="100" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="40" y1="50" x2="100" y2="100" stroke="#00E676" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2.5s_linear_infinite]" />

              <line x1="160" y1="50" x2="100" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="160" y1="50" x2="100" y2="100" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2s_linear_infinite]" />

              <line x1="100" y1="100" x2="40" y2="150" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="100" y1="100" x2="40" y2="150" stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_1.8s_linear_infinite]" />

              <line x1="100" y1="100" x2="160" y2="150" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="100" y1="100" x2="160" y2="150" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[energy-flow_2.2s_linear_infinite]" />

              <line x1="100" y1="100" x2="100" y2="150" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

              {/* Sub-Station transformer core node (100, 100) */}
              <circle cx="100" cy="100" r="15" fill="#05070d" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <text x="100" y="103" fill="#AEB5C0" fontSize="7" textAnchor="middle" fontWeight="bold">EMS</text>

              {/* Solar array (40, 50) */}
              <g transform="translate(40, 50)" className="cursor-pointer" onClick={() => setSelectedNode("solar")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "solar" ? "#00E676" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "solar" ? "2.5" : "1.2"} />
                <Sun className="w-5 h-5 text-[#00E676] -translate-x-2.5 -translate-y-2.5" />
              </g>

              {/* Battery BESS (160, 50) */}
              <g transform="translate(160, 50)" className="cursor-pointer" onClick={() => setSelectedNode("battery")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "battery" ? "#00D4FF" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "battery" ? "2.5" : "1.2"} />
                <Battery className="w-5 h-5 text-[#00D4FF] -translate-x-2.5 -translate-y-2.5" />
              </g>

              {/* EV Chargers V2G (40, 150) */}
              <g transform="translate(40, 150)" className="cursor-pointer" onClick={() => setSelectedNode("chargers")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "chargers" ? "#4F46E5" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "chargers" ? "2.5" : "1.2"} />
                <Zap className="w-5 h-5 text-[#4F46E5] -translate-x-2.5 -translate-y-2.5" />
              </g>

              {/* Building (100, 150) */}
              <g transform="translate(100, 150)" className="cursor-pointer" onClick={() => setSelectedNode("buildings")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "buildings" ? "#F4B400" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "buildings" ? "2.5" : "1.2"} />
                <Building className="w-5 h-5 text-[#F4B400] -translate-x-2.5 -translate-y-2.5" />
              </g>

              {/* Factory (160, 150) */}
              <g transform="translate(160, 150)" className="cursor-pointer" onClick={() => setSelectedNode("factory")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "factory" ? "#ef4444" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "factory" ? "2.5" : "1.2"} />
                <Activity className="w-5 h-5 text-rose-400 -translate-x-2.5 -translate-y-2.5" />
              </g>

              {/* Grid substation node (100, 40) */}
              <g transform="translate(100, 40)" className="cursor-pointer" onClick={() => setSelectedNode("grid")}>
                <circle cx="0" cy="0" r="12" fill="#05070d" stroke={selectedNode === "grid" ? "#00D4FF" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "grid" ? "2.5" : "1.2"} />
                <text x="0" y="3" fill="#AEB5C0" fontSize="7" textAnchor="middle" fontWeight="bold">GRID</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-4 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#00E676] uppercase tracking-widest">
                  {active.type}
                </span>
                <h3 className="text-base font-black text-white mt-2.5">{active.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-white/5 pt-4">
                <div>
                  <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Voltage</span>
                  <span className="font-extrabold text-white mt-0.5 block">{active.voltage}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Current</span>
                  <span className="font-extrabold text-white mt-0.5 block">{active.current}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Frequency</span>
                  <span className="font-extrabold text-white mt-0.5 block">{active.frequency}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Power Factor</span>
                  <span className="font-extrabold text-[#00E676] mt-0.5 block">{active.powerFactor}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Transformer load margin</span>
                <span className="font-extrabold text-[#00D4FF] mt-0.5 block">{active.load}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[9px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Node currents are computed dynamically via local RTUs (Remote Terminal Units).</p>
          </div>
        </div>

      </div>
    </section>
  );
}
