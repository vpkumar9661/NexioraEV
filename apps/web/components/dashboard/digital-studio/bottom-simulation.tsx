"use client";

import React, { useState, useMemo } from "react";
import { 
  Play, Pause, FastForward, Activity, Flame, ShieldAlert 
} from "lucide-react";
import { motion } from "framer-motion";

interface BottomSimulationProps {
  drivingMode: string;
  onModeChange: (mode: string) => void;
  platform: string;
  motor: string;
}

const MODES = [
  { id: "eco", label: "Eco Eco-drive" },
  { id: "city", label: "Urban City" },
  { id: "normal", label: "Normal Baseline" },
  { id: "sport", label: "Sport Phase" },
  { id: "track", label: "Track Dynamic" },
  { id: "towing", label: "High Torque Tow" }
];

export function BottomSimulation({
  drivingMode,
  onModeChange,
  platform,
  motor
}: BottomSimulationProps) {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);

  const stats = useMemo(() => {
    let baseRPM = 4500;
    let baseTorque = 280;
    let efficiency = 92;

    if (drivingMode === "eco") {
      baseRPM = 2800;
      baseTorque = 150;
      efficiency = 96;
    } else if (drivingMode === "sport") {
      baseRPM = 9500;
      baseTorque = 420;
      efficiency = 90;
    } else if (drivingMode === "track") {
      baseRPM = 14500;
      baseTorque = 550;
      efficiency = 85;
    } else if (drivingMode === "towing") {
      baseRPM = 3200;
      baseTorque = 680;
      efficiency = 88;
    }

    const powerLoss = parseFloat(((100 - efficiency) * 0.45 * speed).toFixed(1));

    return { rpm: baseRPM * speed, torque: baseTorque, powerLoss };
  }, [drivingMode, speed]);

  return (
    <div className="w-full grid lg:grid-cols-12 gap-6 items-stretch relative z-20">
      
      {/* LEFT: Driving Modes & Timeline Flow */}
      <div className="lg:col-span-6 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md flex flex-col justify-between gap-4">
        <div>
          <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest block">Simulation Timeline</span>
          <div className="grid grid-cols-3 gap-1 mt-2.5">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => onModeChange(m.id)}
                className={`py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                  drivingMode === m.id
                    ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.08)]"
                    : "bg-white/2 border-white/5 text-muted-foreground/65 hover:text-white"
                }`}
              >
                {m.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Path Flow animation */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between gap-3">
          <div className="flex justify-between items-center text-[9px] text-muted-foreground/45 font-bold uppercase">
            <span>Grid energy flow vector</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-0.5 rounded bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              >
                {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setSpeed((s) => (s === 1 ? 2 : 1))}
                className={`p-0.5 rounded text-white cursor-pointer ${speed === 2 ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5"}`}
              >
                <FastForward className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Energy Path SVG animation flow */}
          <div className="flex items-center justify-center relative py-1.5">
            <svg viewBox="0 0 200 40" className="w-full max-w-[260px] overflow-visible">
              {/* Battery cell node */}
              <rect x="5" y="10" width="30" height="20" rx="3" fill="#1F1235" stroke="#8B5CF6" />
              <text x="20" y="22" fill="#C084FC" fontSize="4.5" textAnchor="middle" fontWeight="bold">PACK</text>

              <line x1="35" y1="20" x2="85" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

              {/* Inverter controller */}
              <rect x="85" y="10" width="30" height="20" rx="3" fill="#0B2B28" stroke="#10B981" />
              <text x="100" y="22" fill="#10B981" fontSize="4.5" textAnchor="middle" fontWeight="bold">INVERTER</text>

              <line x1="115" y1="20" x2="165" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

              {/* Motor engine core */}
              <rect x="165" y="10" width="30" height="20" rx="3" fill="#0D2530" stroke="#22D3EE" />
              <text x="180" y="22" fill="#22D3EE" fontSize="4.5" textAnchor="middle" fontWeight="bold">MOTOR</text>

              {/* Pulse vectors */}
              {isRunning && (
                <motion.circle
                  cx="20"
                  cy="20"
                  r="2.5"
                  fill="#22D3EE"
                  animate={{
                    cx: [20, 100, 180],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2.2 / speed,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT: Real-Time Curves */}
      <div className="lg:col-span-6 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center">
          <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest">Real-Time Power Curves</span>
          <span className="text-[9.5px] font-bold text-red-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 animate-pulse" /> Heat loss: {stats.powerLoss} kW
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center relative py-2">
          <svg viewBox="0 0 200 80" className="w-full h-full max-h-[100px] overflow-visible">
            <line x1="15" y1="5" x2="15" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            <line x1="15" y1="70" x2="190" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

            {/* Torque Curve: Solid line */}
            {drivingMode === "sport" || drivingMode === "track" ? (
              // Flat high torque drop off early
              <path d="M 15,20 L 70,20 C 110,25 150,55 185,68" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
            ) : (
              // Standard baseline
              <path d="M 15,35 L 90,35 C 120,40 150,60 185,68" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
            )}

            {/* Power Curve: Dash line */}
            {drivingMode === "sport" || drivingMode === "track" ? (
              <path d="M 15,65 Q 110,10 185,35" fill="none" stroke="#A855F7" strokeWidth="1.2" strokeDasharray="3 3" />
            ) : (
              <path d="M 15,68 Q 110,30 185,45" fill="none" stroke="#A855F7" strokeWidth="1.2" strokeDasharray="3 3" />
            )}

            <text x="15" y="77" fill="rgba(255,255,255,0.25)" fontSize="5.5">0 RPM</text>
            <text x="190" y="77" fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="end">16,000 RPM</text>

            {/* Indicator keys */}
            <g transform="translate(140, 5)">
              <rect x="0" y="0" width="3" height="3" fill="#22D3EE" />
              <text x="5" y="3" fill="rgba(255,255,255,0.3)" fontSize="4.5">Torque</text>
              
              <rect x="25" y="0" width="3" height="3" fill="#A855F7" />
              <text x="30" y="3" fill="rgba(255,255,255,0.3)" fontSize="4.5">Power</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
