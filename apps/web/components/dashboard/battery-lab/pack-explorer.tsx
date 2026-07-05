"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ComponentItem {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  desc: string;
  isCircle?: boolean;
}

const ITEMS: ComponentItem[] = [
  { id: "cells", label: "Battery Cell Modules", x: 60, y: 80, w: 100, h: 50, color: "#10B981", desc: "Individual cylindrical or prismatic cells stacked in series & parallel configurations. Forms the core energy unit of the pack." },
  { id: "cooling", label: "Liquid Cooling Plate", x: 60, y: 140, w: 230, h: 10, color: "#3B82F6", desc: "Located beneath or between cells. Circulation of glycol coolant maintains cells at the ideal target window of 25°C." },
  { id: "busbars", label: "Copper Busbars", x: 170, y: 85, w: 120, h: 15, color: "#F59E0B", desc: "Thick metallic conductors that physically connect cell terminals together to transfer high currents safely." },
  { id: "bms", label: "Battery Management System", x: 190, y: 40, w: 100, h: 30, color: "#8B5CF6", desc: "The electronic brain. Controls cell safety parameters, communicates telemetry to vehicle networks, and manages balancing." },
  { id: "fuse", label: "Pyro-Fuse & MSD", x: 70, y: 45, w: 40, h: 25, color: "#EF4444", desc: "Safety pyrotechnic disconnect which blows in microseconds during crash detections or over-current faults." },
  { id: "voltage", label: "Voltage Sensor Node", x: 260, y: 110, w: 15, h: 15, color: "#06B6D4", desc: "BMS node monitoring line voltages across cell configurations to detect imbalance conditions.", isCircle: true },
  { id: "temp", label: "Temp Thermistors", x: 120, y: 110, w: 15, h: 15, color: "#EC4899", desc: "Negative temperature coefficient thermal sensors distributed to map cooling performance inside modules.", isCircle: true }
];

export function PackExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = ITEMS.find((x) => x.id === activeId);

  return (
    <section id="pack" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Interactive Battery Pack Explorer</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Explore structural components inside a high-voltage battery housing</p>
      </div>

      <div className="relative rounded-[20px] border border-white/5 bg-white/[0.02] overflow-hidden min-h-[380px] flex flex-col justify-between">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#10B981_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* SVG Drawing */}
        <div className="flex-1 flex justify-center items-center">
          <svg className="w-full max-w-[500px] h-[280px] p-4" viewBox="0 0 350 200" fill="none">
            {/* Battery Pack Outer shell */}
            <rect x="40" y="30" width="270" height="130" rx="12" fill="#131722" fillOpacity="0.4" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            
            {/* Hover shapes mapping */}
            {ITEMS.map((item) => (
              <g
                key={item.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              >
                {item.isCircle ? (
                  <circle
                    cx={item.x + item.w / 2}
                    cy={item.y + item.h / 2}
                    r={item.w / 2}
                    fill={activeId === item.id ? item.color : "#131722"}
                    fillOpacity={activeId === item.id ? 0.35 : 0.9}
                    stroke={item.color}
                    strokeWidth={activeId === item.id ? 2 : 1}
                    opacity={activeId === item.id ? 1 : 0.75}
                  />
                ) : (
                  <rect
                    x={item.x}
                    y={item.y}
                    width={item.w}
                    height={item.h}
                    rx={6}
                    fill={activeId === item.id ? item.color : "#131722"}
                    fillOpacity={activeId === item.id ? 0.15 : 0.8}
                    stroke={item.color}
                    strokeWidth={activeId === item.id ? 2 : 1}
                    opacity={activeId === item.id ? 1 : 0.75}
                  />
                )}
                <text
                  x={item.x + item.w / 2}
                  y={item.y - 4}
                  textAnchor="middle"
                  fill={activeId === item.id ? "white" : item.color}
                  fontSize="7.5"
                  fontWeight="bold"
                  opacity={0.8}
                >
                  {item.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Panel popup descriptor */}
        {activeItem && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[320px] p-5 rounded-[16px] border border-white/10 bg-[#131722]/95 backdrop-blur-xl shadow-xl z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: activeItem.color }} />
                <h4 className="text-sm font-bold text-white">{activeItem.label}</h4>
              </div>
              <button
                onClick={() => setActiveId(null)}
                className="text-[#AEB5C0]/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12px] text-[#AEB5C0]/85 leading-relaxed">{activeItem.desc}</p>
          </div>
        )}
      </div>
    </section>
  );
}
