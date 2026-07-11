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
  Plus,
  Trash2,
  Check,
  Eye,
  FileDown,
  Wrench,
  Wind,
  Droplets,
  Layers,
  Car,
  Truck,
  Compass
} from "lucide-react";

// ==========================================
// STATIC TYPES & FORMULA CONSTANTS
// ==========================================

type ChemistryType = "nmc" | "lfp" | "nca" | "solid-state" | "sodium-ion";
type CoolingType = "air" | "liquid" | "pcm";
type ClimateType = "cold" | "moderate" | "hot";
type VehicleType = "scooter" | "motorcycle" | "car" | "suv" | "bus" | "truck";

interface SavedTwin {
  id: string;
  name: string;
  chemistry: ChemistryType;
  capacity: number;
  cells: number;
  cooling: CoolingType;
  charging: number;
  climate: ClimateType;
  vehicle: VehicleType;
  stats: {
    voltage: number;
    weight: number;
    cost: number;
    range: number;
    density: number;
    engineeringScore: number;
  };
}

interface ComponentTwinDetail {
  id: string;
  name: string;
  purpose: string;
  material: string;
  specs: string;
  color: string;
}

const TWIN_COMPONENTS: ComponentTwinDetail[] = [
  {
    id: "casing",
    name: "Structural Pack Enclosure",
    purpose: "Hermetic sealing, structural crash barrier, and environmental insulation.",
    material: "Aluminium-Silicon extrusion or carbon fiber composites.",
    specs: "IP69K sealing, ASIL-D structural integrity, integrated burst vents.",
    color: "#4B5563"
  },
  {
    id: "cells",
    name: "Electrochemistry Cylindrical/Prismatic Cells",
    purpose: "Basic energy storage modules executing electrochemical transitions.",
    material: "Active cathode oxides coated on copper and aluminium foils.",
    specs: "Energy-dense cell clusters, individual cellular fire sleeves.",
    color: "#8B5CF6"
  },
  {
    id: "cooling",
    name: "Liquid Cold Plates",
    purpose: "Maintains optimal core temperature under aggressive loading/charging.",
    material: "Aluminium alloy micro-channels containing water-glycol coolant.",
    specs: "Uniform heat dissipation, thermal gradient < 3°C across cell modules.",
    color: "#06B6D4"
  },
  {
    id: "busbars",
    name: "High-Current Copper Busbars",
    purpose: "Connects cell groups in series and parallel to build pack voltage.",
    material: "Laser-welded pure Copper (Cu-OF) or Aluminium sheets.",
    specs: "Low contact resistance (< 10 µΩ), laminated insulation coatings.",
    color: "#F59E0B"
  },
  {
    id: "bms",
    name: "Central Battery Management System (BMS)",
    purpose: "State-of-charge calculation, cell balancing, safety disconnect control.",
    material: "Multi-layered PCB with redundant microcontrollers and CAN transceivers.",
    specs: "Real-time ISO 26262 compliance, active balancing up to 500mA.",
    color: "#10B981"
  },
  {
    id: "fuse",
    name: "High Voltage Pyro-Fuse",
    purpose: "Instantaneous physical disconnect during short circuits or crash signals.",
    material: "Pyrotechnic-actuated copper fuse element.",
    specs: "Trigger response < 1ms, short circuit breaking up to 30kA at 800V.",
    color: "#EF4444"
  },
  {
    id: "sensors",
    name: "Fiber-Optic & Thermistor Sensors",
    purpose: "Provides real-time pack voltage, current, and module temperature monitoring.",
    material: "Glass-fiber fiber Bragg grating arrays or NTC thermistors.",
    specs: "Accuracy ±0.5°C, isolated current sensing up to ±1500A.",
    color: "#EC4899"
  },
  {
    id: "cables",
    name: "Shielded High-Voltage Orange Cables",
    purpose: "Conveys pack traction power to vehicle inverter unit.",
    material: "Multi-strand copper conductor with EMI shielding braided sleeve.",
    specs: "Rated up to 1000V / 400A continuous, halogen-free insulation.",
    color: "#FB923C"
  }
];

// ==========================================
// CORE SIMULATOR MAIN EXPORT
// ==========================================

export function DigitalTwinSimulator() {
  // Inputs configuration states
  const [chemistry, setChemistry] = useState<ChemistryType>("nmc");
  const [capacity, setCapacity] = useState<number>(85);
  const [cells, setCells] = useState<number>(4800);
  const [cooling, setCooling] = useState<CoolingType>("liquid");
  const [charging, setCharging] = useState<number>(150);
  const [climate, setClimate] = useState<ClimateType>("moderate");
  const [vehicle, setVehicle] = useState<VehicleType>("car");

  // Interactive 3D options
  const [rotateX, setRotateX] = useState<number>(-15);
  const [rotateY, setRotateY] = useState<number>(35);
  const [explodeView, setExplodeView] = useState<boolean>(false);
  const [crossSection, setCrossSection] = useState<boolean>(false);
  const [thermalView, setThermalView] = useState<boolean>(false);
  const [hoveredComponent, setHoveredComponent] = useState<ComponentTwinDetail | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentTwinDetail>(TWIN_COMPONENTS[1]!);

  // Degradation Slider (Years)
  const [degradYears, setDegradYears] = useState<number>(0);

  // Simulation Running State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simSOC, setSimSOC] = useState<number>(20);
  const [simTemp, setSimTemp] = useState<number>(25);

  // Saved Twins Comparison Array
  const [savedTwins, setSavedTwins] = useState<SavedTwin[]>([]);
  const [comparePanel, setComparePanel] = useState<boolean>(false);

  // Local config list logs
  const [twinLogs, setTwinLogs] = useState<string[]>([
    "Digital Twin simulator platform initialised.",
    "Target system loaded: 400V standard EV topology."
  ]);

  const addTwinLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setTwinLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 8)]);
  };

  // Math equations and Physics model computations
  const calculations = useMemo(() => {
    // 1. Chemistry Baseline specs
    let cellNominalVolt = 3.7;
    let energyDensityRaw = 240; // Wh/kg
    let baseCostKwh = 110; // USD/kWh
    let safetyIndex = 70;
    let cycleLimit = 1500;
    let irPerCell = 1.2; // mOhms

    if (chemistry === "lfp") {
      cellNominalVolt = 3.2;
      energyDensityRaw = 160;
      baseCostKwh = 80;
      safetyIndex = 95;
      cycleLimit = 3500;
      irPerCell = 1.8;
    } else if (chemistry === "nca") {
      cellNominalVolt = 3.6;
      energyDensityRaw = 265;
      baseCostKwh = 125;
      safetyIndex = 62;
      cycleLimit = 1200;
      irPerCell = 1.0;
    } else if (chemistry === "solid-state") {
      cellNominalVolt = 3.8;
      energyDensityRaw = 380;
      baseCostKwh = 240;
      safetyIndex = 98;
      cycleLimit = 5000;
      irPerCell = 0.6;
    } else if (chemistry === "sodium-ion") {
      cellNominalVolt = 3.0;
      energyDensityRaw = 135;
      baseCostKwh = 45;
      safetyIndex = 90;
      cycleLimit = 2200;
      irPerCell = 2.5;
    }

    // 2. Series & Parallel computations based on vehicle voltage targets
    let targetVoltage = 400;
    if (vehicle === "scooter") targetVoltage = 48;
    if (vehicle === "motorcycle") targetVoltage = 110;
    if (vehicle === "bus" || vehicle === "truck") targetVoltage = 750;

    const seriesCells = Math.round(targetVoltage / cellNominalVolt);
    const parallelCells = Math.max(1, Math.round(cells / seriesCells));
    const finalCellsCount = seriesCells * parallelCells;

    const actualVoltage = parseFloat((seriesCells * cellNominalVolt).toFixed(1));

    // 3. System Pack Weight (with structural, thermal plates & casing factors)
    let overheadFactor = 1.15; // Air cooling
    if (cooling === "liquid") overheadFactor = 1.28;
    if (cooling === "pcm") overheadFactor = 1.22;

    const cellsWeight = (capacity * 1000) / energyDensityRaw;
    const totalWeight = Math.round(cellsWeight * overheadFactor);
    const systemEnergyDensity = Math.round((capacity * 1000) / totalWeight);

    // 4. Pack manufacturing cost (cooling loops, BMS redundancy, casings premiums)
    let coolingPremium = 1.0;
    if (cooling === "liquid") coolingPremium = 1.15;
    if (cooling === "pcm") coolingPremium = 1.22;

    const totalCost = Math.round(capacity * baseCostKwh * coolingPremium * 1.08);

    // 5. Vehicle Range Estimation
    let vehicleEfficiency = 0.28; // kWh per mile for standard car
    if (vehicle === "scooter") vehicleEfficiency = 0.05;
    if (vehicle === "motorcycle") vehicleEfficiency = 0.12;
    if (vehicle === "suv") vehicleEfficiency = 0.36;
    if (vehicle === "bus") vehicleEfficiency = 1.85;
    if (vehicle === "truck") vehicleEfficiency = 2.30;

    let climateFactor = 1.0;
    if (climate === "cold") {
      // Cold penalizes LFP heavily, solid state less
      climateFactor = chemistry === "lfp" ? 0.62 : chemistry === "solid-state" ? 0.88 : 0.72;
    } else if (climate === "hot") {
      climateFactor = 0.90; // AC thermal load drag
    }

    const estimatedRange = Math.round((capacity * climateFactor) / vehicleEfficiency);

    // 6. Charging curves durations
    const actualChargePower = Math.min(charging, chemistry === "lfp" ? 180 : chemistry === "solid-state" ? 400 : 250);
    const chargeTimeMinutes = Math.round((capacity / actualChargePower) * 60 * 1.18); // adding CC/CV transition penalty

    // 7. Power ratings (Continuous & Peak)
    const baseCurrentLimit = parallelCells * 25; // 25A discharge limit per parallel branch
    const maxCurrent = Math.round(baseCurrentLimit * (cooling === "liquid" ? 1.25 : cooling === "pcm" ? 1.15 : 0.85));
    const continuousPower = Math.round((actualVoltage * maxCurrent * 0.7) / 1000);
    const peakPower = Math.round((actualVoltage * maxCurrent) / 1000);
    const powerDensity = Math.round((peakPower * 1000) / totalWeight);

    // 8. Internal Resistance
    const internalResistance = parseFloat(((seriesCells * irPerCell) / parallelCells).toFixed(2));

    // 9. Overall Engineering Rating
    // Combines Cost, SOH longevity, thermal coefficient, safety, range.
    let rating = 70;
    rating += safetyIndex * 0.1;
    rating += (actualChargePower / 10) * 0.2;
    rating -= (totalWeight / 500);
    rating -= (totalCost / 5000);
    if (cooling === "liquid") rating += 8;
    if (chemistry === "solid-state") rating += 12;
    const engineeringScore = Math.min(100, Math.max(30, Math.round(rating)));

    // 10. Volume
    const batteryVolume = Math.round((capacity * 1000) / (energyDensityRaw * 0.35));

    // 11. CO2 Savings (compared to typical gas car over 100,000 miles)
    const co2Saved = parseFloat(((estimatedRange * 0.00041) * 10).toFixed(1)); // tons over 10y

    return {
      voltage: actualVoltage,
      configuration: `${seriesCells}S ${parallelCells}P`,
      weight: totalWeight,
      cost: totalCost,
      range: estimatedRange,
      chargeTime: chargeTimeMinutes,
      density: systemEnergyDensity,
      powerDensity,
      peakPower,
      continuousPower,
      maxCurrent,
      internalResistance,
      engineeringScore,
      volume: batteryVolume,
      co2Saved,
      cycleLife: cycleLimit
    };
  }, [chemistry, capacity, cells, cooling, charging, climate, vehicle]);

  // Degradation Predictions mapping over timeline slider
  const degradationProjection = useMemo(() => {
    let capacityRetention = 100;
    let baseFadingFactor = 0.012; // NMC base

    if (chemistry === "lfp") baseFadingFactor = 0.005;
    if (chemistry === "solid-state") baseFadingFactor = 0.007;
    if (chemistry === "nca") baseFadingFactor = 0.018;
    if (chemistry === "sodium-ion") baseFadingFactor = 0.010;

    // Environmental penalties
    if (climate === "hot") baseFadingFactor *= 1.35;
    if (climate === "cold") baseFadingFactor *= 1.10;
    if (cooling === "air") baseFadingFactor *= 1.40;

    // Calculate over selected timeline years
    capacityRetention = Math.max(
      45,
      100 * Math.exp(-baseFadingFactor * degradYears * (1 + (charging / 100) * 0.12))
    );

    const projectedRange = Math.round(calculations.range * (capacityRetention / 100));
    const projectedHealth = Math.round(capacityRetention);
    const efficiencyDrop = Math.max(0, Math.round((100 - capacityRetention) * 0.25));

    let replacementAdvice = "No Action Required";
    if (projectedHealth < 70) {
      replacementAdvice = "REPLACEMENT RECOMMENDED";
    } else if (projectedHealth < 80) {
      replacementAdvice = "SCHEDULE DETAILED SERVICE DIAGNOSTICS";
    }

    return {
      health: projectedHealth,
      range: projectedRange,
      efficiencyLoss: efficiencyDrop,
      replacement: replacementAdvice
    };
  }, [chemistry, climate, cooling, charging, degradYears, calculations.range]);

  // AI Design Advisor Logic
  const aiEvaluation = useMemo(() => {
    let safetyRating = "Moderate";
    let safetyGlow = "text-orange-400";
    let confidence = 82;
    let advantages: string[] = [];
    let weaknesses: string[] = [];
    let upgradeSuggest = "";

    if (chemistry === "lfp") {
      safetyRating = "Excellent";
      safetyGlow = "text-[#10B981]";
      advantages = ["Virtually non-flammable structure", "Extremely resilient cell lifecycle"];
      weaknesses = ["Poor energy integration for high-speed SUV profiles", "Severe capacity fading in sub-zero climates"];
      upgradeSuggest = "Install auxiliary cell heating blankets to resolve LFP low-temperature range constraints.";
    } else if (chemistry === "solid-state") {
      safetyRating = "Excellent (Solid Electrolyte)";
      safetyGlow = "text-[#10B981]";
      confidence = 94;
      advantages = ["Extreme energy storage density", "Supports ultra-high DC charging speeds without dendrites"];
      weaknesses = ["High manufacturing capital expenditure", "Early-stage commercial supply chain dependencies"];
      upgradeSuggest = "Transition from copper busbars to micro-laser welded multi-plate connectors to optimize solid state power distribution.";
    } else if (chemistry === "nmc") {
      safetyRating = "Moderate";
      safetyGlow = "text-orange-400";
      advantages = ["Superb balance of density and range", "Excellent cold weather cell ionic mobility"];
      weaknesses = ["Requires active liquid thermal management loops to mitigate thermal runaway", "Relies heavily on volatile Cobalt pricing"];
      upgradeSuggest = "Specify high-nickel cathode ratio (e.g. NMC 811) to reduce cobalt dependency and boost density by 15%.";
    } else {
      safetyRating = "Good";
      safetyGlow = "text-[#10B981]";
      advantages = ["Extremely cost competitive raw materials", "Great thermal stability margin"];
      weaknesses = ["Very heavy packaging profile", "Lower nominal cell voltage demands high series module count"];
      upgradeSuggest = "Integrate cell-to-pack (CTP) structural configurations to eliminate heavy module framing.";
    }

    // Cooling warnings
    if (cooling === "air" && charging >= 150) {
      weaknesses.push("Air cooling causes severe thermal throttling at fast-charging outputs > 50kW.");
      upgradeSuggest = "Mandatory upgrade to Liquid Cold Plates to allow continuous high-current fast charging.";
    }

    return {
      safetyRating,
      safetyGlow,
      confidence,
      advantages,
      weaknesses,
      upgradeSuggest
    };
  }, [chemistry, cooling, charging]);

  // Interactive Live simulation handler
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChargingLoop = () => {
    if (isSimulating) {
      setIsSimulating(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      addTwinLog("Simulation paused.");
      return;
    }

    setIsSimulating(true);
    addTwinLog(`Initiating active load charging loop simulation on Digital Twin...`);
    setSimSOC(0);
    setSimTemp(25);

    intervalRef.current = setInterval(() => {
      setSimSOC((prev) => {
        if (prev >= 100) {
          setIsSimulating(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          addTwinLog("Live simulation complete. All metrics nominal.");
          return 100;
        }
        return prev + 1;
      });

      setSimTemp((prev) => {
        // Temperature rises based on cooling efficiency
        const rateFactor = cooling === "liquid" ? 0.05 : cooling === "pcm" ? 0.09 : 0.22;
        const targetTemp = 25 + (charging / 10) * rateFactor;
        if (prev < targetTemp) {
          return parseFloat((prev + 0.5).toFixed(1));
        }
        return prev;
      });
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Save current twin configuration
  const saveActiveTwin = () => {
    if (savedTwins.length >= 3) {
      addTwinLog("Saved limit reached (Max 3 Twins). Delete an old project first.");
      return;
    }
    const newTwin: SavedTwin = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Battery Twin ${String.fromCharCode(65 + savedTwins.length)} (${chemistry.toUpperCase()})`,
      chemistry,
      capacity,
      cells,
      cooling,
      charging,
      climate,
      vehicle,
      stats: {
        voltage: calculations.voltage,
        weight: calculations.weight,
        cost: calculations.cost,
        range: calculations.range,
        density: calculations.density,
        engineeringScore: calculations.engineeringScore
      }
    };

    setSavedTwins([...savedTwins, newTwin]);
    addTwinLog(`Saved project twin: ${newTwin.name}`);
  };

  const deleteSavedTwin = (id: string) => {
    setSavedTwins(savedTwins.filter((t) => t.id !== id));
    addTwinLog("Removed battery twin project from comparison matrix.");
  };

  // Diagnostic export report JSON
  const triggerExport = () => {
    const reportData = {
      project: "Nexiora Battery Digital Twin™ Report",
      timestamp: new Date().toISOString(),
      configuration: {
        chemistry,
        capacityKwh: capacity,
        cells,
        coolingMethod: cooling,
        maxChargingPower: charging,
        climateProfile: climate,
        targetVehicle: vehicle,
        cellSizingRatio: calculations.configuration
      },
      engineeringMetrics: {
        nominalVoltage: `${calculations.voltage} V`,
        totalWeight: `${calculations.weight} kg`,
        manufacturingCost: `${calculations.cost} USD`,
        estimatedRange: `${calculations.range} miles`,
        energyDensity: `${calculations.density} Wh/kg`,
        peakPowerCapability: `${calculations.peakPower} kW`,
        internalResistance: `${calculations.internalResistance} mOhms`,
        score: `${calculations.engineeringScore}/100`
      },
      timelineDegradation: {
        currentAge: `${degradYears} Years`,
        projectedSOH: `${degradationProjection.health}%`,
        efficiencyLoss: `${degradationProjection.efficiencyLoss}%`,
        advice: degradationProjection.replacement
      }
    };

    const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(reportData, null, 2))}`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", `nexiora_battery_digital_twin_${chemistry}_${capacity}kwh.json`);
    document.body.appendChild(linkElement);
    linkElement.click();
    linkElement.remove();
    addTwinLog("Digital Twin report exported.");
  };

  return (
    <div className="space-y-6 w-full relative z-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/25">
              Nexiora Engine v4.2
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mt-1.5 bg-linear-to-r from-white via-purple-300 to-white bg-clip-text text-transparent">
            Nexiora Battery Digital Twin™
          </h1>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Build, model, and analyze customized cell groupings, thermal heat dynamics, and degradation longevity.
          </p>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={saveActiveTwin}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-[#C084FC]/30 bg-[#C084FC]/10 text-purple-300 hover:bg-[#C084FC]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(192,132,252,0.1)]"
          >
            <Plus className="w-4 h-4" /> Save Twin
          </button>

          <button
            onClick={() => setComparePanel(!comparePanel)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              comparePanel
                ? "bg-purple-500 border-purple-500 text-white"
                : "border-white/10 bg-white/2 text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <Activity className="w-4 h-4" /> Comparison Matrix ({savedTwins.length})
          </button>

          <button
            onClick={triggerExport}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-[#07090e] text-muted-foreground hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* THREE-PANEL GRAPHIC LAYOUT */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT PANEL: CONFIGURATION */}
        <div className="lg:col-span-3 rounded-[24px] border border-white/5 bg-[#131722]/60 backdrop-blur-xl p-5 space-y-6 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none" />
          
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-extrabold text-white uppercase tracking-wider">Pack Configuration</span>
            </div>

            {/* Chemistry Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Cell Chemistry</label>
              <select
                value={chemistry}
                onChange={(e) => {
                  setChemistry(e.target.value as ChemistryType);
                  addTwinLog(`Chemistry changed to: ${e.target.value.toUpperCase()}`);
                }}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
              >
                <option value="nmc">NMC (Nickel Manganese Cobalt)</option>
                <option value="lfp">LFP (Lithium Iron Phosphate)</option>
                <option value="nca">NCA (Nickel Cobalt Aluminum)</option>
                <option value="solid-state">All-Solid-State (Next-Gen)</option>
                <option value="sodium-ion">Sodium-Ion (Abundant / Low Cost)</option>
              </select>
            </div>

            {/* Capacity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider">
                <span>Energy Capacity</span>
                <span className="text-white font-extrabold">{capacity} kWh</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={capacity}
                onChange={(e) => {
                  setCapacity(parseInt(e.target.value));
                  addTwinLog(`Adjusted capacity target to: ${e.target.value} kWh`);
                }}
                className="w-full accent-purple-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-muted-foreground/30 font-semibold">
                <span>20 kWh</span>
                <span>150 kWh</span>
              </div>
            </div>

            {/* Target Vehicle Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Vehicle Architecture</label>
              <select
                value={vehicle}
                onChange={(e) => {
                  setVehicle(e.target.value as VehicleType);
                  addTwinLog(`Vehicle profile targeted: ${e.target.value.toUpperCase()}`);
                }}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
              >
                <option value="scooter">Electric Scooter (Low Voltage)</option>
                <option value="motorcycle">Electric Motorcycle</option>
                <option value="car">Electric Passenger Sedan</option>
                <option value="suv">Premium SUV (High Load)</option>
                <option value="bus">Urban Transit Bus (Heavy Duty)</option>
                <option value="truck">Class 8 Cargo Truck</option>
              </select>
            </div>

            {/* Total Cell Count numeric input */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted-foreground/40 font-bold uppercase block">Cell Assembly Target (Input)</label>
              <input
                type="number"
                value={cells}
                min={200}
                max={15000}
                step={100}
                onChange={(e) => {
                  const val = Math.max(200, Math.min(15000, parseInt(e.target.value) || 200));
                  setCells(val);
                }}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            {/* Cooling Method */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Cooling Architecture</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "air", label: "Air Cool", icon: Wind },
                  { id: "liquid", label: "Liquid Plate", icon: Droplets },
                  { id: "pcm", label: "PCM Wax", icon: Layers }
                ].map((c) => {
                  const Icon = c.icon;
                  const active = cooling === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCooling(c.id as CoolingType);
                        addTwinLog(`Cooling configuration: ${c.label}`);
                      }}
                      className={`py-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        active
                          ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                          : "bg-white/2 border-white/5 text-muted-foreground/65 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[8px] font-bold uppercase tracking-wider">{c.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Climate & Ambient */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Climate Chamber Ambient</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "cold", label: "Cold (-10°C)" },
                  { id: "moderate", label: "Nominal (25°)" },
                  { id: "hot", label: "Arid Heat (40°)" }
                ].map((cl) => {
                  const active = climate === cl.id;
                  return (
                    <button
                      key={cl.id}
                      onClick={() => {
                        setClimate(cl.id as ClimateType);
                        addTwinLog(`Chamber temperature set: ${cl.label}`);
                      }}
                      className={`py-1.5 rounded-lg border text-[9px] font-extrabold cursor-pointer transition-colors ${
                        active
                          ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                          : "bg-white/2 border-white/5 text-muted-foreground/65 hover:text-white"
                      }`}
                    >
                      {cl.label.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Charging Target Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted-foreground/40 font-bold uppercase block">Max Grid Power (Charging)</label>
              <select
                value={charging}
                onChange={(e) => {
                  setCharging(parseInt(e.target.value));
                  addTwinLog(`Configured Grid power capacity to ${e.target.value}kW.`);
                }}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
              >
                <option value={3}>Slow AC (3 kW)</option>
                <option value={7}>Standard AC (7 kW)</option>
                <option value={11}>Commercial AC (11 kW)</option>
                <option value={22}>Fast AC (22 kW)</option>
                <option value={50}>DC Fast Charger (50 kW)</option>
                <option value={150}>DC High Power (150 kW)</option>
                <option value={350}>HPC Ultra-Charger (350 kW)</option>
              </select>
            </div>
          </div>

          <div className="mt-5 border-t border-white/5 pt-4">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Series/Parallel Structuring</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-white/50">Grouping:</span>
              <span className="text-xs font-black text-purple-300 uppercase tracking-widest">{calculations.configuration}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-white/50">Cell Count:</span>
              <span className="text-xs font-extrabold text-white">{cells} Cells</span>
            </div>
          </div>
        </div>

        {/* CENTER PANEL: 3D DIGITAL TWIN DISPLAY */}
        <div className="lg:col-span-6 rounded-[24px] border border-white/5 bg-[#131722]/50 backdrop-blur-xl p-5 flex flex-col justify-between shadow-2xl relative min-h-[480px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.04),transparent_70%)] pointer-events-none" />

          {/* View Modes Top Bar */}
          <div className="flex justify-between items-center z-10 pb-3 border-b border-white/5">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setExplodeView(!explodeView);
                  addTwinLog(explodeView ? "Pack casing assembly closed." : "Exploded view structural layers triggered.");
                }}
                className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                  explodeView
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                    : "bg-white/3 border-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                Exploded View
              </button>

              <button
                onClick={() => {
                  setCrossSection(!crossSection);
                  addTwinLog(crossSection ? "Cross section disabled." : "Revealed internal module cross section.");
                }}
                className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                  crossSection
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                    : "bg-white/3 border-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                Cross Section
              </button>

              <button
                onClick={() => {
                  setThermalView(!thermalView);
                  addTwinLog(thermalView ? "Thermal imaging disabled." : "Thermal heat map visualization enabled.");
                }}
                className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                  thermalView
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                    : "bg-white/3 border-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                Thermal Heat Map
              </button>
            </div>

            {/* Rotation controllers */}
            <div className="flex gap-1 items-center bg-white/2 rounded-lg border border-white/5 p-0.5 text-[9px] text-muted-foreground">
              <button
                onClick={() => setRotateY((y) => (y - 15) % 360)}
                className="px-1.5 py-0.5 hover:text-white font-bold"
              >
                ◀
              </button>
              <span className="font-bold tracking-widest px-1">ROTATION</span>
              <button
                onClick={() => setRotateY((y) => (y + 15) % 360)}
                className="px-1.5 py-0.5 hover:text-white font-bold"
              >
                ▶
              </button>
            </div>
          </div>

          {/* SVG Battery Pack 3D Representation */}
          <div className="flex-1 flex items-center justify-center py-6 relative">
            {/* Live simulation overlays */}
            {isSimulating && (
              <div className="absolute top-2 left-2 p-2.5 rounded-xl border border-green-500/20 bg-green-500/10 flex items-center gap-2 text-xs font-bold text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                SIM RUNNING: SOC {simSOC}% | TEMP {simTemp}°C
              </div>
            )}

            <svg
              viewBox="-160 -120 320 240"
              className="w-full max-w-[340px] aspect-square transition-transform duration-500 cursor-pointer"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
              }}
            >
              {/* Dynamic Gradients Definitions */}
              <defs>
                <linearGradient id="casingGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="copperBusGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                {/* Thermal gradient */}
                <radialGradient id="heatGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#F97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                {/* Cross section filler */}
                <pattern id="jellyRoll" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2.5" fill="none" stroke="#EC4899" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* LAYER 1: LOWER COOLING PLATES (Bottom layer) */}
              <motion.g
                animate={{ y: explodeView ? 70 : 0 }}
                onClick={() => setSelectedComponent(TWIN_COMPONENTS[2]!)}
                opacity={selectedComponent.id === "cooling" ? 1 : 0.8}
              >
                {/* Cooling Plate Base */}
                <polygon
                  points="-110,60 0,110 110,60 0,10"
                  fill={thermalView ? "rgba(6,182,212,0.3)" : "#0F172A"}
                  stroke="#06B6D4"
                  strokeWidth={selectedComponent.id === "cooling" ? 2.5 : 1}
                  className="transition-colors"
                />
                
                {/* Coolant pipe flow lines */}
                {thermalView && (
                  <path
                    d="M -100,55 Q 0,100 100,55 M -80,45 Q 0,90 80,45 M -60,35 Q 0,80 60,35"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                )}
              </motion.g>

              {/* LAYER 2: ACTIVE BATTERY CELL BLOCKS (Middle Layer) */}
              <motion.g
                animate={{ y: explodeView ? 25 : 0 }}
                onClick={() => setSelectedComponent(TWIN_COMPONENTS[1]!)}
                opacity={selectedComponent.id === "cells" ? 1 : 0.85}
              >
                {/* Prismatic Module 1 */}
                <polygon
                  points="-90,40 -20,70 10,55 -60,25"
                  fill="#5B21B6"
                  stroke="#8B5CF6"
                  strokeWidth={selectedComponent.id === "cells" ? 2 : 0.8}
                />
                
                {/* Prismatic Module 2 */}
                <polygon
                  points="-10,40 60,70 90,55 20,25"
                  fill="#5B21B6"
                  stroke="#8B5CF6"
                  strokeWidth={selectedComponent.id === "cells" ? 2 : 0.8}
                />

                {/* Cross section cell layers detail */}
                {crossSection && (
                  <g>
                    <polygon points="-75,43 -35,63 -25,58 -65,38" fill="url(#jellyRoll)" stroke="#EC4899" strokeWidth="0.5" />
                    <polygon points="5,43 45,63 55,58 15,38" fill="url(#jellyRoll)" stroke="#EC4899" strokeWidth="0.5" />
                  </g>
                )}

                {/* Heat map hotspot overlays */}
                {thermalView && (
                  <g>
                    {/* Hotspot near middle junction */}
                    <circle cx="-5" cy="55" r="28" fill="url(#heatGlow)" pointerEvents="none" />
                    <circle cx="65" cy="48" r="20" fill="url(#heatGlow)" pointerEvents="none" />
                  </g>
                )}
              </motion.g>

              {/* LAYER 3: COPPER BUSBARS AND SENSORS (Overlaying Cells) */}
              <motion.g
                animate={{ y: explodeView ? -10 : 0 }}
                onClick={() => setSelectedComponent(TWIN_COMPONENTS[3]!)}
                opacity={selectedComponent.id === "busbars" ? 1 : 0.8}
              >
                {/* Series Connection bars */}
                <polygon points="-80,36 -25,61 -15,56 -70,31" fill="url(#copperBusGrad)" stroke="#D97706" />
                <polygon points="-50,22 5,47 15,42 -40,17" fill="url(#copperBusGrad)" stroke="#D97706" />
                <polygon points="0,36 55,61 65,56 10,31" fill="url(#copperBusGrad)" stroke="#D97706" />

                {/* Thermal Sensor Probe Wire */}
                <path
                  d="M -70,31 Q -20,10 40,42"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent(TWIN_COMPONENTS[6]!);
                  }}
                />
              </motion.g>

              {/* LAYER 4: CENTRAL BMS MODULE AND pyro-fuse (Upper Layer) */}
              <motion.g
                animate={{ y: explodeView ? -45 : 0 }}
                onClick={() => setSelectedComponent(TWIN_COMPONENTS[4]!)}
                opacity={selectedComponent.id === "bms" ? 1 : 0.9}
              >
                {/* central board */}
                <polygon
                  points="-40,15 40,55 70,40 -10,0"
                  fill="#065F46"
                  stroke="#10B981"
                  strokeWidth={selectedComponent.id === "bms" ? 2.5 : 1}
                />
                
                {/* PCB internal traces */}
                <path d="M -20,13 L 20,33 M -10,7 L 30,27" fill="none" stroke="#6EE7B7" strokeWidth="0.8" opacity="0.6" />

                {/* Pyro-fuse block */}
                <polygon
                  points="20,38 35,45 42,42 27,35"
                  fill="#991B1B"
                  stroke="#EF4444"
                  strokeWidth="1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent(TWIN_COMPONENTS[5]!);
                  }}
                />

                {/* HV cables routing out */}
                <path
                  d="M -10,0 Q -60,-40 -120,-20"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="3.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent(TWIN_COMPONENTS[7]!);
                  }}
                />
              </motion.g>

              {/* LAYER 5: PACK UPPER CASING (Lid) */}
              <motion.polygon
                points="-115,55 -5,105 105,55 -5,5"
                fill="rgba(30,41,59,0.15)"
                stroke="#6B7280"
                strokeWidth={selectedComponent.id === "casing" ? 2 : 1}
                strokeDasharray="4 4"
                animate={{ y: explodeView ? -85 : 0 }}
                onClick={() => setSelectedComponent(TWIN_COMPONENTS[0]!)}
                opacity={explodeView ? 0.3 : 0.85}
              />
            </svg>
          </div>

          {/* Component Specifications Overlap HUD */}
          <div className="p-3.5 rounded-xl border border-white/5 bg-[#131722]/80 backdrop-blur-md z-10 space-y-2">
            <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedComponent.color }} />
              <span className="text-xs font-black text-white">{selectedComponent.name}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/85 leading-relaxed">{selectedComponent.purpose}</p>
            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
              <div>
                <span className="text-muted-foreground/40 uppercase tracking-wider block">Material Composition</span>
                <span className="font-bold text-white block truncate">{selectedComponent.material}</span>
              </div>
              <div>
                <span className="text-muted-foreground/40 uppercase tracking-wider block">BMS Specifications</span>
                <span className="font-bold text-purple-300 block truncate">{selectedComponent.specs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LIVE ENGINEERING ANALYTICS */}
        <div className="lg:col-span-3 rounded-[24px] border border-white/5 bg-[#131722]/60 backdrop-blur-xl p-5 space-y-6 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-extrabold text-white uppercase tracking-wider">Live Diagnostics HUD</span>
            </div>

            {/* Overall Score Dial */}
            <div className="flex items-center justify-between bg-white/2 p-3 rounded-xl border border-white/5">
              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Engineering Score</span>
                <span className="text-xl font-black text-white">{calculations.engineeringScore} <span className="text-xs font-normal text-muted-foreground/65">/100</span></span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 flex items-center justify-center font-black text-xs text-purple-300 bg-purple-500/10">
                {calculations.engineeringScore >= 80 ? "A+" : calculations.engineeringScore >= 65 ? "B" : "C-"}
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Range Projection</span>
                  <span className="text-sm font-extrabold text-[#10B981]">{calculations.range} mi</span>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Charge Duration</span>
                  <span className="text-sm font-extrabold text-white">{calculations.chargeTime} min</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Pack Weight</span>
                  <span className="text-sm font-extrabold text-white">{calculations.weight} kg</span>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Total Build Cost</span>
                  <span className="text-sm font-extrabold text-[#10B981]">${calculations.cost.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Energy Density</span>
                  <span className="text-xs font-bold text-white">{calculations.density} Wh/kg</span>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Power Density</span>
                  <span className="text-xs font-bold text-white">{calculations.powerDensity} W/kg</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Nominal Voltage</span>
                  <span className="text-xs font-bold text-white">{calculations.voltage} V</span>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Max Safe Current</span>
                  <span className="text-xs font-bold text-white">{calculations.maxCurrent} A</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Internal Resistance</span>
                  <span className="text-xs font-bold text-white">{calculations.internalResistance} mΩ</span>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">CO₂ Savings (10Y)</span>
                  <span className="text-xs font-bold text-white">{calculations.co2Saved} Tons</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <button
              onClick={startChargingLoop}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                isSimulating
                  ? "bg-red-500/20 border-red-500/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                  : "bg-purple-500 border-purple-500 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              }`}
            >
              <Zap className="w-4 h-4" />
              {isSimulating ? "Pause Simulator Run" : "Start Simulator Loop"}
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SIMULATION PANEL: CHARTS, COMPARISONS, TIMELINES, AI */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: REAL-TIME CHARTS & TIMELINE DEGRADATION */}
        <div className="md:col-span-8 space-y-6">
          
          {/* DEGRADATION TIMELINE SLIDER */}
          <div className="p-5 rounded-[24px] border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div>
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">15-Year Life Cycle Simulation</h4>
                <p className="text-[11px] text-muted-foreground/50 mt-0.5">Drag the slider to predict calendar aging and capacity fade over time.</p>
              </div>
              <span className="text-xs font-extrabold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded border border-[#10B981]/25">
                Advice: {degradationProjection.replacement}
              </span>
            </div>

            <div className="grid sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-4 space-y-1">
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Timeline Age</span>
                <div className="flex gap-2 items-center">
                  <span className="text-2xl font-black text-white">{degradYears}</span>
                  <span className="text-xs text-purple-400 font-bold">Years Operational</span>
                </div>
              </div>

              <div className="sm:col-span-8 space-y-2">
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={degradYears}
                  onChange={(e) => {
                    setDegradYears(parseInt(e.target.value));
                    addTwinLog(`Evaluated degradation metrics at Year ${e.target.value}.`);
                  }}
                  className="w-full accent-purple-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-muted-foreground/40 font-bold">
                  <span>Factory Fresh (Yr 0)</span>
                  <span>Mid Life (Yr 7)</span>
                  <span>End of Life (Yr 15)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Remaining Capacity</span>
                <span className="text-sm font-black text-white">{degradationProjection.health}%</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Available Range</span>
                <span className="text-sm font-black text-[#10B981]">{degradationProjection.range} mi</span>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Efficiency Loss</span>
                <span className="text-sm font-black text-red-400">+{degradationProjection.efficiencyLoss}%</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC SVG CHARTS PANEL */}
          <div className="p-5 rounded-[24px] border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
              Real-time Simulation curves
            </h4>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Chart 1: SOH Degradation Curve */}
              <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block mb-2">Predicted SOH Degradation</span>
                <div className="h-[120px] w-full flex items-center justify-center">
                  <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                    <line x1="15" y1="10" x2="15" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
                    <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
                    <line x1="15" y1="55" x2="190" y2="55" stroke="rgba(239,68,68,0.15)" strokeWidth="0.7" strokeDasharray="3 3" />
                    
                    {/* Curve generation */}
                    {(() => {
                      const points = Array.from({ length: 16 }, (_, yr) => {
                        let decay = chemistry === "lfp" ? 0.005 : chemistry === "solid-state" ? 0.007 : 0.015;
                        if (cooling === "air") decay *= 1.35;
                        const value = 100 * Math.exp(-decay * yr);
                        const x = 15 + (yr / 15) * 175;
                        const y = 10 + ((100 - value) / 60) * 75;
                        return `${x},${y}`;
                      });
                      return (
                        <path
                          d={`M ${points.join(" L ")}`}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="1.5"
                        />
                      );
                    })()}
                    
                    {/* Active Tracker Dot */}
                    {(() => {
                      let decay = chemistry === "lfp" ? 0.005 : chemistry === "solid-state" ? 0.007 : 0.015;
                      if (cooling === "air") decay *= 1.35;
                      const activeValue = 100 * Math.exp(-decay * degradYears);
                      const x = 15 + (degradYears / 15) * 175;
                      const y = 10 + ((100 - activeValue) / 60) * 75;
                      return <circle cx={x} cy={y} r="3" fill="#C084FC" stroke="white" strokeWidth="0.8" />;
                    })()}

                    <text x="15" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">Yr 0</text>
                    <text x="190" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">Yr 15</text>
                  </svg>
                </div>
              </div>

              {/* Chart 2: Fast Charging Throttling Curve */}
              <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider block mb-2">SOC Charging Power Throttling</span>
                <div className="h-[120px] w-full flex items-center justify-center">
                  <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                    <line x1="15" y1="10" x2="15" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
                    <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />

                    {/* Throttling line based on cooling & power */}
                    {(() => {
                      const points = Array.from({ length: 11 }, (_, i) => {
                        const s = i * 10;
                        const x = 15 + (s / 100) * 175;
                        let powerFactor = 1.0;
                        if (s > 80) powerFactor = Math.max(0.1, (100 - s) / 20);
                        if (cooling === "air" && s > 40) {
                          // Air cooling throttles earlier due to heat
                          powerFactor = Math.max(0.2, 1.0 - (s - 40) * 0.012);
                        }
                        const y = 85 - (powerFactor * 70);
                        return `${x},${y}`;
                      });
                      return (
                        <path
                          d={`M ${points.join(" L ")}`}
                          fill="none"
                          stroke="#C084FC"
                          strokeWidth="1.5"
                        />
                      );
                    })()}

                    <text x="15" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">0% SOC</text>
                    <text x="190" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">100%</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI ADVISOR & COMPARISON PANEL */}
        <div className="md:col-span-4 space-y-6">
          {/* AI ENGINEERING ADVISOR */}
          <div className="p-5 rounded-[24px] border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-extrabold text-white uppercase tracking-wider">AI Engineering Advisor</span>
              </div>
              <span className="text-[10px] text-[#10B981] font-bold">
                Confidence: {aiEvaluation.confidence}%
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Thermal Runaway Hazard Rating</span>
                <span className={`text-xs font-black block mt-0.5 uppercase tracking-wide ${aiEvaluation.safetyGlow}`}>
                  {aiEvaluation.safetyRating}
                </span>
              </div>

              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Key Advantage</span>
                <p className="text-[11px] text-muted-foreground/85 leading-relaxed mt-0.5">
                  {aiEvaluation.advantages[0]}
                </p>
              </div>

              <div>
                <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Electrochemistry Limitation</span>
                <p className="text-[11px] text-muted-foreground/75 leading-relaxed mt-0.5">
                  {aiEvaluation.weaknesses[0]}
                </p>
              </div>

              <div className="p-3 bg-white/2 rounded-xl border border-white/5 space-y-1">
                <span className="text-[9px] text-[#C084FC] font-extrabold uppercase block">Suggested Upgrade</span>
                <p className="text-[10.5px] text-muted-foreground/85 leading-relaxed">
                  {aiEvaluation.upgradeSuggest}
                </p>
              </div>
            </div>
          </div>

          {/* SIMULATION CONSOLE LOGS */}
          <div className="p-4 rounded-[24px] border border-white/5 bg-[#07090e]/60 backdrop-blur-md max-h-[190px] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[9px] font-bold text-white uppercase tracking-wider">Twin Console Log Output</span>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-muted-foreground/65 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
              {twinLogs.map((log, idx) => (
                <div key={idx} className="leading-normal truncate">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* COMPARISON PANEL OVERLAY (CONDITIONAL) */}
      <AnimatePresence>
        {comparePanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl rounded-[24px] border border-white/10 bg-[#131722]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Saved Configuration Matrix</h3>
                    <span className="text-xs text-muted-foreground/60">Compare up to 3 custom battery designs side by side</span>
                  </div>
                </div>
                <button
                  onClick={() => setComparePanel(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground/50 hover:text-white transition-colors cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>

              {savedTwins.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground/40 text-sm">
                  No saved configurations to compare. Click &quot;Save Twin&quot; in the header toolbar to register setups.
                </div>
              ) : (
                <div className="grid sm:grid-cols-3 gap-4">
                  {savedTwins.map((t) => (
                    <div key={t.id} className="p-4 rounded-2xl border border-white/5 bg-white/2 space-y-4 relative">
                      <button
                        onClick={() => deleteSavedTwin(t.id)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div>
                        <h4 className="text-sm font-black text-white">{t.name}</h4>
                        <span className="text-[10px] text-purple-400 font-bold block">{t.chemistry.toUpperCase()} | {t.capacity}kWh</span>
                      </div>

                      <div className="space-y-2.5 border-t border-white/5 pt-3.5 text-xs text-muted-foreground/85">
                        <div className="flex justify-between">
                          <span>Nominal Voltage:</span>
                          <strong className="text-white">{t.stats.voltage} V</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Range:</span>
                          <strong className="text-white">{t.stats.range} mi</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Weight:</span>
                          <strong className="text-white">{t.stats.weight} kg</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Energy Density:</span>
                          <strong className="text-white">{t.stats.density} Wh/kg</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Build Cost:</span>
                          <strong className="text-[#10B981]">${t.stats.cost.toLocaleString()}</strong>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                        <span>Design Rating:</span>
                        <strong className="text-purple-300">{t.stats.engineeringScore}/100</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
