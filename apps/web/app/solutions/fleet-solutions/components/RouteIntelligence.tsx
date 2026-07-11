"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Clock, Sun, Cloud, AlertCircle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

interface RouteOption {
  id: string;
  name: string;
  duration: string;
  energyKwh: number;
  socArrival: number;
  stops: number;
  cost: number;
  weather: string;
  traffic: string;
  elevationProfile: number[];
}

export function RouteIntelligence() {
  const [selectedRoute, setSelectedRoute] = useState<string>("sf-loop");
  const [activePlan, setActivePlan] = useState<"fastest" | "efficient" | "cost">("efficient");

  const routes: Record<string, Record<"fastest" | "efficient" | "cost", RouteOption>> = {
    "sf-loop": {
      fastest: {
        id: "sf-f",
        name: "SF Downtown Cargo (US-101 N)",
        duration: "42 min",
        energyKwh: 22,
        socArrival: 72,
        stops: 0,
        cost: 3.52,
        weather: "Overcast, 15°C",
        traffic: "Heavy (Rush hour)",
        elevationProfile: [10, 45, 12, 60, 5, 8],
      },
      efficient: {
        id: "sf-e",
        name: "SF Downtown Cargo (Eco Route)",
        duration: "48 min",
        energyKwh: 16,
        socArrival: 78,
        stops: 0,
        cost: 2.56,
        weather: "Overcast, 15°C",
        traffic: "Moderate (Flowing)",
        elevationProfile: [10, 20, 15, 12, 10, 8],
      },
      cost: {
        id: "sf-c",
        name: "SF Downtown Cargo (Off-peak Loop)",
        duration: "52 min",
        energyKwh: 17,
        socArrival: 77,
        stops: 0,
        cost: 1.36,
        weather: "Overcast, 15°C",
        traffic: "Light (Off-peak)",
        elevationProfile: [10, 20, 15, 12, 10, 8],
      },
    },
    "la-dist": {
      fastest: {
        id: "la-f",
        name: "LA Hub to Ontario Depot (I-10 E)",
        duration: "58 min",
        energyKwh: 48,
        socArrival: 52,
        stops: 1,
        cost: 12.45,
        weather: "Sunny, 28°C",
        traffic: "Heavy congestion",
        elevationProfile: [50, 60, 75, 90, 85, 110],
      },
      efficient: {
        id: "la-e",
        name: "LA Hub to Ontario Depot (Eco-Highways)",
        duration: "1 hr 8 min",
        energyKwh: 36,
        socArrival: 64,
        stops: 0,
        cost: 5.76,
        weather: "Sunny, 28°C",
        traffic: "Moderate congestion",
        elevationProfile: [50, 55, 60, 65, 70, 72],
      },
      cost: {
        id: "la-c",
        name: "LA Hub to Ontario Depot (Local Tracks)",
        duration: "1 hr 15 min",
        energyKwh: 38,
        socArrival: 62,
        cost: 3.04,
        stops: 0,
        weather: "Sunny, 28°C",
        traffic: "Light flow",
        elevationProfile: [50, 55, 60, 65, 70, 72],
      },
    },
  };

  const current = routes[selectedRoute]?.[activePlan] ?? routes["sf-loop"]!["efficient"]!;

  // Elevation Profile SVG coordinate calculation
  const width = 240;
  const height = 50;
  const maxElev = Math.max(...current.elevationProfile, 100);
  const minElev = Math.min(...current.elevationProfile, 0);
  const range = maxElev - minElev || 1;

  const pointsString = current.elevationProfile
    .map((val, idx) => {
      const x = (idx / (current.elevationProfile.length - 1)) * width;
      const y = height - 5 - ((val - minElev) / range) * (height - 10);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" L ");

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column selectors */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              COGNITIVE ROUTING ENGINE
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Navigation className="w-5 h-5 text-[#00E676]" />
              AI Route Intelligence
            </h2>
          </div>

          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Select logistics routes to optimize charge distribution and estimate SOC arrival states based on real-time grid conditions.
          </p>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => setSelectedRoute("sf-loop")}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                selectedRoute === "sf-loop"
                  ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                  : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
              }`}
            >
              <div>
                <span className="text-xs font-black block">SF Downtown Cargo Loop</span>
                <span className="text-[9px] opacity-50 block mt-0.5">Route: SF Downtown to Airport terminals</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
            </button>

            <button
              onClick={() => setSelectedRoute("la-dist")}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                selectedRoute === "la-dist"
                  ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                  : "border-white/5 bg-white/2 text-muted-foreground/65 hover:bg-white/4"
              }`}
            >
              <div>
                <span className="text-xs font-black block">LA Hub to Ontario Depot</span>
                <span className="text-[9px] opacity-50 block mt-0.5">Route: Interstate-10 East logistic corridor</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
            </button>
          </div>
        </div>

        {/* Right Output details panel */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              {current.name}
            </h3>

            {/* Plan switcher tabs */}
            <div className="flex bg-white/2 border border-white/5 p-0.5 rounded-lg shrink-0">
              {(["fastest", "efficient", "cost"] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => setActivePlan(plan)}
                  className={`px-2.5 py-1 rounded text-[8.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activePlan === plan
                      ? "bg-white/5 text-white"
                      : "text-muted-foreground/40 hover:text-white"
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Duration</span>
              <span className="font-extrabold text-white mt-1 block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00D4FF]" />
                {current.duration}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Energy Need</span>
              <span className="font-extrabold text-white mt-1 block">{current.energyKwh} kWh</span>
            </div>
            <div>
              <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">SOC at Arrival</span>
              <span className="font-extrabold text-[#00E676] mt-1 block">{current.socArrival}%</span>
            </div>
            <div>
              <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Energy Cost</span>
              <span className="font-extrabold text-[#00D4FF] mt-1 block">${current.cost.toFixed(2)}</span>
            </div>
          </div>

          {/* Elevation Profile SVG graph */}
          <div className="p-4 rounded-xl border border-white/5 bg-black/45 space-y-2">
            <div className="flex justify-between items-center text-[9px] text-muted-foreground/40 font-bold uppercase">
              <span>Elevation Profile (Gradient contours)</span>
              <span className="text-white font-mono">{maxElev} ft max</span>
            </div>

            <div className="h-[50px] w-full">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <line x1="0" y1={height - 5} x2={width} y2={height - 5} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                <path
                  d={`M 0,${height - 5} L ${pointsString} L ${width},${height - 5} Z`}
                  fill="url(#elevGlow)"
                  opacity="0.1"
                />
                <path
                  d={`M ${pointsString}`}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="elevGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-muted-foreground/60 border-t border-white/5 pt-4">
            <span className="flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-muted-foreground/50" />
              Weather: {current.weather}
            </span>
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-muted-foreground/50" />
              Traffic: {current.traffic}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
