"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Bot, ShieldCheck, Zap, Activity } from "lucide-react";

interface GraphNode {
  id: string;
  name: string;
  category: string;
  connections: string;
  description: string;
  standards: string;
}

export function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState("battery");

  const nodes: Record<string, GraphNode> = {
    charging: { id: "charging", name: "OCPP Charging Station Node", category: "EV Charging Infrastructure", connections: "V2G Grid, Fleet Telematics", description: "Links regional charger loads, active driver queues, and V2G energy arbitrage grids to central EMS lines.", standards: "OCPP 1.6 / 2.0.1, ISO 15118" },
    battery: { id: "battery", name: "BESS Storage Bank Node", category: "Electrochemical Battery Storage", connections: "Solar Arrays, Smart Grid, Charging", description: "Tracks cell battery health degradation margins, schedules off-peak charging cycles, and triggers emergency backups.", standards: "UL 1973, IEC 62619" },
    solar: { id: "solar", name: "Rooftop PV Solar Array", category: "Renewable Generation", connections: "BESS Vault, Utility Grid", description: "Absorbs solar irradiance yields, runs off-grid PV synchronizations, and routes excess to V2G chargers.", standards: "IEEE 1547, UL 1741 SB" },
    fleet: { id: "fleet", name: "Logistics Fleet Dispatch", category: "Commercial Transport", connections: "Charging Hubs, Business ROI", description: "Directs vehicle routing lines to minimize transit times and tracks daily range regeneration rates.", standards: "SAE J1939 Telematics" },
  };

  const current = (nodes[selectedNode] ?? nodes.battery) as GraphNode;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive SVG Cluster */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4 bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>INTERACTIVE KNOWLEDGE GRAPH CLUSTER</span>
            <span>CLICK POINT NODE TO EXPAND DETAILS</span>
          </div>

          <div className="h-[240px] w-full relative">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              {/* Connecting synapsis lines */}
              <line x1="100" y1="50" x2="40" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="100" y1="50" x2="160" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="40" y1="120" x2="160" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1="100" y1="50" x2="100" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

              {/* Solar PV Node (100, 50) */}
              <g transform="translate(100, 50)" className="cursor-pointer" onClick={() => setSelectedNode("solar")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "solar" ? "#00E676" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "solar" ? "2.5" : "1.2"} />
                <text x="0" y="3" fill="#00E676" fontSize="7" textAnchor="middle" fontWeight="bold">SOLAR</text>
              </g>

              {/* Charging Node (40, 120) */}
              <g transform="translate(40, 120)" className="cursor-pointer" onClick={() => setSelectedNode("charging")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "charging" ? "#00D4FF" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "charging" ? "2.5" : "1.2"} />
                <text x="0" y="3" fill="#00D4FF" fontSize="6" textAnchor="middle" fontWeight="bold">EV DRAW</text>
              </g>

              {/* BESS Node (100, 120) */}
              <g transform="translate(100, 120)" className="cursor-pointer" onClick={() => setSelectedNode("battery")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "battery" ? "#8B5CF6" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "battery" ? "2.5" : "1.2"} />
                <text x="0" y="3" fill="#8B5CF6" fontSize="7" textAnchor="middle" fontWeight="bold">BESS</text>
              </g>

              {/* Fleet Node (160, 120) */}
              <g transform="translate(160, 120)" className="cursor-pointer" onClick={() => setSelectedNode("fleet")}>
                <circle cx="0" cy="0" r="14" fill="#05070d" stroke={selectedNode === "fleet" ? "#F4B400" : "rgba(255,255,255,0.12)"} strokeWidth={selectedNode === "fleet" ? "2.5" : "1.2"} />
                <text x="0" y="3" fill="#F4B400" fontSize="7" textAnchor="middle" fontWeight="bold">FLEET</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-5 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#8B5CF6] uppercase tracking-widest">
                  {current.category}
                </span>
                <h3 className="text-base font-black text-white mt-2.5">{current.name}</h3>
              </div>

              <div className="text-xs space-y-2 border-t border-white/5 pt-4">
                <div>
                  <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Active Connections</span>
                  <span className="font-extrabold text-white mt-0.5 block">{current.connections}</span>
                </div>
                <div>
                  <span className="text-muted-foreground/50 uppercase font-bold text-[8.5px] block">Core Protocols</span>
                  <span className="font-extrabold text-[#00E676] mt-0.5 block">{current.standards}</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground/80 leading-relaxed border-t border-white/5 pt-4">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[9px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4.5 h-4.5 text-[#00E676] shrink-0 mt-0.5" />
            <p>Knowledge graphs evaluate compliance boundaries dynamically.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
