"use client";

import React, { useState } from "react";
import { 
  Zap, Save, Copy, FileText, Share2, Compass, Sliders, Battery, 
  Activity, ShieldCheck, Thermometer, Wind 
} from "lucide-react";

export interface WorkbenchSetup {
  chemistry: string;
  capacity: number;
  series: number;
  parallel: number;
  cooling: string;
  platform: string;
}

// ==========================================
// TOP TOOLBAR
// ==========================================

interface TopToolbarProps {
  projectName: string;
  onRename: (name: string) => void;
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
    <div className="w-full p-4 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center text-[#00C853]">
          <Activity className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => onRename(e.target.value)}
          className="bg-transparent border-none focus:outline-none text-sm font-black text-white max-w-[200px]"
        />
      </div>

      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={onSave}
          className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/3 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" /> Save
        </button>
        <button
          onClick={onDuplicate}
          className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/3 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" /> Duplicate
        </button>
        <button
          onClick={onShare}
          className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/3 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
      </div>
    </div>
  );
}

// ==========================================
// LEFT CONFIG SIDEBAR
// ==========================================

interface LeftConfigSidebarProps {
  setup: WorkbenchSetup;
  onChange: (updates: Partial<WorkbenchSetup>) => void;
}

export function LeftConfigSidebar({ setup, onChange }: LeftConfigSidebarProps) {
  return (
    <aside className="w-full lg:w-[260px] shrink-0 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-6">
      <span className="text-[10px] text-[#00C853] font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">
        Engineering Inputs
      </span>

      <div className="space-y-4 text-xs">
        {/* Chemistry */}
        <div className="space-y-1">
          <label className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Chemistry</label>
          <select
            value={setup.chemistry}
            onChange={(e) => onChange({ chemistry: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="nmc">NMC Lithium-Ion</option>
            <option value="lfp">LFP Prismatic</option>
            <option value="solid">Solid-State Ceramic</option>
            <option value="sodium">Sodium-Ion cells</option>
          </select>
        </div>

        {/* Vehicle Platform */}
        <div className="space-y-1">
          <label className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Vehicle Platform</label>
          <select
            value={setup.platform}
            onChange={(e) => onChange({ platform: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="sedan">Sedan Standard</option>
            <option value="suv">SUV Utility</option>
            <option value="bus">Urban Transit Bus</option>
            <option value="truck">Commercial Truck</option>
          </select>
        </div>

        {/* Capacity Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[10px]">
            <span className="text-muted-foreground/40 uppercase">Capacity</span>
            <span className="text-white">{setup.capacity} kWh</span>
          </div>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={setup.capacity}
            onChange={(e) => onChange({ capacity: parseInt(e.target.value) })}
            className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Series Cells Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[10px]">
            <span className="text-muted-foreground/40 uppercase">Series Cells (S)</span>
            <span className="text-white">{setup.series} cells</span>
          </div>
          <input
            type="range"
            min="12"
            max="192"
            value={setup.series}
            onChange={(e) => onChange({ series: parseInt(e.target.value) })}
            className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Parallel Cells Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[10px]">
            <span className="text-muted-foreground/40 uppercase">Parallel Cells (P)</span>
            <span className="text-white">{setup.parallel} cells</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={setup.parallel}
            onChange={(e) => onChange({ parallel: parseInt(e.target.value) })}
            className="w-full accent-[#00C853] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Cooling Select */}
        <div className="space-y-1">
          <label className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Cooling Method</label>
          <select
            value={setup.cooling}
            onChange={(e) => onChange({ cooling: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="air">Air Cooling</option>
            <option value="liquid">Liquid Radiators</option>
            <option value="phase">Phase Change Materials</option>
          </select>
        </div>
      </div>
    </aside>
  );
}

// ==========================================
// RIGHT LIVE ENGINEERING DASHBOARD SIDEBAR
// ==========================================

interface RightDiagnosticsSidebarProps {
  stats: {
    voltage: number;
    weight: number;
    range: number;
    efficiency: number;
    carbonSaved: number;
  };
}

export function RightDiagnosticsSidebar({ stats }: RightDiagnosticsSidebarProps) {
  return (
    <aside className="w-full lg:w-[260px] shrink-0 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-6">
      <span className="text-[10px] text-[#00C853] font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">
        Live Engineering HUD
      </span>

      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-xs font-semibold">
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/45 font-bold uppercase block tracking-wider">Pack Voltage</span>
          <strong className="text-sm text-white block">{stats.voltage} V</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/45 font-bold uppercase block tracking-wider">Estimated Weight</span>
          <strong className="text-sm text-white block">~{stats.weight} kg</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/45 font-bold uppercase block tracking-wider">Calculated Range</span>
          <strong className="text-sm text-[#00C853] block">{stats.range} km</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <span className="text-[9px] text-muted-foreground/45 font-bold uppercase block tracking-wider">Engineering Score</span>
          <strong className="text-sm text-white block">{stats.efficiency} / 100</strong>
        </div>
        <div className="p-3.5 rounded-xl bg-[#00C853]/5 border border-[#00C853]/15 space-y-1">
          <span className="text-[9px] text-[#00C853] font-extrabold uppercase block tracking-wider">CO₂ Savings Index</span>
          <strong className="text-sm text-[#00C853] block">+{stats.carbonSaved} kg</strong>
        </div>
      </div>
    </aside>
  );
}
