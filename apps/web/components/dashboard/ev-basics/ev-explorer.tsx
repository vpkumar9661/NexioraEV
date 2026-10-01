"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plug,
  Cpu,
  Wind,
  Zap as ZapIcon,
  Battery,
  RotateCcw,
  ArrowRight,
  X,
} from "lucide-react";

/* ─────────────── Component Data ─────────────── */

const COMPONENTS = [
  {
    id: "chargeport",
    label: "CHARGING PORT",
    icon: Plug,
    color: "#3B82F6",
    glowRGB: "59,130,246",
    desc: "Connects to charging stations to supply electric energy to the battery.",
    position: "top-left" as const,
    // Where the connector line meets the car image (% of container)
    anchorX: 8,
    anchorY: 52,
  },
  {
    id: "controller",
    label: "CONTROLLER",
    icon: Cpu,
    color: "#8B5CF6",
    glowRGB: "139,92,246",
    desc: "Controls the flow of electricity between the battery, motor and other systems.",
    position: "top-center" as const,
    anchorX: 48,
    anchorY: 38,
  },
  {
    id: "cooling",
    label: "COOLING SYSTEM",
    icon: Wind,
    color: "#06B6D4",
    glowRGB: "6,182,212",
    desc: "Maintains optimal temperature for battery, motor and electronics.",
    position: "top-right" as const,
    anchorX: 82,
    anchorY: 32,
  },
  {
    id: "motor",
    label: "ELECTRIC MOTOR",
    icon: ZapIcon,
    color: "#10B981",
    glowRGB: "16,185,129",
    desc: "Converts electrical energy from the battery into mechanical energy.",
    position: "bottom-left" as const,
    anchorX: 22,
    anchorY: 68,
  },
  {
    id: "battery",
    label: "BATTERY PACK",
    icon: Battery,
    color: "#EC4899",
    glowRGB: "236,72,153",
    desc: "Stores electrical energy that powers the motor and other systems.",
    position: "bottom-center" as const,
    anchorX: 50,
    anchorY: 75,
  },
  {
    id: "regen",
    label: "REGEN BRAKING",
    icon: RotateCcw,
    color: "#F43F5E",
    glowRGB: "244,63,94",
    desc: "Recovers energy during braking and sends it back to the battery.",
    position: "bottom-right" as const,
    anchorX: 78,
    anchorY: 70,
  },
];

/* ─────────────── Connector Line Component ─────────────── */

function ConnectorLine({
  cardPos,
  anchorX,
  anchorY,
  color,
  isActive,
  index,
}: {
  cardPos: { x: number; y: number };
  anchorX: number;
  anchorY: number;
  color: string;
  isActive: boolean;
  index: number;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`line-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
        <filter id={`glow-${index}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main connector line */}
      <line
        x1={`${cardPos.x}%`}
        y1={`${cardPos.y}%`}
        x2={`${anchorX}%`}
        y2={`${anchorY}%`}
        stroke={color}
        strokeWidth={isActive ? 2.5 : 1.5}
        strokeOpacity={isActive ? 0.8 : 0.35}
        filter={isActive ? `url(#glow-${index})` : undefined}
        strokeDasharray={isActive ? "none" : "4 4"}
      />

      {/* Anchor dot on the car */}
      <circle
        cx={`${anchorX}%`}
        cy={`${anchorY}%`}
        r={isActive ? 6 : 4}
        fill={color}
        fillOpacity={isActive ? 0.9 : 0.5}
        filter={isActive ? `url(#glow-${index})` : undefined}
      >
        {isActive && (
          <animate
            attributeName="r"
            values="4;7;4"
            dur="1.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Outer pulse ring on anchor */}
      {isActive && (
        <circle
          cx={`${anchorX}%`}
          cy={`${anchorY}%`}
          r="4"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.4"
        >
          <animate
            attributeName="r"
            values="4;14;4"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.5;0;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}

/* ─────────────── Component Card ─────────────── */

function ComponentCard({
  comp,
  isActive,
  onHover,
  onLeave,
  onClick,
  isInView,
  index,
}: {
  comp: (typeof COMPONENTS)[0];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isInView: boolean;
  index: number;
}) {
  const Icon = comp.icon;

  return (
    <motion.div
      className="group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="relative rounded-2xl border backdrop-blur-xl p-4 transition-all duration-500 overflow-hidden"
        style={{
          borderColor: isActive ? `rgba(${comp.glowRGB}, 0.5)` : "rgba(255,255,255,0.06)",
          background: isActive
            ? `linear-gradient(135deg, rgba(${comp.glowRGB}, 0.12), rgba(${comp.glowRGB}, 0.04))`
            : "rgba(10, 14, 23, 0.7)",
          boxShadow: isActive
            ? `0 0 30px rgba(${comp.glowRGB}, 0.15), inset 0 1px 0 rgba(${comp.glowRGB}, 0.1)`
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Glow overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-2xl"
          style={{
            opacity: isActive ? 0.1 : 0,
            background: `radial-gradient(circle at 30% 30%, rgba(${comp.glowRGB}, 0.3), transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex items-start gap-3">
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: `rgba(${comp.glowRGB}, ${isActive ? 0.2 : 0.1})`,
              border: `1px solid rgba(${comp.glowRGB}, ${isActive ? 0.4 : 0.15})`,
              boxShadow: isActive ? `0 0 16px rgba(${comp.glowRGB}, 0.2)` : "none",
            }}
          >
            <Icon
              size={20}
              color={comp.color}
              strokeWidth={1.8}
              style={{
                filter: isActive ? `drop-shadow(0 0 6px ${comp.color})` : "none",
                transition: "filter 0.3s ease",
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Label */}
            <h4
              className="text-xs font-extrabold tracking-wider mb-1 transition-colors duration-300"
              style={{ color: isActive ? comp.color : "#e2e8f0" }}
            >
              {comp.label}
            </h4>

            {/* Description */}
            <p className="text-[11px] leading-relaxed text-muted-foreground/60 line-clamp-2">
              {comp.desc}
            </p>

            {/* Learn More link */}
            <div
              className="flex items-center gap-1 mt-2 text-[10px] font-semibold transition-all duration-300"
              style={{ color: comp.color, opacity: isActive ? 1 : 0.6 }}
            >
              <span>Learn More</span>
              <ArrowRight
                size={10}
                className="transition-transform duration-300"
                style={{
                  transform: isActive ? "translateX(2px)" : "translateX(0)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── Main Component ─────────────── */

export function EVExplorer() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Card connection points (where the line starts from the card edge)
  const getCardConnectorPoint = (position: string) => {
    switch (position) {
      case "top-left":
        return { x: 25, y: 46 };
      case "top-center":
        return { x: 50, y: 46 };
      case "top-right":
        return { x: 75, y: 46 };
      case "bottom-left":
        return { x: 25, y: 62 };
      case "bottom-center":
        return { x: 50, y: 62 };
      case "bottom-right":
        return { x: 75, y: 62 };
      default:
        return { x: 50, y: 50 };
    }
  };

  return (
    <section id="explorer" className="space-y-0" ref={sectionRef}>
      {/* Full-width immersive container */}
      <motion.div
        className="relative rounded-3xl border border-white/4 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #050810 0%, #07090e 50%, #050810 100%)",
          minHeight: 700,
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3B82F6_1px,transparent_1px)] bg-size-[30px_30px]" />

          {/* Ambient glows */}
          <motion.div
            className="absolute w-125 h-125 rounded-full blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent)",
              top: "5%",
              left: "10%",
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-100 h-100 rounded-full blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.05), transparent)",
              top: "20%",
              right: "15%",
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
          <motion.div
            className="absolute w-87.5 h-87.5 rounded-full blur-[90px]"
            style={{
              background: "radial-gradient(circle, rgba(16,185,129,0.04), transparent)",
              bottom: "10%",
              left: "30%",
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, delay: 3 }}
          />
        </div>

        {/* ─── Header ─── */}
        <div className="relative z-20 text-center pt-8 sm:pt-10 pb-2 px-4">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/3 backdrop-blur-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <ZapIcon size={12} className="text-cyan-400" />
            <span className="text-[11px] font-semibold text-white/60 tracking-wider uppercase">
              How EV Works
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white leading-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Inside an{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Electric Vehicle
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base text-muted-foreground/50 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore the key components and see how they work together to deliver
            a cleaner, smarter and more efficient driving experience.
          </motion.p>
        </div>

        {/* ─── Main Visual Area ─── */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
          {/* Grid: Top cards → Image → Bottom cards */}
          <div className="max-w-6xl mx-auto relative">
            {/* TOP ROW: Component cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-0 sm:relative sm:z-20">
              {COMPONENTS.filter((c) =>
                ["top-left", "top-center", "top-right"].includes(c.position)
              ).map((comp, i) => (
                <ComponentCard
                  key={comp.id}
                  comp={comp}
                  isActive={activeComponent === comp.id}
                  onHover={() => setActiveComponent(comp.id)}
                  onLeave={() => setActiveComponent(null)}
                  onClick={() =>
                    setActiveComponent(
                      activeComponent === comp.id ? null : comp.id
                    )
                  }
                  isInView={isInView}
                  index={i}
                />
              ))}
            </div>

            {/* CENTER: EV Cutaway Image with connector lines */}
            <div className="relative my-2 sm:my-0">
              {/* SVG Connector Lines Layer */}
              <div className="hidden sm:block absolute inset-0 z-20 pointer-events-none">
                <svg className="w-full h-full" style={{ overflow: "visible" }}>
                  <defs>
                    {COMPONENTS.map((comp, i) => (
                      <filter key={comp.id} id={`connector-glow-${i}`}>
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    ))}
                  </defs>

                  {COMPONENTS.map((comp, i) => {
                    const isActive = activeComponent === comp.id;
                    const card = getCardConnectorPoint(comp.position);

                    return (
                      <g key={comp.id}>
                        {/* Connector line */}
                        <line
                          x1={`${card.x}%`}
                          y1={comp.position.startsWith("top") ? "0%" : "100%"}
                          x2={`${comp.anchorX}%`}
                          y2={`${comp.anchorY}%`}
                          stroke={comp.color}
                          strokeWidth={isActive ? 2 : 1}
                          strokeOpacity={isActive ? 0.7 : 0.25}
                          strokeDasharray={isActive ? "none" : "3 5"}
                          filter={isActive ? `url(#connector-glow-${i})` : undefined}
                          style={{ transition: "all 0.3s ease" }}
                        />

                        {/* Anchor dot */}
                        <circle
                          cx={`${comp.anchorX}%`}
                          cy={`${comp.anchorY}%`}
                          r={isActive ? 5 : 3.5}
                          fill={comp.color}
                          fillOpacity={isActive ? 0.9 : 0.5}
                          filter={isActive ? `url(#connector-glow-${i})` : undefined}
                          style={{ transition: "all 0.3s ease" }}
                        />

                        {/* Pulse on anchor */}
                        {isActive && (
                          <>
                            <circle
                              cx={`${comp.anchorX}%`}
                              cy={`${comp.anchorY}%`}
                              r="3"
                              fill="none"
                              stroke={comp.color}
                              strokeWidth="1.5"
                            >
                              <animate
                                attributeName="r"
                                values="4;12;4"
                                dur="1.5s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="stroke-opacity"
                                values="0.6;0;0.6"
                                dur="1.5s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* EV Cutaway Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Image
                  src="/brand/ev-cutaway-hero.jpg"
                  alt="Inside an Electric Vehicle — Cutaway Diagram"
                  width={1456}
                  height={816}
                  className="w-full h-auto object-cover"
                  style={{
                    filter: activeComponent
                      ? "brightness(0.85) contrast(1.1)"
                      : "brightness(0.9)",
                    transition: "filter 0.5s ease",
                  }}
                  priority
                />

                {/* Gradient overlay on edges */}
                <div className="absolute inset-0 bg-linear-to-t from-[#050810] via-transparent to-[#050810]/60 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-r from-[#050810]/30 via-transparent to-[#050810]/30 pointer-events-none" />

                {/* Scan line animation */}
                <motion.div
                  className="absolute inset-x-0 h-0.5 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(139,92,246,0.15), transparent)",
                  }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* BOTTOM ROW: Component cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-0 sm:relative sm:z-20">
              {COMPONENTS.filter((c) =>
                ["bottom-left", "bottom-center", "bottom-right"].includes(c.position)
              ).map((comp, i) => (
                <ComponentCard
                  key={comp.id}
                  comp={comp}
                  isActive={activeComponent === comp.id}
                  onHover={() => setActiveComponent(comp.id)}
                  onLeave={() => setActiveComponent(null)}
                  onClick={() =>
                    setActiveComponent(
                      activeComponent === comp.id ? null : comp.id
                    )
                  }
                  isInView={isInView}
                  index={i + 3}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-[#07090e] to-transparent pointer-events-none z-30" />
      </motion.div>
    </section>
  );
}
