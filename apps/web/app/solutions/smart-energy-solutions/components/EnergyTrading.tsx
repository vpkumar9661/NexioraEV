"use client";

import React, { useState } from "react";
import { Landmark, ShieldCheck, Compass, DollarSign, ArrowUpRight } from "lucide-react";

interface TradeRow {
  time: string;
  type: "Sell" | "Buy";
  entity: string;
  qty: string;
  price: string;
  credits: string;
}

export function EnergyTrading() {
  const [autoTrade, setAutoTrade] = useState(true);

  const trades: TradeRow[] = [
    { time: "12:40", type: "Sell", entity: "V2G Hub Loop #2", qty: "40 kWh", price: "$0.14 / kWh", credits: "+$5.60" },
    { time: "12:15", type: "Sell", entity: "West PV Cluster A", qty: "120 kWh", price: "$0.12 / kWh", credits: "+$14.40" },
    { time: "11:45", type: "Buy", entity: "East Depot Vault", qty: "85 kWh", price: "$0.09 / kWh", credits: "-$7.65" },
    { time: "10:30", type: "Sell", entity: "HQ Canopy B", qty: "55 kWh", price: "$0.11 / kWh", credits: "+$6.05" },
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-widest block">
                PEER-TO-PEER ENERGY BROKER
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Landmark className="w-5 h-5 text-[#4F46E5]" />
                Energy Trading Center
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Export excess local microgrid solar yields to neighbor V2G chargers. Automatically buy off-peak credits based on dynamically clearing market price tariffs.
            </p>

            {/* Toggle auto trading */}
            <div className="flex bg-white/2 rounded-xl p-1 border border-white/5 text-xs font-bold">
              <button
                onClick={() => setAutoTrade(true)}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  autoTrade ? "bg-[#4F46E5] text-white shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Auto-Trading On
              </button>
              <button
                onClick={() => setAutoTrade(false)}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  !autoTrade ? "bg-[#4F46E5] text-white shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Manual Bidding
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4 text-xs font-bold">
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Clearance Price</span>
              <span className="text-xs font-black text-white mt-1 block">$0.14 / kWh</span>
            </div>
            <div className="bg-white/1 border border-white/5 p-3 rounded-xl">
              <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Daily Earnings</span>
              <span className="text-xs font-black text-[#00E676] mt-1 block">+$1,480.20</span>
            </div>
          </div>
        </div>

        {/* Right Column P2P Logs */}
        <div className="lg:col-span-7 space-y-4 bg-black/40 border border-white/5 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>P2P TRANSACTION SETTLEMENT HISTORY</span>
            <span>CREDITS STATUS</span>
          </div>

          <div className="space-y-2.5">
            {trades.map((trade, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded-sm border ${
                      trade.type === "Sell"
                        ? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20"
                        : "bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20"
                    }`}
                  >
                    {trade.type}
                  </span>
                  <div>
                    <span className="text-xs font-black text-white block">{trade.entity}</span>
                    <span className="text-[9px] text-muted-foreground/40 font-mono">
                      Quantity: {trade.qty} | Rate: {trade.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black ${trade.type === "Sell" ? "text-[#00E676]" : "text-[#00D4FF]"}`}>
                    {trade.credits}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
