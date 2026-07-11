"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, Battery, Eye, CheckCircle2, AlertTriangle, User } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  model: string;
  battery: number;
  range: number;
  speed: number;
  driver: string;
  temp: number;
  charging: boolean;
  health: number; // SOH
  maintStatus: "nominal" | "warning" | "overdue";
  checkpoints: { name: string; status: "pass" | "check" }[];
}

export function VehicleMonitor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const vehicles: Vehicle[] = [
    {
      id: "v-1",
      name: "Transit-01 (Urban)",
      model: "Ford E-Transit",
      battery: 68,
      range: 110,
      speed: 45,
      driver: "Marcus Aurelius",
      temp: 24.5,
      charging: false,
      health: 96,
      maintStatus: "nominal",
      checkpoints: [
        { name: "Motor Coil Temperature", status: "pass" },
        { name: "Brake Caliper Thickness", status: "pass" },
        { name: "Tire Pressure (PSI)", status: "pass" },
        { name: "Coolant Level Index", status: "pass" },
      ],
    },
    {
      id: "v-2",
      name: "Logistics-02 (Cargo)",
      model: "Rivian EDV",
      battery: 24,
      range: 35,
      speed: 0,
      driver: "Lucius Verus",
      temp: 36.8,
      charging: true,
      health: 92,
      maintStatus: "nominal",
      checkpoints: [
        { name: "BMS Cell Balancing", status: "pass" },
        { name: "Brake Caliper Thickness", status: "pass" },
        { name: "Tire Pressure (PSI)", status: "pass" },
        { name: "Coolant Level Index", status: "check" }, // Warning
      ],
    },
    {
      id: "v-3",
      name: "Transit-03 (Local)",
      model: "BrightDrop Zevo",
      battery: 92,
      range: 185,
      speed: 52,
      driver: "Commodus",
      temp: 22.8,
      charging: false,
      health: 98,
      maintStatus: "nominal",
      checkpoints: [
        { name: "Motor Coil Temperature", status: "pass" },
        { name: "Brake Caliper Thickness", status: "pass" },
        { name: "Tire Pressure (PSI)", status: "pass" },
        { name: "Coolant Level Index", status: "pass" },
      ],
    },
    {
      id: "v-4",
      name: "Logistics-04 (Inter)",
      model: "Tesla Semi",
      battery: 85,
      range: 395,
      speed: 60,
      driver: "Trajan",
      temp: 29.4,
      charging: false,
      health: 94,
      maintStatus: "warning",
      checkpoints: [
        { name: "Motor Coil Temperature", status: "pass" },
        { name: "Brake Caliper Thickness", status: "check" }, // Warning
        { name: "Tire Pressure (PSI)", status: "pass" },
        { name: "Coolant Level Index", status: "pass" },
      ],
    },
  ];

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="space-y-6">
        
        {/* Search header ribbon */}
        <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#3B82F6] uppercase tracking-widest block">
              DIAGNOSTIC ARCHIVE
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
              Vehicle Monitoring
            </h2>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle, driver or model..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white/2 border border-white/5 rounded-xl text-white placeholder-muted-foreground/40 focus:border-[#3B82F6]/50 focus:bg-black/35 outline-hidden transition-all"
            />
            <Search className="w-4 h-4 text-muted-foreground/40 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Vehicle list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredVehicles.map((vehicle) => {
            const isExpanded = expandedId === vehicle.id;
            return (
              <div
                key={vehicle.id}
                className="p-5 rounded-2xl border border-white/5 bg-white/2 flex flex-col justify-between space-y-4 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-black text-white">{vehicle.name}</h3>
                    <span className="text-[8.5px] text-muted-foreground/40 font-mono block mt-0.5">{vehicle.model}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        vehicle.maintStatus === "nominal"
                          ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                      }`}
                    >
                      {vehicle.maintStatus}
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : vehicle.id)}
                      className="p-1.5 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 text-muted-foreground cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-black/45 p-3 rounded-xl border border-white/4 text-center">
                  <div>
                    <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Battery SOC</span>
                    <span className="text-xs font-black text-white flex items-center justify-center gap-1 mt-1">
                      <Battery className="w-3.5 h-3.5 text-[#00E676]" />
                      {vehicle.battery}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">Remaining Range</span>
                    <span className="text-xs font-black text-white block mt-1">{vehicle.range} mi</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground/40 font-bold uppercase block">SOH Index</span>
                    <span className="text-xs font-black text-[#00D4FF] block mt-1">{vehicle.health}%</span>
                  </div>
                </div>

                {/* Expanded checklists */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border-t border-white/5 pt-4 space-y-3"
                    >
                      <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Diagnostic Checkpoints</span>
                      <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                        {vehicle.checkpoints.map((check, i) => (
                          <div key={i} className="flex gap-2 items-center text-white bg-white/1 p-2 rounded-lg border border-white/4">
                            {check.status === "pass" ? (
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            <span className="truncate">{check.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-muted-foreground/65 border-t border-white/5 pt-3">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                          Active: {vehicle.driver}
                        </span>
                        <span>Motor Temp: {vehicle.temp}°C</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
