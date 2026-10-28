"use client";

import React, { ReactNode } from "react";

interface CalculatorResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  badge?: {
    text: string;
    variant?: "green" | "cyan" | "amber" | "emerald";
  };
  icon?: ReactNode;
  accent?: "green" | "cyan" | "white" | "amber";
  className?: string;
}

export function CalculatorResultCard({
  label,
  value,
  unit,
  subValue,
  badge,
  icon,
  accent = "green",
  className = "",
}: CalculatorResultCardProps) {
  const accentColors = {
    green: {
      border: "border-[#00E676]/30",
      glow: "hover:border-[#00E676]/50 shadow-[#00E676]/5",
      text: "text-[#00E676]",
    },
    cyan: {
      border: "border-[#00D4FF]/30",
      glow: "hover:border-[#00D4FF]/50 shadow-[#00D4FF]/5",
      text: "text-[#00D4FF]",
    },
    amber: {
      border: "border-amber-400/30",
      glow: "hover:border-amber-400/50 shadow-amber-400/5",
      text: "text-amber-400",
    },
    white: {
      border: "border-white/10",
      glow: "hover:border-white/20",
      text: "text-white",
    },
  };

  const badgeStyles = {
    green: "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30",
    cyan: "bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30",
    amber: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  const currentTheme = accentColors[accent];

  return (
    <div
      className={`relative rounded-2xl bg-white/3 backdrop-blur-xl border ${currentTheme.border} p-5 transition-all shadow-lg ${currentTheme.glow} ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-[#94A3B8]">{label}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/80">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${currentTheme.text}`}>
          {value}
        </span>
        {unit && <span className="text-xs font-semibold text-[#94A3B8]">{unit}</span>}
      </div>

      {subValue && <p className="text-xs text-[#CBD5E1]/80 mt-1">{subValue}</p>}

      {badge && (
        <div className="mt-3">
          <span
            className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              badgeStyles[badge.variant || "green"]
            }`}
          >
            {badge.text}
          </span>
        </div>
      )}
    </div>
  );
}

