"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface Option<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface CalculatorSelectProps<T extends string> {
  id: string;
  label: string;
  value: T;
  onChange: (val: T) => void;
  options: Option<T>[];
  helperText?: string;
  disabled?: boolean;
}

export function CalculatorSelect<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
  disabled = false,
}: CalculatorSelectProps<T>) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-[#CBD5E1]">
          {label}
        </label>
      </div>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          disabled={disabled}
          className="w-full h-11 appearance-none rounded-xl bg-black/40 border border-white/10 px-3.5 pr-10 text-xs font-medium text-white transition-all outline-none focus:border-[#00E676]/60 focus:ring-2 focus:ring-[#00E676]/15 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0B101B] text-white">
              {opt.label} {opt.description ? `— ${opt.description}` : ""}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#94A3B8]">
          <ChevronDown className="size-4" />
        </div>
      </div>

      {helperText && <p className="text-[11px] text-[#94A3B8]">{helperText}</p>}
    </div>
  );
}
