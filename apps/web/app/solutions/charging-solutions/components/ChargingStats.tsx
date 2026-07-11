"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Activity, DollarSign, Battery, RefreshCcw, TrendingUp } from "lucide-react";

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

  // Convert sparklinePoints to SVG path coordinates
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
      {/* Light sweep animation on hover */}
      {hovered && (
        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[glass-shimmer_1.5s_ease-out_infinite]" />
      )}

      {/* Floating Background Glow */}
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
                ? "bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20"
                : changeType === "negative"
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                : "bg-white/5 text-muted-foreground/60 border border-white/10"
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
            {/* Soft gradient fill below path */}
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

export function ChargingStats() {
  const statsData: StatCardProps[] = [
    {
      label: "Total Charging Stations",
      value: "14,820",
      change: "+12.4%",
      changeType: "positive",
      icon: Battery,
      color: "#00D4FF", // Electric Cyan
      glowColor: "#00D4FF",
      sparklinePoints: [10, 12, 11, 14, 15, 13, 17, 18],
    },
    {
      label: "Fast Chargers Installed",
      value: "3,948",
      change: "+24.8%",
      changeType: "positive",
      icon: Zap,
      color: "#00E676", // Electric Green
      glowColor: "#00E676",
      sparklinePoints: [8, 9, 12, 11, 14, 13, 16, 17],
    },
    {
      label: "Average Charging Cost",
      value: "$0.14 / kWh",
      change: "-3.2%",
      changeType: "positive", // negative change in cost is positive for users
      icon: DollarSign,
      color: "#3B82F6", // Electric Blue
      glowColor: "#3B82F6",
      sparklinePoints: [16, 15, 15, 14, 14.5, 13.8, 14.1, 14.0],
    },
    {
      label: "Charging Efficiency",
      value: "94.2%",
      change: "+0.8%",
      changeType: "positive",
      icon: RefreshCcw,
      color: "#A78BFA", // Electric Violet
      glowColor: "#A78BFA",
      sparklinePoints: [93.1, 93.4, 93.2, 93.8, 94.0, 93.9, 94.1, 94.2],
    },
    {
      label: "Daily Sessions",
      value: "42,912",
      change: "+8.9%",
      changeType: "positive",
      icon: Activity,
      color: "#EC4899", // Neon Pink
      glowColor: "#EC4899",
      sparklinePoints: [35, 38, 36, 40, 39, 41, 40, 43],
    },
    {
      label: "Estimated ROI",
      value: "18.4%",
      change: "+1.2%",
      changeType: "positive",
      icon: TrendingUp,
      color: "#F59E0B", // Bright Gold
      glowColor: "#F59E0B",
      sparklinePoints: [16.2, 16.8, 17.1, 17.5, 17.8, 18.0, 18.2, 18.4],
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
