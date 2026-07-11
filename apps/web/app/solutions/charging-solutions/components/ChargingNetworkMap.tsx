"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Layers, Radio, Sparkles, Filter, Navigation, Compass, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Station {
  id: number;
  name: string;
  x: number; // percentage coordinate
  y: number;
  type: "AC" | "DC" | "Ultra Fast" | "Swap";
  scope: "Public" | "Private";
  status: "Online" | "Offline" | "Occupied";
  load: number; // kW
  uptime: number; // %
}

interface AISuggestion {
  id: number;
  name: string;
  x: number;
  y: number;
  score: number; // out of 100
  reason: string;
  transformerAvailability: string;
}

export function ChargingNetworkMap() {
  // Layer states
  const [showCoverage, setShowCoverage] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [showExpansion, setShowExpansion] = useState(true);
  const [showAISuggestions, setShowAISuggestions] = useState(true);

  // Filter states
  const [filterType, setFilterType] = useState<string>("All");
  const [filterScope, setFilterScope] = useState<string>("All");

  // Selected station overlay
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedAISpot, setSelectedAISpot] = useState<AISuggestion | null>(null);

  // Simulated stations in the city grid
  const stations: Station[] = [
    { id: 1, name: "Connaught Supercharger Hub", x: 45, y: 35, type: "Ultra Fast", scope: "Public", status: "Online", load: 240, uptime: 99.99 },
    { id: 2, name: "Indiranagar Charging Point", x: 28, y: 55, type: "AC", scope: "Public", status: "Online", load: 14.8, uptime: 98.7 },
    { id: 3, name: "Tech Park Private Charger", x: 72, y: 48, type: "DC", scope: "Private", status: "Occupied", load: 54, uptime: 99.2 },
    { id: 4, name: "Airport Corridor Plaza", x: 80, y: 22, type: "Ultra Fast", scope: "Public", status: "Online", load: 180, uptime: 99.98 },
    { id: 5, name: "Metro Station Swap Cabinets", x: 50, y: 70, type: "Swap", scope: "Public", status: "Online", load: 95, uptime: 99.5 },
    { id: 6, name: "Elite Resident Association", x: 20, y: 25, type: "AC", scope: "Private", status: "Offline", load: 0, uptime: 95.4 },
    { id: 7, name: "Mall of Nexiora Charging Plaza", x: 62, y: 78, type: "DC", scope: "Public", status: "Online", load: 110, uptime: 99.8 },
  ];

  // AI installation suggestions
  const aiSuggestions: AISuggestion[] = [
    { id: 101, name: "AI Suggestion: Highway Cross Sector 4", x: 58, y: 15, score: 94, reason: "High EV traffic traffic density with zero Fast Chargers within a 3.5km radius.", transformerAvailability: "Excess Grid Capacity (350 kVA available)" },
    { id: 102, name: "AI Suggestion: South Office Cyber Corridor", x: 15, y: 75, score: 89, reason: "Peak demand overload on nearby AC chargers. High daytime parking occupancy.", transformerAvailability: "Requires local transformer upgrade" },
    { id: 103, name: "AI Suggestion: East Logistics Depo Node", x: 88, y: 65, score: 87, reason: "Optimal logistics hub point. Supports 3-phase high power depot grids.", transformerAvailability: "Proximity to industrial substation" },
  ];

  // Filtered station list
  const filteredStations = stations.filter((station) => {
    if (filterType !== "All" && station.type !== filterType) return false;
    if (filterScope !== "All" && station.scope !== filterScope) return false;
    return true;
  });

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive Control Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00D4FF] uppercase tracking-widest block">
                INTELLIGENT GIS PLATFORM
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Map className="w-5 h-5 text-[#00E676]" />
                Infrastructure GIS Map
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-extrabold text-muted-foreground/40 uppercase tracking-wider block mb-1.5">
                  Filter Charger Type
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "AC", "DC", "Ultra Fast", "Swap"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setSelectedStation(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                        filterType === type
                          ? "border-[#00E676] bg-[#00E676]/10 text-white"
                          : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-extrabold text-muted-foreground/40 uppercase tracking-wider block mb-1.5">
                  Access Classification
                </span>
                <div className="flex gap-1.5">
                  {["All", "Public", "Private"].map((scope) => (
                    <button
                      key={scope}
                      onClick={() => {
                        setFilterScope(scope);
                        setSelectedStation(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                        filterScope === scope
                          ? "border-[#00D4FF] bg-[#00D4FF]/10 text-white"
                          : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <span className="text-[9px] font-extrabold text-muted-foreground/40 uppercase tracking-wider block mb-1">
                Visual Analytics Overlays
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowCoverage(!showCoverage)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left text-[10px] font-bold transition-all cursor-pointer ${
                    showCoverage ? "border-white/10 bg-white/5 text-white" : "border-transparent bg-white/1 text-muted-foreground/40"
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${showCoverage ? "text-[#00D4FF]" : ""}`} />
                  Coverage Radius
                </button>

                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left text-[10px] font-bold transition-all cursor-pointer ${
                    showHeatmap ? "border-white/10 bg-white/5 text-white" : "border-transparent bg-white/1 text-muted-foreground/40"
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${showHeatmap ? "text-amber-400" : ""}`} />
                  Demand Heatmap
                </button>

                <button
                  onClick={() => setShowTraffic(!showTraffic)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left text-[10px] font-bold transition-all cursor-pointer ${
                    showTraffic ? "border-white/10 bg-white/5 text-white" : "border-transparent bg-white/1 text-muted-foreground/40"
                  }`}
                >
                  <Navigation className={`w-3.5 h-3.5 ${showTraffic ? "text-rose-400" : ""}`} />
                  Traffic Congestion
                </button>

                <button
                  onClick={() => setShowAISuggestions(!showAISuggestions)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left text-[10px] font-bold transition-all cursor-pointer ${
                    showAISuggestions ? "border-white/10 bg-white/5 text-white" : "border-transparent bg-white/1 text-muted-foreground/40"
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${showAISuggestions ? "text-[#00E676] animate-pulse" : ""}`} />
                  AI Hotspots
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Spot Inspector overlay */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedStation ? (
                <motion.div
                  key="station-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-extrabold text-white leading-tight">{selectedStation.name}</h4>
                    <span
                      className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-sm ${
                        selectedStation.status === "Online"
                          ? "bg-[#00E676]/10 text-[#00E676]"
                          : selectedStation.status === "Occupied"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-white/5 text-muted-foreground/40"
                      }`}
                    >
                      {selectedStation.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                    <div>
                      <span className="text-muted-foreground/40 uppercase font-bold block">Type</span>
                      <span className="font-extrabold text-[#00D4FF]">{selectedStation.type}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground/40 uppercase font-bold block">Active Load</span>
                      <span className="font-extrabold text-white">{selectedStation.load} kW</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground/40 uppercase font-bold block">Uptime SLA</span>
                      <span className="font-extrabold text-[#00E676]">{selectedStation.uptime}%</span>
                    </div>
                  </div>
                </motion.div>
              ) : selectedAISpot ? (
                <motion.div
                  key="ai-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#00E676] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI Deploy Spot
                    </span>
                    <span className="text-[10px] font-black text-[#00E676]">{selectedAISpot.score}% Feasibility</span>
                  </div>
                  <h4 className="text-xs font-black text-white">{selectedAISpot.name}</h4>
                  <p className="text-[10px] text-muted-foreground/80 leading-relaxed">{selectedAISpot.reason}</p>
                  <div className="p-1.5 rounded bg-[#00D4FF]/5 border border-[#00D4FF]/10 text-[9px] text-[#00D4FF] font-medium">
                    Grid Link: {selectedAISpot.transformerAvailability}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-4"
                >
                  <Compass className="w-7 h-7 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
                  <p className="text-[10px] text-muted-foreground/50 font-bold uppercase">
                    Select a node on the grid to inspect telemetry
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Interactive SVG Map */}
        <div className="lg:col-span-8 relative aspect-4/3 w-full rounded-[24px] border border-white/5 bg-black/40 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Cyber grid lines background overlay */}
          <div className="absolute inset-0 bg-[#00E676]/1 hover:bg-[#00E676]/2 transition-all duration-300 pointer-events-none" />

          {/* Holographic Radar Scanner */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-[#00E676]/5 animate-ping duration-[4s] pointer-events-none" />

          {/* SVG Map Layout */}
          <svg viewBox="0 0 500 375" className="w-full h-full select-none overflow-visible">
            {/* Defs for gradients, patterns, and styling filters */}
            <defs>
              {/* Heatmap blur radius glow */}
              <radialGradient id="heatmapGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatmapGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Grid Floor */}
            <pattern id="cityPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
            </pattern>
            <rect width="500" height="375" fill="url(#cityPattern)" />

            {/* City Rivers/Parks background (futuristic dark outline style) */}
            <path d="M -10,120 C 150,130 180,90 280,240 T 510,230" fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="32" strokeLinecap="round" />
            <path d="M -10,120 C 150,130 180,90 280,240 T 510,230" fill="none" stroke="rgba(0,230,118,0.02)" strokeWidth="16" strokeLinecap="round" />

            {/* Roads Map Layer (Cyber Grid Layout) */}
            <g opacity="0.15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
              {/* Main Ring Corridors */}
              <circle cx="250" cy="187" r="160" strokeDasharray="3 5" />
              <circle cx="250" cy="187" r="100" />
              
              {/* Radial Roads */}
              <line x1="250" y1="0" x2="250" y2="375" />
              <line x1="0" y1="187" x2="500" y2="187" />
              <line x1="50" y1="37" x2="450" y2="337" />
              <line x1="450" y1="37" x2="50" y2="337" />
            </g>

            {/* Traffic Congestion flow overlay */}
            {showTraffic && (
              <g strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round">
                {/* High density roads */}
                <path d="M 250,187 L 450,337" stroke="#ef4444" className="animate-[energy-flow_2s_linear_infinite]" strokeDasharray="8 12" />
                <path d="M 50,37 L 250,187" stroke="#f59e0b" className="animate-[energy-flow_3s_linear_infinite]" strokeDasharray="5 10" />
                <path d="M 250,87 L 250,287" stroke="#10B981" opacity="0.4" />
              </g>
            )}

            {/* Demand Heatmap Overlays */}
            {showHeatmap && (
              <g pointerEvents="none">
                <circle cx="225" cy="130" r="85" fill="url(#heatmapGlow1)" />
                <circle cx="380" cy="240" r="70" fill="url(#heatmapGlow2)" />
              </g>
            )}

            {/* Future expansion nodes dotted circles */}
            {showExpansion && (
              <g stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" fill="none">
                <circle cx="120" cy="180" r="14" />
                <circle cx="340" cy="90" r="18" />
              </g>
            )}

            {/* Charger Coverage Radii */}
            {showCoverage && (
              <g fill="none">
                {filteredStations.map((station) => {
                  let rad = 25;
                  if (station.type === "DC") rad = 40;
                  if (station.type === "Ultra Fast") rad = 60;
                  return (
                    <circle
                      key={`cov-${station.id}`}
                      cx={`${station.x}%`}
                      cy={`${station.y}%`}
                      r={rad}
                      fill="rgba(0, 212, 255, 0.015)"
                      stroke="rgba(0, 212, 255, 0.12)"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </g>
            )}

            {/* Active Station Points */}
            <g>
              {filteredStations.map((station) => {
                const color =
                  station.type === "Ultra Fast"
                    ? "#00E676"
                    : station.type === "DC"
                    ? "#00D4FF"
                    : station.type === "Swap"
                    ? "#A78BFA"
                    : "#3B82F6";

                const isSelected = selectedStation?.id === station.id;

                return (
                  <g
                    key={`point-${station.id}`}
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedStation(station);
                      setSelectedAISpot(null);
                    }}
                  >
                    {/* Ring highlight if selected */}
                    {isSelected && (
                      <circle
                        cx={`${station.x}%`}
                        cy={`${station.y}%`}
                        r="12"
                        fill="none"
                        stroke="#00E676"
                        strokeWidth="1"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer glowing halo */}
                    <circle
                      cx={`${station.x}%`}
                      cy={`${station.y}%`}
                      r="6.5"
                      fill={color}
                      opacity={isSelected ? 0.35 : 0.15}
                      className="group-hover:scale-130 transition-transform"
                    />

                    {/* Core Point Dot */}
                    <circle
                      cx={`${station.x}%`}
                      cy={`${station.y}%`}
                      r="3.5"
                      fill={station.status === "Offline" ? "#ef4444" : color}
                      stroke="white"
                      strokeWidth="0.8"
                    />
                  </g>
                );
              })}
            </g>

            {/* AI Suggestion Spots */}
            {showAISuggestions && (
              <g>
                {aiSuggestions.map((spot) => {
                  const isSelected = selectedAISpot?.id === spot.id;
                  return (
                    <g
                      key={`spot-${spot.id}`}
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedAISpot(spot);
                        setSelectedStation(null);
                      }}
                    >
                      {/* Active green ping */}
                      <circle
                        cx={`${spot.x}%`}
                        cy={`${spot.y}%`}
                        r="14"
                        fill="none"
                        stroke="#00E676"
                        strokeWidth="0.7"
                        opacity={isSelected ? 0.6 : 0.25}
                      />
                      
                      {/* Pulse point */}
                      <circle
                        cx={`${spot.x}%`}
                        cy={`${spot.y}%`}
                        r="5"
                        fill="#00E676"
                        opacity="0.75"
                        className="animate-pulse"
                      />
                      
                      <path
                        d={`M ${(spot.x * 5) - 3.5} ${(spot.y * 3.75) - 8} L ${(spot.x * 5) + 3.5} ${(spot.y * 3.75) - 8} L ${(spot.x * 5)} ${(spot.y * 3.75) - 2} Z`}
                        fill="#00E676"
                      />
                    </g>
                  );
                })}
              </g>
            )}
          </svg>

          {/* Compass / Scale HUD indicators */}
          <div className="absolute bottom-4 left-4 p-2 bg-black/50 border border-white/5 rounded-lg flex items-center gap-2 text-[9px] text-muted-foreground/60 font-mono">
            <span>GRID SCALE: 1 : 25,000</span>
            <div className="w-12 h-1 bg-white/20 relative">
              <div className="absolute left-0 top-0 w-6 h-full bg-[#00E676]" />
            </div>
            <span>500 m</span>
          </div>

          <div className="absolute top-4 right-4 p-2 bg-black/50 border border-white/5 rounded-full flex items-center justify-center text-muted-foreground/60 pointer-events-none">
            <Compass className="w-4 h-4 animate-pulse" />
          </div>

        </div>

      </div>
    </section>
  );
}
