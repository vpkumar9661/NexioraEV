"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, ShieldAlert, Zap, Filter, Compass, AlertCircle, CheckCircle2 } from "lucide-react";

interface VehicleNode {
  id: string;
  name: string;
  driver: string;
  battery: number;
  speed: number;
  status: "online" | "offline" | "charging" | "maintenance" | "emergency";
  coords: { x: number; y: number };
  model: string;
  range: number;
}

export function FleetOperationsMap() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("van-1");

  const vehicles: VehicleNode[] = [
    { id: "van-1", name: "Transit-01 (Urban)", driver: "Marcus Aurelius", battery: 68, speed: 45, status: "online", coords: { x: 50, y: 70 }, model: "Ford E-Transit", range: 110 },
    { id: "van-2", name: "Logistics-02 (Cargo)", driver: "Lucius Verus", battery: 24, speed: 0, status: "charging", coords: { x: 120, y: 130 }, model: "Rivian EDV", range: 35 },
    { id: "van-3", name: "Transit-03 (Local)", driver: "Commodus", battery: 92, speed: 52, status: "online", coords: { x: 160, y: 80 }, model: "BrightDrop Zevo", range: 185 },
    { id: "van-4", name: "Logistics-04 (Inter)", driver: "Trajan", battery: 85, speed: 60, status: "online", coords: { x: 80, y: 140 }, model: "Tesla Semi", range: 395 },
    { id: "van-5", name: "Transit-05 (Heavy)", driver: "Hadrian", battery: 15, speed: 0, status: "maintenance", coords: { x: 140, y: 60 }, model: "Rivian EDV", range: 20 },
    { id: "van-6", name: "Transit-06 (Emergency)", driver: "Antoninus", battery: 42, speed: 75, status: "emergency", coords: { x: 30, y: 110 }, model: "Ford E-Transit", range: 62 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "#00E676"; // Green
      case "charging": return "#8B5CF6"; // Purple
      case "maintenance": return "#F59E0B"; // Gold
      case "emergency": return "#ef4444"; // Red
      default: return "#AEB5C0";
    }
  };

  const filteredVehicles = vehicles.filter(v => filter === "all" || v.status === filter);
  const active = vehicles.find(v => v.id === selectedVehicle) ?? vehicles[0]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Map filters & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00D4FF] uppercase tracking-widest block">
                FLEET TELEMETRY GRID
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Navigation className="w-5 h-5 text-[#00D4FF]" />
                Live Operations Map
              </h2>
            </div>

            {/* Filter buttons row */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white/2 border border-white/5 rounded-xl">
              {["all", "online", "charging", "maintenance", "emergency"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-2.5 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    filter === tab
                      ? "bg-white/5 border border-white/10 text-white shadow-sm"
                      : "text-muted-foreground/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Selected Vehicle detailed telemetry card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4 rounded-2xl border border-white/5 bg-white/2 space-y-4"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <div>
                    <h3 className="text-xs font-black text-white">{active.name}</h3>
                    <p className="text-[9px] text-muted-foreground/40 font-mono mt-0.5">{active.model}</p>
                  </div>
                  <span
                    className="text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: `${getStatusColor(active.status)}15`,
                      color: getStatusColor(active.status),
                      border: `1px solid ${getStatusColor(active.status)}25`,
                    }}
                  >
                    {active.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Active Driver</span>
                    <span className="font-extrabold text-white mt-0.5 block">{active.driver}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Battery Capacity</span>
                    <span className="font-extrabold text-white mt-0.5 block">{active.battery}% ({active.range} mi left)</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">Current Speed</span>
                    <span className="font-extrabold text-[#00D4FF] mt-0.5 block">{active.speed} mph</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground/40 uppercase font-bold text-[8.5px] block">GPS Coords</span>
                    <span className="font-extrabold text-white mt-0.5 block font-mono text-[10px]">
                      {active.coords.x.toFixed(1)}°N, {active.coords.y.toFixed(1)}°W
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
            <p>
              Offline units denote trucks parked in local overnight hubs without active GPS dispatch triggers.
            </p>
          </div>
        </div>

        {/* Right column: Interactive custom SVG GPS Map */}
        <div className="lg:col-span-7 flex items-center justify-center bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>SATELLITE TELEMETRY LINK</span>
              <span>ACTIVE SCAN</span>
            </div>

            {/* Custom SVG topology map */}
            <div className="h-[220px] w-full relative">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                {/* Routes/road grid tracks */}
                <path d="M 20,40 Q 60,100 100,120 T 180,180" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path d="M 20,180 Q 80,140 100,80 T 180,40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                <path d="M 100,10 H 100 V 190" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="3 6" />
                <path d="M 10,100 H 190 v 0" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="3 6" />

                {/* Hub location points */}
                <g transform="translate(100, 120)">
                  <circle cx="0" cy="0" r="6" fill="#05070d" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
                  <rect x="-2" y="-2" width="4" height="4" fill="#00D4FF" />
                </g>

                {/* Render active vehicle nodes */}
                {filteredVehicles.map((node) => {
                  const active = selectedVehicle === node.id;
                  const color = getStatusColor(node.status);

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.coords.x}, ${node.coords.y})`}
                      onClick={() => setSelectedVehicle(node.id)}
                      className="cursor-pointer"
                    >
                      {/* Active glow ring */}
                      {active && (
                        <circle cx="0" cy="0" r="10" fill="none" stroke={color} strokeWidth="1" className="animate-ping" opacity="0.3" />
                      )}
                      
                      {/* Node point */}
                      <circle
                        cx="0"
                        cy="0"
                        r={active ? 5.5 : 4}
                        fill="#05070d"
                        stroke={color}
                        strokeWidth={active ? 2 : 1.5}
                        className="transition-all"
                      />
                      <circle cx="0" cy="0" r="1.5" fill={color} />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Grid Legend bar */}
            <div className="flex justify-between items-center text-[8.5px] text-muted-foreground/50 pt-2 border-t border-white/5">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  Online
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  Charging
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  Maintenance
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                  Emergency
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
