"use client";

import React from "react";

interface ComparisonItem {
  label: string;
  value: number;
  formattedValue: string;
  color: string;
  secondaryText?: string;
}

interface CalculatorComparisonBarProps {
  title?: string;
  subtitle?: string;
  items: ComparisonItem[];
  unit?: string;
}

export function CalculatorComparisonBar({
  title,
  subtitle,
  items,
  unit,
}: CalculatorComparisonBarProps) {
  const maxValue = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 space-y-4">
      {(title || subtitle) && (
        <div>
          {title && <h4 className="text-sm font-semibold text-white">{title}</h4>}
          {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-3.5">
        {items.map((item, idx) => {
          const percentage = Math.min(100, Math.max(8, (item.value / maxValue) * 100));

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-[#CBD5E1]">{item.label}</span>
                <span className="font-mono font-bold text-white">
                  {item.formattedValue} {unit && <span className="text-[#94A3B8] font-normal text-[11px]">{unit}</span>}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden border border-white/5 flex">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                    boxShadow: `0 0 12px ${item.color}55`,
                  }}
                />
              </div>

              {item.secondaryText && (
                <div className="text-[11px] text-[#94A3B8] flex justify-end">
                  {item.secondaryText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

