"use client";

import React, { useState } from "react";
import { BookOpen, ShieldCheck, ChevronRight, Cpu } from "lucide-react";

interface GuideTopic {
  id: string;
  name: string;
  category: string;
  details: string;
  tips: string[];
}

export function KnowledgeCenter() {
  const [activeTopic, setActiveTopic] = useState<string>("lease");

  const topics: Record<string, GuideTopic> = {
    lease: {
      id: "lease",
      name: "Landlord Charging Lease Guidelines",
      category: "Tenant Charging",
      details: "Commercial real estate owners can choose between two main structures to pass charger costs to tenants: (1) Fixed amenity fee surcharges (flat $10-$20/month per vehicle space), or (2) Utility pass-through submetering grids (passing through real-time spot energy rates + operational margins).",
      tips: [
        "Include pass-through parameters in primary tenant leasing covenants.",
        "Set custom guest rates on public shopping plaza spaces to maximize revenue.",
        "Allow corporate validated sessions to waive charging fees for employees.",
      ],
    },
    ocpp: {
      id: "ocpp",
      name: "OCPP 1.6 / 2.0.1 Protocol Integration",
      category: "Smart Integration",
      details: "OCPP (Open Charge Point Protocol) allows chargers to sync dynamically with third-party billing backends. By using OCPP 2.0.1, building operators can configure local load balancing limits, enforce dynamic pricing shifts, and test transaction gateways directly.",
      tips: [
        "Select OCPP 2.0.1 certified hardware for improved transaction security parameters.",
        "Verify submeter grids connection frequencies to prevent data logging drops.",
        "Integrate dynamic pricing parameters with regional utility spot prices.",
      ],
    },
  };

  const current = topics[activeTopic]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Topics Select */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              COMPLIANCE & INTEGRATION GUIDEBOOK
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <BookOpen className="w-5 h-5 text-[#00E676]" />
              Knowledge Center
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {Object.values(topics).map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeTopic === topic.id
                    ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">{topic.name}</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">{topic.category}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details Block */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div>
              <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#00E676] uppercase tracking-widest">
                Compliance Guide Details
              </span>
              <h3 className="text-base font-black text-white mt-2.5">{current.name}</h3>
            </div>

            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              {current.details}
            </p>

            <div className="border-t border-white/5 pt-4 space-y-2">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Core Guidelines</span>
              <div className="space-y-1.5 text-xs text-white">
                {current.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[10.5px]">
              <span className="font-extrabold text-white block">OCPP Transaction Sync Live</span>
              <p className="text-muted-foreground/70 leading-relaxed">
                Hardware validation sweeps occur automatically. Ensure charge points have active LTE/Wi-Fi links for transaction settlement sync.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
