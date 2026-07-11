"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Battery, RefreshCcw, DollarSign, Activity } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<any>;
  color: string;
  glowColor: string;
  sparklinePoints: number[];
}

function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  glowColor,
  sparklinePoints,
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);

  const svgWidth = 100;
  const svgHeight = 30;
  const maxVal = Math.max(...sparklinePoints);
  const minVal = Math.min(...sparklinePoints);
  const valRange = maxVal - minVal || 1;

  const pointsString = sparklinePoints
    .map((val, idx) => {
      const x = (idx / (sparklinePoints.length - 1)) * svgWidth;
      const y = svgHeight - 2 - ((val - minVal) / valRange) * (svgHeight - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className="relative p-5 rounded-[20px] border border-white/8 bg-white/3 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
      style={{
        boxShadow: hovered
          ? `0 16px 32px -8px rgba(0,0,0,0.6), 0 0 20px 0 ${glowColor}20, inset 0 1px 1px rgba(255,255,255,0.08)`
          : "0 10px 20px -10px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.03)",
      }}
    >
      {/* Light sweep sweep shimmer */}
      {hovered && (
        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[glass-shimmer_1.5s_ease-out_infinite]" />
      )}

      {/* Background glow ball */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 transition-opacity duration-300"
        style={{ background: color }}
      />

      <div className="flex justify-between items-start">
        <div className="space-y-1 z-10">
          <p className="text-[11px] font-extrabold text-muted-foreground/50 uppercase tracking-widest leading-none">
            {label}
          </p>
          <h3 className="text-2xl font-black text-white tracking-tight pt-1">
            {value}
          </h3>
        </div>

        <div
          className="p-2.5 rounded-xl border transition-all duration-300 z-10"
          style={{
            background: `${color}10`,
            borderColor: hovered ? `${color}40` : `${color}20`,
          }}
        >
          <Icon
            className="w-5 h-5 transition-transform duration-500"
            style={{
              color: color,
              transform: hovered ? "rotate(15deg) scale(1.1)" : "none",
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 z-10 relative">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              changeType === "positive"
                ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
                : changeType === "negative"
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                : "bg-white/5 text-muted-foreground/65 border border-white/10"
            }`}
          >
            {change}
          </span>
          <span className="text-[10px] text-muted-foreground/40 font-bold">vs last month</span>
        </div>

        {/* Sparkline chart */}
        <div className="w-[80px] h-[30px] opacity-70 hover:opacity-100 transition-opacity">
          <svg className="w-full h-full overflow-visible">
            <path
              d={`M ${pointsString}`}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M 0,${svgHeight} L ${pointsString} L ${svgWidth},${svgHeight} Z`}
              fill={`url(#areaGrad-${label.replace(/\s+/g, "")})`}
              opacity="0.1"
            />
            <defs>
              <linearGradient id={`areaGrad-${label.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function BatteryStats() {
  const statsData: StatCardProps[] = [
    {
      label: "Average SOH",
      value: "94.8%",
      change: "+0.4%",
      changeType: "positive",
      icon: ShieldCheck,
      color: "#10B981", // Emerald
      glowColor: "#10B981",
      sparklinePoints: [94.1, 94.2, 94.3, 94.5, 94.4, 94.6, 94.7, 94.8],
    },
    {
      label: "Average SOC",
      value: "68.2%",
      change: "Nominal",
      changeType: "neutral",
      icon: Battery,
      color: "#84CC16", // Battery Lime
      glowColor: "#84CC16",
      sparklinePoints: [55, 60, 48, 70, 80, 62, 58, 68.2],
    },
    {
      label: "BESS Cycle Count",
      value: "1,248",
      change: "+4.2%",
      changeType: "positive",
      icon: RefreshCcw,
      color: "#00D4FF", // Electric Cyan
      glowColor: "#00D4FF",
      sparklinePoints: [1180, 1190, 1200, 1215, 1222, 1230, 1240, 1248],
    },
    {
      label: "Energy Dispensed",
      value: "4.82 MWh",
      change: "+15.8%",
      changeType: "positive",
      icon: Zap,
      color: "#EC4899", // Neon Pink
      glowColor: "#EC4899",
      sparklinePoints: [3.8, 3.9, 4.1, 4.2, 4.4, 4.5, 4.7, 4.82],
    },
    {
      label: "System Efficiency",
      value: "92.4%",
      change: "+0.6%",
      changeType: "positive",
      icon: Activity,
      color: "#A78BFA", // Electric Purple
      glowColor: "#A78BFA",
      sparklinePoints: [91.5, 91.8, 91.6, 92.0, 92.1, 92.2, 92.3, 92.4],
    },
    {
      label: "Lifetime Savings",
      value: "$42,912",
      change: "+$3.4k",
      changeType: "positive",
      icon: DollarSign,
      color: "#F59E0B", // Gold
      glowColor: "#F59E0B",
      sparklinePoints: [38.5, 39.1, 39.9, 40.5, 41.2, 41.8, 42.4, 42.9],
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {statsData.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </section>
  );
}
