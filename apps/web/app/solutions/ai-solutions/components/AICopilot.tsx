"use client";

import React, { useState } from "react";
import { Compass, ShieldCheck, Zap, Activity, Cpu, Bot, CheckCircle } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  desc: string;
  capabilities: string[];
  status: "Online" | "Idle" | "Offline";
}

export function AICopilot() {
  const [activeAgent, setActiveAgent] = useState("battery");

  const agents: Record<string, Agent> = {
    battery: {
      id: "battery",
      name: "Battery AI Agent",
      type: "Electrochemical Model",
      desc: "Monitors internal cell resistance, estimates SOH degradation curves, and detects thermal anomalies.",
      capabilities: ["SOH Curve Forecasting", "Thermal Anomaly Alerts", "Recycling Yield Analytics"],
      status: "Online",
    },
    charging: {
      id: "charging",
      name: "Charging AI Agent",
      type: "Load Balancing Model",
      desc: "Optimizes grid power distribution, plans fast DC corridors, and balances charger queues.",
      capabilities: ["Dynamic Grid Matching", "Fast Charge Planning", "Queue Optimization"],
      status: "Online",
    },
    fleet: {
      id: "fleet",
      name: "Fleet AI Agent",
      type: "Routing & Logistics Model",
      desc: "Guides EV dispatch queues, optimizes regenerative braking, and monitors driver scorecards.",
      capabilities: ["Telemetry Analysis", "Regen Braking Efficiency", "ICE Savings Auditing"],
      status: "Online",
    },
    energy: {
      id: "energy",
      name: "Smart Energy AI Agent",
      type: "Virtual Power Plant Model",
      desc: "Balances microgrid inputs, triggers VPP peak load dispatches, and coordinates grid code alignments.",
      capabilities: ["VPP Capacity Scheduling", "IEEE 1547 Sync", "Harmonics THD Scans"],
      status: "Online",
    },
  };

  const selected = (agents[activeAgent] ?? agents.battery) as Agent;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Agent selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00D4FF] uppercase tracking-widest block">
                SPECIALIZED LLM ORCHESTRATOR
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Bot className="w-5 h-5 text-[#00D4FF]" />
                AI Copilot Agent Swapper
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {Object.values(agents).map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    activeAgent === agent.id
                      ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                      : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block">{agent.name}</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">{agent.type}</span>
                  </div>
                  <span className="text-[9px] font-extrabold text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {agent.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Agents compile prompts dynamically using active sub-meter RTU data streams.</p>
          </div>
        </div>

        {/* Right Details inspector */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>ACTIVE MODEL CAPABILITIES INVENTORY</span>
              <span>COGNITIVE SUMMARY</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#00D4FF] uppercase tracking-widest">
                  {selected.type}
                </span>
                <h3 className="text-base font-black text-white mt-2.5">{selected.name}</h3>
                <p className="text-xs text-muted-foreground/75 mt-2.5 leading-relaxed">
                  {selected.desc}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Core Capabilities</span>
                <div className="space-y-1.5 text-xs text-white">
                  {selected.capabilities.map((cap, i) => (
                    <div key={i} className="flex gap-2.5 items-center">
                      <CheckCircle className="w-4 h-4 text-[#00E676] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert(`Launching Workspace with: ${selected.name}`)}
            className="w-full py-3 rounded-xl bg-linear-to-r from-[#00D4FF] to-[#8B5CF6] text-black font-black text-xs uppercase tracking-wider cursor-pointer text-center"
          >
            Launch Specialized Agent
          </button>

        </div>

      </div>
    </section>
  );
}
