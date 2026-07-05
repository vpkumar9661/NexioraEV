"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Thermometer,
  Activity,
  Cpu,
  LineChart,
  BrainCircuit,
  Download,
  RotateCcw,
  Maximize,
  Share2,
  Bookmark,
  Sparkles,
  Info,
  Calendar,
  Gauge,
  Sliders,
  ChevronRight,
  Flame,
  Shield,
  Clock,
  Battery,
  AlertTriangle,
  Rotate3d,
  DollarSign,
  Heart
} from "lucide-react";

// ==========================================
// DATA DEFINITIONS & TYPES
// ==========================================

type ChemistryType = "nmc" | "lfp" | "nca" | "solid-state" | "sodium-ion" | "graphene";

interface ComponentDetail {
  id: string;
  name: string;
  purpose: string;
  material: string;
  workingPrinciple: string;
  color: string;
}

const CELL_COMPONENTS: ComponentDetail[] = [
  {
    id: "casing",
    name: "Outer Cell Casing",
    purpose: "Physical containment, structural support, and external insulation.",
    material: "Aluminium alloy or nickel-plated steel casing.",
    workingPrinciple: "Provides mechanical rigidity, structural integrity, and hermetic sealing to prevent humidity ingress.",
    color: "#6B7280"
  },
  {
    id: "terminal-pos",
    name: "Positive Terminal (+)",
    purpose: "Conductive bridge from external busbar to Cathode current collector.",
    material: "High-conductivity pure Aluminium.",
    workingPrinciple: "Forms external electrical connection points. Acts as the exit electrode for current during discharge.",
    color: "#EF4444"
  },
  {
    id: "cathode",
    name: "Cathode (Positive Electrode)",
    purpose: "Active source of lithium ions and electrical charge holder during discharge.",
    material: "Lithium Metal Oxide (e.g., NMC, LFP, NCA composite) coated on Aluminium foil.",
    workingPrinciple: "Intercalates lithium ions within its atomic lattice during discharge and releases them during charging.",
    color: "#EC4899"
  },
  {
    id: "separator",
    name: "Micro-porous Separator",
    purpose: "Prevents cathode-anode short-circuits while allowing ionic flow.",
    material: "Ceramic-coated micro-porous Polyethylene / Polypropylene membrane.",
    workingPrinciple: "Acts as a physical wall to stop electrons, but possesses sub-micron pores for lithium-ion diffusion.",
    color: "#10B981"
  },
  {
    id: "electrolyte",
    name: "Electrolyte Medium",
    purpose: "Conductive pathway for lithium ions to move between electrodes.",
    material: "Lithium salt (LiPF6) dissolved in organic carbonate solvents (or solid ceramic).",
    workingPrinciple: "Facilitates fast ion transport. Prevents direct chemical oxidation-reduction at the electrode surface.",
    color: "#06B6D4"
  },
  {
    id: "anode",
    name: "Anode (Negative Electrode)",
    purpose: "Stores lithium ions within host matrix during cell charging.",
    material: "Synthetic/Natural Graphite or Silicon-Graphite composite coated on Copper foil.",
    workingPrinciple: "De-intercalates lithium ions during discharge, releasing them into the electrolyte to return to the cathode.",
    color: "#8B5CF6"
  },
  {
    id: "terminal-neg",
    name: "Negative Terminal (-)",
    purpose: "Conductive bridge from external circuit to Anode current collector.",
    material: "Nickel-plated Copper.",
    workingPrinciple: "Completes the cell circuit. Acts as the entry electrode for current during discharge.",
    color: "#3B82F6"
  }
];

interface ChemistryStats {
  name: string;
  description: string;
  energyDensity: number; // Wh/kg
  cost: number; // $/kWh
  safety: number; // 0-100 scale
  cycleLife: number; // Number of cycles
  coldWeather: number; // 0-100 scale
  pros: string[];
  cons: string[];
}

const CHEM_DATA: Record<ChemistryType, ChemistryStats> = {
  nmc: {
    name: "NMC (Nickel Manganese Cobalt)",
    description: "The baseline premium chemistry for high-range EVs, balancing high energy capacity with reliable performance.",
    energyDensity: 240,
    cost: 110,
    safety: 65,
    cycleLife: 1500,
    coldWeather: 85,
    pros: ["Exceptional energy density", "Superb cold temperature operation", "Compact space integration"],
    cons: ["Higher cost (Cobalt dependency)", "Moderate thermal runaway risk", "Lower lifespan than LFP"]
  },
  lfp: {
    name: "LFP (Lithium Iron Phosphate)",
    description: "Extremely robust, cobalt-free chemistry with an ultra-long lifespan and superior thermal stability.",
    energyDensity: 160,
    cost: 80,
    safety: 95,
    cycleLife: 4000,
    coldWeather: 50,
    pros: ["Superior safety (no thermal runaway)", "Ultra-long cycle life (10+ years)", "Inexpensive, cobalt-free"],
    cons: ["Lower volumetric energy density", "Significant performance drop in extreme cold", "Higher pack weight"]
  },
  nca: {
    name: "NCA (Nickel Cobalt Aluminum)",
    description: "Highest energy density chemistry used in premium performance EVs, demanding highly active thermal control.",
    energyDensity: 260,
    cost: 125,
    safety: 60,
    cycleLife: 1200,
    coldWeather: 80,
    pros: ["Maximum volumetric energy density", "Incredible discharge current output", "Optimal space efficiency"],
    cons: ["High material cost", "Sensitive to aggressive fast-charging", "Higher thermal management overhead"]
  },
  "solid-state": {
    name: "ASSB (All-Solid-State Battery)",
    description: "The next-generation horizon chemistry replacing liquid electrolytes with solid-state ceramic separators.",
    energyDensity: 400,
    cost: 250,
    safety: 98,
    cycleLife: 6000,
    coldWeather: 90,
    pros: ["Extreme energy density (double NMC)", "Ultra-fast charging capability", "Non-flammable, zero runaway risk"],
    cons: ["High manufacturing cost currently", "Susceptible to internal dendrites under pressure", "Still in late stage pilot phase"]
  },
  "sodium-ion": {
    name: "Sodium-Ion (Na-Ion)",
    description: "Low-cost lithium-alternative relying on abundant sodium resources, ideal for mass urban mobility and grid storage.",
    energyDensity: 130,
    cost: 45,
    safety: 90,
    cycleLife: 2500,
    coldWeather: 85,
    pros: ["Extremely low production cost", "No lithium or cobalt needed", "Outstanding cold weather discharge"],
    cons: ["Low energy density limits range", "Larger battery size requirement", "Lower voltage output per cell"]
  },
  graphene: {
    name: "Graphene Super-Cell",
    description: "Experimental nanotechnology cell utilizing graphene structures to enable molecularly fast charge transitions.",
    energyDensity: 170,
    cost: 220,
    safety: 95,
    cycleLife: 10000,
    coldWeather: 95,
    pros: ["Ultra-fast charging (minutes)", "Virtually zero thermal degradation", "Incredible life cycle (>10k cycles)"],
    cons: ["Exceedingly high production complexity", "Expensive graphene synthesis costs", "Low volumetric energy density"]
  }
};

// ==========================================
// MAIN VIRTUAL BATTERY LABORATORY
// ==========================================

export function VirtualBatteryLab() {
  // Simulator Universal State
  const [chemistry, setChemistry] = useState<ChemistryType>("nmc");
  const [soc, setSoc] = useState<number>(60);
  const [temperature, setTemperature] = useState<number>(25);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isChargingSim, setIsChargingSim] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([
    "Lab initialised: System diagnostics nominal.",
    "Cell configuration loaded: NMC Standard model."
  ]);

  const labRef = useRef<HTMLDivElement>(null);

  // Auto-log state changes
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setDiagnosticLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 14)]);
  };

  // Preset configuration selector
  const applyPreset = (preset: string) => {
    setSelectedPreset(preset);
    if (preset === "tesla-2170") {
      setChemistry("nmc");
      setSoc(50);
      setTemperature(22);
      addLog("Applied Preset: Tesla 2170 NMC Cell (Nominal conditions)");
    } else if (preset === "byd-blade") {
      setChemistry("lfp");
      setSoc(30);
      setTemperature(35);
      addLog("Applied Preset: BYD Blade LFP Cell (High stress thermal loop)");
    } else if (preset === "solid-horizon") {
      setChemistry("solid-state");
      setSoc(85);
      setTemperature(15);
      addLog("Applied Preset: Solid State Gen-V Cell (Low temp state)");
    }
  };

  // Fullscreen management
  const toggleFullscreen = () => {
    if (!labRef.current) return;
    if (!document.fullscreenElement) {
      labRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch((e) => {
        console.error("Error enabling fullscreen", e);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Universal physics math calculations based on active states
  const mathData = useMemo(() => {
    const cData = CHEM_DATA[chemistry];
    
    // Cell voltage curve based on SOC and Chemistry characteristics
    let baseVolt = 3.6;
    if (chemistry === "lfp") baseVolt = 3.2;
    if (chemistry === "solid-state") baseVolt = 3.8;
    if (chemistry === "sodium-ion") baseVolt = 3.0;

    // Voltage rises as SOC increases
    const socFactor = Math.sin((soc / 100) * (Math.PI / 2)) * 0.6;
    const voltage = parseFloat((baseVolt + socFactor).toFixed(2));

    // Temperature affects cell internal resistance & efficiency
    // Optimal range is 20°C to 30°C
    const optimalTemp = 25;
    const tempDiff = Math.abs(temperature - optimalTemp);
    
    // Low temperatures drop efficiency; extreme high temperatures throttle power output
    let efficiency = 100;
    if (temperature < 20) {
      const dropFactor = chemistry === "lfp" ? 1.5 : 0.8;
      efficiency = Math.max(40, 100 - tempDiff * dropFactor);
    } else if (temperature > 30) {
      efficiency = Math.max(65, 100 - (tempDiff - 5) * 0.7);
    }
    efficiency = Math.round(efficiency);

    // Current state capacity degradation projection based on thermal stress & average charge rate
    // Calculate cell operational stress index (0 - 100%)
    let stress = 10;
    if (temperature > 40) stress += (temperature - 40) * 1.8;
    if (temperature < 0) stress += Math.abs(temperature) * 1.2;
    if (soc > 90 || soc < 10) stress += 15;
    stress = Math.min(100, Math.round(stress));

    return {
      voltage,
      efficiency,
      stress,
      capacity: cData.energyDensity,
      cycleLife: cData.cycleLife
    };
  }, [chemistry, soc, temperature]);

  // Reset simulator action
  const resetSimulation = () => {
    setChemistry("nmc");
    setSoc(60);
    setTemperature(25);
    setIsChargingSim(false);
    setSelectedPreset("custom");
    addLog("Simulator reset to NMC default lab conditions.");
  };

  // Download simulation results as JSON
  const downloadDiagnostics = () => {
    const data = {
      timestamp: new Date().toISOString(),
      chemistry,
      soc,
      temperature,
      telemetry: {
        voltage: `${mathData.voltage} V`,
        efficiency: `${mathData.efficiency}%`,
        stressIndex: `${mathData.stress}%`,
        calculatedCapacity: `${mathData.capacity} Wh/kg`,
        expectedCycleLife: `${mathData.cycleLife} cycles`
      },
      diagnosticLogs
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `battery_lab_diagnostics_${chemistry}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog("Diagnostic report exported successfully.");
  };

  // Toggle bookmark configuration
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    addLog(isBookmarked ? "Lab configuration unbookmarked." : "Lab configuration bookmarked to profile.");
  };

  // Share system mock
  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(`${url}?chem=${chemistry}&soc=${soc}&temp=${temperature}`).then(() => {
      addLog("Laboratory configuration link copied to clipboard.");
    });
  };

  return (
    <section id="virtual-lab" ref={labRef} className="space-y-6 scroll-mt-24 w-full relative">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/25">
              Flagship Simulator
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight mt-1.5 bg-linear-to-r from-white via-[#C084FC] to-white bg-clip-text text-transparent">
            Virtual Battery Laboratory
          </h2>
          <p className="text-sm text-[#AEB5C0]/60 mt-1">
            State-of-the-art interactive cell modeling, charging thermal response, and material mechanics simulation.
          </p>
        </div>
      </div>

      {/* TOP SIMULATION TOOLBAR */}
      <div className="p-4 rounded-[18px] border border-white/5 bg-[#131722]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 z-20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#AEB5C0]/40 uppercase tracking-wider">Active Preset:</span>
          <select
            value={selectedPreset}
            onChange={(e) => applyPreset(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] text-xs font-semibold text-white focus:outline-none focus:border-[#C084FC] transition-colors cursor-pointer"
          >
            <option value="custom">Custom Research Setup</option>
            <option value="tesla-2170">Tesla 2170 Cell (NMC)</option>
            <option value="byd-blade">BYD Blade Cell (LFP)</option>
            <option value="solid-horizon">Solid State Gen-V Cell</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetSimulation}
            title="Reset Simulator"
            className="p-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-[#AEB5C0]/85 hover:text-white transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={downloadDiagnostics}
            title="Export Lab Diagnostic Report"
            className="p-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-[#AEB5C0]/85 hover:text-white transition-all duration-200"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            title="Copy configuration link"
            className="p-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-[#AEB5C0]/85 hover:text-white transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleBookmark}
            title="Bookmark Simulation"
            className="p-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-[#AEB5C0]/85 hover:text-white transition-all duration-200"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "text-purple-400 fill-purple-400" : ""}`} />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Fullscreen Simulation Mode"
            className="p-2 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-[#AEB5C0]/85 hover:text-white transition-all duration-200"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DASHBOARD WORKSPACE GRID */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch relative">
        {/* LEFT COMPACT LAB SELECTOR (TABS) */}
        <div className="lg:col-span-3 flex flex-col gap-2 p-3 rounded-[24px] border border-white/5 bg-[#131722]/40 backdrop-blur-xl h-fit">
          <p className="text-[10px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2.5 py-1.5">
            Laboratory Modules
          </p>
          {[
            { id: 1, label: "3D Cell Explorer", icon: Rotate3d, detail: "Model components layout" },
            { id: 2, label: "Charging Loop", icon: Zap, detail: "CC/CV profile dynamics" },
            { id: 3, label: "Thermal Response", icon: Thermometer, detail: "Conductivity thermal load" },
            { id: 4, label: "Chemistry Matrix", icon: Cpu, detail: "Materials radar mapping" },
            { id: 5, label: "Degradation Kinetics", icon: LineChart, detail: "SOH 15-year projections" },
            { id: 6, label: "AI Laboratory Advisor", icon: BrainCircuit, detail: "Design validation wizard" }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  addLog(`Navigated to: ${tab.label}`);
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? "bg-[#C084FC]/10 border border-[#C084FC]/25 shadow-[0_0_15px_rgba(192,132,252,0.15)]"
                    : "border border-transparent hover:bg-white/2"
                }`}
              >
                <div
                  className={`p-2 rounded-lg border transition-all ${
                    isActive
                      ? "bg-[#C084FC]/20 border-[#C084FC]/30 text-purple-300"
                      : "bg-white/3 border-white/5 text-[#AEB5C0]/60 group-hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold transition-all ${
                      isActive ? "text-purple-300" : "text-[#AEB5C0]/80 group-hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </h4>
                  <p className="text-[10px] text-[#AEB5C0]/40 mt-0.5">{tab.detail}</p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* MIDDLE DETAILED SIMULATOR FRAME */}
        <div className="lg:col-span-6 flex flex-col rounded-[24px] border border-white/5 bg-[#131722]/60 backdrop-blur-xl p-6 min-h-[480px] shadow-2xl relative overflow-hidden">
          <div className="flex-1 flex flex-col z-10">
            {activeTab === 1 && <Lab3DExplorer addLog={addLog} />}
            {activeTab === 2 && (
              <LabChargingSimulation
                soc={soc}
                setSoc={setSoc}
                chemistry={chemistry}
                temperature={temperature}
                setTemperature={setTemperature}
                addLog={addLog}
                isChargingSim={isChargingSim}
                setIsChargingSim={setIsChargingSim}
              />
            )}
            {activeTab === 3 && (
              <LabThermalResponse
                temperature={temperature}
                setTemperature={setTemperature}
                addLog={addLog}
                efficiency={mathData.efficiency}
                stress={mathData.stress}
              />
            )}
            {activeTab === 4 && (
              <LabChemistryMatrix
                activeChem={chemistry}
                setChemistry={setChemistry}
                addLog={addLog}
              />
            )}
            {activeTab === 5 && (
              <LabDegradationKinetics
                chemistry={chemistry}
                temperature={temperature}
                addLog={addLog}
              />
            )}
            {activeTab === 6 && <LabAIAdvisor chemistry={chemistry} addLog={addLog} />}
          </div>
        </div>

        {/* RIGHT PANEL - ALWAYS VISIBLE TELEMETRY AND DIAGNOSTIC LOGS */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="p-5 rounded-[24px] border border-white/5 bg-[#131722]/70 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 border-b border-white/5 pb-3.5 mb-4">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">BMS Telemetry Monitor</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Cell Chemistry</span>
                <span className="text-sm font-extrabold text-white block mt-0.5 uppercase tracking-wide">
                  {chemistry === "solid-state" ? "Solid State (ASSB)" : chemistry}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Cell Voltage</span>
                  <span className="text-base font-extrabold text-white mt-0.5 block tracking-tight">
                    {mathData.voltage} <span className="text-[10px] text-purple-400 font-bold">V</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Temperature</span>
                  <span className="text-base font-extrabold text-white mt-0.5 block tracking-tight">
                    {temperature} <span className="text-[10px] text-[#10B981] font-bold">°C</span>
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider mb-1">
                  <span>State of Charge</span>
                  <span className="text-purple-300 font-extrabold">{soc}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-linear-to-r from-[#8B5CF6] to-[#C084FC] rounded-full transition-all duration-300"
                    style={{ width: `${soc}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div>
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Capacity Density</span>
                  <span className="text-xs font-bold text-[#AEB5C0]/85 mt-0.5 block">
                    {mathData.capacity} Wh/kg
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Est. Lifespan</span>
                  <span className="text-xs font-bold text-[#10B981] mt-0.5 block">
                    {mathData.cycleLife} cycles
                  </span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="flex justify-between items-center text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider mb-1.5">
                  <span>Operating Efficiency</span>
                  <span className="text-[#10B981] font-extrabold">{mathData.efficiency}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#AEB5C0]/60">Stress Index:</span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        mathData.stress > 65
                          ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          : mathData.stress > 35
                          ? "bg-orange-500"
                          : "bg-[#10B981]"
                      }`}
                    />
                    <span className="text-xs font-bold text-white">{mathData.stress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Console Logs */}
          <div className="flex-1 flex flex-col p-4 rounded-[24px] border border-white/5 bg-[#07090e]/60 backdrop-blur-md max-h-[220px]">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Lab Console Logs</span>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#AEB5C0]/65 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 select-none">
              {diagnosticLogs.map((log, idx) => (
                <div key={idx} className="leading-normal truncate">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// LAB MODULE 1: 3D CELL EXPLORER
// ==========================================

function Lab3DExplorer({ addLog }: { addLog: (m: string) => void }) {
  const [exploded, setExploded] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<ComponentDetail>(CELL_COMPONENTS[0]!);
  const [rotateAngle, setRotateAngle] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const toggleExplode = () => {
    setExploded(!exploded);
    addLog(exploded ? "Collapsed cell structural components." : "Exploded cell components layer view.");
  };

  const handlePartClick = (part: ComponentDetail) => {
    setSelectedPart(part);
    addLog(`Inspected cell component: ${part.name}`);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h3 className="text-base font-extrabold text-white">3D Battery Cell Explorer</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">
          Manipulate structural cell layers to analyze internal electrode design configurations.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch">
        {/* Interactive Viewport */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between p-4 relative min-h-[300px] overflow-hidden">
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.06),transparent_70%)] pointer-events-none" />

          {/* Render Controls */}
          <div className="flex items-center justify-between z-10">
            <button
              onClick={toggleExplode}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                exploded
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                  : "bg-white/5 border-white/5 text-[#AEB5C0]/85 hover:text-white"
              }`}
            >
              {exploded ? "Collapse View" : "Exploded View"}
            </button>

            <div className="flex items-center gap-1 bg-white/2 rounded-lg border border-white/5 p-0.5">
              <button
                onClick={() => setRotateAngle((p) => (p - 45) % 360)}
                title="Rotate Left"
                className="p-1 text-[10px] text-[#AEB5C0]/50 hover:text-white"
              >
                ↺
              </button>
              <span className="text-[9px] font-bold text-[#AEB5C0]/40 px-1">ROTATION</span>
              <button
                onClick={() => setRotateAngle((p) => (p + 45) % 360)}
                title="Rotate Right"
                className="p-1 text-[10px] text-[#AEB5C0]/50 hover:text-white"
              >
                ↻
              </button>
            </div>
          </div>

          {/* SVG Battery Design Rendering */}
          <div className="flex-1 flex items-center justify-center py-4">
            <svg
              viewBox="-100 -120 200 240"
              className="w-full max-w-[220px] aspect-square transition-transform duration-500"
              style={{
                transform: `rotate(${rotateAngle}deg) scale(${zoomScale})`,
                cursor: "pointer"
              }}
            >
              {/* Casing Background Ring */}
              <motion.ellipse
                cx="0"
                cy={exploded ? "-80" : "-10"}
                rx="65"
                ry="20"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity={selectedPart.id === "casing" ? 1 : 0.4}
                animate={{ y: exploded ? -70 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[0]!)}
              />

              {/* Negative Terminal Connector (Bottom) */}
              <motion.path
                d="M -15,70 L -15,90 A 15,4 0 0,0 15,90 L 15,70 Z"
                fill="url(#copperGrad)"
                stroke="#3B82F6"
                strokeWidth={selectedPart.id === "terminal-neg" ? 2 : 1}
                animate={{ y: exploded ? 70 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[6]!)}
              />

              {/* Anode Active Layer */}
              <motion.path
                d="M -30,20 L -30,55 A 30,8 0 0,0 30,55 L 30,20 A 30,8 0 0,1 -30,20 Z"
                fill="url(#anodeGrad)"
                stroke="#8B5CF6"
                strokeWidth={selectedPart.id === "anode" ? 2 : 1}
                animate={{ y: exploded ? 40 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[5]!)}
              />

              {/* Liquid Electrolyte glow wave layer */}
              <motion.path
                d="M -35,-5 L -35,20 A 35,8 0 0,0 35,20 L 35,-5 A 35,8 0 0,1 -35,-5 Z"
                fill="url(#electrolyteGrad)"
                stroke="#06B6D4"
                strokeWidth={selectedPart.id === "electrolyte" ? 2 : 0.5}
                animate={{ y: exploded ? 15 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[4]!)}
              />

              {/* Separator Filter Grid */}
              <motion.path
                d="M -40,-30 L -40,-5 A 40,9 0 0,0 40,-5 L 40,-30 A 40,9 0 0,1 -40,-30 Z"
                fill="url(#separatorGrad)"
                stroke="#10B981"
                strokeWidth={selectedPart.id === "separator" ? 2 : 1}
                animate={{ y: exploded ? -10 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[3]!)}
              />

              {/* Cathode Active Layer */}
              <motion.path
                d="M -45,-55 L -45,-30 A 45,10 0 0,0 45,-30 L 45,-55 A 45,10 0 0,1 -45,-55 Z"
                fill="url(#cathodeGrad)"
                stroke="#EC4899"
                strokeWidth={selectedPart.id === "cathode" ? 2 : 1}
                animate={{ y: exploded ? -35 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[2]!)}
              />

              {/* Positive Terminal Cap (Top) */}
              <motion.path
                d="M -20,-85 L -20,-75 A 20,5 0 0,0 20,-75 L 20,-85 A 20,5 0 0,1 -20,-85 Z"
                fill="url(#aluminumGrad)"
                stroke="#EF4444"
                strokeWidth={selectedPart.id === "terminal-pos" ? 2 : 1}
                animate={{ y: exploded ? -65 : 0 }}
                onClick={() => handlePartClick(CELL_COMPONENTS[1]!)}
              />

              {/* Steel Shell (Semi-transparent Casing Overlap) */}
              <motion.path
                d="M -50,-80 L -50,75 A 50,12 0 0,0 50,75 L 50,-80 A 50,12 0 0,1 -50,-80 Z"
                fill="rgba(255,255,255,0.05)"
                stroke="#AEB5C0"
                strokeWidth={selectedPart.id === "casing" ? 2 : 1}
                strokeDasharray={exploded ? "5 5" : "none"}
                opacity={exploded ? 0.3 : 0.85}
                onClick={() => handlePartClick(CELL_COMPONENTS[0]!)}
              />

              {/* SVG GRADIENT DEFINITIONS */}
              <defs>
                <linearGradient id="aluminumGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9CA3AF" />
                  <stop offset="50%" stopColor="#F3F4F6" />
                  <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
                <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B45309" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
                <linearGradient id="cathodeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#BE185D" />
                  <stop offset="50%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#831843" />
                </linearGradient>
                <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="50%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </linearGradient>
                <linearGradient id="electrolyteGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0891B2" />
                  <stop offset="50%" stopColor="#67E8F9" />
                  <stop offset="100%" stopColor="#0F766E" />
                </linearGradient>
                <pattern id="separatorGrad" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="#10B981" strokeWidth="0.5" opacity="0.6" />
                  <rect width="8" height="8" fill="#10B981" fillOpacity="0.15" />
                </pattern>
              </defs>
            </svg>
          </div>

          {/* Zoom controls */}
          <div className="flex justify-between items-center z-10 pt-2 border-t border-white/5">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">
              {exploded ? "Exploded structural mesh view" : "Cylindrical Cell wireframe"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setZoomScale((z) => Math.max(0.7, z - 0.15))}
                className="w-5 h-5 flex items-center justify-center bg-white/5 rounded text-xs text-[#AEB5C0] hover:text-white cursor-pointer"
              >
                -
              </button>
              <span className="text-[10px] font-bold text-white select-none">{Math.round(zoomScale * 100)}%</span>
              <button
                onClick={() => setZoomScale((z) => Math.min(1.5, z + 0.15))}
                className="w-5 h-5 flex items-center justify-center bg-white/5 rounded text-xs text-[#AEB5C0] hover:text-white cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Informational Panel */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedPart.color, boxShadow: `0 0 10px ${selectedPart.color}80` }}
              />
              <span className="text-xs font-bold text-white tracking-wide">{selectedPart.name}</span>
            </div>
            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Component Purpose</span>
                <p className="text-xs text-[#AEB5C0]/85 mt-1 leading-relaxed">{selectedPart.purpose}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Key Chemical Materials</span>
                <p className="text-xs text-white/90 font-bold mt-1">{selectedPart.material}</p>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Working Electrochemistry</span>
                <p className="text-xs text-[#AEB5C0]/75 mt-1 leading-normal">{selectedPart.workingPrinciple}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <p className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider mb-2">Cell Assembly Catalog</p>
            <div className="grid grid-cols-2 gap-1.5">
              {CELL_COMPONENTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => handlePartClick(part)}
                  className={`px-3 py-2 rounded-xl text-left border text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedPart.id === part.id
                      ? "bg-white/5 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                      : "bg-white/2 border-white/5 text-[#AEB5C0]/60 hover:text-white"
                  }`}
                >
                  {part.name.split(" ")[0]} {part.name.split(" ")[1] || ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LAB MODULE 2: CHARGING SIMULATION
// ==========================================

interface ChargingSimulationProps {
  soc: number;
  setSoc: (val: number) => void;
  chemistry: ChemistryType;
  temperature: number;
  setTemperature: (val: number) => void;
  addLog: (m: string) => void;
  isChargingSim: boolean;
  setIsChargingSim: (val: boolean) => void;
}

function LabChargingSimulation({
  soc,
  setSoc,
  chemistry,
  temperature,
  setTemperature,
  addLog,
  isChargingSim,
  setIsChargingSim
}: ChargingSimulationProps) {
  const [chargingSpeed, setChargingSpeed] = useState<"slow" | "fast" | "ultra">("fast");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // CC/CV Curve Calculations
  const chargingDetails = useMemo(() => {
    // Determine power capabilities in kW
    let basePower = 11; // Slow AC
    if (chargingSpeed === "fast") basePower = 150; // DC Fast
    if (chargingSpeed === "ultra") basePower = 350; // HPC Ultra

    // Chem limits
    if (chemistry === "lfp" && chargingSpeed === "ultra") basePower = 200; // LFP caps lower
    if (chemistry === "solid-state" && chargingSpeed === "ultra") basePower = 400; // ASSB charges faster

    // Constant Current to Constant Voltage throttle factor
    // Throttling starts above 80% SOC
    let powerFactor = 1.0;
    let stage = "Constant Current (CC)";
    if (soc > 80) {
      stage = "Constant Voltage (CV) Throttling";
      powerFactor = Math.max(0.1, (100 - soc) / 20); // Decay down to 10% rate
    }

    const currentPower = parseFloat((basePower * powerFactor).toFixed(1));
    
    // Theoretical Current: Power = Volt * Amp => Amp = Power / Volt
    // NMC cell volt is ~3.7V, total pack voltage assume 400V
    const packVoltage = 400;
    const currentAmps = Math.round((currentPower * 1000) / packVoltage);

    // Temperature drift during charging (fast charging heats cell)
    const heatCoefficient = chargingSpeed === "ultra" ? 0.25 : chargingSpeed === "fast" ? 0.08 : 0.01;
    
    return {
      power: currentPower,
      amps: currentAmps,
      stage,
      heatCoeff: heatCoefficient
    };
  }, [soc, chargingSpeed, chemistry]);

  // Handle live loop charging animation
  useEffect(() => {
    if (isChargingSim) {
      timerRef.current = setInterval(() => {
        setSoc(Math.min(100, soc + 1));
        
        // Heat dissipation balance
        const thermalLimit = 55;
        const potentialTemp = temperature + chargingDetails.heatCoeff - (temperature - 25) * 0.05;
        setTemperature(parseFloat(Math.min(thermalLimit, Math.max(-20, potentialTemp)).toFixed(1)));
        
        if (soc >= 100) {
          setIsChargingSim(false);
          addLog("Charge Complete: SOH state metrics calibrated.");
        }
      }, 350);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isChargingSim, soc, chargingDetails, temperature]);

  const toggleCharging = () => {
    setIsChargingSim(!isChargingSim);
    addLog(isChargingSim ? "Paused live battery charge simulator." : `Started ${chargingSpeed} charge simulation.`);
  };

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">Live Charging Simulation</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">
          Observe Constant Current (CC) & Constant Voltage (CV) dynamics during active charging.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        {/* Graph / Visualization */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">Charging Curves Profile</span>
            <span className="text-[10px] font-extrabold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              {chargingDetails.stage}
            </span>
          </div>

          {/* CC/CV SVG Plot chart */}
          <div className="flex-1 flex items-center justify-center py-3 relative">
            <svg viewBox="0 0 200 100" className="w-full h-full max-h-[140px] overflow-visible">
              {/* Grid Lines */}
              <line x1="15" y1="10" x2="15" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
              <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
              <line x1="155" y1="10" x2="155" y2="85" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
              
              <text x="150" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">80% SOC (CV Start)</text>
              <text x="15" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">0%</text>
              <text x="185" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">100%</text>

              {/* Voltage line (Rising gradually, then flat) */}
              <path
                d="M 15,70 Q 80,45 155,30 L 190,30"
                fill="none"
                stroke="#EC4899"
                strokeWidth="1.5"
                opacity="0.85"
              />
              {/* Current line (Flat, then drops exponentially) */}
              <path
                d="M 15,35 L 155,35 Q 170,60 190,80"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="1.5"
                opacity="0.85"
              />

              {/* Active tracker dot based on SOC */}
              {(() => {
                // Approximate coordinates mapping SOC (0-100) to graph pixels (15-190)
                const dotX = 15 + (soc / 100) * 175;
                // Volt plot approximate Y
                let dotVoltY = 70 - (soc / 80) * 40;
                if (soc > 80) dotVoltY = 30;
                // Current plot approximate Y
                let dotCurrY = 35;
                if (soc > 80) dotCurrY = 35 + ((soc - 80) / 20) * 45;

                return (
                  <g key="tracker">
                    <circle cx={dotX} cy={dotVoltY} r="3.5" fill="#EC4899" stroke="white" strokeWidth="0.8" className="animate-ping" />
                    <circle cx={dotX} cy={dotVoltY} r="2.5" fill="#EC4899" stroke="white" strokeWidth="0.8" />
                    <circle cx={dotX} cy={dotCurrY} r="2.5" fill="#06B6D4" stroke="white" strokeWidth="0.8" />
                  </g>
                );
              })()}
            </svg>

            {/* Float Legends */}
            <div className="absolute bottom-2 left-6 flex items-center gap-4 text-[9px] font-bold">
              <span className="flex items-center gap-1 text-[#EC4899]">
                <span className="w-1.5 h-1.5 bg-[#EC4899] rounded-full" /> Voltage (V)
              </span>
              <span className="flex items-center gap-1 text-[#06B6D4]">
                <span className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full" /> Current (A)
              </span>
            </div>
          </div>
        </div>

        {/* Controls and readouts */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1.5">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Set State of Charge</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soc}
                  onChange={(e) => {
                    setSoc(parseInt(e.target.value));
                    addLog(`Manually set SOC to ${e.target.value}%`);
                  }}
                  className="flex-1 accent-[#8B5CF6] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-extrabold text-white min-w-[32px] text-right">{soc}%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Charging Speed Profile</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "slow", label: "AC 11kW" },
                  { id: "fast", label: "DC 150kW" },
                  { id: "ultra", label: "HPC 350kW" }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setChargingSpeed(s.id as any);
                      addLog(`Switched charging interface to: ${s.label}`);
                    }}
                    className={`py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                      chargingSpeed === s.id
                        ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                        : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                    }`}
                  >
                    {s.label.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Power Output</span>
                <span className="text-sm font-black text-white">{chargingDetails.power} kW</span>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Current Flow</span>
                <span className="text-sm font-black text-white">{chargingDetails.amps} A</span>
              </div>
            </div>
          </div>

          <button
            onClick={toggleCharging}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
              isChargingSim
                ? "bg-red-500/20 border-red-500/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                : "bg-[#10B981] border-[#10B981] text-[#07090e] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            }`}
          >
            <Zap className={`w-4 h-4 ${isChargingSim ? "animate-bounce" : ""}`} />
            {isChargingSim ? "Pause Charging Simulation" : "Initiate Charging Loop"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LAB MODULE 3: TEMPERATURE SIMULATION
// ==========================================

interface ThermalSimulationProps {
  temperature: number;
  setTemperature: (val: number) => void;
  addLog: (m: string) => void;
  efficiency: number;
  stress: number;
}

function LabThermalResponse({ temperature, setTemperature, addLog, efficiency, stress }: ThermalSimulationProps) {
  // Safe limit calculations
  const thermalState = useMemo(() => {
    let warning = "Normal Operating Temperature";
    let alertColor = "text-[#10B981]";
    let status = "nominal";

    if (temperature > 50) {
      warning = "CRITICAL THERMAL RUNAWAY LIMIT";
      alertColor = "text-red-500";
      status = "danger";
    } else if (temperature > 35) {
      warning = "Thermal Overheat: Degradation accelerated";
      alertColor = "text-orange-500";
      status = "warning";
    } else if (temperature < 0) {
      warning = "Extreme Cold: Ion diffusion restricted";
      alertColor = "text-blue-400";
      status = "cold";
    }

    // Cooling rate mock
    const maxCoolingReq = Math.max(0, temperature > 25 ? (temperature - 25) * 4.5 : 0);

    return { warning, alertColor, status, coolingKw: Math.round(maxCoolingReq) };
  }, [temperature]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">Thermal Loop response Chamber</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">
          Simulate cell environmental controls to analyze temperature impact on cell capacity & internal resistance.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        {/* Heat Map Visualization chamber */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between p-4 relative min-h-[220px] overflow-hidden">
          {/* Dynamic background thermal chamber gradient */}
          <div
            className="absolute inset-0 opacity-40 transition-all duration-700 pointer-events-none"
            style={{
              background:
                thermalState.status === "danger"
                  ? "radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(0,0,0,0) 80%)"
                  : thermalState.status === "warning"
                  ? "radial-gradient(circle, rgba(249,115,22,0.2) 0%, rgba(0,0,0,0) 80%)"
                  : thermalState.status === "cold"
                  ? "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(0,0,0,0) 80%)"
                  : "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0) 80%)"
            }}
          />

          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">Thermal Imaging Mode</span>
            <div className="flex gap-2">
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase border bg-black/35 ${
                thermalState.status === "danger"
                  ? "border-red-500/30 text-red-400"
                  : thermalState.status === "warning"
                  ? "border-orange-500/30 text-orange-400"
                  : "border-white/5 text-[#AEB5C0]"
              }`}>
                {thermalState.status}
              </span>
            </div>
          </div>

          {/* Centered graphical battery core */}
          <div className="flex-1 flex flex-col items-center justify-center z-10 py-3">
            <div className="w-[150px] h-[55px] border border-white/10 rounded-xl relative p-1 flex items-center overflow-hidden bg-white/2">
              {/* Inner glowing battery blocks based on thermal condition */}
              <div
                className="h-full rounded-lg transition-all duration-700 w-full"
                style={{
                  background:
                    thermalState.status === "danger"
                      ? "linear-gradient(to right, #EF4444, #F87171)"
                      : thermalState.status === "warning"
                      ? "linear-gradient(to right, #F97316, #FB923C)"
                      : thermalState.status === "cold"
                      ? "linear-gradient(to right, #3B82F6, #60A5FA)"
                      : "linear-gradient(to right, #10B981, #34D399)",
                  boxShadow:
                    thermalState.status === "danger"
                      ? "0 0 25px #EF4444"
                      : thermalState.status === "warning"
                      ? "0 0 20px #F97316"
                      : thermalState.status === "cold"
                      ? "0 0 20px #3B82F6"
                      : "0 0 15px #10B981"
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                CORE: {temperature}°C
              </span>
            </div>

            <div className={`mt-3.5 text-center text-[10px] font-bold ${thermalState.alertColor}`}>
              {thermalState.warning}
            </div>
          </div>

          <div className="z-10 flex justify-between items-center border-t border-white/5 pt-2 text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">
            <span>Thermal Chamber Limits: -20°C to 70°C</span>
            <span>Sensor: calibrated</span>
          </div>
        </div>

        {/* Controls info */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1.5">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Environmental Temperature</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="-20"
                  max="70"
                  value={temperature}
                  onChange={(e) => {
                    setTemperature(parseInt(e.target.value));
                    addLog(`Adjusted environmental temperature to ${e.target.value}°C`);
                  }}
                  className="flex-1 accent-purple-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-extrabold text-white min-w-[32px] text-right">{temperature}°C</span>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Liquid Cooling Requirement</span>
                <span className="text-sm font-black text-white">{thermalState.coolingKw} kW <span className="text-[10px] text-[#AEB5C0]/50 font-normal">Active load</span></span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Ion Flow Rate</span>
                  <span className="text-xs font-bold text-white">
                    {efficiency}% <span className="text-[9px] text-[#AEB5C0]/50 font-normal">Cap</span>
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Internal Stress</span>
                  <span className="text-xs font-bold text-white">{stress}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-[10.5px] text-[#AEB5C0]/75 leading-relaxed">
              At extreme low temperatures, electrolyte viscosity increases, limiting ion motility. At high temperatures, SEI layer degradation accelerates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LAB MODULE 4: CHEMISTRY MATRIX COMPARISON
// ==========================================

interface ChemistryMatrixProps {
  activeChem: ChemistryType;
  setChemistry: (val: ChemistryType) => void;
  addLog: (m: string) => void;
}

function LabChemistryMatrix({ activeChem, setChemistry, addLog }: ChemistryMatrixProps) {
  const selectedDetails = CHEM_DATA[activeChem];

  // Dynamic Radar Chart Coordinates mapping chemistry values (out of 100)
  // Radar properties: Energy Density (mapped), Cycle Life (mapped), Safety, Cold Weather, Low Cost (inverse of cost)
  const radarPoints = useMemo(() => {
    // Normalizing stats to 0-100 scale
    const densityRaw = selectedDetails.energyDensity; // 130 - 400
    const densityVal = Math.round(((densityRaw - 100) / 300) * 100);
    
    const cycleRaw = selectedDetails.cycleLife; // 1200 - 10000
    const cycleVal = Math.round(((cycleRaw - 1000) / 9000) * 100);

    const safetyVal = selectedDetails.safety;
    const weatherVal = selectedDetails.coldWeather;
    
    const costRaw = selectedDetails.cost; // 45 - 250
    const costVal = Math.round(((260 - costRaw) / 220) * 100); // lower cost is better

    // Polar coordinates converter (center 100,100, radius 80)
    // Angles: Density (0), Cycle (72), Safety (144), Cost (216), Weather (288)
    const stats = [densityVal, cycleVal, safetyVal, costVal, weatherVal];
    const points = stats.map((val, idx) => {
      const angle = (idx * 72 - 90) * (Math.PI / 180);
      // Normalized radius (max 80px)
      const r = (val / 100) * 72;
      const x = Math.round(100 + r * Math.cos(angle));
      const y = Math.round(100 + r * Math.sin(angle));
      return { x, y };
    });

    return {
      pointsStr: points.map((p) => `${p.x},${p.y}`).join(" "),
      stats: { densityVal, cycleVal, safetyVal, costVal, weatherVal }
    };
  }, [activeChem, selectedDetails]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">Battery Chemistry Simulator</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">
          Select different cathode structures to analyze trade-offs in density, stability, cycle metrics, and cost.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        {/* Radar Graph */}
        <div className="md:col-span-6 rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block mb-2">Interactive Material Radar mapping</span>
          
          <div className="flex-1 flex items-center justify-center relative">
            <svg viewBox="0 0 200 200" className="w-full max-w-[170px] aspect-square overflow-visible">
              {/* Radar grid pentagons */}
              {[20, 40, 60, 80].map((r) => {
                const points = [0, 72, 144, 216, 288].map((angle) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x = 100 + (r * 72 / 100) * Math.cos(rad);
                  const y = 100 + (r * 72 / 100) * Math.sin(rad);
                  return `${x},${y}`;
                });
                return (
                  <polygon
                    key={r}
                    points={points.join(" ")}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Radar Axes Web */}
              {[0, 72, 144, 216, 288].map((angle, idx) => {
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 100 + 72 * Math.cos(rad);
                const y = 100 + 72 * Math.sin(rad);
                return (
                  <line
                    key={idx}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Radar Polygon Shape */}
              <polygon
                points={radarPoints.pointsStr}
                fill="rgba(192,132,252,0.18)"
                stroke="#C084FC"
                strokeWidth="1.8"
                className="transition-all duration-500"
              />

              {/* Data points dots */}
              {radarPoints.pointsStr.split(" ").map((pt, idx) => {
                const [x, y] = pt.split(",");
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill="#C084FC"
                    stroke="white"
                    strokeWidth="0.6"
                    className="transition-all duration-500"
                  />
                );
              })}

              {/* Radar Labels */}
              <text x="100" y="15" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontWeight="bold" textAnchor="middle">Energy Density</text>
              <text x="180" y="75" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontWeight="bold" textAnchor="start">Cycle Life</text>
              <text x="155" y="170" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontWeight="bold" textAnchor="start">Safety</text>
              <text x="45" y="170" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontWeight="bold" textAnchor="end">Low Cost</text>
              <text x="20" y="75" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontWeight="bold" textAnchor="end">Thermal Tol.</text>
            </svg>
          </div>
        </div>

        {/* Detailed readout */}
        <div className="md:col-span-6 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            {/* Switche select selector */}
            <div className="space-y-1">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Electrode Chemistry Selector</span>
              <select
                value={activeChem}
                onChange={(e) => {
                  setChemistry(e.target.value as ChemistryType);
                  addLog(`Material matrix updated: ${CHEM_DATA[e.target.value as ChemistryType].name}`);
                }}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                <option value="nmc">NMC Cathode (Standard Premium)</option>
                <option value="lfp">LFP Cathode (Safety & Lifespan)</option>
                <option value="nca">NCA Cathode (High Output Density)</option>
                <option value="solid-state">All-Solid-State (Horizon Tech)</option>
                <option value="sodium-ion">Sodium-Ion (Cost Optimized)</option>
                <option value="graphene">Graphene Super-Cell (Extreme speed)</option>
              </select>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pros & Characteristics</h4>
              <ul className="space-y-1">
                {selectedDetails.pros.slice(0, 2).map((p, idx) => (
                  <li key={idx} className="text-[11px] text-[#AEB5C0] flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-[#10B981] rounded-full shrink-0" />
                    {p}
                  </li>
                ))}
                {selectedDetails.cons.slice(0, 1).map((c, idx) => (
                  <li key={idx} className="text-[11px] text-[#AEB5C0]/70 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-400 rounded-full shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Energy density Wh/kg</span>
                <span className="text-xs font-extrabold text-white">{selectedDetails.energyDensity}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Target Cost per kWh</span>
                <span className="text-xs font-extrabold text-white">${selectedDetails.cost} USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LAB MODULE 5: DEGRADATION KINETICS
// ==========================================

function LabDegradationKinetics({
  chemistry,
  temperature,
  addLog
}: {
  chemistry: ChemistryType;
  temperature: number;
  addLog: (m: string) => void;
}) {
  const [fastChargePct, setFastChargePct] = useState<number>(30);
  const [drivingStyle, setDrivingStyle] = useState<"standard" | "aggressive" | "eco">("standard");
  const [cyclesPerYear, setCyclesPerYear] = useState<number>(300);

  // Math equations estimating battery degradation over 15 years
  const degradationData = useMemo(() => {
    const years = Array.from({ length: 16 }, (_, i) => i);
    
    // Core parameters mapping SOH retention
    let decayFactor = 0.015; // base decay per year
    
    // Chemistry coefficients
    if (chemistry === "lfp") decayFactor *= 0.45; // LFP degrades very slowly
    if (chemistry === "solid-state") decayFactor *= 0.65;
    if (chemistry === "graphene") decayFactor *= 0.15;
    if (chemistry === "sodium-ion") decayFactor *= 0.8;
    if (chemistry === "nca") decayFactor *= 1.25; // NCA degrades faster

    // Driver style coefficient
    if (drivingStyle === "aggressive") decayFactor *= 1.35;
    if (drivingStyle === "eco") decayFactor *= 0.85;

    // Fast charge penalty
    decayFactor += (fastChargePct / 100) * 0.008;

    // Temp stress penalty
    if (temperature > 35) decayFactor *= 1.45;
    if (temperature < 0) decayFactor *= 1.15;

    // Build retention points
    const capacityPoints = years.map((yr) => {
      // Non-linear electrochemical calendar aging decay
      const retention = Math.max(
        40,
        100 * Math.exp(-decayFactor * yr * (1 + (cyclesPerYear / 300) * 0.15))
      );
      return parseFloat(retention.toFixed(1));
    });

    return {
      points: capacityPoints,
      retention10Y: capacityPoints[10],
      replacementYear: capacityPoints.findIndex((v) => v < 70) === -1 ? "15+" : capacityPoints.findIndex((v) => v < 70)
    };
  }, [chemistry, temperature, fastChargePct, drivingStyle, cyclesPerYear]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">Battery Degradation Simulator</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">
          Predict calendar aging SOH loss based on daily load stress factors and storage environments.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        {/* Degradation Retention Graph */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">Capacity retention curve</span>
            <span className="text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
              10Y Retention: {degradationData.retention10Y}%
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2 relative">
            <svg viewBox="0 0 200 100" className="w-full h-full max-h-[140px] overflow-visible">
              {/* Grid Lines */}
              <line x1="15" y1="10" x2="15" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
              <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
              <line x1="15" y1="36" x2="190" y2="36" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="15" y1="61" x2="190" y2="61" stroke="rgba(239,68,68,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
              
              <text x="195" y="63" fill="rgba(239,68,68,0.4)" fontSize="5.5" textAnchor="start">70% SOH limit</text>
              <text x="15" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">Yr 0</text>
              <text x="100" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">Yr 7</text>
              <text x="190" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">Yr 15</text>

              {/* Degradation line */}
              {(() => {
                const linePoints = degradationData.points.map((val, idx) => {
                  const x = 15 + (idx / 15) * 175;
                  // Map SOH (100 -> 10px, 40 -> 85px)
                  const y = 10 + ((100 - val) / 60) * 75;
                  return `${x},${y}`;
                });
                return (
                  <path
                    d={`M ${linePoints.join(" L ")}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="space-y-1.5">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Fast Charging Percentage (DC)</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fastChargePct}
                  onChange={(e) => {
                    setFastChargePct(parseInt(e.target.value));
                    addLog(`Set Fast Charging fraction to ${e.target.value}%`);
                  }}
                  className="flex-1 accent-purple-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs font-bold text-white">{fastChargePct}%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Driving Profile Style</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "eco", label: "Eco-Cruise" },
                  { id: "standard", label: "Standard" },
                  { id: "aggressive", label: "Sport Mode" }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setDrivingStyle(d.id as any);
                      addLog(`Updated driving behavior load to: ${d.label}`);
                    }}
                    className={`py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                      drivingStyle === d.id
                        ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                        : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                    }`}
                  >
                    {d.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Est. Pack Lifecycle</span>
                <span className="text-xs font-extrabold text-white">
                  {degradationData.replacementYear} Yrs <span className="text-[9px] text-[#AEB5C0]/50 font-normal">to 70%</span>
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Annual Cycles</span>
                <input
                  type="number"
                  value={cyclesPerYear}
                  min={50}
                  max={600}
                  onChange={(e) => setCyclesPerYear(Math.max(50, Math.min(600, parseInt(e.target.value) || 200)))}
                  className="w-full bg-[#07090e] border border-white/10 rounded px-1.5 py-0.5 text-xs text-white font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LAB MODULE 6: AI BATTERY ADVISOR
// ==========================================

function LabAIAdvisor({ chemistry, addLog }: { chemistry: ChemistryType; addLog: (m: string) => void }) {
  const [budget, setBudget] = useState<string>("moderate");
  const [rangeNeed, setRangeNeed] = useState<string>("high");
  const [climate, setClimate] = useState<string>("moderate");
  const [advisorReport, setAdvisorReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAIQuery = () => {
    setIsLoading(true);
    addLog("AI processing: running electrochemical validation algorithm...");
    
    setTimeout(() => {
      let recChem: ChemistryType = "nmc";
      let confidence = 85;
      let lifespan = "8 - 12 Years";
      let strategy = "Limit fast charging to 20% total usage. Maintain cell storage at room temperature.";

      // Decision rules
      if (budget === "low") {
        recChem = "sodium-ion";
        confidence = 90;
        lifespan = "7 - 10 Years";
        strategy = "Ideal for short city commutes. Charging from 10% to 100% does not accelerate degradation.";
      } else if (budget === "moderate" && climate === "cold") {
        recChem = "nmc";
        confidence = 88;
        lifespan = "10 - 12 Years";
        strategy = "Precondition battery module before driving/charging in cold conditions. Keep SOC between 20% and 80%.";
      } else if (budget === "moderate" && rangeNeed === "low") {
        recChem = "lfp";
        confidence = 94;
        lifespan = "15+ Years";
        strategy = "Safely charge to 100% regularly. Keep cell stored without concern for capacity fading.";
      } else if (budget === "high" && rangeNeed === "high") {
        recChem = "solid-state";
        confidence = 96;
        lifespan = "15+ Years";
        strategy = "Ultra fast charging ready. Features zero fire runaway parameters under crash loads.";
      }

      setAdvisorReport({
        recChem,
        confidence,
        lifespan,
        strategy,
        protection: "Set BMS safety limits to trigger active liquid cooling bypass above 42°C."
      });
      setIsLoading(false);
      addLog(`AI recommendation generated: recommended ${CHEM_DATA[recChem].name}`);
    }, 1200);
  };

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-extrabold text-white">AI Battery Advisor</h3>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">
          Specify operating parameters and vehicle goals to generate custom chemistry recommendations.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 flex-1 items-stretch py-2">
        {/* Form panel */}
        <div className="md:col-span-6 rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col justify-between gap-3 min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Operational Requirement Profile</span>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] text-[#AEB5C0]/50 font-bold uppercase block mb-1">Target Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-[#07090e] border border-white/10 text-xs text-white cursor-pointer"
                >
                  <option value="low">Low Cost Focus</option>
                  <option value="moderate">Moderate Balanced</option>
                  <option value="high">High Performance</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] text-[#AEB5C0]/50 font-bold uppercase block mb-1">Range Goals</label>
                <select
                  value={rangeNeed}
                  onChange={(e) => setRangeNeed(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-[#07090e] border border-white/10 text-xs text-white cursor-pointer"
                >
                  <option value="low">City commuting (&lt;150mi)</option>
                  <option value="high">Premium range (&gt;300mi)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] text-[#AEB5C0]/50 font-bold uppercase block mb-1">Local Climate</label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full px-2 py-1 rounded bg-[#07090e] border border-white/10 text-xs text-white cursor-pointer"
              >
                <option value="moderate">Temperate (15°C to 28°C)</option>
                <option value="cold">Sub-zero Winter Cold</option>
                <option value="hot">Desert Arid Heat</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAIQuery}
            disabled={isLoading}
            className="w-full py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:opacity-55 cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4" />
            {isLoading ? "Validating Cell Model..." : "Generate AI Recommendation"}
          </button>
        </div>

        {/* AI response readout */}
        <div className="md:col-span-6 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md h-full flex flex-col justify-between min-h-[220px]">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                <span className="text-xs text-[#AEB5C0]/60 font-bold">Validating structural models...</span>
              </div>
            ) : advisorReport ? (
              <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Recommended Chemistry</span>
                    <span className="text-sm font-black text-purple-300">
                      {CHEM_DATA[advisorReport.recChem as ChemistryType].name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block">Confidence Score</span>
                    <span className="text-sm font-black text-[#10B981]">{advisorReport.confidence}%</span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] leading-relaxed text-[#AEB5C0]/85">
                  <p>
                    <strong className="text-white">Est. Lifetime:</strong> {advisorReport.lifespan}
                  </p>
                  <p>
                    <strong className="text-white">Optimal Strategy:</strong> {advisorReport.strategy}
                  </p>
                  <p>
                    <strong className="text-white">Active Protection:</strong> {advisorReport.protection}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <BrainCircuit className="w-8 h-8 text-[#AEB5C0]/30 mb-2" />
                <p className="text-xs text-[#AEB5C0]/50">
                  Configure operational goals and click &quot;Generate&quot; to receive an interactive expert system chemistry recommendation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
