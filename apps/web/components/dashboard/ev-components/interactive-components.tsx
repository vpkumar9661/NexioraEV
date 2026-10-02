"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Zap, Info, Cpu, Layers, Activity, HelpCircle, 
  Settings, AlertTriangle, ShieldCheck, Thermometer,
  ChevronRight, RotateCw, Maximize2, Minimize2, Battery,
  Plug, Sliders, Sparkles, CheckCircle2, X, Gauge, 
  ArrowRight, Waves, Radio, Network, SplitSquareVertical,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// INTERACTIVE EV ARCHITECTURE (ADVANCED STUDIO)
// ==========================================

interface ComponentData {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  color: string;
  image: string;
  badgeLabel?: string;
  pinX: number; // percentage 0-100 on 3D view
  pinY: number; // percentage 0-100 on 3D view
  connectorPath: string; // SVG path in 1000x640 viewBox
  calloutPos: "top-left" | "top-mid-left" | "top-center" | "top-mid-right" | "mid-right" | "bottom-left" | "bottom-center" | "bottom-right";
  specs: {
    voltage?: string;
    capacity?: string;
    cellType?: string;
    configuration?: string;
    weight?: string;
    cooling?: string;
    power?: string;
    efficiency?: string;
    rpm?: string;
    ratio?: string;
  };
  overview: string;
  functionText: string;
  locationText: string;
  telemetry: { label: string; value: string; unit: string }[];
  safetyRating: string;
}

const EV_COMPONENTS: ComponentData[] = [
  {
    id: "battery",
    name: "Battery Pack",
    subtitle: "High Voltage Traction Battery",
    category: "Energy Storage",
    color: "#10B981",
    image: "/battery/battery-pack-hero.jpg",
    badgeLabel: "800V, 82 kWh",
    pinX: 52,
    pinY: 57,
    connectorPath: "M 480 540 L 480 470 L 520 365",
    calloutPos: "bottom-center",
    specs: {
      voltage: "800 V DC",
      capacity: "82 kWh",
      cellType: "Lithium-ion (NMC)",
      configuration: "Modules & Cells",
      weight: "~480 kg",
      cooling: "Liquid Cooling",
    },
    overview: "Stores electrical energy in lithium-ion cells and supplies high-voltage DC power to the inverter and other EV systems. Placed along the vehicle floorboard to lower the center of gravity.",
    functionText: "Provides high-power discharge during acceleration and absorbs regenerative braking currents through dual bi-directional high-voltage contactors.",
    locationText: "Integrated directly into the bottom skateboard chassis structural frame beneath the passenger cabin for optimal 50:50 weight distribution.",
    telemetry: [
      { label: "Pack Current Draw", value: "340", unit: "A" },
      { label: "Nominal Cell Delta", value: "6.2", unit: "mV" },
      { label: "Coolant Flow Rate", value: "12.4", unit: "L/min" },
      { label: "Calculated SoC", value: "78.4", unit: "%" },
    ],
    safetyRating: "ASIL-D / ISO 26262 / IP69K",
  },
  {
    id: "bms",
    name: "BMS",
    subtitle: "Battery Management",
    category: "Neural Controller",
    color: "#22C55E",
    image: "/battery/bms-board.jpg",
    badgeLabel: "Battery Management",
    pinX: 49,
    pinY: 41,
    connectorPath: "M 500 115 L 500 210 L 490 260",
    calloutPos: "top-center",
    specs: {
      voltage: "12V / 800V Isolated",
      capacity: "96S Telemetry",
      cellType: "ASIL-D Dual-Core",
      configuration: "Master-Slave Daisy Chain",
      weight: "2.4 kg",
      cooling: "Passive Heatsink",
    },
    overview: "Monitors cell voltages, current, and temperature balances across all module strings to safeguard cell cycle longevity and prevent thermal runaway.",
    functionText: "Performs active/passive cell balancing, State of Charge (SoC), State of Health (SoH), and State of Power (SoP) algorithmic calculations at 100 Hz.",
    locationText: "Top-mounted on the battery pack enclosure inside the high-voltage sealed penthouse compartment.",
    telemetry: [
      { label: "Sampling Rate", value: "10", unit: "ms" },
      { label: "Isolation Resistance", value: "650", unit: "kΩ/V" },
      { label: "Thermal Estimation", value: "±0.2", unit: "°C" },
      { label: "CAN-FD Bus Load", value: "42", unit: "%" },
    ],
    safetyRating: "ISO 26262 ASIL-D",
  },
  {
    id: "inverter",
    name: "Inverter",
    subtitle: "Power Electronics (Inverter)",
    category: "Power Conversion",
    color: "#F59E0B",
    image: "/chassis/inverter.jpg",
    badgeLabel: "DC → AC Conversion",
    pinX: 34,
    pinY: 48,
    connectorPath: "M 360 115 L 360 230 L 340 310",
    calloutPos: "top-mid-left",
    specs: {
      voltage: "800 V DC In",
      power: "320 kW Peak",
      cellType: "SiC MOSFETs (1200V)",
      configuration: "3-Phase Full Bridge",
      weight: "9.8 kg",
      cooling: "Direct Liquid Cold Plate",
    },
    overview: "High-efficiency silicon-carbide traction power inverter that transforms the battery pack's DC current into variable-frequency 3-phase AC for the electric motor.",
    functionText: "Regulates motor torque and rotational speed with microsecond vector control (FOC) while managing bi-directional regenerative braking energy capture.",
    locationText: "Bolted directly atop the front and rear electric drive axle assemblies to minimize high-voltage phase lead cable inductance.",
    telemetry: [
      { label: "Switching Frequency", value: "24", unit: "kHz" },
      { label: "Inverter Efficiency", value: "99.2", unit: "%" },
      { label: "Phase RMS Current", value: "480", unit: "A" },
      { label: "Junction Temperature", value: "68.4", unit: "°C" },
    ],
    safetyRating: "ASIL-D Dual Lockstep",
  },
  {
    id: "motor",
    name: "Electric Motor",
    subtitle: "Permanent Magnet Drive Unit",
    category: "Traction Propulsion",
    color: "#0EA5E9",
    image: "/chassis/motor.jpg",
    badgeLabel: "Drive the Wheels",
    pinX: 72,
    pinY: 47,
    connectorPath: "M 740 260 L 730 260 L 720 300",
    calloutPos: "mid-right",
    specs: {
      voltage: "800 V AC 3-Phase",
      power: "350 kW (475 hp)",
      cellType: "Hairpin Wound PMSM",
      rpm: "18,000 max RPM",
      weight: "58 kg",
      cooling: "Direct Stator Oil Cooling",
    },
    overview: "Converts AC magnetic flux forces into instantaneous mechanical torque with 97% grid-to-wheel efficiency, propelling the vehicle with instant throttle response.",
    functionText: "Delivers full 650 Nm peak torque from zero RPM and acts as an efficient generator during coasting and regenerative braking phases.",
    locationText: "Integrated transversely along the rear and front axles in dual-motor all-wheel-drive configuration.",
    telemetry: [
      { label: "Rotor Speed", value: "7,820", unit: "RPM" },
      { label: "Output Torque", value: "410", unit: "Nm" },
      { label: "Stator Winding Temp", value: "74.1", unit: "°C" },
      { label: "Mechanical Efficiency", value: "97.6", unit: "%" },
    ],
    safetyRating: "ISO 26262 ASIL-D",
  },
  {
    id: "charging-port",
    name: "Charging Port",
    subtitle: "High Power Fast Charging",
    category: "Grid Interface",
    color: "#06B6D4",
    image: "/chassis/charging-port.jpg",
    badgeLabel: "AC/DC Charging",
    pinX: 23,
    pinY: 44,
    connectorPath: "M 220 115 L 220 220 L 230 280",
    calloutPos: "top-left",
    specs: {
      voltage: "Up to 1000 V DC",
      power: "350 kW DC / 22 kW AC",
      cellType: "CCS2 / NACS Inlet",
      configuration: "Liquid Cooled Terminals",
      weight: "3.2 kg",
      cooling: "Conduction / Terminal Sensor",
    },
    overview: "Universal vehicle inlet port supporting high-power DC ultra-fast charging up to 350 kW and Level 2 AC charging with motorized locking latch and LED halo status.",
    functionText: "Transfers DC power directly to battery terminals via pyro-fuse protection and routes AC to the on-board charger with ISO 15118 Plug & Charge support.",
    locationText: "Located at the vehicle's rear left quarter panel with motorized flush-fitting door.",
    telemetry: [
      { label: "Charging Current", value: "320", unit: "A DC" },
      { label: "Pin Terminal Temp", value: "38.2", unit: "°C" },
      { label: "Lock Solenoid Status", value: "Engaged", unit: "" },
      { label: "Pilot Signal Duty", value: "53.4", unit: "%" },
    ],
    safetyRating: "UL 2251 / IEC 62196-3",
  },
  {
    id: "dcdc",
    name: "DC-DC Converter",
    subtitle: "Auxiliary Low Voltage Supply",
    category: "Power Conversion",
    color: "#F97316",
    image: "/battery/pyro-fuse.jpg",
    badgeLabel: "HV → 12V DC",
    pinX: 29,
    pinY: 62,
    connectorPath: "M 260 540 L 260 480 L 290 400",
    calloutPos: "bottom-left",
    specs: {
      voltage: "800V In / 13.8V Out",
      power: "3.5 kW Continuous",
      cellType: "Resonant LLC Isolated",
      configuration: "Bidirectional Ready",
      weight: "4.1 kg",
      cooling: "Chassis Conduction",
    },
    overview: "Steps down high-voltage traction battery power to low-voltage 12V/48V DC, powering headlights, infotainment, ADAS sensors, steering rack, and cabin electronics.",
    functionText: "Replaces traditional combustion alternator, constantly maintaining low-voltage lithium auxiliary battery charge under all operating conditions.",
    locationText: "Mounted near the front firewall within the front high-voltage distribution enclosure.",
    telemetry: [
      { label: "Output Voltage", value: "13.8", unit: "V" },
      { label: "Auxiliary Current", value: "85", unit: "A" },
      { label: "Conversion Efficiency", value: "95.8", unit: "%" },
      { label: "Operating Temp", value: "48.2", unit: "°C" },
    ],
    safetyRating: "AEC-Q100 / ISO 7637-2",
  },
  {
    id: "cooling",
    name: "Thermal System",
    subtitle: "Cooling & Temperature Control",
    category: "Thermal Hydraulic",
    color: "#3B82F6",
    image: "/battery/cooling-plate.jpg",
    badgeLabel: "Cooling & Temp Control",
    pinX: 65,
    pinY: 36,
    connectorPath: "M 670 115 L 670 180 L 650 230",
    calloutPos: "top-mid-right",
    specs: {
      voltage: "800V Heat Pump Compressor",
      capacity: "14 kW Heat Rejection",
      cellType: "Octovalve Hydraulic Loop",
      configuration: "Dual Glycol & Refrigerant",
      weight: "22 kg",
      cooling: "Water-Ethylene Glycol",
    },
    overview: "Integrated intelligent heat pump and glycol circulation loops that maintain battery cells, power electronics, and cabin at their optimal temperature windows.",
    functionText: "Scavenges waste heat from motors and inverters to warm the battery in freezing winter conditions, or provides 14 kW chill during 350 kW fast charging.",
    locationText: "Mounted behind the front fascia with low-temperature radiators and an 8-way multi-port distribution valve manifold.",
    telemetry: [
      { label: "Coolant Loop Pressure", value: "1.45", unit: "bar" },
      { label: "Radiator Fan Speed", value: "1,200", unit: "RPM" },
      { label: "Chiller Exchanger Temp", value: "18.5", unit: "°C" },
      { label: "Heat Pump COP", value: "3.4", unit: "COP" },
    ],
    safetyRating: "ECE R100 / IP67",
  },
  {
    id: "transmission",
    name: "Transmission",
    subtitle: "Single Speed Reducer",
    category: "Mechanical Drivetrain",
    color: "#E11D48",
    image: "/chassis/transmission.jpg",
    badgeLabel: "Single Speed Reducer",
    pinX: 78,
    pinY: 62,
    connectorPath: "M 740 540 L 740 480 L 780 400",
    calloutPos: "bottom-right",
    specs: {
      ratio: "9.05 : 1 Fixed Ratio",
      power: "Max Torque 650 Nm",
      cellType: "Helical Ground Gears",
      configuration: "Integrated Differential",
      weight: "26 kg",
      cooling: "Synthetic Splash Lubricated",
    },
    overview: "Compact single-speed helical reduction gearbox and open differential that steps down high motor RPM to wheel axle torque with zero shift lag.",
    functionText: "Eliminates complex multi-gear transmissions and clutches, providing seamless linear torque from launch up to top vehicle speed.",
    locationText: "Co-axially coupled with the electric motor casing forming an integrated 3-in-1 electric drive axle (eAxle).",
    telemetry: [
      { label: "Input Shaft RPM", value: "7,820", unit: "RPM" },
      { label: "Wheel Axle RPM", value: "864", unit: "RPM" },
      { label: "Gearbox Oil Temp", value: "62.8", unit: "°C" },
      { label: "Mechanical Transmission", value: "98.4", unit: "%" },
    ],
    safetyRating: "ISO 6336 / AGMA 2001",
  },
  // Additional components for the 14-item navigation menu:
  {
    id: "junction",
    name: "HV Junction Box",
    subtitle: "High Voltage Distribution",
    category: "Safety & Routing",
    color: "#EF4444",
    image: "/battery/pyro-fuse.jpg",
    pinX: 42,
    pinY: 42,
    connectorPath: "M 420 200 L 420 270",
    calloutPos: "top-center",
    specs: {
      voltage: "1000 V DC Max",
      capacity: "600A Rated",
      cellType: "Hermetic Contactor",
      configuration: "Pre-charge & Main +/-",
      weight: "5.5 kg",
      cooling: "Convection",
    },
    overview: "Houses main tractive contactors, pre-charge resistors, and pyrotechnic disconnects to isolate high voltage when vehicle is parked or in fault conditions.",
    functionText: "Protects inverters from inrush current during startup and severs circuits in microseconds upon crash detection.",
    locationText: "Integrated inside the battery pack forward bulkhead enclosure.",
    telemetry: [
      { label: "Contactor Coil Voltage", value: "12.2", unit: "V" },
      { label: "Precharge Time", value: "240", unit: "ms" },
      { label: "Insulation Resistance", value: "850", unit: "kΩ" },
      { label: "Contact Resistance", value: "0.22", unit: "mΩ" },
    ],
    safetyRating: "ISO 6469-3 / UL 94-V0",
  },
  {
    id: "obc",
    name: "On-board Charger",
    subtitle: "AC Grid Power Rectifier",
    category: "Charging System",
    color: "#A855F7",
    image: "/chassis/charging-port.jpg",
    pinX: 25,
    pinY: 40,
    connectorPath: "M 250 200 L 250 260",
    calloutPos: "top-left",
    specs: {
      voltage: "120V - 400V AC In",
      power: "11 kW / 22 kW AC",
      cellType: "Bidirectional V2G Ready",
      configuration: "Active PFC + LLC",
      weight: "8.2 kg",
      cooling: "Liquid Loop",
    },
    overview: "Converts household or commercial AC grid power into high-voltage DC to charge the traction battery pack, with Vehicle-to-Home (V2H) bi-directional support.",
    functionText: "Controls power factor correction (PFC > 0.99) and dynamically communicates with wallbox EVSE through Control Pilot (CP) and CAN interfaces.",
    locationText: "Mounted beneath the rear cargo floorboard directly adjacent to the charging port inlet.",
    telemetry: [
      { label: "Grid Input Voltage", value: "230", unit: "V AC" },
      { label: "Grid Current", value: "32", unit: "A" },
      { label: "Power Factor", value: "0.994", unit: "" },
      { label: "Conversion Efficiency", value: "96.4", unit: "%" },
    ],
    safetyRating: "SAE J1772 / IEC 61851",
  },
  {
    id: "thermal",
    name: "Thermal Management",
    subtitle: "Pack & Motor Conditioning",
    category: "Thermal Hydraulic",
    color: "#14B8A6",
    image: "/battery/cooling-plate.jpg",
    pinX: 58,
    pinY: 53,
    connectorPath: "M 580 300 L 580 340",
    calloutPos: "top-mid-right",
    specs: {
      capacity: "14 kW Heat Rejection",
      cooling: "Water-Glycol Loop",
      weight: "18 kg",
      configuration: "Dual Circuit Chiller",
    },
    overview: "Unified thermal loop interconnecting battery floorboard cooling plates, motor jackets, inverter cold plates, and the cabin HVAC climate system.",
    functionText: "Maintains optimal 25-35°C cell operation, preheats battery in freezing winters, and protects components under extreme racetrack loads.",
    locationText: "Distributed throughout the skateboard chassis with front radiator pack and chassis coolant channels.",
    telemetry: [
      { label: "Coolant Flow", value: "14.2", unit: "L/min" },
      { label: "Fluid Pressure", value: "1.4", unit: "bar" },
      { label: "Inlet Temperature", value: "22.4", unit: "°C" },
      { label: "Chilled Delta T", value: "3.8", unit: "°C" },
    ],
    safetyRating: "IP67 / UL94-V0",
  },
  {
    id: "power-elec",
    name: "Power Electronics",
    subtitle: "High Voltage Inversion & Control",
    category: "Power Conversion",
    color: "#8B5CF6",
    image: "/chassis/inverter.jpg",
    pinX: 38,
    pinY: 46,
    connectorPath: "M 380 260 L 380 300",
    calloutPos: "top-mid-left",
    specs: {
      voltage: "800V Bus",
      power: "350 kW Peak",
      cellType: "Silicon Carbide SiC",
      configuration: "Integrated eAxle Box",
    },
    overview: "Integrated electronics housing the SiC power inverter, gate drivers, DC bus bulk capacitors, current hall sensors, and high-speed DSP motor processors.",
    functionText: "Transforms energy bidirectionally with sub-millisecond throttle dynamics and vector orientation control.",
    locationText: "Directly integrated with the front and rear e-drive traction units.",
    telemetry: [
      { label: "Switching Frequency", value: "20", unit: "kHz" },
      { label: "Bus Current", value: "450", unit: "A" },
      { label: "Gate Driver Rail", value: "15.2", unit: "V" },
      { label: "Thermal Margin", value: "48", unit: "°C" },
    ],
    safetyRating: "ASIL-D",
  },
  {
    id: "ecu",
    name: "Control Units (ECU)",
    subtitle: "Vehicle Domain Controller",
    category: "Vehicle Intelligence",
    color: "#6366F1",
    image: "/battery/bms-board.jpg",
    pinX: 46,
    pinY: 34,
    connectorPath: "M 460 180 L 460 220",
    calloutPos: "top-center",
    specs: {
      voltage: "12V Operating",
      cellType: "Quad-Core ARM Cortex",
      configuration: "Automotive Ethernet / CAN-FD",
      weight: "1.8 kg",
    },
    overview: "Central vehicle supervisory controller governing torque vectoring, drive modes, traction control, regenerative braking blend, and OTA telemetry.",
    functionText: "Processes driver pedal inputs and safety sensor feeds every 2 milliseconds to arbitrate torque between front and rear eAxles.",
    locationText: "Positioned centrally beneath the vehicle dashboard bulkhead.",
    telemetry: [
      { label: "Processing Latency", value: "1.8", unit: "ms" },
      { label: "Ethernet Bandwidth", value: "1.0", unit: "Gbps" },
      { label: "Bus Health", value: "100", unit: "%" },
      { label: "Torque Arbitration", value: "Active", unit: "" },
    ],
    safetyRating: "ISO 26262 ASIL-D",
  },
  {
    id: "chassis",
    name: "Chassis & Frame",
    subtitle: "Aerospace Aluminum Platform",
    category: "Structural Safety",
    color: "#64748B",
    image: "/chassis/ev-chassis-hero.jpg",
    pinX: 52,
    pinY: 66,
    connectorPath: "M 520 440 L 520 420",
    calloutPos: "bottom-center",
    specs: {
      weight: "285 kg",
      configuration: "Mega-casting + Extrusions",
      cellType: "6000-series Aerospace Al",
      cooling: "Integrated Crash Rails",
    },
    overview: "Dedicated skateboard platform combining high-pressure aluminum gigacastings with multi-chamber extruded side sills to shield the battery from side-pole impacts.",
    functionText: "Provides exceptional torsional rigidity (> 42,000 Nm/deg) while serving as the structural casing and load-bearing cradle for battery and suspension.",
    locationText: "Spans the full vehicle wheelbase from front crash box to rear subframe.",
    telemetry: [
      { label: "Torsional Rigidity", value: "44,500", unit: "Nm/deg" },
      { label: "Curb Weight Ratio", value: "50:50", unit: "F/R" },
      { label: "Crash Energy Absorption", value: "120", unit: "kJ" },
      { label: "Anti-Corrosion", value: "Cathodic E-coat", unit: "" },
    ],
    safetyRating: "Euro NCAP 5-Star / IIHS Top Safety+",
  },
];

const VIEW_TABS = [
  { id: "architecture", label: "Architecture View", icon: Layers },
  { id: "energy-flow", label: "Energy Flow", icon: Zap },
  { id: "thermal-flow", label: "Thermal Flow", icon: Thermometer },
  { id: "control-network", label: "Control Network", icon: Network },
  { id: "exploded", label: "Exploded View", icon: SplitSquareVertical },
  { id: "chassis-layers", label: "Chassis Layers", icon: ShieldCheck },
  { id: "comparison", label: "Comparison", icon: Workflow },
];

const FEATURE_PILLS = [
  { label: "Real-time 3D Model", icon: Layers, color: "text-cyan-400" },
  { label: "Component Information", icon: Info, color: "text-purple-400" },
  { label: "Energy Flow Animation", icon: Activity, color: "text-blue-400" },
  { label: "Multiple Powertrains", icon: Cpu, color: "text-emerald-400" },
  { label: "Explore Layer by Layer", icon: Sparkles, color: "text-pink-400" },
];

const BOTTOM_METRICS = [
  {
    label: "System Voltage",
    value: "350 - 800V",
    sub: "High voltage architecture",
    icon: Zap,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    label: "Energy Capacity",
    value: "50 - 120 kWh",
    sub: "Depends on vehicle type",
    icon: Battery,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    label: "Driving Range",
    value: "300 - 500 km",
    sub: "Real-world estimate",
    icon: Gauge,
    color: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    label: "Charging Support",
    value: "AC / DC Charging",
    sub: "Home, Public & Fast Charging",
    icon: Plug,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    label: "Thermal Management",
    value: "Liquid / Air Cooling",
    sub: "Maintains optimal temperature",
    icon: Thermometer,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
];

export function ArchitectureExplorer() {
  const [selectedCompId, setSelectedCompId] = useState<string>("battery");
  const [activeView, setActiveView] = useState<string>("architecture");
  const [inspectorTab, setInspectorTab] = useState<"overview" | "specs" | "function" | "location">("overview");
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const selectedComp = EV_COMPONENTS.find((c) => c.id === selectedCompId) || EV_COMPONENTS[0]!;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const resetView = () => {
    setSelectedCompId("battery");
    setActiveView("architecture");
    setInspectorTab("overview");
    setIsInspectorOpen(true);
    setMousePos({ x: 0, y: 0 });
  };

  // 8 Highlighted Callouts on the 3D Car matching the reference image:
  const calloutComponents = [
    EV_COMPONENTS[4]!, // Charging Port (top left)
    EV_COMPONENTS[2]!, // Power Electronics (Inverter) (top mid-left)
    EV_COMPONENTS[1]!, // BMS (top center)
    EV_COMPONENTS[6]!, // Thermal System (top mid-right)
    EV_COMPONENTS[3]!, // Electric Motor (mid right)
    EV_COMPONENTS[5]!, // DC-DC Converter (bottom left)
    EV_COMPONENTS[0]!, // Battery Pack (bottom center)
    EV_COMPONENTS[7]!, // Transmission (bottom right)
  ];

  return (
    <section id="architecture" className="space-y-6 pt-2">
      {/* ── Section Header ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-[11px] font-bold tracking-wider uppercase text-cyan-400 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.2)] w-fit">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>EV Tech Lab</span>
          </div>

          {/* Top-Right Control Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={resetView}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-muted-foreground hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Reset View</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Expand View"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Interactive{" "}
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(6,182,212,0.3)]">
              EV Architecture
            </span>
          </h2>
          <p className="text-sm text-muted-foreground/75 max-w-3xl leading-relaxed mt-1.5">
            Explore the structural chassis nodes and see how each component works together to power, control, cool, and drive an electric vehicle.
          </p>
        </div>

        {/* 5 Feature Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FEATURE_PILLS.map((pill) => {
            const Icon = pill.icon;
            return (
              <div
                key={pill.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-[#0e1422]/70 backdrop-blur-md shrink-0 text-xs text-muted-foreground/90 font-medium"
              >
                <div className="w-5 h-5 rounded-lg bg-black/40 flex items-center justify-center">
                  <Icon className={`w-3.5 h-3.5 ${pill.color}`} />
                </div>
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>

        {/* 7 View Mode Tabs Navigation Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-white/10 bg-[#090d16]/90 backdrop-blur-xl overflow-x-auto scrollbar-none">
          {VIEW_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-purple-400" : "text-muted-foreground"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main 3-Column Studio Showcase Viewport ── */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-3xl border border-white/10 bg-[#070b13] p-3 sm:p-5 overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 ${
          isExpanded ? "min-h-175 lg:min-h-200" : "min-h-155 lg:min-h-170"
        }`}
      >
        {/* Futuristic Ambient Glow Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-187.5 h-187.5 bg-radial from-cyan-500/10 via-purple-600/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[32px_32px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* ── LEFT COLUMN: Components Navigator Sidebar (14 items) ── */}
          <div className="lg:col-span-3 flex flex-col rounded-2xl border border-white/10 bg-[#090e18]/85 backdrop-blur-xl p-3 max-h-145 lg:max-h-165">
            <div className="flex items-center justify-between px-2 pb-2.5 border-b border-white/5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground/60">
                Components
              </span>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {EV_COMPONENTS.length} Nodes
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pt-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {EV_COMPONENTS.map((comp) => {
                const isSelected = selectedCompId === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      setSelectedCompId(comp.id);
                      setIsInspectorOpen(true);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer group ${
                      isSelected
                        ? "bg-emerald-500/20 text-white border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                        : "text-muted-foreground/80 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? "bg-emerald-500/30 border-emerald-400 text-emerald-300"
                            : "bg-black/40 border-white/10 text-muted-foreground group-hover:text-white"
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold truncate">
                        {comp.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSelected
                          ? "text-emerald-400 translate-x-0.5"
                          : "text-muted-foreground/40 group-hover:text-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── CENTER COLUMN: 3D EV Chassis Showcase & Callout Cards ── */}
          <div className="lg:col-span-6 flex flex-col justify-center relative rounded-2xl border border-white/5 bg-black/40 p-2 sm:p-4 overflow-hidden min-h-115 sm:min-h-135 lg:min-h-165">
            {/* Dynamic Tilt Stage */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 4}deg)`,
              }}
            >
              {/* Center 3D Car Image */}
              <div className="relative w-full max-w-155 aspect-video transition-all duration-500">
                <Image
                  src="/chassis/ev-chassis-hero.jpg"
                  alt="Interactive EV Chassis Architecture 3D Render"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-contain filter drop-shadow-[0_20px_45px_rgba(6,182,212,0.3)] select-none pointer-events-none"
                />

                {/* Simulated Energy / Thermal Flow Lines */}
                {(activeView === "energy-flow" || activeView === "architecture") && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Energy stream along orange HV cabling */}
                    <div className="absolute top-[48%] left-[28%] w-[45%] h-1 bg-linear-to-r from-cyan-400 via-emerald-400 to-transparent blur-[1px] animate-pulse opacity-85" />
                    <div className="absolute top-[58%] left-[34%] w-[38%] h-1 bg-linear-to-r from-amber-400 via-orange-500 to-transparent blur-[1px] animate-pulse opacity-80" />
                  </div>
                )}

                {activeView === "thermal-flow" && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Coolant stream */}
                    <div className="absolute bottom-[28%] left-[32%] w-[42%] h-1.5 bg-linear-to-r from-cyan-400 via-blue-500 to-teal-400 blur-[2px] animate-pulse opacity-90" />
                  </div>
                )}

                {/* SVG Glowing Connector Lines (Desktop) */}
                <svg
                  className="hidden xl:block absolute inset-0 w-full h-full pointer-events-none z-15"
                  viewBox="0 0 1000 640"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {calloutComponents.map((c) => (
                      <filter key={`glow-arch-${c.id}`} id={`glow-arch-${c.id}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    ))}
                  </defs>

                  {calloutComponents.map((comp) => {
                    const isSelected = selectedCompId === comp.id;
                    return (
                      <g key={`arch-line-${comp.id}`}>
                        <path
                          d={comp.connectorPath}
                          fill="none"
                          stroke={comp.color}
                          strokeWidth={isSelected ? 2 : 1}
                          strokeOpacity={isSelected ? 0.95 : 0.4}
                          filter={`url(#glow-arch-${comp.id})`}
                          strokeDasharray={isSelected ? "none" : "3 3"}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Interactive Hotspot Pins on the 3D Car */}
                {calloutComponents.map((comp) => {
                  const isSelected = selectedCompId === comp.id;
                  return (
                    <button
                      key={`pin-car-${comp.id}`}
                      onClick={() => {
                        setSelectedCompId(comp.id);
                        setIsInspectorOpen(true);
                      }}
                      onMouseEnter={() => setSelectedCompId(comp.id)}
                      style={{ left: `${comp.pinX}%`, top: `${comp.pinY}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-25 focus:outline-none"
                      aria-label={`Inspect ${comp.name}`}
                    >
                      <span className="relative flex items-center justify-center">
                        <span
                          className={`absolute w-7 h-7 rounded-full animate-ping opacity-60 transition-opacity ${
                            isSelected ? "opacity-100" : "opacity-30 group-hover:opacity-75"
                          }`}
                          style={{ backgroundColor: comp.color }}
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                            isSelected
                              ? "scale-125 bg-white border-white shadow-[0_0_15px_#fff]"
                              : "bg-black/85 border-current group-hover:scale-110"
                          }`}
                          style={{ borderColor: comp.color }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: comp.color }}
                          />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ── 8 Desktop Floating Callout Cards on 3D Stage ── */}
              {/* 1. Charging Port (Top-Left) */}
              <div className="hidden xl:block absolute top-2 left-2 z-20 w-44">
                <CalloutBadge
                  item={calloutComponents[0]!}
                  isActive={selectedCompId === calloutComponents[0]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[0]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 2. Power Electronics (Inverter) (Top Mid-Left) */}
              <div className="hidden xl:block absolute top-2 left-[28%] z-20 w-48">
                <CalloutBadge
                  item={calloutComponents[1]!}
                  isActive={selectedCompId === calloutComponents[1]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[1]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 3. BMS (Top Center) */}
              <div className="hidden xl:block absolute top-2 left-[50%] -translate-x-1/2 z-20 w-44">
                <CalloutBadge
                  item={calloutComponents[2]!}
                  isActive={selectedCompId === calloutComponents[2]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[2]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 4. Thermal System (Top Mid-Right) */}
              <div className="hidden xl:block absolute top-2 right-2 z-20 w-48">
                <CalloutBadge
                  item={calloutComponents[3]!}
                  isActive={selectedCompId === calloutComponents[3]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[3]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 5. Electric Motor (Mid-Right) */}
              <div className="hidden xl:block absolute top-[45%] right-2 z-20 w-44">
                <CalloutBadge
                  item={calloutComponents[4]!}
                  isActive={selectedCompId === calloutComponents[4]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[4]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 6. DC-DC Converter (Bottom-Left) */}
              <div className="hidden xl:block absolute bottom-2 left-2 z-20 w-46">
                <CalloutBadge
                  item={calloutComponents[5]!}
                  isActive={selectedCompId === calloutComponents[5]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[5]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 7. Battery Pack (Bottom Center) */}
              <div className="hidden xl:block absolute bottom-2 left-[50%] -translate-x-1/2 z-20 w-48">
                <CalloutBadge
                  item={calloutComponents[6]!}
                  isActive={selectedCompId === calloutComponents[6]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[6]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>

              {/* 8. Transmission (Bottom-Right) */}
              <div className="hidden xl:block absolute bottom-2 right-2 z-20 w-46">
                <CalloutBadge
                  item={calloutComponents[7]!}
                  isActive={selectedCompId === calloutComponents[7]!.id}
                  onClick={() => {
                    setSelectedCompId(calloutComponents[7]!.id);
                    setIsInspectorOpen(true);
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Component Inspector Panel ── */}
          <div className="lg:col-span-3 flex flex-col rounded-2xl border border-white/10 bg-[#090e18]/90 backdrop-blur-xl p-4 shadow-xl">
            {isInspectorOpen ? (
              <div className="flex flex-col h-full justify-between space-y-3.5">
                {/* Panel Header */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-md"
                        style={{
                          backgroundColor: `${selectedComp.color}20`,
                          borderColor: selectedComp.color,
                        }}
                      >
                        <Cpu className="w-4 h-4" style={{ color: selectedComp.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white leading-tight">
                          {selectedComp.name}
                        </h3>
                        <p className="text-[10px] text-muted-foreground/70">
                          {selectedComp.subtitle}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsInspectorOpen(false)}
                      className="p-1 rounded-lg text-muted-foreground/50 hover:text-white hover:bg-white/5 transition-colors"
                      aria-label="Dismiss Inspector"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 4 Inspector Tabs */}
                  <div className="grid grid-cols-4 gap-1 p-1 mt-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-bold">
                    {(["overview", "specs", "function", "location"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setInspectorTab(tab)}
                        className={`py-1 rounded-lg capitalize transition-all cursor-pointer ${
                          inspectorTab === tab
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                            : "text-muted-foreground/70 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3D Component Preview Thumbnail */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-inner shrink-0">
                  <Image
                    src={selectedComp.image}
                    alt={selectedComp.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white px-2 py-0.5 rounded-md bg-black/60 border border-white/10">
                      {selectedComp.category}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {selectedComp.safetyRating.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {/* Content according to tab */}
                <div className="flex-1 min-h-35 text-xs space-y-2.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  {inspectorTab === "overview" && (
                    <p className="text-muted-foreground/85 leading-relaxed">
                      {selectedComp.overview}
                    </p>
                  )}

                  {inspectorTab === "function" && (
                    <p className="text-muted-foreground/85 leading-relaxed">
                      {selectedComp.functionText}
                    </p>
                  )}

                  {inspectorTab === "location" && (
                    <p className="text-muted-foreground/85 leading-relaxed">
                      {selectedComp.locationText}
                    </p>
                  )}

                  {/* Specifications Grid */}
                  <div className="space-y-1.5 pt-1">
                    {selectedComp.specs.voltage && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                        <span className="text-muted-foreground/70 flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-amber-400" /> Voltage
                        </span>
                        <span className="font-bold text-white">{selectedComp.specs.voltage}</span>
                      </div>
                    )}
                    {selectedComp.specs.capacity && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                        <span className="text-muted-foreground/70 flex items-center gap-1.5">
                          <Battery className="w-3 h-3 text-cyan-400" /> Capacity
                        </span>
                        <span className="font-bold text-white">{selectedComp.specs.capacity}</span>
                      </div>
                    )}
                    {selectedComp.specs.power && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                        <span className="text-muted-foreground/70 flex items-center gap-1.5">
                          <Activity className="w-3 h-3 text-emerald-400" /> Peak Power
                        </span>
                        <span className="font-bold text-white">{selectedComp.specs.power}</span>
                      </div>
                    )}
                    {selectedComp.specs.cellType && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                        <span className="text-muted-foreground/70 flex items-center gap-1.5">
                          <Cpu className="w-3 h-3 text-purple-400" /> Architecture
                        </span>
                        <span className="font-bold text-white">{selectedComp.specs.cellType}</span>
                      </div>
                    )}
                    {selectedComp.specs.weight && (
                      <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                        <span className="text-muted-foreground/70 flex items-center gap-1.5">
                          <Gauge className="w-3 h-3 text-blue-400" /> Weight
                        </span>
                        <span className="font-bold text-white">{selectedComp.specs.weight}</span>
                      </div>
                    )}
                    {selectedComp.specs.cooling && (
                      <div className="flex items-center justify-between py-1 text-[11px]">
                        <span className="text-muted-foreground/70 flex items-center gap-1.5">
                          <Waves className="w-3 h-3 text-cyan-300" /> Thermal
                        </span>
                        <span className="font-bold text-white">{selectedComp.specs.cooling}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Learn More Action Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-white bg-linear-to-r from-emerald-600 via-teal-500 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4 space-y-3">
                <Info className="w-8 h-8 text-cyan-400 animate-pulse" />
                <p className="text-xs text-muted-foreground">
                  Select any component node or click on the 3D vehicle to inspect its telemetry.
                </p>
                <button
                  onClick={() => setIsInspectorOpen(true)}
                  className="px-4 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-bold hover:bg-cyan-900/50 transition-colors cursor-pointer"
                >
                  Open Inspector
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: 5 System Stat Metric Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {BOTTOM_METRICS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-3.5 rounded-2xl border ${stat.border} bg-linear-to-br ${stat.color} backdrop-blur-md shadow-lg space-y-2`}
            >
              <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-muted-foreground/80 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[10px] text-muted-foreground/50 truncate">
                  {stat.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DEEP DIVE ENGINEERING MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0a0f1d] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-6"
            style={{ boxShadow: `0 0 40px ${selectedComp.color}25` }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 bg-black/50 shrink-0 shadow-lg"
                style={{ borderColor: selectedComp.color }}
              >
                <Image
                  src={selectedComp.image}
                  alt={selectedComp.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <div
                  className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10"
                  style={{ color: selectedComp.color }}
                >
                  {selectedComp.category}
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedComp.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedComp.subtitle}
                </p>
              </div>
            </div>

            {/* In-Depth Breakdown */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Engineering Mechanism
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedComp.overview}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                  {selectedComp.functionText}
                </p>
              </div>

              {/* Live Telemetry Data Simulation */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/2 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Live Telemetry Stream
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse">
                    LIVE SENSOR SYNC
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedComp.telemetry.map((t) => (
                    <div
                      key={t.label}
                      className="p-3 rounded-lg bg-black/40 border border-white/5"
                    >
                      <div className="text-[10px] text-muted-foreground/60">{t.label}</div>
                      <div className="text-base font-extrabold text-white mt-0.5">
                        {t.value}{" "}
                        <span className="text-[11px] font-normal text-muted-foreground/75">
                          {t.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Protocol */}
              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-300">
                    Active Safety Protocol
                  </div>
                  <p className="text-xs text-muted-foreground/80 mt-0.5">
                    Verified to {selectedComp.safetyRating} with redundant failsafe and isolation monitoring.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Integrated High-Voltage EV Component</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Floating Callout Badge Subcomponent ──
function CalloutBadge({
  item,
  isActive,
  onClick,
}: {
  item: ComponentData;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group p-2 rounded-xl border backdrop-blur-xl transition-all duration-300 bg-[#090e18]/90 cursor-pointer shadow-lg hover:shadow-xl ${
        isActive
          ? "border-current text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105"
          : "border-white/10 hover:border-white/20 text-muted-foreground hover:text-white"
      }`}
      style={{ color: isActive ? item.color : undefined }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
          style={{
            backgroundColor: `${item.color}20`,
            borderColor: item.color,
          }}
        >
          <Cpu className="w-3.5 h-3.5" style={{ color: item.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-extrabold text-white truncate leading-tight group-hover:text-cyan-300">
            {item.name}
          </div>
          <div className="text-[9px] text-muted-foreground/70 truncate leading-tight mt-0.5">
            {item.badgeLabel || item.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3D EXPLODED EV VIEW
// ==========================================

export function ExplodedView() {
  const [explode, setExplode] = useState<boolean>(false);

  return (
    <section id="exploded" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">3D Exploded Chassis Inspector</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Explode structural component layers to inspect powertrain layout depths.</p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-black/40 p-6 flex flex-col items-center justify-between min-h-80 relative">
        <button
          onClick={() => setExplode(!explode)}
          className="absolute top-4 right-4 px-4 py-1.5 rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-bold hover:bg-[#22D3EE]/20 transition-all cursor-pointer z-10"
        >
          {explode ? "Collapse Assembly" : "Explode Assembly"}
        </button>

        <div className="flex-1 w-full flex items-center justify-center relative py-6">
          <svg viewBox="-120 -80 240 160" className="w-full max-w-70 aspect-square overflow-visible">
            {/* LAYER 3: Outlined Shell (top layer) */}
            <motion.path
              d="M -60,-20 Q 0,-50 60,-20 L 70,10 L -70,10 Z"
              fill="none"
              stroke="#6B7280"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              animate={{ y: explode ? -45 : 0 }}
              opacity={explode ? 0.35 : 0.8}
            />
            {explode && (
              <motion.text x="80" y="-35" fill="#AEB5C0" fontSize="5" fontWeight="bold" animate={{ opacity: explode ? 1 : 0 }}>
                AERODYNAMIC ALUMINIUM BODY SHELL
              </motion.text>
            )}

            {/* LAYER 2: Stator/Rotor Drive Assemblies (middle layer) */}
            <motion.g
              animate={{ y: explode ? -10 : 0 }}
            >
              {/* Traction motor cylindrical visual */}
              <rect x="-48" y="-5" width="20" height="15" rx="3" fill="#1E1E38" stroke="#3B82F6" strokeWidth="1" />
              <rect x="-24" y="-3" width="6" height="11" fill="#4B5563" />
              
              {/* Central Power controller inverter */}
              <rect x="-10" y="-8" width="25" height="18" rx="2" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
            </motion.g>
            {explode && (
              <motion.text x="80" y="-5" fill="#22D3EE" fontSize="5" fontWeight="bold" animate={{ opacity: explode ? 1 : 0 }}>
                PMSM MOTOR & SILICON-CARBIDE INVERTER
              </motion.text>
            )}

            {/* LAYER 1: Core Battery & cooling floor (bottom layer) */}
            <motion.g
              animate={{ y: explode ? 25 : 0 }}
            >
              <rect x="-55" y="15" width="110" height="10" rx="3" fill="#1F1235" stroke="#8B5CF6" strokeWidth="1" />
              {/* Cooling jacket lines beneath pack */}
              <line x1="-50" y1="28" x2="50" y2="28" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />
            </motion.g>
            {explode && (
              <motion.text x="80" y="28" fill="#C084FC" fontSize="5" fontWeight="bold" animate={{ opacity: explode ? 1 : 0 }}>
                HV BATTERY CELL CHASSIS COMPARTMENT
              </motion.text>
            )}
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// POWERTRAIN CHAIN
// ==========================================

export function PowertrainExplorer() {
  return (
    <section id="powertrain" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Powertrain Vector Pipeline</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Trace structural voltage path steps from the storage pack down to wheel axles.</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/5 bg-white/2 flex flex-col md:flex-row gap-4 items-center justify-between">
        {[
          { label: "1. HV Battery", desc: "Chemical DC Storage" },
          { label: "2. SiC Inverter", desc: "Direct Rectification" },
          { label: "3. Traction Motor", desc: "Electromagnetic Flux" },
          { label: "4. Gear Reducer", desc: "Torque Multiplication" },
          { label: "5. Drive Shaft", desc: "Axle Mechanics" }
        ].map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1 w-full p-4 rounded-xl bg-black/40 border border-white/5 text-center text-xs space-y-1">
              <strong className="text-white block">{step.label}</strong>
              <span className="text-[10px] text-muted-foreground/50 block">{step.desc}</span>
            </div>
            {idx < 4 && (
              <ChevronRight className="w-5 h-5 text-cyan-400 rotate-90 md:rotate-0 my-1 md:my-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// MOTOR LAB
// ==========================================

interface MotorSpecs {
  id: string;
  name: string;
  efficiency: string;
  torque: string;
  speed: string;
  advantages: string;
  limitations: string;
}

const MOTOR_LIST: MotorSpecs[] = [
  { id: "pmsm", name: "Permanent Magnet Sync (PMSM)", efficiency: "95% - 97% Highest", torque: "Very High starting torque density", speed: "High (Up to 18,000 RPM)", advantages: "Ultra-compact form factor, high thermal performance.", limitations: "High manufacturing cost due to NdFeB rare earth magnets." },
  { id: "induction", name: "AC Induction Motor", efficiency: "90% - 92% Good", torque: "Moderate starting torque", speed: "Very High (Up to 20,000 RPM)", advantages: "Extremely robust casing, low cost, simple rotor.", limitations: "Higher heat output from rotor coil copper windings." }
];

export function MotorLab() {
  const [selectedMotor, setSelectedMotor] = useState<MotorSpecs>(MOTOR_LIST[0]!);

  return (
    <section id="motorlab" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Traction Motor Laboratory</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Compare stator vector magnets layouts and mechanical torque profiles.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Graph torque RPM and selectors */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest block">Choose Motor Type</span>
            <select
              value={selectedMotor.id}
              onChange={(e) => setSelectedMotor(MOTOR_LIST.find((m) => m.id === e.target.value)!)}
              className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="pmsm">Permanent Magnet Sync (PMSM)</option>
              <option value="induction">AC Induction Motor</option>
            </select>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Torque-RPM curves plotting</span>
            <svg viewBox="0 0 200 100" className="w-full overflow-visible">
              <line x1="15" y1="10" x2="15" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              
              {/* Curve rendering */}
              {selectedMotor.id === "pmsm" ? (
                // Constant torque region then fall off (field weakening)
                <path d="M 15,25 L 90,25 C 120,30 150,60 180,80" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
              ) : (
                // Induction rising slightly then drop-off curves
                <path d="M 15,35 L 60,32 C 100,35 140,55 180,82" fill="none" stroke="#A855F7" strokeWidth="1.5" />
              )}
              
              <text x="15" y="93" fill="rgba(255,255,255,0.3)" fontSize="6">0 RPM</text>
              <text x="180" y="93" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end">18,000 RPM</text>
            </svg>
          </div>
        </div>

        {/* Readout specifications */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
          <span className="text-xs font-extrabold text-white uppercase border-b border-white/5 pb-2.5 block">{selectedMotor.name} Telemetry</span>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Target Efficiency</span>
              <strong className="text-sm text-cyan-300 block mt-0.5">{selectedMotor.efficiency}</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Max Speed Threshold</span>
              <strong className="text-xs text-white block mt-0.5">{selectedMotor.speed}</strong>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Continuous Torque</span>
              <strong className="text-xs text-white block mt-0.5">{selectedMotor.torque}</strong>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 border-t border-white/5 pt-4 text-[11px] leading-relaxed">
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block mb-1">Key Advantage</span>
              <p className="text-muted-foreground">{selectedMotor.advantages}</p>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block mb-1">Grid Limit</span>
              <p className="text-muted-foreground">{selectedMotor.limitations}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CONTROLLER & INVERTER
// ==========================================

export function ControllerLab() {
  return (
    <section id="controller" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Silicon Carbide Inverters & Controllers</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Understand Pulse Width Modulations (PWM) and transistor gates configurations.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#22D3EE]">
            <Cpu className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Silicon Carbide (SiC) Technology</span>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            Silicon Carbide transistors switch currents at far higher frequencies compared to standard silicon switches. This shrinks heat dissipation loads by up to 70%, decreasing cooling requirements and boosting overall system efficiency.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#22D3EE]">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Pulse-Width Modulation (PWM)</span>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            Chopping DC voltage into pulses creates simulated AC sine waves. Adjusting the width of these pulses controls the motor&apos;s speed and torque directly.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SUSPENSION & BRAKING
// ==========================================

export function ChassisSystems() {
  return (
    <section id="chassis" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Chassis Systems (Suspension & Braking)</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Examine regenerative brake recovery and multi-link active suspension mechanics.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-cyan-400">
            <Activity className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Regenerative Brake Recovery</span>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            By reversing rotor electromagnetic fields during deceleration, traction motors act as electrical generators. Redirecting kinetic vehicle energy back into chemical battery packs, recapturing up to 25% range.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-cyan-400">
            <Settings className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Multi-Link Independent Suspension</span>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            Integrates multiple control arms to guide wheel tracking, neutralizing heavy floor battery pack load shifts during fast cornering maneuvers.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// THERMAL MANAGEMENT
// ==========================================

export function ThermalManagement() {
  return (
    <section id="thermal" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Active Thermal Management Loop</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Trace cell jacket plate liquid lines and HVAC heat pump flow directions.</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex gap-2 items-center text-[#22D3EE]">
            <Thermometer className="w-4.5 h-4.5 animate-pulse" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Ethylene-Glycol Loop Routing</span>
          </div>
          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Pumps liquid coolant beneath cell module trays to absorb heat. Reroutes warm water arrays to preheat battery cells in cold climates, maximizing ion motility efficiency.
          </p>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2 items-center text-[#22D3EE]">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Active HVAC Heat Pumps</span>
          </div>
          <p className="text-xs text-muted-foreground/75 leading-relaxed">
            Exchanges energy between ambient external air, motor inverter heat exhaust, and battery casings to optimize cabin temperature control, saving battery range.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// HIGH VOLTAGE SYSTEM
// ==========================================

export function HighVoltage() {
  return (
    <section id="hv" className="space-y-6 border-t border-white/5 pt-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">High Voltage (HV) Safety Architecture</h2>
        <p className="text-sm text-muted-foreground/60 mt-1">Review contactors isolation barriers and pyro-fuse cutoff triggers.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-rose-400">
            <AlertTriangle className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">HV Isolation Contactors</span>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            Relays inside the battery container isolate high voltage inputs. They instantly snap open in an accident, separating cell voltage grids from auxiliary cabling routes.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-rose-400">
            <ShieldCheck className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Emergency Pyro-Fuse Cutoff</span>
          </div>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            A fast-acting fuse blown by a micro-explosive charge triggered by the BMS. Cuts pack currents within milliseconds during short-circuits.
          </p>
        </div>
      </div>
    </section>
  );
}
