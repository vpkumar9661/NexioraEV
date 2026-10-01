"use client";

import { useRef, useState, useEffect, Fragment } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Leaf,
  Gauge,
  Cpu,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

/* ─────────────── Stats badges ─────────────── */
const STATS = [
  { icon: Leaf, label: "Clean Energy", sub: "Zero Emissions", color: "#10B981" },
  { icon: Gauge, label: "High Efficiency", sub: "Up to 90%", color: "#3B82F6" },
  { icon: Cpu, label: "Smart Control", sub: "Real-time Management", color: "#8B5CF6" },
  { icon: RotateCcw, label: "Energy Recovery", sub: "During Braking", color: "#F59E0B" },
];

/* ─────────────── Flow nodes ─────────────── */
const TOP_NODES = [
  {
    id: "source",
    label: "Power Source",
    sub: "Grid / Solar / Wind",
    color: "#F59E0B",
    glowRGB: "245,158,11",
    iconEmoji: "⚡",
    specs: ["AC Grid", "Solar Panel", "Wind Energy"],
  },
  {
    id: "charger",
    label: "EVSE Charger",
    sub: "AC/DC Conversion",
    color: "#3B82F6",
    glowRGB: "59,130,246",
    iconEmoji: "🔌",
    specs: ["Home Charger", "Public Charging", "Fast Charging"],
  },
  {
    id: "bms",
    label: "BMS",
    sub: "Battery Management",
    color: "#8B5CF6",
    glowRGB: "139,92,246",
    iconEmoji: "🧠",
    specs: ["Cell Monitoring", "Thermal Control", "Safety Protection"],
  },
  {
    id: "battery",
    label: "Battery Pack",
    sub: "High Voltage DC",
    color: "#10B981",
    glowRGB: "16,185,129",
    iconEmoji: "🔋",
    specs: ["Lithium-ion Cells", "Thermal Control", "72 kWh Pack"],
  },
  {
    id: "inverter",
    label: "Inverter",
    sub: "DC → AC Conversion",
    color: "#6366F1",
    glowRGB: "99,102,241",
    iconEmoji: "⚙️",
    specs: ["IGBT / SiC", "Variable Frequency", "3Φ AC Output"],
  },
  {
    id: "motor",
    label: "Electric Motor",
    sub: "Drive the Wheels",
    color: "#06B6D4",
    glowRGB: "6,182,212",
    iconEmoji: "🔄",
    specs: ["PMSM / BLDC", "High Torque", "High Efficiency"],
  },
];

const ARROW_LABELS = [
  { label: "AC Power", color: "#F59E0B" },
  { label: "Regulated DC", color: "#3B82F6" },
  { label: "DC Power", color: "#8B5CF6" },
  { label: "DC Bus", color: "#10B981" },
  { label: "3Φ AC", color: "#6366F1" },
];

const BOTTOM_NODES = [
  {
    id: "regen",
    label: "Regen Braking",
    sub: "Energy Recovery",
    color: "#10B981",
    glowRGB: "16,185,129",
    iconEmoji: "♻️",
    specs: ["Kinetic → Electric", "Charges Battery", "Extends Range"],
  },
  {
    id: "wheels",
    label: "Wheels",
    sub: "Vehicle Motion",
    color: "#F59E0B",
    glowRGB: "245,158,11",
    iconEmoji: "🛞",
    specs: ["Torque Output", "Traction Control", "Road Motion"],
  },
];

/* ─────────────── Compact Animated Arrow Component ─────────────── */
function AnimatedArrow({
  color,
  label,
  direction = "right",
  isActive,
  delay = 0,
}: {
  color: string;
  label: string;
  direction?: "right" | "down" | "left" | "up";
  isActive: boolean;
  delay?: number;
}) {
  if (direction === "down" || direction === "up") {
    const isUp = direction === "up";
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.2 }}
        transition={{ duration: 0.35, delay }}
      >
        {!isUp && (
          <motion.span
            className="text-[6.5px] sm:text-[7px] font-bold px-1.5 py-0.2 rounded-full mb-0.5 whitespace-nowrap leading-none"
            style={{
              color,
              background: `${color}14`,
              border: `1px solid ${color}28`,
              boxShadow: isActive ? `0 0 8px ${color}20` : "none",
            }}
          >
            {label}
          </motion.span>
        )}

        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          className="overflow-visible"
          style={{ transform: isUp ? "scaleY(-1)" : undefined }}
        >
          <motion.line
            x1="7" y1="0" x2="7" y2="14"
            stroke={color}
            strokeWidth="2"
            strokeOpacity={isActive ? 0.6 : 0.12}
            filter={isActive ? `drop-shadow(0 0 3px ${color})` : undefined}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay }}
          />
          {isActive && (
            <motion.line
              x1="7" y1="0" x2="7" y2="14"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="2 3"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -10 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
          )}
          <motion.polygon
            points="2,11 7,18 12,11"
            fill={color}
            opacity={isActive ? 0.95 : 0.2}
            filter={isActive ? `drop-shadow(0 0 4px ${color})` : undefined}
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0 }}
            transition={{ delay: delay + 0.1, type: "spring" }}
          />
          {isActive && (
            <motion.circle
              cx="7"
              r="2"
              fill={color}
              filter={`drop-shadow(0 0 4px ${color})`}
              initial={{ cy: 0, opacity: 0 }}
              animate={{ cy: [0, 16], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn", delay: delay + 0.1 }}
            />
          )}
        </svg>

        {isUp && (
          <motion.span
            className="text-[6.5px] sm:text-[7px] font-bold px-1.5 py-0.2 rounded-full mt-0.5 whitespace-nowrap leading-none"
            style={{
              color,
              background: `${color}14`,
              border: `1px solid ${color}28`,
              boxShadow: isActive ? `0 0 8px ${color}20` : "none",
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    );
  }

  // Horizontal arrow (right or left)
  const isReverse = direction === "left";
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-0.5 px-0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.2 }}
      transition={{ duration: 0.35, delay }}
    >
      <motion.span
        className="text-[6px] sm:text-[6.5px] font-bold px-1 py-0.2 rounded-full whitespace-nowrap leading-none"
        style={{
          color,
          background: `${color}14`,
          border: `1px solid ${color}25`,
          boxShadow: isActive ? `0 0 6px ${color}20` : "none",
        }}
      >
        {label}
      </motion.span>

      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        className="overflow-visible max-w-5.5"
        style={{ transform: isReverse ? "scaleX(-1)" : undefined }}
      >
        <motion.line
          x1="0" y1="5" x2="16" y2="5"
          stroke={color}
          strokeWidth="2"
          strokeOpacity={isActive ? 0.6 : 0.1}
          strokeLinecap="round"
          filter={isActive ? `drop-shadow(0 0 3px ${color})` : undefined}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay }}
        />
        {isActive && (
          <motion.line
            x1="0" y1="5" x2="14" y2="5"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: isReverse ? 12 : -12 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.polygon
          points="13,1 20,5 13,9"
          fill={color}
          opacity={isActive ? 0.95 : 0.2}
          filter={isActive ? `drop-shadow(0 0 4px ${color})` : undefined}
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          transition={{ delay: delay + 0.1, type: "spring" }}
        />
        {isActive && (
          <motion.circle
            cy="5"
            r="1.8"
            fill={color}
            filter={`drop-shadow(0 0 4px ${color})`}
            initial={{ cx: 0, opacity: 0 }}
            animate={{ cx: [0, 18], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: delay + 0.1 }}
          />
        )}
      </svg>
    </motion.div>
  );
}

/* ─────────────── Return Energy Path Component ─────────────── */
function ReturnEnergyPath({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      className="w-full flex items-center justify-center px-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full h-11.5 flex items-center">
        <svg className="w-full h-full" viewBox="0 0 500 46" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="return-gradient" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Path from right (under Regen Braking) to left, then curving up towards Power Source */}
          <path
            d="M 495,23 L 30,23 C 18,23 12,16 12,4"
            fill="none"
            stroke="url(#return-gradient)"
            strokeWidth="2"
            strokeDasharray="5 4"
            strokeLinecap="round"
            filter={isActive ? "drop-shadow(0 0 4px #10B981)" : undefined}
          >
            {isActive && (
              <animate attributeName="stroke-dashoffset" values="0;18" dur="1.2s" repeatCount="indefinite" />
            )}
          </path>
          {/* Arrowhead pointing up into Power Source */}
          <polygon
            points="8,10 12,2 16,10"
            fill="#10B981"
            opacity={isActive ? 0.95 : 0.2}
            filter={isActive ? "drop-shadow(0 0 4px #10B981)" : undefined}
          />
          {/* Energy pulse particle */}
          {isActive && (
            <circle r="2.8" fill="#10B981" filter="drop-shadow(0 0 6px #10B981)">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 495,23 L 30,23 C 18,23 12,16 12,4" />
            </circle>
          )}
        </svg>

        {/* Center pill badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[7.5px] sm:text-[8px] font-bold"
            style={{
              color: "#10B981",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.28)",
              boxShadow: isActive ? "0 0 12px rgba(16, 185, 129, 0.2)" : "none",
            }}
          >
            <RotateCcw size={8} className={isActive ? "animate-spin" : ""} style={{ animationDuration: "4s" }} />
            <span>Energy Returns to Battery</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── Compact Node Card ─────────────── */
function NodeCard({
  node,
  isActive,
  isHovered,
  onHover,
  onLeave,
  delay = 0,
  isInView,
}: {
  node: typeof TOP_NODES[0];
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="group relative rounded-xl border p-1.5 sm:p-2 cursor-pointer transition-all duration-400 overflow-hidden w-full flex flex-col justify-between"
      style={{
        borderColor: isHovered
          ? `${node.color}60`
          : isActive
            ? `${node.color}35`
            : `${node.color}15`,
        background: isHovered
          ? `linear-gradient(135deg, ${node.color}14, ${node.color}06)`
          : isActive
            ? `linear-gradient(135deg, ${node.color}08, rgba(13,17,23,0.7))`
            : `linear-gradient(135deg, rgba(13,17,23,0.85), rgba(13,17,23,0.6))`,
        boxShadow: isHovered
          ? `0 0 25px ${node.color}18, inset 0 1px 0 ${node.color}18`
          : isActive
            ? `0 0 15px ${node.color}10`
            : `0 2px 8px rgba(0,0,0,0.3)`,
        transform: isActive ? "scale(1)" : "scale(0.97)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: isActive ? 1 : 0.45, y: 0, scale: isActive ? 1 : 0.97 } : {}}
      transition={{ delay, duration: 0.4, type: "spring" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-400 pointer-events-none"
        style={{
          opacity: isHovered ? 0.12 : isActive ? 0.05 : 0,
          background: `radial-gradient(circle at 50% 20%, ${node.color}, transparent 70%)`,
        }}
      />

      {/* Active pulse ring */}
      {isActive && (
        <motion.div
          className="absolute -inset-px rounded-xl pointer-events-none"
          style={{ border: `1px solid ${node.color}` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10">
        {/* Compact Icon */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mx-auto mb-1 transition-all duration-300"
          style={{
            background: isActive ? `${node.color}20` : `${node.color}10`,
            border: `1px solid ${isActive ? `${node.color}50` : `${node.color}20`}`,
            boxShadow: isActive ? `0 0 14px ${node.color}30` : "none",
          }}
        >
          <span className="text-xs sm:text-sm" style={{ filter: isActive ? `drop-shadow(0 0 4px ${node.color})` : "none" }}>
            {node.iconEmoji}
          </span>
        </div>

        {/* Label */}
        <h4
          className="text-[10px] sm:text-[10.5px] font-bold text-center mb-0.2 truncate tracking-tight transition-colors duration-300"
          style={{ color: isActive ? node.color : isHovered ? node.color : "#94a3b8" }}
        >
          {node.label}
        </h4>
        <p className="text-[6.5px] sm:text-[7.5px] text-center text-muted-foreground/45 mb-1 truncate leading-tight">{node.sub}</p>

        {/* Specs */}
        <div className="space-y-0.5">
          {node.specs.map((spec) => (
            <div key={spec} className="flex items-center gap-1 text-[7px] sm:text-[7.5px]">
              <CheckCircle2
                size={7}
                style={{
                  color: node.color,
                  opacity: isActive ? 0.9 : 0.35,
                  flexShrink: 0,
                  filter: isActive ? `drop-shadow(0 0 2px ${node.color})` : "none",
                }}
              />
              <span className="text-muted-foreground/60 truncate leading-tight">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 0.6 : 0 }}
        transition={{ duration: 0.4, delay: delay + 0.15 }}
      />
    </motion.div>
  );
}

/* ─────────────── Main Component ─────────────── */
export function EVArchitecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Total steps: 0 to 9
  const TOTAL_STEPS = 9;

  // Auto-play step-by-step animation
  useEffect(() => {
    if (!isInView || !isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= TOTAL_STEPS ? 0 : prev + 1));
    }, 1400);
    return () => clearInterval(timer);
  }, [isInView, isAutoPlaying]);

  return (
    <section id="architecture" className="space-y-4" ref={sectionRef}>
      <motion.div
        className="relative rounded-[22px] border border-white/4 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050810 0%, #0a0f1a 50%, #050810 100%)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3B82F6_1px,transparent_1px)] bg-size-[28px_28px]" />
          <motion.div
            className="absolute w-112.5 h-87.5 rounded-full blur-[110px]"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05), transparent)", top: "20%", left: "20%" }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-87.5 h-62.5 rounded-full blur-[90px]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.04), transparent)", bottom: "20%", right: "20%" }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
          {/* Subtle EV silhouette */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <Image
              src="/brand/ev-cutaway-hero.jpg"
              alt=""
              width={1200}
              height={600}
              className="object-cover w-full h-full"
              style={{ filter: "brightness(0.3) blur(2px)" }}
              aria-hidden
            />
          </div>
        </div>

        <div className="relative z-10 px-2.5 sm:px-4 lg:px-5 py-5 sm:py-6">
          {/* ─── Header ─── */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
            <div>
              <motion.h2
                className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                EV{" "}
                <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Architecture</span>
              </motion.h2>
              <motion.p
                className="text-[11px] sm:text-xs text-muted-foreground/50 mt-0.5 max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                How energy flows through an Electric Vehicle — from power source to wheel and back
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-1.5 sm:gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg border backdrop-blur-sm"
                    style={{ borderColor: `${stat.color}25`, background: `${stat.color}08` }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                    >
                      <Icon size={10} color={stat.color} />
                    </div>
                    <div>
                      <div className="text-[9.5px] font-bold text-white/90 leading-none">{stat.label}</div>
                      <div className="text-[7px] text-muted-foreground/40 leading-none mt-0.5">{stat.sub}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ─── ENERGY FLOW PATH label ─── */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="h-px w-10 sm:w-14 bg-linear-to-r from-transparent to-cyan-500/40" />
            <span className="text-[9px] sm:text-[10px] font-bold text-cyan-400/70 tracking-[2.5px] uppercase">Energy Flow Path</span>
            <div className="h-px w-10 sm:w-14 bg-linear-to-l from-transparent to-cyan-500/40" />
          </motion.div>

          {/* ─── Step progress bar ─── */}
          <motion.div
            className="flex items-center justify-center gap-1 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveStep(i + 1); setIsAutoPlaying(false); }}
                className="relative group p-0.5"
                title={`Step ${i + 1}`}
              >
                <div
                  className="w-5 sm:w-7 h-1 rounded-full transition-all duration-400"
                  style={{
                    backgroundColor: activeStep > i
                      ? (TOP_NODES[Math.min(i, 5)]?.color ?? "#10B981")
                      : "rgba(255,255,255,0.06)",
                    boxShadow: activeStep > i
                      ? `0 0 8px ${TOP_NODES[Math.min(i, 5)]?.color ?? "#10B981"}50`
                      : "none",
                  }}
                />
              </button>
            ))}
            <button
              onClick={() => { setActiveStep(0); setIsAutoPlaying(true); }}
              className="ml-2 text-[7.5px] sm:text-[8px] text-muted-foreground/40 hover:text-cyan-400 transition-colors px-1.5 py-0.5 rounded border border-white/5 hover:border-cyan-500/20"
            >
              ↻ Replay
            </button>
          </motion.div>

          {/* ─── ARCHITECTURE DIAGRAM (Compact, fits in max-w-5xl without sliding) ─── */}
          <div className="w-full">
            {/* TOP ROW: 6 Node Cards + 5 Arrows in 11 columns */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-0.5 w-full">
              {TOP_NODES.map((node, i) => (
                <Fragment key={node.id}>
                  {/* Node Card */}
                  <div className="min-w-0 flex items-stretch">
                    <NodeCard
                      node={node}
                      isActive={activeStep > i}
                      isHovered={hoveredNode === node.id}
                      onHover={() => { setHoveredNode(node.id); setIsAutoPlaying(false); }}
                      onLeave={() => { setHoveredNode(null); setIsAutoPlaying(true); }}
                      delay={0.4 + i * 0.06}
                      isInView={isInView}
                    />
                  </div>

                  {/* Arrow between nodes */}
                  {i < TOP_NODES.length - 1 && ARROW_LABELS[i] && (
                    <AnimatedArrow
                      color={ARROW_LABELS[i]!.color}
                      label={ARROW_LABELS[i]!.label}
                      direction="right"
                      isActive={activeStep > i}
                      delay={0.4 + i * 0.06 + 0.2}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            {/* CONNECTOR ROW: Vertical arrows (Under Battery Pack & Under Electric Motor) */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-0.5 w-full my-0.5 sm:my-1">
              {/* Columns 1-6 empty spacer */}
              <div className="col-span-6" />

              {/* Column 7 (directly under Battery Pack): Recovered DC Power UP */}
              <div className="flex items-center justify-center">
                <AnimatedArrow
                  color="#10B981"
                  label="Recovered DC Power"
                  direction="up"
                  isActive={activeStep > 7}
                  delay={1.5}
                />
              </div>

              {/* Columns 8-10 empty spacer */}
              <div className="col-span-3" />

              {/* Column 11 (directly under Electric Motor): Torque DOWN */}
              <div className="flex items-center justify-center">
                <AnimatedArrow
                  color="#06B6D4"
                  label="Torque"
                  direction="down"
                  isActive={activeStep > 6}
                  delay={1.4}
                />
              </div>
            </div>

            {/* BOTTOM ROW: Return path (Cols 1-6), Regen Braking (Col 7), Braking Arrow (Cols 8-10), Wheels (Col 11) */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-0.5 w-full">
              {/* Columns 1-6: Return energy path curved back to Power Source */}
              <div className="col-span-6 flex items-center justify-center">
                <ReturnEnergyPath isActive={activeStep > 8} />
              </div>

              {/* Column 7: Regen Braking card (aligned under Battery Pack) */}
              <div className="min-w-0 flex items-stretch">
                <NodeCard
                  node={BOTTOM_NODES[0]!}
                  isActive={activeStep > 7}
                  isHovered={hoveredNode === "regen"}
                  onHover={() => { setHoveredNode("regen"); setIsAutoPlaying(false); }}
                  onLeave={() => { setHoveredNode(null); setIsAutoPlaying(true); }}
                  delay={1.5}
                  isInView={isInView}
                />
              </div>

              {/* Columns 8-10: Braking arrow pointing LEFT */}
              <div className="col-span-3 flex items-center justify-center px-0.5">
                <AnimatedArrow
                  color="#10B981"
                  label="Braking"
                  direction="left"
                  isActive={activeStep > 7}
                  delay={1.6}
                />
              </div>

              {/* Column 11: Wheels card (aligned under Electric Motor) */}
              <div className="min-w-0 flex items-stretch">
                <NodeCard
                  node={BOTTOM_NODES[1]!}
                  isActive={activeStep > 6}
                  isHovered={hoveredNode === "wheels"}
                  onHover={() => { setHoveredNode("wheels"); setIsAutoPlaying(false); }}
                  onLeave={() => { setHoveredNode(null); setIsAutoPlaying(true); }}
                  delay={1.45}
                  isInView={isInView}
                />
              </div>
            </div>
          </div>

          {/* ─── Legend ─── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-5 pt-3 border-t border-white/4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
          >
            <div className="flex items-center gap-1.5">
              <svg width="24" height="10" viewBox="0 0 24 10">
                <line x1="0" y1="5" x2="18" y2="5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                <polygon points="16,2 23,5 16,8" fill="#F59E0B" opacity="0.85" />
              </svg>
              <div>
                <div className="text-[8.5px] sm:text-[9px] font-bold text-white/70">Forward Energy Flow</div>
                <div className="text-[6.5px] text-muted-foreground/35 leading-none">(AC / DC / 3Φ AC)</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="24" height="10" viewBox="0 0 24 10">
                <line x1="0" y1="5" x2="18" y2="5" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round" />
                <polygon points="16,2 23,5 16,8" fill="#10B981" opacity="0.85" />
              </svg>
              <div>
                <div className="text-[8.5px] sm:text-[9px] font-bold text-white/70">Regenerative Return</div>
                <div className="text-[6.5px] text-muted-foreground/35 leading-none">(Braking Energy Recovery)</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-1 items-center">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-500" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-500" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-500" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }} />
              </div>
              <div>
                <div className="text-[8.5px] sm:text-[9px] font-bold text-white/70">Energy Particles</div>
                <div className="text-[6.5px] text-muted-foreground/35 leading-none">(Real-time Pulse)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
