"use client";

import React from "react";
import { CloudRain, Sun, Compass, Sliders, Thermometer, Wind } from "lucide-react";

interface WeatherEngine {
  temp: number;
  humidity: number;
  road: "dry" | "wet" | "ice" | "sand";
}

interface WeatherModesProps {
  weather: WeatherEngine;
  onWeatherChange: (updates: Partial<WeatherEngine>) => void;
  drivingMode: string;
  onModeChange: (mode: string) => void;
}

const MODES = [
  { id: "eco", label: "Eco Savings" },
  { id: "city", label: "Urban City" },
  { id: "normal", label: "Normal Balance" },
  { id: "sport", label: "Sport Peak" },
  { id: "performance", label: "Performance Max" },
  { id: "towing", label: "Heavy Tow" }
];

export function WeatherModes({
  weather,
  onWeatherChange,
  drivingMode,
  onModeChange
}: WeatherModesProps) {
  return (
    <div className="w-full grid lg:grid-cols-12 gap-6 items-stretch relative z-25">
      
      {/* Weather Engine Controllers Left */}
      <div className="lg:col-span-6 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md space-y-4">
        <span className="text-[10px] text-muted-foreground/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">
          Weather & Road surface Engine
        </span>

        <div className="grid grid-cols-2 gap-4 text-xs">
          {/* Temperature slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-muted-foreground/50 uppercase flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" /> Temp
              </span>
              <span className="text-white">{weather.temp}°C</span>
            </div>
            <input
              type="range"
              min="-15"
              max="50"
              value={weather.temp}
              onChange={(e) => onWeatherChange({ temp: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Humidity slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-muted-foreground/50 uppercase flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" /> Humidity
              </span>
              <span className="text-white">{weather.humidity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weather.humidity}
              onChange={(e) => onWeatherChange({ humidity: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Road Surface Options */}
        <div className="space-y-1.5 text-xs pt-1.5">
          <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Road Surface Condition</span>
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: "dry", label: "Dry Asphalt" },
              { id: "wet", label: "Wet Rain" },
              { id: "ice", label: "Frozen Ice" },
              { id: "sand", label: "Loose Sand" }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => onWeatherChange({ road: r.id as any })}
                className={`py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                  weather.road === r.id
                    ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-300"
                    : "bg-white/2 border-white/5 text-muted-foreground/65 hover:text-white"
                }`}
              >
                {r.label.split(" ")[1] || r.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Driving Modes Right */}
      <div className="lg:col-span-6 p-5 rounded-[20px] border border-white/5 bg-white/2 backdrop-blur-md flex flex-col justify-between gap-4">
        <div>
          <span className="text-[10px] text-muted-foreground/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">
            Active Drive Modes
          </span>
          
          <div className="grid grid-cols-3 gap-1 mt-4">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => onModeChange(m.id)}
                className={`py-2 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                  drivingMode === m.id
                    ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.06)]"
                    : "bg-white/2 border-white/5 text-muted-foreground/65 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground/60 leading-relaxed bg-white/1 p-3 rounded-xl border border-white/5">
          * Mode switches immediately adjust inverter continuous switching thresholds, throttling maximum torque power limit ranges.
        </p>
      </div>

    </div>
  );
}
export type { WeatherEngine };
