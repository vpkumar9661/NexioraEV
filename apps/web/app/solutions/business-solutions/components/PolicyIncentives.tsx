"use client";

import React, { useState } from "react";
import { Landmark, ShieldCheck, Compass, CheckSquare, Square } from "lucide-react";

interface PolicyItem {
  id: string;
  name: string;
  type: string;
  val: string;
  desc: string;
}

export function PolicyIncentives() {
  const [checklist, setChecklist] = useState([
    { id: "chk-1", text: "OCPP 2.0.1 smart compliance certification", completed: true },
    { id: "chk-2", text: "30% sub-metering grids isolation", completed: true },
    { id: "chk-3", text: "V2G bi-directional frequency response sync", completed: false },
    { id: "chk-4", text: "Solar PV coupling for grid decoupling", completed: false },
  ]);

  const policies: PolicyItem[] = [
    { id: "pol-1", name: "PM E-Drive Subsidy Scheme", type: "Federal Grant", val: "Up to $1,200/port", desc: "Covers capital expenditure for high-power DC workplace charging ports." },
    { id: "pol-2", name: "Accelerated Depreciation (Section 32)", type: "Tax Benefit", val: "40% Year 1 Writeoff", desc: "Allows commercial building owners to write off charger capital costs quickly." },
    { id: "pol-3", name: "State EV Charging Subsidy", type: "Regional Incentive", val: "20% Capital Rebate", desc: "State-specific grants for deploying public-access shopping plaza ports." },
  ];

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Subsidies List */}
        <div className="lg:col-span-6 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              REGULATORY ADVANTAGES MATRIX
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Landmark className="w-5 h-5 text-[#00E676]" />
              Policy & Incentives Advisory
            </h2>
          </div>

          <div className="space-y-3.5">
            {policies.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black text-black px-2 py-0.5 rounded bg-[#00E676] uppercase tracking-widest block w-fit">
                      {p.type}
                    </span>
                    <h4 className="text-white font-extrabold mt-2">{p.name}</h4>
                  </div>
                  <span className="font-extrabold text-[#00D4FF]">{p.val}</span>
                </div>
                <p className="text-muted-foreground/75 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right LEED Certification Checklist */}
        <div className="lg:col-span-6 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>LEED & GRIHA COMPLIANCE AUDITING CHECKLIST</span>
              <span>GREEN RATING POINTS</span>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all flex items-center gap-3.5 text-xs text-white cursor-pointer"
                >
                  {item.completed ? (
                    <CheckSquare className="w-4.5 h-4.5 text-[#00E676] shrink-0" />
                  ) : (
                    <Square className="w-4.5 h-4.5 text-muted-foreground/45 shrink-0" />
                  )}
                  <span className={item.completed ? "text-white/80" : "text-muted-foreground/50 line-through"}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 text-[10.5px] text-muted-foreground/70 flex gap-2.5 items-start">
            <ShieldCheck className="w-4.5 h-4.5 text-[#00E676] shrink-0 mt-0.5" />
            <p>
              Completing all checklist parameters yields up to **12 LEED points** under Section LT: Alternative Transportation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
