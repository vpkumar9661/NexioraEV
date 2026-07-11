"use client";

import React, { useState } from "react";
import { Compass, ShieldCheck, Landmark, Zap, Layers, RefreshCcw } from "lucide-react";

interface VPPAsset {
  id: string;
  name: string;
  type: string;
  capacity: string;
  status: "Active" | "Idle" | "Offline";
  powerVal: number;
}

export function VirtualPowerPlant() {
  const [isDispatched, setIsDispatched] = useState(false);

  const assets: VPPAsset[] = [
    { id: "ast-1", name: "HQ Solar Canopy A", type: "Solar", capacity: "240 kW", status: "Active", powerVal: 180 },
    { id: "ast-2", name: "Ontario BESS Storage B", type: "Battery", capacity: "300 kW", status: "Active", powerVal: 240 },
    { id: "ast-3", name: "Waterfront Office Block C", type: "Building", status: "Active", capacity: "150 kW", powerVal: -90 },
    { id: "ast-4", name: "Depot Charger Vault D", type: "EV Charger", status: "Active", capacity: "200 kW", powerVal: -120 },
    { id: "ast-5", name: "East PV Array Cluster", type: "Solar", capacity: "400 kW", status: "Active", powerVal: 310 },
  ];

  const totalCapacity = 1290; // kW
  const activeDispatch = isDispatched ? 480 : 0;
  const dispatchRevenue = isDispatched ? 8420 : 0;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-widest block">
                DISTRIBUTED ENERGY ORCHESTRATOR
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Landmark className="w-5 h-5 text-[#4F46E5]" />
                Virtual Power Plant (VPP)
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Consolidate distributed building reserves, batteries, and solar arrays into a unified generation block. Participate in grid capacity reserve markets.
            </p>

            <button
              onClick={() => setIsDispatched(!isDispatched)}
              className={`w-full py-3.5 rounded-xl border font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isDispatched
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                  : "bg-[#00E676]/10 border-[#00E676]/30 text-white hover:bg-[#00E676]/20 shadow-[0_0_20px_rgba(0,230,118,0.1)]"
              }`}
            >
              {isDispatched ? "Stop VPP Dispatch Load Shed" : "Trigger VPP Dispatch Test"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4 text-xs font-bold">
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">VPP Dispatch</span>
              <span className="text-xs font-black text-white mt-1 block">{activeDispatch} kW active</span>
            </div>
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Revenue Generated</span>
              <span className="text-xs font-black text-[#00E676] mt-1 block">${dispatchRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column Network Visualization */}
        <div className="lg:col-span-7 space-y-4 bg-black/40 border border-white/5 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>DISTRIBUTED VPP RESOURCE NODES</span>
            <span>STATUS LOGS</span>
          </div>

          <div className="space-y-2.5">
            {assets.map((ast) => (
              <div
                key={ast.id}
                className="p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
                  <div>
                    <span className="text-xs font-black text-white block">{ast.name}</span>
                    <span className="text-[9px] text-muted-foreground/40 font-mono">Max Capacity: {ast.capacity}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-bold block ${ast.powerVal >= 0 ? "text-[#00E676]" : "text-[#00D4FF]"}`}>
                    {ast.powerVal >= 0 ? `+${ast.powerVal} kW` : `${ast.powerVal} kW`}
                  </span>
                  <span className="text-[8px] text-muted-foreground/30 uppercase tracking-widest font-mono font-bold block mt-0.5">
                    {ast.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
