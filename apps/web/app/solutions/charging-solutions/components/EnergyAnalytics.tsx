"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Sun, Battery, Eye, TrendingUp, CalendarDays, RefreshCcw } from "lucide-react";

export function EnergyAnalytics() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const [showForecast, setShowForecast] = useState(true);

  // Mock data curves (24 data points representing hourly daily load profiles, etc.)
  const dailyGridLoad = [30, 25, 20, 18, 22, 35, 60, 95, 110, 120, 105, 90, 80, 95, 115, 140, 155, 160, 145, 120, 90, 65, 45, 35];
  const dailySolarLoad = [0, 0, 0, 0, 0, 5, 20, 45, 70, 85, 95, 100, 95, 80, 60, 35, 15, 2, 0, 0, 0, 0, 0, 0];
  const dailyBatteryLoad = [10, 10, 15, 20, 20, 10, -5, -20, -30, -25, -10, 5, 10, 0, -15, -35, -45, -40, -20, 5, 10, 10, 10, 10]; // positive = charging, negative = discharging (offsetting peak load)

  const weeklyGridLoad = [680, 710, 750, 780, 820, 580, 520]; // 7 days
  const weeklySolar = [210, 180, 230, 240, 190, 220, 250];
  const weeklyBattery = [80, 95, 110, 100, 105, 70, 60];

  const monthlyGridLoad = [2800, 3100, 2900, 3400, 3500, 3800, 4100, 4300, 3900, 3600, 3200, 2900]; // 12 months
  const monthlySolar = [950, 1100, 1200, 1300, 1400, 1450, 1500, 1400, 1200, 1000, 850, 800];
  const monthlyBattery = [400, 420, 450, 480, 510, 530, 550, 520, 480, 460, 430, 410];

  // Helper to convert numbers to SVG line/area path
  const getPathString = (data: number[], width: number, height: number, min: number, max: number) => {
    const range = max - min || 1;
    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" L ");
  };

  const getAreaPathString = (data: number[], width: number, height: number, min: number, max: number) => {
    const range = max - min || 1;
    const startX = 0;
    const startY = height;
    const endX = width;
    const endY = height;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" L ");

    return `M ${startX},${startY} L ${points} L ${endX},${endY} Z`;
  };

  // Grid sizing parameters depending on active tab
  const svgW = 500;
  const svgH = 180;

  let currentGrid: number[] = [];
  let currentSolar: number[] = [];
  let currentBattery: number[] = [];
  let labels: string[] = [];
  let maxVal = 200;
  let minVal = -60;

  if (activeTab === "daily") {
    currentGrid = dailyGridLoad;
    currentSolar = dailySolarLoad;
    currentBattery = dailyBatteryLoad;
    labels = ["00:00", "06:00", "12:00", "18:00", "23:00"];
    maxVal = 200;
    minVal = -60;
  } else if (activeTab === "weekly") {
    currentGrid = weeklyGridLoad;
    currentSolar = weeklySolar;
    currentBattery = weeklyBattery;
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    maxVal = 1000;
    minVal = 0;
  } else {
    currentGrid = monthlyGridLoad;
    currentSolar = monthlySolar;
    currentBattery = monthlyBattery;
    labels = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
    maxVal = 5000;
    minVal = 0;
  }

  // Generate a demand forecast line: grid load + 15% random deviation
  const forecastData = currentGrid.map((val, idx) => {
    const dev = Math.sin(idx * 0.8) * (val * 0.08) + (val * 0.05);
    return Math.round(val + dev);
  });

  const gridLinePath = getPathString(currentGrid, svgW, svgH, minVal, maxVal);
  const solarAreaPath = getAreaPathString(currentSolar, svgW, svgH, minVal, maxVal);
  const solarLinePath = getPathString(currentSolar, svgW, svgH, minVal, maxVal);
  const batteryLinePath = getPathString(currentBattery, svgW, svgH, minVal, maxVal);
  const forecastLinePath = getPathString(forecastData, svgW, svgH, minVal, maxVal);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Informational & KPI Column */}
        <div className="xl:w-[320px] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                INTELLIGENT SCADA DASHBOARD
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-[#00E676] animate-pulse" />
                Grid Energy Analytics
              </h2>
            </div>

            <p className="text-xs text-muted-foreground/75 leading-relaxed">
              Real-time visualization of electric grid demands, distributed solar generation inputs, and local storage buffer offsets.
            </p>

            {/* Selector tabs */}
            <div className="flex bg-white/2 border border-white/5 p-1 rounded-xl">
              {(["daily", "weekly", "monthly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-center rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white/5 border border-white/10 text-[#00E676] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                      : "text-muted-foreground/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Toggle Forecast */}
            <button
              onClick={() => setShowForecast(!showForecast)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                showForecast
                  ? "border-[#00E676]/30 bg-[#00E676]/5 text-white"
                  : "border-white/5 bg-white/2 text-muted-foreground/40"
              }`}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                AI Demand Forecast Overlay
              </span>
              <span className={showForecast ? "text-[#00E676]" : "text-muted-foreground/40"}>
                {showForecast ? "ON" : "OFF"}
              </span>
            </button>
          </div>

          {/* Real-time SCADA Metrics */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4">
            <div className="bg-white/1 border border-white/5 p-3.5 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider">Solar Offset</span>
              </div>
              <span className="text-lg font-black text-white">41.8%</span>
              <span className="text-[8px] text-[#00E676] font-bold block mt-1">Self-Consumption</span>
            </div>

            <div className="bg-white/1 border border-white/5 p-3.5 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Battery className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider">BESS Offset</span>
              </div>
              <span className="text-lg font-black text-white">95 kWh</span>
              <span className="text-[8px] text-[#00D4FF] font-bold block mt-1">Discharged Peak</span>
            </div>
          </div>
        </div>

        {/* Right Dynamic Charts Area */}
        <div className="flex-1 rounded-[24px] border border-white/5 bg-black/40 p-5 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center text-xs">
            {/* Chart Legend */}
            <div className="flex flex-wrap gap-4 text-[10px] font-bold text-muted-foreground/65 uppercase">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#3B82F6] block" />
                Grid electricity
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1.5 bg-amber-400/25 border border-amber-400/50 block" />
                Solar PV Generation
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#A78BFA] block" style={{ borderStyle: "dashed" }} />
                Battery Peak Buffer
              </div>
              {showForecast && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#00E676] block" style={{ strokeDasharray: "2 2" }} />
                  AI Forecast
                </div>
              )}
            </div>

            <span className="text-muted-foreground/50 font-mono text-[9px]">
              {activeTab === "daily" ? "Real-time Telemetry (kW)" : activeTab === "weekly" ? "Weekly Load (MWh)" : "Monthly consumption (MWh)"}
            </span>
          </div>

          {/* SVG Multi Curve Graphic Chart */}
          <div className="h-[180px] w-full flex items-center justify-center relative">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full overflow-visible">
              {/* Horizontal grid lines */}
              <line x1="0" y1={svgH * 0.25} x2={svgW} y2={svgH * 0.25} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1={svgH * 0.5} x2={svgW} y2={svgH * 0.5} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              <line x1="0" y1={svgH * 0.75} x2={svgW} y2={svgH * 0.75} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
              
              {/* Zero baseline (especially for negative BESS values during discharge) */}
              {activeTab === "daily" && (
                <line
                  x1="0"
                  y1={svgH - ((0 - minVal) / (maxVal - minVal)) * svgH}
                  x2={svgW}
                  y2={svgH - ((0 - minVal) / (maxVal - minVal)) * svgH}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.8"
                />
              )}

              {/* Curve 2: Solar PV filled area and line */}
              <path
                d={solarAreaPath}
                fill="url(#solarGrad)"
                opacity="0.15"
              />
              <path
                d={`M ${solarLinePath}`}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
                opacity="0.85"
              />

              {/* Curve 1: Grid electricity load curve */}
              <path
                d={`M ${gridLinePath}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Curve 3: Battery charge/discharge trend */}
              <path
                d={`M ${batteryLinePath}`}
                fill="none"
                stroke="#A78BFA"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.75"
              />

              {/* Curve 4: Demand forecast overlay */}
              {showForecast && (
                <path
                  d={`M ${forecastLinePath}`}
                  fill="none"
                  stroke="#00E676"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                  opacity="0.9"
                />
              )}

              {/* Axis Definitions / Gradients */}
              <defs>
                <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between border-t border-white/5 pt-2 px-1 text-[9px] text-muted-foreground/40 font-mono">
            {labels.map((lbl, i) => (
              <span key={i}>{lbl}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
