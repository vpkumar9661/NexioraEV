"use client";

import { useState } from "react";
import { X } from "lucide-react";

const COMPONENTS = [
  { id: "battery", label: "Battery Pack", x: 80, y: 160, w: 90, h: 50, color: "#8B5CF6", desc: "Stores electrical energy using lithium-ion or LFP cells. Provides power to the electric motor through a high-voltage DC bus." },
  { id: "motor", label: "Electric Motor", x: 230, y: 140, w: 70, h: 70, color: "#A78BFA", desc: "Converts electrical energy into rotational mechanical energy. Achieves 90-95% efficiency compared to 25-30% for ICE engines.", isCircle: true },
  { id: "controller", label: "Controller", x: 170, y: 90, w: 65, h: 35, color: "#7C3AED", desc: "The brain of the EV. Manages power distribution, regenerative braking, thermal management, and motor speed control." },
  { id: "chargeport", label: "Charging Port", x: 50, y: 85, w: 40, h: 45, color: "#3B82F6", desc: "Accepts AC (Level 1/2) or DC fast charging. Supports CCS2, CHAdeMO, or Tesla NACS connectors." },
  { id: "cooling", label: "Cooling System", x: 310, y: 100, w: 60, h: 30, color: "#06B6D4", desc: "Liquid thermal management system maintaining battery and motor temperatures within safe operating ranges (20-40°C)." },
  { id: "regen", label: "Regen Braking", x: 320, y: 190, w: 55, h: 35, color: "#10B981", desc: "Captures kinetic energy during deceleration and converts it back to electrical energy, recovering up to 30% of range." },
];

export function EVExplorer() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const active = COMPONENTS.find((c) => c.id === activeComponent);

  return (
    <section id="explorer" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Interactive EV Explorer</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Hover or tap on components to learn about each part of an Electric Vehicle</p>
      </div>

      <div className="relative rounded-[20px] border border-white/5 bg-white/2 overflow-hidden min-h-[380px]">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] bg-size-[16px_16px]" />

        <svg className="w-full h-full p-4" viewBox="0 0 450 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Car body outline */}
          <path d="M 60,220 C 80,210 120,195 200,185 C 280,175 340,185 380,205 L 395,215 L 50,225 Z" fill="#131722" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.4" />
          <ellipse cx="220" cy="240" rx="140" ry="8" fill="#8B5CF6" opacity="0.05" />

          {/* Interactive component boxes */}
          {COMPONENTS.map((comp) => (
            <g
              key={comp.id}
              className="cursor-pointer"
              onMouseEnter={() => setActiveComponent(comp.id)}
              onMouseLeave={() => setActiveComponent(null)}
              onClick={() => setActiveComponent(activeComponent === comp.id ? null : comp.id)}
            >
              {comp.isCircle ? (
                <circle
                  cx={comp.x + comp.w / 2}
                  cy={comp.y + comp.h / 2}
                  r={comp.w / 2}
                  fill={activeComponent === comp.id ? comp.color : "#131722"}
                  fillOpacity={activeComponent === comp.id ? 0.2 : 1}
                  stroke={comp.color}
                  strokeWidth={activeComponent === comp.id ? 2 : 1.2}
                  opacity={activeComponent === comp.id ? 1 : 0.7}
                />
              ) : (
                <rect
                  x={comp.x}
                  y={comp.y}
                  width={comp.w}
                  height={comp.h}
                  rx={8}
                  fill={activeComponent === comp.id ? comp.color : "#131722"}
                  fillOpacity={activeComponent === comp.id ? 0.15 : 1}
                  stroke={comp.color}
                  strokeWidth={activeComponent === comp.id ? 2 : 1.2}
                  opacity={activeComponent === comp.id ? 1 : 0.7}
                />
              )}
              <text
                x={comp.x + comp.w / 2}
                y={comp.y - 6}
                textAnchor="middle"
                fill={activeComponent === comp.id ? "#fff" : comp.color}
                fontSize="8"
                fontWeight="bold"
              >
                {comp.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>

        {/* Info popup panel */}
        {active && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[320px] p-5 rounded-[16px] border border-white/10 bg-[#131722]/95 backdrop-blur-xl shadow-xl z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: active.color }} />
                <h4 className="text-sm font-bold text-white">{active.label}</h4>
              </div>
              <button
                onClick={() => setActiveComponent(null)}
                className="text-[#AEB5C0]/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12.5px] text-[#AEB5C0]/80 leading-relaxed">{active.desc}</p>
          </div>
        )}
      </div>
    </section>
  );
}
