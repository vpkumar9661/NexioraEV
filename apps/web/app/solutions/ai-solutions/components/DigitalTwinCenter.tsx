"use client";

import React, { useState } from "react";
import { Compass, ShieldCheck, Zap, Activity } from "lucide-react";

interface TwinModel {
  id: string;
  name: string;
  category: string;
  health: string;
  perf: string;
  load: string;
}

export function DigitalTwinCenter() {
  const [selectedTwin, setSelectedTwin] = useState("bess");

  const twins: Record<string, TwinModel> = {
    bess: { id: "bess", name: "BESS Storage Vault", category: "Battery Pack", health: "98.4% SOH", perf: "96.2% Eff", load: "78 kW" },
    grid: { id: "grid", name: "Microgrid Inverter Grid", category: "Substation", health: "99.8% Nominal", perf: "99.9% PF", load: "420 kW" },
    charger: { id: "charger", name: "Workplace EV Charger Vault", category: "OCPP Network", health: "97.8% Online", perf: "94.5% Rate", load: "145 kW" },
  };

  const active = (twins[selectedTwin] ?? twins.bess) as TwinModel;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00D4FF] uppercase tracking-widest block">
                VIRTUAL TELEMETRY COGNITIVE REPLICAS
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Compass className="w-5 h-5 text-[#00D4FF]" />
                Digital Twin Intelligence
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {Object.values(twins).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTwin(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    selectedTwin === t.id
                      ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                      : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block">{t.name}</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">{t.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start font-bold">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Virtual simulations sync every 500ms using active sensor pings.</p>
          </div>
        </div>

        {/* Right Twin Details */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>TWIN TELEMETRY READINGS</span>
              <span>SIMULATED MARGINS</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Twin State of Health</span>
                <span className="text-lg font-black text-white mt-1.5 block">{active.health}</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Efficiency rating</span>
                <span className="text-lg font-black text-[#00E676] mt-1.5 block">{active.perf}</span>
              </div>
            </div>

            <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
              <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Simulated active draw load</span>
              <span className="text-lg font-black text-white mt-1.5 block">{active.load}</span>
            </div>
          </div>

          <div className="flex justify-between text-[9.5px] text-muted-foreground/50 font-mono uppercase tracking-wider">
            <span>Model: {active.name}</span>
            <span>Category: {active.category}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
