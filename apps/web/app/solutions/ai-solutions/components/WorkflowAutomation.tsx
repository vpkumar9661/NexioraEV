"use client";

import React, { useState } from "react";
import { Compass, ShieldCheck, Zap, ToggleLeft, ToggleRight } from "lucide-react";

interface WorkflowItem {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
}

export function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    { id: "wf-1", name: "Battery Health Anomaly Warning", trigger: "BESS Temp exceeds mean +10°F", action: "Trigger cooling cycle & notify engineer", active: true },
    { id: "wf-2", name: "Daily Fleet Cost Savings Report", trigger: "Midnight (12:00 AM)", action: "Compile PDF ledger & email CFO", active: true },
    { id: "wf-3", name: "Utility Spot Tariffs Arbitrage", trigger: "Spot price sags < $0.09/kWh", opacity: 0.9, action: "Charge BESS cells to 100% SOC", active: false } as any,
  ]);

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, active: !wf.active } : wf))
    );
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Controls column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-widest block">
                EVENT-DRIVEN ACTION ORCHESTRATION
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Zap className="w-5 h-5 text-[#8B5CF6]" />
                Workflow Automation
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Enforce rule parameters across modules. Trigger battery cools, compile daily savings ledgers, or dispatch VPP bids during clearance peaks.
            </p>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Automations utilize local edge computing relays for immediate response times.</p>
          </div>
        </div>

        {/* Right list column */}
        <div className="lg:col-span-7 space-y-3.5">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 ${
                wf.active
                  ? "border-[#8B5CF6]/30 bg-[#8B5CF6]/5"
                  : "border-white/5 bg-white/2"
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-black text-white block">{wf.name}</span>
                <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-mono">
                  Trigger: {wf.trigger} <br />
                  Action: {wf.action}
                </p>
              </div>

              <button onClick={() => toggleWorkflow(wf.id)} className="cursor-pointer">
                {wf.active ? (
                  <ToggleRight className="w-8 h-8 text-[#8B5CF6]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-muted-foreground/40" />
                )}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
