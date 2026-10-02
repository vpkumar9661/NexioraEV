"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Thermometer,
  BarChart3,
  Layers,
  RotateCw,
  Waves,
  ArrowRight,
  X,
  Cpu,
  Activity,
  Gauge,
  CheckCircle2,
  Info,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ComponentDetail {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  color: string;
  accentClass: string;
  borderClass: string;
  bgGlowClass: string;
  image: string;
  // Pin coordinate percentage on stage
  pinX: number;
  pinY: number;
  // SVG connector line points [x1, y1, x2, y2, x3, y3]
  connectorPath: string;
  specs: { label: string; value: string }[];
  description: string;
  deepDive: {
    overview: string;
    mechanism: string;
    telemetry: { label: string; value: string; unit: string }[];
    safetyProtocol: string;
  };
}

const COMPONENTS: ComponentDetail[] = [
  {
    id: "pyro-fuse",
    name: "Pyro-Fuse & MSD",
    subtitle: "Disconnects the pack during fault or accident.",
    category: "Safety & HV Protection",
    color: "#EF4444",
    accentClass: "text-[#EF4444]",
    borderClass: "border-[#EF4444]/50 shadow-[0_0_20px_rgba(239,68,68,0.25)]",
    bgGlowClass: "from-[#EF4444]/15 to-transparent",
    image: "/battery/pyro-fuse.jpg",
    pinX: 305,
    pinY: 260,
    connectorPath: "M 235 75 L 285 75 L 305 260",
    specs: [
      { label: "Trigger Response", value: "< 1.2 ms" },
      { label: "Interrupt Rating", value: "30,000A @ 1000V" },
      { label: "Activation", value: "Pyrotechnic Gas Generator" },
      { label: "Safety Standard", value: "ISO 6469-3 / UL 248-13" },
    ],
    description: "Ultra-fast pyrotechnic circuit breaker coupled with a manual service disconnect. In milliseconds upon crash signal detection, an internal charge severs the main circuit.",
    deepDive: {
      overview: "The Pyro-Fuse is the ultimate fail-safe line of defense in the 800V high-voltage tractive architecture. Unlike conventional melting fuses that take tens of milliseconds, the pyrotechnic switch isolates dangerous fault currents almost instantaneously.",
      mechanism: "Triggered either by direct hardware crash accelerometer sensors or an airbag deployment squib pulse, an integrated micro-gas propellant rapidly drives an insulated ceramic cutter directly through a solid copper busbar bridge, creating an unbridgeable galvanic air gap.",
      telemetry: [
        { label: "Current Interruption Threshold", value: "1,200", unit: "Amps Peak" },
        { label: "Airbag Squib Response", value: "850", unit: "Microseconds" },
        { label: "Arc Extinction Time", value: "0.35", unit: "Milliseconds" },
        { label: "Contact Isolation Voltage", value: "1,500", unit: "Volts DC" },
      ],
      safetyProtocol: "Automated HVIL (High Voltage Interlock Loop) verification ensures contactors open prior to technician service disconnect plug removal.",
    },
  },
  {
    id: "bms",
    name: "Battery Management System (BMS)",
    subtitle: "Monitors, protects and balances all cells.",
    category: "Electronic Controller",
    color: "#A855F7",
    accentClass: "text-[#A855F7]",
    borderClass: "border-[#A855F7]/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    bgGlowClass: "from-[#A855F7]/15 to-transparent",
    image: "/battery/bms-board.jpg",
    pinX: 515,
    pinY: 175,
    connectorPath: "M 515 95 L 515 175",
    specs: [
      { label: "MCU Architecture", value: "Dual-Core 32-bit ASIL-D" },
      { label: "Balancing Current", value: "250 mA Active Shunt" },
      { label: "Telemetry Frequency", value: "100 Hz Synchronized" },
      { label: "Bus Protocol", value: "Dual CAN-FD / Iso-SPI" },
    ],
    description: "The intelligent neural core of the battery pack. Continuously computes State of Charge (SoC), State of Health (SoH), cell internal impedances, and controls contactors.",
    deepDive: {
      overview: "The Nexiora Master BMS manages individual cell voltage strings down to millivolt precision, running predictive thermal and electrochemical state estimators in real-time.",
      mechanism: "Implements adaptive Kalman filtering to dynamically compute maximum allowable continuous discharge and regenerative charging current limits (SoL) based on cell temperature, state of charge, and internal resistance gradients.",
      telemetry: [
        { label: "Active Cell Delta", value: "8", unit: "mV max" },
        { label: "Telemetry Refresh", value: "10", unit: "ms" },
        { label: "Isolation Resistance", value: "500", unit: "kΩ/V" },
        { label: "Thermal Estimation Accuracy", value: "±0.5", unit: "°C" },
      ],
      safetyProtocol: "Redundant ASIL-D watchdog architecture continuously checks primary microcontroller integrity and initiates safe-state limp home mode on divergence.",
    },
  },
  {
    id: "busbars",
    name: "Copper Busbars",
    subtitle: "Conducts high current between cells and modules.",
    category: "HV Distribution",
    color: "#F59E0B",
    accentClass: "text-[#F59E0B]",
    borderClass: "border-[#F59E0B]/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    bgGlowClass: "from-[#F59E0B]/15 to-transparent",
    image: "/battery/copper-busbar.jpg",
    pinX: 635,
    pinY: 260,
    connectorPath: "M 760 75 L 700 75 L 635 260",
    specs: [
      { label: "Purity Grade", value: "99.9% C11000 ETP Copper" },
      { label: "Continuous Rating", value: "650 Amps" },
      { label: "Peak Pulse (10s)", value: "1,400 Amps" },
      { label: "Plating", value: "5µm Bright Nickel" },
    ],
    description: "Engineered solid copper distribution bars laser-welded across cell terminals, maintaining minimal ohmic resistance even during aggressive launch acceleration.",
    deepDive: {
      overview: "Connecting hundreds of individual lithium-ion cells into high-voltage strings requires busbars capable of conducting massive launch currents while absorbing vehicle vibration and thermal expansion.",
      mechanism: "Features flexible laminated bellows expansion joints and ultrasonic wire bonding tabs. Bright nickel electroplating provides permanent oxidation resistance and prevents galvanic corrosion between dissimilar cell metals.",
      telemetry: [
        { label: "Ohmic Resistance", value: "0.018", unit: "mΩ/module" },
        { label: "Launch Current Surge", value: "920", unit: "Amps" },
        { label: "Thermal Dissipation Loss", value: "< 0.04", unit: "%" },
        { label: "Weld Shear Strength", value: "1,250", unit: "Newtons" },
      ],
      safetyProtocol: "Integrated flame-retardant polyamide overmolding insulates busbars against potential chassis short circuits during high-G impact events.",
    },
  },
  {
    id: "cells",
    name: "Battery Cell Modules",
    subtitle: "Stores electrical energy (Li-ion cells).",
    category: "Electrochemical Core",
    color: "#10B981",
    accentClass: "text-[#10B981]",
    borderClass: "border-[#10B981]/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    bgGlowClass: "from-[#10B981]/15 to-transparent",
    image: "/battery/battery-cells.jpg",
    pinX: 395,
    pinY: 335,
    connectorPath: "M 235 300 L 320 300 L 395 335",
    specs: [
      { label: "Chemistry", value: "NMC 811 Lithium-Ion" },
      { label: "Gravimetric Density", value: "285 Wh/kg" },
      { label: "Module Voltage", value: "48V Nom (12S)" },
      { label: "Cycle Retention", value: "> 3,200 Cycles to 80%" },
    ],
    description: "High-density prismatic lithium-ion battery cells arranged into precision structural modules with compression foam pads and integrated cell venting channels.",
    deepDive: {
      overview: "The cell modules constitute the beating heart of Nexiora EV's energy storage, utilizing state-of-the-art Nickel-Manganese-Cobalt cathode chemistry optimized for high discharge C-rates and fast DC charging.",
      mechanism: "Arranged in a series-parallel combination (96S2P or 192S1P depending on 400V/800V configuration) with inter-cell aerogel thermal insulation barriers to prevent thermal propagation even under severe cell penetration testing.",
      telemetry: [
        { label: "Nominal Cell Potential", value: "3.70", unit: "Volts" },
        { label: "Full Charge Cutoff", value: "4.20", unit: "Volts" },
        { label: "Continuous Discharge C-Rate", value: "3.5", unit: "C" },
        { label: "Max Peak Pulse C-Rate", value: "7.0", unit: "C" },
      ],
      safetyProtocol: "Each cell contains an independent current interrupt device (CID) and top burst vent that channels degas effluents into a fire-retardant exhaust manifold.",
    },
  },
  {
    id: "voltage-node",
    name: "Voltage Sensor Node",
    subtitle: "Measures cell/module voltage, current and temperature.",
    category: "Telemetry Sensor",
    color: "#0EA5E9",
    accentClass: "text-[#0EA5E9]",
    borderClass: "border-[#0EA5E9]/50 shadow-[0_0_20px_rgba(14,165,233,0.25)]",
    bgGlowClass: "from-[#0EA5E9]/15 to-transparent",
    image: "/battery/voltage-sensor.jpg",
    pinX: 710,
    pinY: 340,
    connectorPath: "M 755 315 L 735 315 L 710 340",
    specs: [
      { label: "ADC Precision", value: "16-bit Sigma-Delta" },
      { label: "Galvanic Isolation", value: "1,500V DC Isolation" },
      { label: "Voltage Accuracy", value: "±0.8 mV across temp" },
      { label: "Sampling Period", value: "10 ms Cyclic" },
    ],
    description: "Distributed ASIC sensor node mounted on module ends, providing isolated millivolt-level cell tracking and hall-effect current sensing directly to the BMS bus.",
    deepDive: {
      overview: "Micro-sensor nodes distributed throughout the battery pack eliminate bulky wire harnesses by digitizing analog voltage and temperature readings directly at the module level.",
      mechanism: "Features capacitive-isolated daisy chain communication (isoSPI) immune to electromagnetic interference generated by adjacent silicon-carbide (SiC) traction inverters.",
      telemetry: [
        { label: "Module Voltage Reading", value: "47.88", unit: "Volts" },
        { label: "Bus Current Sense", value: "142.6", unit: "Amps" },
        { label: "Sensor Signal-to-Noise", value: "94", unit: "dB" },
        { label: "Common-Mode Rejection", value: "120", unit: "dB" },
      ],
      safetyProtocol: "Automatic open-wire detection detects broken measurement leads within 2 sampling cycles and flags diagnostic trouble codes (DTC).",
    },
  },
  {
    id: "thermistors",
    name: "Temperature Thermistors",
    subtitle: "Monitors temperature for safety and thermal control.",
    category: "Thermal Sensing",
    color: "#EC4899",
    accentClass: "text-[#EC4899]",
    borderClass: "border-[#EC4899]/50 shadow-[0_0_20px_rgba(236,72,153,0.25)]",
    bgGlowClass: "from-[#EC4899]/15 to-transparent",
    image: "/battery/temp-thermistor.jpg",
    pinX: 475,
    pinY: 435,
    connectorPath: "M 255 520 L 370 520 L 475 435",
    specs: [
      { label: "Sensor Chemistry", value: "NTC Glass Encapsulated" },
      { label: "Measurement Range", value: "-40°C to +125°C" },
      { label: "Resolution", value: "±0.15°C Precision" },
      { label: "Sensor Density", value: "4 Probes / Module" },
    ],
    description: "Array of negative temperature coefficient (NTC) probes embedded between cells and cooling cold plates to map internal thermal gradients in real time.",
    deepDive: {
      overview: "Accurate temperature monitoring is vital to prevent lithium plating during sub-zero fast charging and avoid hotspot degradation during aggressive track driving.",
      mechanism: "High-precision NTC thermistors are bonded with thermally conductive epoxy directly onto cell casings and coolant inlet/outlet manifolds, transmitting calibrated thermal profiles to the cooling pump PID controller.",
      telemetry: [
        { label: "Average Pack Temp", value: "26.4", unit: "°C" },
        { label: "Module Max Delta", value: "1.8", unit: "°C" },
        { label: "Coolant Inlet Temp", value: "21.2", unit: "°C" },
        { label: "Coolant Return Temp", value: "24.9", unit: "°C" },
      ],
      safetyProtocol: "Multi-point gradient rate detection triggers pre-emptive thermal throttling if dT/dt exceeds 1.2°C per second at any single cell location.",
    },
  },
  {
    id: "cooling-plate",
    name: "Liquid Cooling Plate",
    subtitle: "Maintains optimal temperature.",
    category: "Thermal Hydraulic",
    color: "#06B6D4",
    accentClass: "text-[#06B6D4]",
    borderClass: "border-[#06B6D4]/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    bgGlowClass: "from-[#06B6D4]/15 to-transparent",
    image: "/battery/cooling-plate.jpg",
    pinX: 420,
    pinY: 510,
    connectorPath: "M 480 540 L 450 540 L 420 510",
    specs: [
      { label: "Channel Architecture", value: "Extruded Serpentine" },
      { label: "Coolant Fluid", value: "50/50 Water-Glycol (WEG)" },
      { label: "Heat Rejection", value: "Up to 14.5 kW peak" },
      { label: "Base Pressure Drop", value: "< 28 kPa @ 12 L/min" },
    ],
    description: "Laser-welded aerospace aluminum cold plate beneath the cell blocks. Circulates temperature-controlled coolant to keep cell modules in their sweet spot (20°C - 35°C).",
    deepDive: {
      overview: "The liquid cooling bottom plate forms the structural floor of the pack while providing uniform heat absorption across all battery cell modules.",
      mechanism: "Micro-channel internal fins optimize convective heat transfer coefficient while keeping flow resistance minimal. Coupled to a heat pump circuit that can heat the pack in winter or chill it during 350kW ultra-fast charging.",
      telemetry: [
        { label: "Coolant Flow Rate", value: "11.8", unit: "L/min" },
        { label: "System Loop Pressure", value: "1.45", unit: "bar" },
        { label: "Thermal Resistance (Rth)", value: "0.042", unit: "K/W" },
        { label: "Extracted Heat Power", value: "5.8", unit: "kW" },
      ],
      safetyProtocol: "Dual-seal leak containment barriers and electronic glycol presence sensor in the lower tray alert BMS to isolate flow prior to any dielectric breakdown.",
    },
  },
];

const TOP_METRICS = [
  {
    label: "Pack Voltage",
    value: "350 - 800V",
    icon: Zap,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    label: "Energy Capacity",
    value: "50 - 120 kWh",
    icon: Activity,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    label: "Cooling System",
    value: "Liquid / Air",
    icon: Waves,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-300",
  },
  {
    label: "Smart Management",
    value: "BMS Controlled",
    icon: Cpu,
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    iconColor: "text-green-400",
  },
];

export function PackExplorer() {
  const [activeComponentId, setActiveComponentId] = useState<string>("cells");
  const [selectedModalComponent, setSelectedModalComponent] = useState<ComponentDetail | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isFlowActive, setIsFlowActive] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeComponent = COMPONENTS.find((c) => c.id === activeComponentId) || COMPONENTS[3]!;

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

  return (
    <section id="pack" className="space-y-6 pt-2">
      {/* ── Header Area ── */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="space-y-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-[11px] font-bold tracking-wider uppercase text-cyan-400 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Battery Technology Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Interactive{" "}
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(6,182,212,0.3)]">
              Battery Pack Explorer
            </span>
          </h2>
          <p className="text-sm text-muted-foreground/75 max-w-2xl leading-relaxed">
            Explore the structural components inside a high-voltage battery housing. Click on any component to learn its function, specifications and role in EV performance.
          </p>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {TOP_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${metric.border} bg-linear-to-br ${metric.color} backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`}
              >
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${metric.iconColor}`} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground/70 font-medium">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Center Stage Showcase Viewport ── */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[28px] border border-white/10 bg-[#070b13] p-3 sm:p-5 lg:p-6 overflow-hidden min-h-155 lg:min-h-170 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300"
      >
        {/* Futuristic Ambient Glow Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-187.5 h-187.5 bg-radial from-cyan-500/10 via-purple-600/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[32px_32px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
        </div>

        {/* 3D Model Stage Area */}
        <div
          className="relative w-full h-130 sm:h-145 lg:h-160 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: isRotating
              ? `perspective(1200px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 5}deg)`
              : "none",
          }}
        >
          {/* Main 3D Battery Pack Image Container */}
          <div
            className={`relative w-full max-w-220 h-90 sm:h-115 lg:h-135 transition-all duration-500 ${
              isExploded ? "scale-95 translate-y-3" : "scale-100"
            }`}
          >
            <Image
              src="/battery/battery-pack-hero.jpg"
              alt="High-Voltage EV Battery Pack 3D Cutaway"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 880px"
              className="object-contain filter drop-shadow-[0_25px_50px_rgba(6,182,212,0.25)] select-none pointer-events-none"
            />

            {/* Simulated Animated Coolant / Energy Flows */}
            {isFlowActive && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Glowing flow stream 1 (Busbars) */}
                <div className="absolute top-[40%] left-[32%] w-[38%] h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent blur-[1px] animate-pulse opacity-85" />
                {/* Glowing flow stream 2 (Coolant) */}
                <div className="absolute bottom-[23%] left-[36%] w-[32%] h-1.5 bg-linear-to-r from-cyan-400 via-blue-500 to-transparent blur-[2px] opacity-75 animate-pulse" />
              </div>
            )}

            {/* Glowing SVG Connector Lines (Desktop) */}
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-15"
              viewBox="0 0 1000 660"
              preserveAspectRatio="none"
            >
              <defs>
                {COMPONENTS.map((c) => (
                  <filter key={`glow-${c.id}`} id={`glow-${c.id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>

              {COMPONENTS.map((item) => {
                const isSelected = activeComponentId === item.id;
                return (
                  <g key={`svg-line-${item.id}`}>
                    <path
                      d={item.connectorPath}
                      fill="none"
                      stroke={item.color}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeOpacity={isSelected ? 0.9 : 0.4}
                      filter={`url(#glow-${item.id})`}
                      strokeDasharray={isSelected ? "none" : "3 3"}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Hotspot Pins on the Battery Pack */}
            {COMPONENTS.map((item) => {
              const isSelected = activeComponentId === item.id;
              // Map 1000x660 viewBox coords to percentages
              const pctX = (item.pinX / 1000) * 100;
              const pctY = (item.pinY / 660) * 100;

              return (
                <button
                  key={`pin-${item.id}`}
                  onClick={() => {
                    setActiveComponentId(item.id);
                    setSelectedModalComponent(item);
                  }}
                  onMouseEnter={() => setActiveComponentId(item.id)}
                  style={{ left: `${pctX}%`, top: `${pctY}%` }}
                  className="hidden lg:flex absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-25 focus:outline-none"
                  aria-label={`Inspect ${item.name}`}
                >
                  <span className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-7 h-7 rounded-full animate-ping opacity-60 transition-opacity ${
                        isSelected ? "opacity-100" : "opacity-30 group-hover:opacity-75"
                      }`}
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                        isSelected
                          ? "scale-125 bg-white border-white shadow-[0_0_15px_#fff]"
                          : "bg-black/85 border-current group-hover:scale-110"
                      }`}
                      style={{ borderColor: item.color }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Desktop Component Callout Cards with Visual Parity ── */}
          {/* Card 1: Pyro-Fuse & MSD (Top-Left) */}
          <div className="hidden lg:block absolute top-1 left-2 z-20 w-58.75">
            <ComponentCard
              item={COMPONENTS[0]!}
              isActive={activeComponentId === "pyro-fuse"}
              onHover={() => setActiveComponentId("pyro-fuse")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[0]!)}
            />
          </div>

          {/* Card 2: BMS (Top-Center) */}
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-20 w-67.5">
            <ComponentCard
              item={COMPONENTS[1]!}
              isActive={activeComponentId === "bms"}
              onHover={() => setActiveComponentId("bms")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[1]!)}
            />
          </div>

          {/* Card 3: Copper Busbars (Top-Right) */}
          <div className="hidden lg:block absolute top-1 right-2 z-20 w-60">
            <ComponentCard
              item={COMPONENTS[2]!}
              isActive={activeComponentId === "busbars"}
              onHover={() => setActiveComponentId("busbars")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[2]!)}
            />
          </div>

          {/* Card 4: Battery Cell Modules (Mid-Left) */}
          <div className="hidden lg:block absolute top-[43%] left-2 z-20 w-58.75">
            <ComponentCard
              item={COMPONENTS[3]!}
              isActive={activeComponentId === "cells"}
              onHover={() => setActiveComponentId("cells")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[3]!)}
            />
          </div>

          {/* Card 5: Voltage Sensor Node (Mid-Right) */}
          <div className="hidden lg:block absolute top-[43%] right-2 z-20 w-61.25">
            <ComponentCard
              item={COMPONENTS[4]!}
              isActive={activeComponentId === "voltage-node"}
              onHover={() => setActiveComponentId("voltage-node")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[4]!)}
            />
          </div>

          {/* Card 6: Temperature Thermistors (Bottom-Left) */}
          <div className="hidden lg:block absolute bottom-2 left-2 z-20 w-63.75">
            <ComponentCard
              item={COMPONENTS[5]!}
              isActive={activeComponentId === "thermistors"}
              onHover={() => setActiveComponentId("thermistors")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[5]!)}
            />
          </div>

          {/* Card 7: Liquid Cooling Plate (Bottom-Center/Right) */}
          <div className="hidden lg:block absolute bottom-2 left-[44%] z-20 w-66.25">
            <ComponentCard
              item={COMPONENTS[6]!}
              isActive={activeComponentId === "cooling-plate"}
              onHover={() => setActiveComponentId("cooling-plate")}
              onExplore={() => setSelectedModalComponent(COMPONENTS[6]!)}
            />
          </div>

          {/* ── Quick Actions Floating Deck (Bottom-Right) ── */}
          <div className="absolute bottom-2 right-2 z-30 p-3 rounded-2xl border border-white/10 bg-[#090d16]/95 backdrop-blur-xl shadow-2xl space-y-2 w-41.25">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/60 px-1">
              Quick Actions
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isRotating
                    ? "bg-purple-500/25 text-purple-300 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                    : "bg-white/5 text-muted-foreground hover:text-white border-transparent hover:bg-white/10"
                }`}
              >
                <RotateCw className="w-3.5 h-3.5 text-purple-400" />
                <span>3D Rotate</span>
              </button>

              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isExploded
                    ? "bg-emerald-500/25 text-emerald-300 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                    : "bg-white/5 text-muted-foreground hover:text-white border-transparent hover:bg-white/10"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exploded View</span>
              </button>

              <button
                onClick={() => setIsFlowActive(!isFlowActive)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isFlowActive
                    ? "bg-cyan-500/25 text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                    : "bg-white/5 text-muted-foreground hover:text-white border-transparent hover:bg-white/10"
                }`}
              >
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show Flow</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet Component Carousel or Selector ── */}
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Component
            </span>
            <span className="text-xs text-cyan-400 font-semibold">
              {activeComponent.category}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
            {COMPONENTS.map((item) => {
              const isSelected = activeComponentId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveComponentId(item.id);
                    setSelectedModalComponent(item);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border shrink-0 text-xs font-bold transition-all ${
                    isSelected
                      ? "border-current bg-white/10 text-white shadow-lg"
                      : "border-white/5 bg-white/2 text-muted-foreground hover:text-white"
                  }`}
                  style={{ color: isSelected ? item.color : undefined }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active mobile card preview */}
          <div
            onClick={() => setSelectedModalComponent(activeComponent)}
            className="p-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-black/40 shrink-0">
                <Image
                  src={activeComponent.image}
                  alt={activeComponent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{activeComponent.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {activeComponent.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-cyan-400">
              <span>Inspect</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: 4 Feature System Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Energy Flow */}
        <FeatureSystemCard
          icon={Zap}
          title="Energy Flow"
          subtitle="See how energy moves from cells to motor"
          accent="text-cyan-400"
          borderHover="hover:border-cyan-500/40"
          bgGlow="from-cyan-500/10 to-transparent"
          buttonBg="bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black"
          onClick={() => {
            setActiveComponentId("cells");
            setIsFlowActive(true);
          }}
        />

        {/* Card 2: Safety Systems */}
        <FeatureSystemCard
          icon={ShieldCheck}
          title="Safety Systems"
          subtitle="Learn protection mechanisms"
          accent="text-emerald-400"
          borderHover="hover:border-emerald-500/40"
          bgGlow="from-emerald-500/10 to-transparent"
          buttonBg="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black"
          onClick={() => {
            setActiveComponentId("pyro-fuse");
            setSelectedModalComponent(COMPONENTS[0]!);
          }}
        />

        {/* Card 3: Thermal Management */}
        <FeatureSystemCard
          icon={Thermometer}
          title="Thermal Management"
          subtitle="Explore cooling system"
          accent="text-amber-400"
          borderHover="hover:border-amber-500/40"
          bgGlow="from-amber-500/10 to-transparent"
          buttonBg="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black"
          onClick={() => {
            setActiveComponentId("cooling-plate");
            setSelectedModalComponent(COMPONENTS[6]!);
          }}
        />

        {/* Card 4: Performance Insights */}
        <FeatureSystemCard
          icon={BarChart3}
          title="Performance Insights"
          subtitle="View live data simulation"
          accent="text-blue-400"
          borderHover="hover:border-blue-500/40"
          bgGlow="from-blue-500/10 to-transparent"
          buttonBg="bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-black"
          onClick={() => {
            setActiveComponentId("bms");
            setSelectedModalComponent(COMPONENTS[1]!);
          }}
        />
      </div>

      {/* ── Deep Dive Engineering Modal / Inspector Drawer ── */}
      {selectedModalComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0a0f1d] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-6"
            style={{
              boxShadow: `0 0 40px ${selectedModalComponent.color}20`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedModalComponent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 bg-black/50 shrink-0 shadow-lg"
                style={{ borderColor: selectedModalComponent.color }}
              >
                <Image
                  src={selectedModalComponent.image}
                  alt={selectedModalComponent.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <div
                  className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10"
                  style={{ color: selectedModalComponent.color }}
                >
                  {selectedModalComponent.category}
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedModalComponent.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedModalComponent.subtitle}
                </p>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mb-3 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedModalComponent.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3 rounded-xl border border-white/5 bg-white/2"
                  >
                    <div className="text-[10px] text-muted-foreground/70">{spec.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-1">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Depth Engineering Overview */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Engineering Mechanism
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedModalComponent.deepDive.overview}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                  {selectedModalComponent.deepDive.mechanism}
                </p>
              </div>

              {/* Live Telemetry Data Simulation */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/2 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Live Telemetry Telemetry Stream
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse">
                    LIVE SENSOR SYNC
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedModalComponent.deepDive.telemetry.map((t) => (
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
                    {selectedModalComponent.deepDive.safetyProtocol}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>ASIL-D Automotive Certified Component</span>
              </div>
              <button
                onClick={() => setSelectedModalComponent(null)}
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

// ── Sub-Component: Callout Card on the 3D Stage ──
function ComponentCard({
  item,
  isActive,
  onHover,
  onExplore,
}: {
  item: ComponentDetail;
  isActive: boolean;
  onHover: () => void;
  onExplore: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      className={`group relative p-2.5 sm:p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 bg-linear-to-b from-[#0c121e]/95 to-[#070b13]/95 cursor-pointer ${
        isActive
          ? item.borderClass
          : "border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="relative w-10 h-10 rounded-xl overflow-hidden border bg-black/50 shrink-0 shadow-md transition-transform group-hover:scale-105"
          style={{ borderColor: item.color }}
        >
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-extrabold text-white truncate leading-tight group-hover:text-cyan-300 transition-colors">
            {item.name}
          </h4>
          <p className="text-[10px] text-muted-foreground/70 leading-tight mt-0.5 line-clamp-2">
            {item.subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onExplore();
        }}
        className="inline-flex items-center gap-1 text-[11px] font-bold transition-all group-hover:translate-x-0.5"
        style={{ color: item.color }}
      >
        <span>Explore</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// ── Sub-Component: Bottom Row Feature System Card ──
function FeatureSystemCard({
  icon: Icon,
  title,
  subtitle,
  accent,
  borderHover,
  bgGlow,
  buttonBg,
  onClick,
}: {
  icon: any;
  title: string;
  subtitle: string;
  accent: string;
  borderHover: string;
  bgGlow: string;
  buttonBg: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative p-4 rounded-2xl border border-white/5 bg-[#090d16]/80 backdrop-blur-md transition-all duration-300 cursor-pointer ${borderHover} hover:shadow-xl flex items-center justify-between gap-3 overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-r ${bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="flex items-center gap-3 min-w-0 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Icon className={`w-5 h-5 ${accent}`} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
            {title}
          </h4>
          <p className="text-[11px] text-muted-foreground/70 leading-tight truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1 ${buttonBg} relative z-10`}
      >
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}
