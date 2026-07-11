"use client";

import React, { useState } from "react";
import { Activity, ShieldCheck, Sun, Compass, Zap } from "lucide-react";

export function DemandForecast() {
  const [forecastScope, setForecastScope] = useState<"hour" | "today" | "week">("today");

  // Chart data coordinate vectors mapping
  const actualPoints = "0,115 25,120 50,95 75,55 90,85 100,105";
  const forecastPoints = "100,105 120,110 135,100 150,75 165,45 185,90 200,115";
  const confidenceBand = "100,105 120,130 135,120 150,95 165,65 185,110 200,135 L 200,95 L 185,70 L 165,25 L 150,55 L 135,80 L 120,90 Z";

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                PREDICTIVE GRID INTELLIGENCE
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-[#00E676]" />
                Demand Forecast Center
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              AI evaluates meteorological models, historical factory loads, and EV charging queues to predict grid consumption trends.
            </p>

            <div className="flex bg-white/2 rounded-xl p-1 border border-white/5 text-xs font-bold">
              <button
                onClick={() => setForecastScope("hour")}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  forecastScope === "hour" ? "bg-[#00E676] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Next Hour
              </button>
              <button
                onClick={() => setForecastScope("today")}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  forecastScope === "today" ? "bg-[#00E676] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setForecastScope("week")}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  forecastScope === "week" ? "bg-[#00E676] text-black shadow-xs" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start font-bold">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <div>
              <p className="text-white">Weather Impact: Sunny (+12.4% PV)</p>
              <p className="text-muted-foreground/50 font-normal mt-0.5">High solar irradiance offsets evening cooling loads.</p>
            </div>
          </div>
        </div>

        {/* Right Column Custom SVG Chart */}
        <div className="lg:col-span-8 bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 overflow-hidden">
          
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
            <span>CONSUMPTION FORECAST PROFILE (kW)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" /> ACTUAL</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] border border-dashed border-white/20" /> FORECASTED</span>
            </div>
          </div>

          <div className="h-[200px] w-full relative pt-2">
            <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
              {/* Horizontal grid lines */}
              <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1="135" x2="200" y2="135" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

              {/* Forecast confidence band shading */}
              <polygon points={confidenceBand} fill="url(#confidenceAreaGrad)" opacity="0.08" />

              {/* Actual Load curve (solid line) */}
              <path d={`M ${actualPoints}`} fill="none" stroke="#00E676" strokeWidth="2" strokeLinecap="round" />

              {/* Forecasted curve (dashed yellow line) */}
              <path d={`M ${forecastPoints}`} fill="none" stroke="#F4B400" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />

              {/* Vertical division line separating actual from prediction */}
              <line x1="100" y1="10" x2="100" y2="135" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
              <text x="105" y="20" fill="#F4B400" fontSize="6" fontWeight="bold">AI PROJECTION</text>

              {/* Legend details labels */}
              <text x="5" y="20" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">1500 kW</text>
              <text x="5" y="75" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">750 kW</text>
              <text x="5" y="130" fill="#AEB5C0" fontSize="7" opacity="0.4" fontWeight="bold">0.0 kW</text>

              <text x="0" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="start">00:00</text>
              <text x="100" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="middle">12:00 (Now)</text>
              <text x="200" y="145" fill="#AEB5C0" fontSize="6" opacity="0.3" textAnchor="end">24:00</text>

              <defs>
                <linearGradient id="confidenceAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F4B400" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
