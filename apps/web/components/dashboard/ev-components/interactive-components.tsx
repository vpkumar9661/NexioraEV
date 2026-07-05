"use client";

import React, { useState, useMemo } from "react";
import { 
  Zap, Info, Cpu, Layers, Activity, HelpCircle, 
  Settings, AlertTriangle, ShieldCheck, Thermometer,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// INTERACTIVE EV ARCHITECTURE
// ==========================================

interface ArchComponent {
  id: string;
  name: string;
  specs: string;
  functionDesc: string;
}

const ARCH_COMPONENTS: ArchComponent[] = [
  { id: "battery", name: "High Voltage Battery Pack", specs: "800V DC, 82 kWh capacity", functionDesc: "Stores electrochemical energy in cells. Placed along the vehicle floorboard to lower the center of gravity." },
  { id: "motor", name: "Permanent Magnet Motor", specs: "PMSM, 16,000 max RPM", functionDesc: "Converts AC magnetic flux forces into mechanical torque. Achieving 97% grid-to-wheel efficiency." },
  { id: "inverter", name: "SiC Power Inverter", specs: "Dual Phase converter, 650A limit", functionDesc: "Converts battery DC to variable-frequency 3-phase AC. Governs motor rotation speed." },
  { id: "reducer", name: "Reduction Gearbox", specs: "Single speed, 9.05:1 ratio", functionDesc: "Reduces motor rotation speed to wheel torque. Eliminating multi-ratio transmissions." },
  { id: "bms", name: "Battery Management System", specs: "Cell telemetry nodes, CAN-link", functionDesc: "Monitors cell voltages and temperature balances. Safeguards cell cycle degradation limits." },
  { id: "cooling", name: "Liquid Cooling Loop", specs: "Active Heat Pump, dual plates", functionDesc: "Circulates liquid coolant beneath cell arrays and around motor cores to maintain ideal 25-35°C thermal windows." },
  { id: "cables", name: "HV Orange Cables", specs: "800V isolated, double copper shield", functionDesc: "Transfers high currents safely between battery pack, inverter, and fast-charge ports." }
];

export function ArchitectureExplorer() {
  const [selectedComp, setSelectedComp] = useState<ArchComponent>(ARCH_COMPONENTS[0]!);

  return (
    <section id="architecture" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Interactive EV Architecture</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Select structural chassis nodes to explore detailed engineering functions.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* SVG Interactive Chassis Layout */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex items-center justify-center relative min-h-[260px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.02),transparent_70%)] pointer-events-none" />
          
          <svg viewBox="-80 -55 160 110" className="w-full max-w-[210px] aspect-square overflow-visible">
            {/* Outline of Chassis Grid */}
            <rect x="-70" y="-35" width="140" height="70" rx="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            
            {/* Front and rear axles */}
            <line x1="-45" y1="-38" x2="-45" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="45" y1="-38" x2="45" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            
            {/* Wheels */}
            <rect x="-53" y="-42" width="16" height="8" rx="2" fill="#131722" stroke="rgba(255,255,255,0.2)" />
            <rect x="-53" y="34" width="16" height="8" rx="2" fill="#131722" stroke="rgba(255,255,255,0.2)" />
            <rect x="37" y="-42" width="16" height="8" rx="2" fill="#131722" stroke="rgba(255,255,255,0.2)" />
            <rect x="37" y="34" width="16" height="8" rx="2" fill="#131722" stroke="rgba(255,255,255,0.2)" />

            {/* Hotspot: Battery Pack (center) */}
            <rect
              x="-28" y="-22" width="56" height="44" rx="4"
              fill={selectedComp.id === "battery" ? "rgba(168,85,247,0.15)" : "transparent"}
              stroke="#8B5CF6" strokeWidth={selectedComp.id === "battery" ? 1.5 : 0.6}
              onClick={() => setSelectedComp(ARCH_COMPONENTS[0]!)}
              className="cursor-pointer transition-colors"
            />
            <text x="0" y="3" fill="rgba(255,255,255,0.25)" fontSize="5" textAnchor="middle" pointerEvents="none">BATTERY CELL ARRAY</text>

            {/* Hotspot: Front Motor + Inverter (front axle) */}
            <rect
              x="-53" y="-12" width="16" height="24" rx="2"
              fill={selectedComp.id === "motor" ? "rgba(34,211,238,0.15)" : "transparent"}
              stroke="#22D3EE" strokeWidth={selectedComp.id === "motor" ? 1.5 : 0.6}
              onClick={() => setSelectedComp(ARCH_COMPONENTS[1]!)}
              className="cursor-pointer transition-colors"
            />
            
            {/* Hotspot: Inverter controller (above motor) */}
            <rect
              x="-35" y="-12" width="10" height="24" rx="1.5"
              fill={selectedComp.id === "inverter" ? "rgba(16,185,129,0.15)" : "transparent"}
              stroke="#10B981" strokeWidth={selectedComp.id === "inverter" ? 1.5 : 0.6}
              onClick={() => setSelectedComp(ARCH_COMPONENTS[2]!)}
              className="cursor-pointer transition-colors"
            />

            {/* Hotspot: Orange cabling tracks */}
            <path
              d="M -25,0 L -30,0"
              fill="none"
              stroke={selectedComp.id === "cables" ? "#EF4444" : "rgba(255,255,255,0.2)"}
              strokeWidth="1.2"
              onClick={() => setSelectedComp(ARCH_COMPONENTS[6]!)}
              className="cursor-pointer transition-colors"
            />
          </svg>
        </div>

        {/* Readout Specifications details */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          <div className="p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 flex-1">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">{selectedComp.name}</span>
            </div>
            
            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Operational Specs</span>
                <strong className="text-xs text-white block mt-1">{selectedComp.specs}</strong>
              </div>
              <div>
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Engineering Function</span>
                <p className="text-xs text-[#AEB5C0]/80 mt-1 leading-relaxed">{selectedComp.functionDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {ARCH_COMPONENTS.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedComp(c)}
                className={`py-1.5 rounded-lg border text-[9px] font-extrabold cursor-pointer transition-colors ${
                  selectedComp.id === c.id
                    ? "bg-white/5 border-cyan-500/40 text-[#22D3EE]"
                    : "bg-white/2 border-white/5 text-[#AEB5C0]/65 hover:text-white"
                }`}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Explode structural component layers to inspect powertrain layout depths.</p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-black/40 p-6 flex flex-col items-center justify-between min-h-[320px] relative">
        <button
          onClick={() => setExplode(!explode)}
          className="absolute top-4 right-4 px-4 py-1.5 rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-bold hover:bg-[#22D3EE]/20 transition-all cursor-pointer z-10"
        >
          {explode ? "Collapse Assembly" : "Explode Assembly"}
        </button>

        <div className="flex-1 w-full flex items-center justify-center relative py-6">
          <svg viewBox="-120 -80 240 160" className="w-full max-w-[280px] aspect-square overflow-visible">
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Trace structural voltage path steps from the storage pack down to wheel axles.</p>
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
              <span className="text-[10px] text-[#AEB5C0]/50 block">{step.desc}</span>
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Compare stator vector magnets layouts and mechanical torque profiles.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Graph torque RPM and selectors */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest block">Choose Motor Type</span>
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
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Torque-RPM curves plotting</span>
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
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Target Efficiency</span>
              <strong className="text-sm text-cyan-300 block mt-0.5">{selectedMotor.efficiency}</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Max Speed Threshold</span>
              <strong className="text-xs text-white block mt-0.5">{selectedMotor.speed}</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Continuous Torque</span>
              <strong className="text-xs text-white block mt-0.5">{selectedMotor.torque}</strong>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 border-t border-white/5 pt-4 text-[11px] leading-relaxed">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block mb-1">Key Advantage</span>
              <p className="text-[#AEB5C0]">{selectedMotor.advantages}</p>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase block mb-1">Grid Limit</span>
              <p className="text-[#AEB5C0]">{selectedMotor.limitations}</p>
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Understand Pulse Width Modulations (PWM) and transistor gates configurations.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#22D3EE]">
            <Cpu className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Silicon Carbide (SiC) Technology</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            Silicon Carbide transistors switch currents at far higher frequencies compared to standard silicon switches. This shrinks heat dissipation loads by up to 70%, decreasing cooling requirements and boosting overall system efficiency.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#22D3EE]">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Pulse-Width Modulation (PWM)</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            Chopping DC voltage into pulses creates simulated AC sine waves. Adjusting the width of these pulses controls the motor's speed and torque directly.
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Examine regenerative brake recovery and multi-link active suspension mechanics.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-cyan-400">
            <Activity className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Regenerative Brake Recovery</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            By reversing rotor electromagnetic fields during deceleration, traction motors act as electrical generators. Redirecting kinetic vehicle energy back into chemical battery packs, recapturing up to 25% range.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-cyan-400">
            <Settings className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Multi-Link Independent Suspension</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Trace cell jacket plate liquid lines and HVAC heat pump flow directions.</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex gap-2 items-center text-[#22D3EE]">
            <Thermometer className="w-4.5 h-4.5 animate-pulse" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Ethylene-Glycol Loop Routing</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/75 leading-relaxed">
            Pumps liquid coolant beneath cell module trays to absorb heat. Reroutes warm water arrays to preheat battery cells in cold climates, maximizing ion motility efficiency.
          </p>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2 items-center text-[#22D3EE]">
            <Layers className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Active HVAC Heat Pumps</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/75 leading-relaxed">
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
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Review contactors isolation barriers and pyro-fuse cutoff triggers.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-rose-400">
            <AlertTriangle className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">HV Isolation Contactors</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            Relays inside the battery container isolate high voltage inputs. They instantly snap open in an accident, separating cell voltage grids from auxiliary cabling routes.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-rose-400">
            <ShieldCheck className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Emergency Pyro-Fuse Cutoff</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/80 leading-relaxed">
            A fast-acting fuse blown by a micro-explosive charge triggered by the BMS. Cuts pack currents within milliseconds during short-circuits.
          </p>
        </div>
      </div>
    </section>
  );
}
