"use client";

import React from "react";
import { 
  Save, Copy, Edit2, Share2, Download, 
  Settings, Battery, Cpu, ShieldAlert, Activity 
} from "lucide-react";

// ==========================================
// CONFIG INTERFACES
// ==========================================

export interface StudioConfig {
  platform: string;
  chemistry: string;
  capacity: number; // kWh
  motor: string;
  inverter: string;
  charging: string;
  cooling: string;
  suspension: string;
  braking: string;
  tires: string;
  aero: number; // 0.18 to 0.45
}

export interface TelemetryData {
  voltage: number;
  current: number;
  temp: number;
  rpm: number;
  torque: number;
  efficiency: number;
  topSpeed: number;
  accel: number;
  range: number;
  weight: number;
  cg: string;
}

// ==========================================
// TOP TOOLBAR
// ==========================================

interface TopToolbarProps {
  projectName: string;
  onRename: () => void;
  onSave: () => void;
  onDuplicate: () => void;
  onShare: () => void;
}

export function TopToolbar({
  projectName,
  onRename,
  onSave,
  onDuplicate,
  onShare
}: TopToolbarProps) {
  return (
    <div className="w-full p-4 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md flex items-center justify-between shadow-2xl relative z-25">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-pulse" />
        <h2 className="text-sm font-black text-white flex items-center gap-2">
          {projectName}
          <button 
            onClick={onRename} 
            title="Rename Project"
            className="p-1 rounded hover:bg-white/5 text-muted-foreground/40 hover:text-white transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          className="px-3.5 py-1.5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 text-[#22D3EE] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          Save Config
        </button>
        <button
          onClick={onDuplicate}
          className="px-3.5 py-1.5 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 text-muted-foreground hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Copy className="w-3.5 h-3.5" />
          Duplicate
        </button>
        <button
          onClick={onShare}
          className="p-2 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 text-muted-foreground hover:text-white transition-all cursor-pointer"
          title="Share Project"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// LEFT CONFIGURATION SIDEBAR
// ==========================================

interface LeftConfigSidebarProps {
  config: StudioConfig;
  onChange: (updates: Partial<StudioConfig>) => void;
}

export function LeftConfigSidebar({ config, onChange }: LeftConfigSidebarProps) {
  return (
    <aside className="w-full lg:w-[260px] shrink-0 border border-white/5 bg-white/2 rounded-[20px] p-5 space-y-5 backdrop-blur-md max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
        <Settings className="w-4 h-4 text-[#22D3EE]" />
        <span className="text-[10px] font-extrabold text-muted-foreground/40 uppercase tracking-widest block">
          EV Configurator
        </span>
      </div>

      {/* Vehicle Platform */}
      <div className="space-y-1.5 text-xs">
        <label className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-wider block">Vehicle Platform</label>
        <select
          value={config.platform}
          onChange={(e) => onChange({ platform: e.target.value })}
          className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
        >
          <option value="scooter">Electric Scooter</option>
          <option value="motorcycle">Electric Motorcycle</option>
          <option value="hatchback">Hatchback Segment</option>
          <option value="sedan">Premium Sedan</option>
          <option value="suv">Utility SUV</option>
          <option value="pickup">Cargo Pickup</option>
          <option value="bus">Transit City Bus</option>
          <option value="truck">Heavy Cargo Truck</option>
        </select>
      </div>

      {/* Battery Pack */}
      <div className="space-y-3.5 border-t border-white/5 pt-3.5">
        <span className="text-[9px] text-[#22D3EE] font-black uppercase tracking-wider block">Battery Stack Sizing</span>
        
        <div className="space-y-1 text-xs">
          <label className="text-[9px] text-muted-foreground/50 font-bold uppercase block">Chemistry</label>
          <select
            value={config.chemistry}
            onChange={(e) => onChange({ chemistry: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="lfp">Lithium Iron Phosphate (LFP)</option>
            <option value="nmc">Nickel Manganese Cobalt (NMC)</option>
            <option value="nca">Nickel Cobalt Aluminium (NCA)</option>
            <option value="solid">Solid State cells</option>
            <option value="sodium">Sodium Ion cells</option>
          </select>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-[10px]">
            <span className="text-muted-foreground/50 uppercase">Capacity</span>
            <span className="text-white">{config.capacity} kWh</span>
          </div>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={config.capacity}
            onChange={(e) => onChange({ capacity: parseInt(e.target.value) })}
            className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Motor & Inverter */}
      <div className="space-y-3.5 border-t border-white/5 pt-3.5">
        <span className="text-[9px] text-[#22D3EE] font-black uppercase tracking-wider block">Powertrain Systems</span>
        
        <div className="space-y-1 text-xs">
          <label className="text-[9px] text-muted-foreground/50 font-bold uppercase block">Traction Motor</label>
          <select
            value={config.motor}
            onChange={(e) => onChange({ motor: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="bldc">Brushless DC (BLDC)</option>
            <option value="pmsm">Permanent Magnet Sync (PMSM)</option>
            <option value="induction">AC Induction Motor</option>
            <option value="reluctance">Switched Reluctance</option>
          </select>
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-[9px] text-muted-foreground/50 font-bold uppercase block">Inverter Switches</label>
          <select
            value={config.inverter}
            onChange={(e) => onChange({ inverter: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="mosfet">Silicon MOSFET</option>
            <option value="igbt">Silicon IGBT</option>
            <option value="sic">Silicon Carbide (SiC)</option>
            <option value="gan">Gallium Nitride (GaN)</option>
          </select>
        </div>
      </div>

      {/* Auxiliary & Chassis */}
      <div className="space-y-3.5 border-t border-white/5 pt-3.5">
        <span className="text-[9px] text-[#22D3EE] font-black uppercase tracking-wider block">Chassis Accessories</span>
        
        <div className="space-y-1 text-xs">
          <label className="text-[9px] text-muted-foreground/50 font-bold uppercase block">Charging Interface</label>
          <select
            value={config.charging}
            onChange={(e) => onChange({ charging: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="11">AC 11 kW</option>
            <option value="50">DC 50 kW</option>
            <option value="150">DC 150 kW Fast</option>
            <option value="350">DC 350 kW Ultra</option>
            <option value="wireless">Inductive Wireless</option>
          </select>
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-[9px] text-muted-foreground/50 font-bold uppercase block">Active Cooling Loop</label>
          <select
            value={config.cooling}
            onChange={(e) => onChange({ cooling: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="air">Forced Air Cooling</option>
            <option value="liquid">Active Liquid Cooling</option>
            <option value="oil">Direct Stator Oil Cooling</option>
            <option value="phase">Phase Change Wax (PCM)</option>
          </select>
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-[9px] text-muted-foreground/50 font-bold uppercase block">Suspension Arms</label>
          <select
            value={config.suspension}
            onChange={(e) => onChange({ suspension: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="macpherson">MacPherson Struts</option>
            <option value="wishbone">Double Wishbones</option>
            <option value="multilink">Multi-Link Independent</option>
            <option value="air">Active Air Suspension</option>
          </select>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-[10px]">
            <span className="text-muted-foreground/50 uppercase">Aerodynamic Drag (Cd)</span>
            <span className="text-white">{config.aero.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.18"
            max="0.45"
            step="0.01"
            value={config.aero}
            onChange={(e) => onChange({ aero: parseFloat(e.target.value) })}
            className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </aside>
  );
}

// ==========================================
// RIGHT TELEMETRY DIAGNOSTICS SIDEBAR
// ==========================================

interface RightTelemetrySidebarProps {
  telemetry: TelemetryData;
}

export function RightTelemetrySidebar({ telemetry }: RightTelemetrySidebarProps) {
  return (
    <aside className="w-full lg:w-[260px] shrink-0 border border-white/5 bg-white/2 rounded-[20px] p-5 space-y-5 backdrop-blur-md max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
        <Activity className="w-4 h-4 text-[#10B981]" />
        <span className="text-[10px] font-extrabold text-muted-foreground/40 uppercase tracking-widest block">
          Diagnostics HUD
        </span>
      </div>

      <div className="space-y-4">
        {/* Battery Health readout */}
        <div className="space-y-2">
          <span className="text-[9px] text-muted-foreground/50 font-bold uppercase block tracking-wider">Storage Telemetry</span>
          
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Voltage:</span>
              <strong className="text-white">{telemetry.voltage} V DC</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Current Draw:</span>
              <strong className="text-white">{telemetry.current} A RMS</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Temp limits:</span>
              <strong className="text-white">{telemetry.temp} °C</strong>
            </div>
          </div>
        </div>

        {/* Powertrain Motor */}
        <div className="space-y-2">
          <span className="text-[9px] text-muted-foreground/50 font-bold uppercase block tracking-wider">Drive Shaft</span>
          
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Motor Speed:</span>
              <strong className="text-white">{telemetry.rpm.toLocaleString()} RPM</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Continuous Torque:</span>
              <strong className="text-white">{telemetry.torque} Nm</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Overall Efficiency:</span>
              <strong className="text-[#10B981]">{telemetry.efficiency}%</strong>
            </div>
          </div>
        </div>

        {/* Drivetrain limits */}
        <div className="space-y-2">
          <span className="text-[9px] text-muted-foreground/50 font-bold uppercase block tracking-wider">Performance Sizing</span>
          
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Estimated Range:</span>
              <strong className="text-cyan-300">{telemetry.range} km</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">0-100 km/h:</span>
              <strong className="text-white">{telemetry.accel} sec</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Total Weight:</span>
              <strong className="text-white">{telemetry.weight} kg</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground/65">Center of Gravity:</span>
              <strong className="text-purple-300">{telemetry.cg}</strong>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
