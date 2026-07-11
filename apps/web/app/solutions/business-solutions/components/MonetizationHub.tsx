"use client";

import React, { useState } from "react";
import { DollarSign, ShieldCheck, Compass, CreditCard, Play } from "lucide-react";

interface BillingSession {
  id: string;
  user: string;
  duration: string;
  consumed: string;
  tariff: string;
  total: string;
}

export function MonetizationHub() {
  const [validationRule, setValidationRule] = useState("2 Hours Free");
  const [selectedGateway, setSelectedGateway] = useState("Visa / MC");

  const sessions: BillingSession[] = [
    { id: "sess-90", user: "John Doe (Employee)", duration: "4h 12m", consumed: "38.5 kWh", tariff: "$0.12", total: "$4.62" },
    { id: "sess-91", user: "Alice Smith (Guest)", duration: "2h 45m", consumed: "24.0 kWh", tariff: "$0.35", total: "$8.40" },
    { id: "sess-92", user: "Bob Miller (Guest)", duration: "1h 30m", consumed: "18.2 kWh", tariff: "$0.35", total: "$6.37" },
    { id: "sess-93", user: "Emma Davis (Employee)", duration: "6h 05m", consumed: "52.4 kWh", tariff: "$0.12", total: "$6.29" },
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Config Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-widest block">
                PAYMENT GATEWAY CONFIGURATION
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <DollarSign className="w-5 h-5 text-[#4F46E5]" />
                Monetization Hub
              </h2>
            </div>

            <div className="space-y-4 text-xs font-bold">
              {/* Parking validation dropdown select */}
              <div>
                <label className="text-muted-foreground/50 uppercase tracking-wider block mb-2">Parking Validation Rule</label>
                <select
                  value={validationRule}
                  onChange={(e) => setValidationRule(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-hidden cursor-pointer"
                >
                  <option className="bg-[#05070d]">2 Hours Free with Store Receipt</option>
                  <option className="bg-[#05070d]">1 Hour Free with Shopping Voucher</option>
                  <option className="bg-[#05070d]">Full Validation for Office Staff</option>
                  <option className="bg-[#05070d]">No Validation (Standard Tariffs)</option>
                </select>
              </div>

              {/* Payment Gateway Toggle */}
              <div>
                <label className="text-muted-foreground/50 uppercase tracking-wider block mb-2">Active Merchant Gateway</label>
                <div className="flex bg-white/2 rounded-xl p-1 border border-white/5">
                  {["Visa / MC", "Apple Pay", "Google Pay"].map((gw) => (
                    <button
                      key={gw}
                      onClick={() => setSelectedGateway(gw)}
                      className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                        selectedGateway === gw ? "bg-[#4F46E5] text-white shadow-xs" : "text-muted-foreground/60 hover:text-white"
                      }`}
                    >
                      {gw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Monetization engine is fully PCI-DSS Level 1 compliant.</p>
          </div>
        </div>

        {/* Right Ledger Log */}
        <div className="lg:col-span-7 space-y-4 bg-black/40 border border-white/5 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>RECENT REVENUE TRANSACTION SESSIONS</span>
            <span>Tariff Clearance</span>
          </div>

          <div className="space-y-2.5">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">{sess.user}</span>
                    <span className="text-[9px] text-muted-foreground/45 font-mono">
                      Vol: {sess.consumed} | Time: {sess.duration} | Rate: {sess.tariff}/kWh
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-[#00E676] block">{sess.total}</span>
                  <span className="text-[8px] text-[#00D4FF] uppercase tracking-widest font-mono font-bold block mt-0.5">
                    Settled
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
