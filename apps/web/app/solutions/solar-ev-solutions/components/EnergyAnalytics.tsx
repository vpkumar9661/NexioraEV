"use client";

import React, { useState } from "react";
import { BarChart3, Sun, Activity, Compass, ShieldCheck } from "lucide-react";

export function EnergyAnalytics() {
  const [activeTab, setActiveTab] = useState<"daily" | "monthly">("daily");

  // Custom SVG Chart Coordinates for Daily curves (00:00 to 24:00)
  // Solar Production Curve coordinates (bell-shaped):
  // (x, y) coordinates representing hours 0 to 24 mapped to graph height.
  // Household consumption Curve coordinates (dual peak):
  const dailySolarPoints = "0,135 25,135 50,135 75,130 90,95 105,45 120,25 135,45 150,95 165,130 185,135 200,135";
  const dailyHomePoints = "0,115 25,120 50,95 75,55 90,85 105,105 120,110 135,100 150,75 165,45 185,90 200,115";

  // Monthly yield coordinates (Jan to Jun)
  const monthlyData = [
    { month: "Jan", gen: 420, savings: 180 },
    { month: "Feb", gen: 480, savings: 210 },
    { month: "Mar", gen: 680, savings: 320 },
    { month: "Apr", gen: 850, savings: 480 },
    { month: "May", gen: 980, savings: 590 },
    { month: "Jun", gen: 1120, savings: 720 },
  ];

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#F4B400] uppercase tracking-widest block">
                INTELLIGENT ENERGY TELEMETRY
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-[#F4B400]" />
                Energy Analytics
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Track solar production offsets against consumption peaks. Analyze self-consumption coefficients in real-time.
            </p>

            <div className="flex bg-white/2 rounded-xl p-1 border border-white/5 text-xs font-bold">
              <button
                onClick={() => setActiveTab("daily")}
                className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === "daily" ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Daily Load Curves
              </button>
              <button
                onClick={() => setActiveTab("monthly")}
                className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === "monthly" ? "bg-[#F4B400] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Monthly Yield Profiles
              </button>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start font-bold">
            <ShieldCheck className="w-4 h-4 text-[#F4B400] shrink-0 mt-0.5" />
            <div>
              <p className="text-white">Self-Powered Index: 89.2%</p>
              <p className="text-muted-foreground/50 font-normal mt-0.5">Average solar direct consumption vs grid import ratios.</p>
            </div>
          </div>
        </div>

        {/* Right Column Charts */}
        <div className="lg:col-span-8 bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 overflow-hidden">
          
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>{activeTab === "daily" ? "DAILY POWER LOAD GRAPH (kW)" : "MONTHLY GENERATED YIELD (kWh)"}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" /> SOLAR</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" /> LOAD</span>
            </div>
          </div>

          {activeTab === "daily" ? (
            <div className="h-[200px] w-full relative pt-2">
              <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
                {/* Horizontal grid lines */}
                <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                <line x1="0" y1="135" x2="200" y2="135" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

                {/* Shaded Area for Solar */}
                <path d={`M 0,135 L ${dailySolarPoints} L 200,135 Z`} fill="url(#solarAreaGrad)" opacity="0.12" />

                {/* Shaded Area for Household Load */}
                <path d={`M 0,135 L ${dailyHomePoints} L 200,135 Z`} fill="url(#homeAreaGrad)" opacity="0.08" />

                {/* Solar Curve Line */}
                <path d={`M 0,135 Q 75,135 100,30 T 200,135`} fill="none" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />

                {/* Load Curve Line */}
                <path d={`M 0,115 C 30,120 60,35 100,105 C 130,130 170,30 200,115`} fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />

                {/* Legend details labels */}
                <text x="5" y="20" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">12.0 kW</text>
                <text x="5" y="75" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">6.0 kW</text>
                <text x="5" y="130" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">0.0 kW</text>

                <text x="0" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="start">00:00</text>
                <text x="100" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="middle">12:00</text>
                <text x="200" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="end">24:00</text>

                <defs>
                  <linearGradient id="solarAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4B400" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                  <linearGradient id="homeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : (
            <div className="h-[200px] w-full flex items-end justify-between px-2 pt-4">
              {monthlyData.map((item, idx) => {
                const maxVal = 1200;
                const genHeight = (item.gen / maxVal) * 100; // %
                const savingsHeight = (item.savings / maxVal) * 100; // %

                return (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full flex justify-center gap-1.5 h-[130px] items-end">
                      {/* Solar Bar */}
                      <div className="w-3 rounded-t-sm bg-linear-to-t from-[#F4B400] to-[#FF9800]" style={{ height: `${genHeight}%` }} />
                      {/* Savings Bar */}
                      <div className="w-3 rounded-t-sm bg-linear-to-t from-[#00D4FF] to-[#00E676]" style={{ height: `${savingsHeight}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/50">{item.month}</span>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
