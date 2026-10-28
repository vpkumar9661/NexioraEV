"use client";

import React from "react";
import { AlertCircle, Minus, Plus } from "lucide-react";

interface CalculatorInputFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  prefix?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export function CalculatorInputField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  unit,
  prefix,
  helperText,
  error,
  disabled = false,
}: CalculatorInputFieldProps) {
  const handleIncrement = () => {
    const nextVal = (Number(value) || 0) + step;
    if (max !== undefined && nextVal > max) return;
    onChange(Math.round(nextVal * 100) / 100);
  };

  const handleDecrement = () => {
    const nextVal = (Number(value) || 0) - step;
    if (min !== undefined && nextVal < min) return;
    onChange(Math.round(nextVal * 100) / 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      onChange(0);
    } else {
      onChange(val);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-[#CBD5E1]">
          {label}
        </label>
        {unit && <span className="text-[10px] font-medium text-[#94A3B8]">{unit}</span>}
      </div>

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-xs font-bold text-[#94A3B8] pointer-events-none">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="number"
          value={isNaN(value) ? "" : value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`w-full h-11 rounded-xl bg-black/40 border text-sm font-semibold text-white transition-all outline-none ${
            prefix ? "pl-8" : "pl-3.5"
          } pr-20 ${
            error
              ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
              : "border-white/10 focus:border-[#00E676]/60 focus:ring-2 focus:ring-[#00E676]/15 hover:border-white/20"
          }`}
        />

        {/* Increment / Decrement Stepper Buttons */}
        <div className="absolute right-1.5 flex items-center gap-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Decrease"
          >
            <Minus className="size-3" />
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && value >= max)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Increase"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>

      {/* Helper text or Error message */}
      {error ? (
        <p className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
          <AlertCircle className="size-3 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[#94A3B8]/75 leading-tight">{helperText}</p>
      ) : null}
    </div>
  );
}

