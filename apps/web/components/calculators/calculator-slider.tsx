"use client";

import React from "react";

interface CalculatorSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  helperText?: string;
  marks?: { value: number; label: string }[];
  accentColor?: "green" | "cyan";
  disabled?: boolean;
}

export function CalculatorSlider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  helperText,
  marks,
  accentColor = "green",
  disabled = false,
}: CalculatorSliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const activeColor = accentColor === "cyan" ? "#00D4FF" : "#00E676";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-[#CBD5E1]">
          {label}
        </label>
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded-md border"
          style={{
            color: activeColor,
            borderColor: `${activeColor}33`,
            backgroundColor: `${activeColor}11`,
          }}
        >
          {value} {unit}
        </span>
      </div>

      <div className="relative pt-1 pb-1">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`,
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-[#00E676] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        />

        {marks && marks.length > 0 && (
          <div className="flex justify-between text-[10px] text-[#64748B] font-mono mt-1 px-0.5">
            {marks.map((m) => (
              <span
                key={m.value}
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => !disabled && onChange(m.value)}
              >
                {m.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {helperText && <p className="text-[11px] text-[#94A3B8]">{helperText}</p>}
    </div>
  );
}
