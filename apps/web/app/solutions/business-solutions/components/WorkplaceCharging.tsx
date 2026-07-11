"use client";

import React, { useState } from "react";
import { Sliders, Building, ShieldCheck, Zap, Users } from "lucide-react";

export function WorkplaceCharging() {
  const [employeeRate, setEmployeeRate] = useState(0.12); // $ per kWh
  const [guestRate, setGuestRate] = useState(0.35); // $ per kWh
  const [quota, setQuota] = useState(60); // kWh/week

  const totalPorts = 24;
  const activePorts = 16;
  const utilization = ((activePorts / totalPorts) * 100).toFixed(0);

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Config Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                WORKPLACE TARIFF CONTROL
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Sliders className="w-5 h-5 text-[#00E676]" />
                Workplace Charging Panel
              </h2>
            </div>

            <div className="space-y-4 text-xs font-bold">
              {/* Employee rate slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Employee Charge Rate</span>
                  <span className="text-[#00E676]">${employeeRate.toFixed(2)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="0.00"
                  max="0.25"
                  step="0.01"
                  value={employeeRate}
                  onChange={(e) => setEmployeeRate(Number(e.target.value))}
                  className="w-full accent-[#00E676] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>

              {/* Guest rate slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Guest Charging Rate</span>
                  <span className="text-[#00D4FF]">${guestRate.toFixed(2)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="0.20"
                  max="0.60"
                  step="0.02"
                  value={guestRate}
                  onChange={(e) => setGuestRate(Number(e.target.value))}
                  className="w-full accent-[#00D4FF] bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>

              {/* Quota slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground/50 uppercase tracking-wider">Weekly Employee Quota Limit</span>
                  <span className="text-white">{quota} kWh / week</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="10"
                  value={quota}
                  onChange={(e) => setQuota(Number(e.target.value))}
                  className="w-full accent-white bg-white/10 h-1.5 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Pricing changes sync to employee mobile apps within 5 minutes automatically.</p>
          </div>
        </div>

        {/* Right Status Panel */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>ACTIVE WORKPLACE OCCUPANCY STATUS</span>
              <span>LIVE PORTS</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Active Ports Occupied</span>
                <span className="text-xl font-black text-white mt-1.5 block">{activePorts} / {totalPorts} Ports</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                <span className="text-muted-foreground/50 uppercase font-bold text-[8px] block">Total Station Utilization</span>
                <span className="text-xl font-black text-[#00E676] mt-1.5 block">{utilization}% Active</span>
              </div>
            </div>

            <div className="bg-[#00E676]/5 border border-[#00E676]/10 p-4 rounded-xl flex gap-3.5 items-start text-xs text-white">
              <Users className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-white block">Workplace Subsidy Plan active</span>
                <p className="text-muted-foreground/80 mt-1 leading-relaxed">
                  Employees have consumed **420 kWh** total today, offsetting estimated fuel costs by $520. Remaining capacity available for guest vehicles.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider">
            <span>Employee: ${employeeRate.toFixed(2)}/kWh</span>
            <span>Guest: ${guestRate.toFixed(2)}/kWh</span>
            <span>Limit: {quota} kWh</span>
          </div>

        </div>

      </div>
    </section>
  );
}
