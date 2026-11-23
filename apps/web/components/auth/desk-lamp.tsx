"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LampColorTheme } from "./lamp-theme";

interface DeskLampProps {
  theme: LampColorTheme;
  isOn: boolean;
  onToggle: () => void;
}

export function DeskLamp({ theme, isOn, onToggle }: DeskLampProps) {
  const [isPulling, setIsPulling] = useState(false);

  const handlePullCord = () => {
    setIsPulling(true);
    onToggle();
    setTimeout(() => {
      setIsPulling(false);
    }, 300);
  };

  return (
    <div className="relative w-full max-w-[420px] h-[480px] sm:h-[540px] flex items-center justify-center select-none pointer-events-auto">
      {/* ── Volumetric Light Beam (Projected from Lampshade toward Card) ── */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-out z-0"
        style={{
          top: "12%",
          left: "48%",
          width: "750px",
          height: "650px",
          opacity: isOn ? 1 : 0,
          background: `radial-gradient(ellipse 70% 60% at 10% 25%, rgba(${theme.rgb}, 0.32) 0%, rgba(${theme.rgb}, 0.12) 42%, rgba(${theme.rgb}, 0.02) 70%, transparent 85%)`,
          filter: "blur(22px)",
          transform: "rotate(14deg)",
          transformOrigin: "top left",
        }}
      />

      {/* Secondary Focused Directional Light Cone */}
      <svg
        className="absolute pointer-events-none transition-opacity duration-700 z-0"
        style={{
          top: "14%",
          left: "48%",
          width: "600px",
          height: "500px",
          opacity: isOn ? 0.75 : 0,
          overflow: "visible",
        }}
        viewBox="0 0 600 500"
      >
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor={theme.hex} stopOpacity="0.45" />
            <stop offset="35%" stopColor={theme.hex} stopOpacity="0.18" />
            <stop offset="70%" stopColor={theme.hex} stopOpacity="0.04" />
            <stop offset="100%" stopColor={theme.hex} stopOpacity="0" />
          </linearGradient>
          <filter id="beamBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <polygon
          points="20,40 560,180 520,480 30,120"
          fill="url(#beamGrad)"
          filter="url(#beamBlur)"
        />
      </svg>

      {/* ── Realistic SVG Desk Lamp ── */}
      <svg
        className="w-full h-full relative z-10 drop-shadow-2xl"
        viewBox="0 0 400 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Dark Gradients */}
          <linearGradient id="metallicBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3A4150" />
            <stop offset="45%" stopColor="#20242D" />
            <stop offset="100%" stopColor="#12151B" />
          </linearGradient>

          <linearGradient id="metallicArm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475060" />
            <stop offset="50%" stopColor="#8A94A6" />
            <stop offset="100%" stopColor="#252A34" />
          </linearGradient>

          <linearGradient id="brassJoint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="40%" stopColor="#FFB300" />
            <stop offset="80%" stopColor="#C67D00" />
            <stop offset="100%" stopColor="#7B4E00" />
          </linearGradient>

          <linearGradient id="shadeExterior" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E4554" />
            <stop offset="35%" stopColor="#282E3B" />
            <stop offset="70%" stopColor="#171A22" />
            <stop offset="100%" stopColor="#0B0D11" />
          </linearGradient>

          {/* Floor Shadow */}
          <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.75)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Lamp Inner Bulb Glow */}
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isOn ? "1" : "0.2"} />
            <stop offset="40%" stopColor={theme.hex} stopOpacity={isOn ? "0.9" : "0.1"} />
            <stop offset="80%" stopColor={theme.hex} stopOpacity={isOn ? "0.3" : "0"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* 1. Floor Ambient Ground Shadow */}
        <ellipse cx="145" cy="465" rx="90" ry="18" fill="url(#floorShadow)" />

        {/* 2. Lamp Base */}
        {/* Base Bevel Bottom */}
        <ellipse cx="145" cy="452" rx="68" ry="14" fill="#0C0E13" />
        {/* Base Main Plate */}
        <ellipse cx="145" cy="448" rx="65" ry="12" fill="url(#metallicBase)" stroke="#4A5568" strokeWidth="1" />
        {/* Base Inner Ring Accent */}
        <ellipse cx="145" cy="446" rx="42" ry="7" fill="#1A1F29" stroke="url(#brassJoint)" strokeWidth="0.8" />
        {/* Base Center Mount Joint */}
        <ellipse cx="145" cy="440" rx="14" ry="4" fill="#0E1217" />
        <circle cx="145" cy="432" r="10" fill="url(#brassJoint)" stroke="#5D3A00" strokeWidth="1" />
        <circle cx="145" cy="432" r="4" fill="#1A1E26" />

        {/* 3. Lower Dual-Rod Articulated Arm */}
        {/* Rod 1 (Back) */}
        <line x1="141" y1="430" x2="183" y2="295" stroke="url(#metallicArm)" strokeWidth="4.5" strokeLinecap="round" />
        {/* Rod 2 (Front) */}
        <line x1="149" y1="432" x2="191" y2="297" stroke="url(#metallicArm)" strokeWidth="4.5" strokeLinecap="round" />
        {/* Cross support struts */}
        <line x1="144" y1="380" x2="187" y2="340" stroke="#2D3748" strokeWidth="1.5" />

        {/* 4. Middle Articulated Elbow Joint */}
        <circle cx="187" cy="294" r="12" fill="url(#brassJoint)" stroke="#5D3A00" strokeWidth="1.2" />
        <circle cx="187" cy="294" r="5" fill="#161922" />
        {/* Mechanical tightening screw */}
        <rect x="184" y="291" width="6" height="6" rx="1" fill="#FFE082" />

        {/* 5. Upper Articulated Arm */}
        <line x1="187" y1="294" x2="228" y2="185" stroke="url(#metallicArm)" strokeWidth="5" strokeLinecap="round" />
        <line x1="183" y1="290" x2="224" y2="181" stroke="#8A94A6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* 6. Shade Swivel Neck Joint */}
        <circle cx="228" cy="185" r="9" fill="url(#brassJoint)" stroke="#5D3A00" strokeWidth="1" />
        <path d="M224 180 L242 165 L247 172 L230 188 Z" fill="#2D3748" />

        {/* 7. Lampshade Head (Angled ~35 deg towards right) */}
        <g transform="rotate(32 245 165)">
          {/* Shade Body Outer Bell/Dome */}
          <path
            d="M 215 125 C 245 110, 290 120, 298 160 L 220 185 C 210 155, 212 135, 215 125 Z"
            fill="url(#shadeExterior)"
            stroke="#4A5568"
            strokeWidth="1.2"
          />

          {/* Polished Rim Ring */}
          <ellipse cx="258" cy="172" rx="42" ry="14" fill="#141820" stroke="url(#brassJoint)" strokeWidth="1.6" />

          {/* Inner Illuminated Reflector Cup */}
          <ellipse
            cx="258"
            cy="172"
            rx="39"
            ry="12"
            fill={isOn ? `url(#bulbGlow)` : "#1A1E26"}
            className="transition-colors duration-500"
          />

          {/* Intense Center Bulb Core */}
          <ellipse
            cx="258"
            cy="172"
            rx="14"
            ry="6"
            fill={isOn ? "#FFFFFF" : "#374151"}
            style={{
              filter: isOn ? `drop-shadow(0 0 12px ${theme.hex})` : "none",
              transition: "all 0.4s ease",
            }}
          />
        </g>

        {/* 8. Hanging Interactive Pull Cord */}
        {/* Cord Wire */}
        <line
          x1="240"
          y1="192"
          x2="240"
          y2={isPulling ? 275 : 258}
          stroke="#CBD5E1"
          strokeWidth="1.8"
          strokeDasharray="2,2"
          className="transition-all duration-200"
        />

        {/* Cord Pull Bead / Ring (Interactive Target) */}
        <g
          className="cursor-pointer group"
          onClick={handlePullCord}
          role="button"
          tabIndex={0}
          aria-label={isOn ? "Turn lamp off" : "Turn lamp on"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePullCord();
            }
          }}
        >
          {/* Invisible larger hit target */}
          <circle cx="240" cy={isPulling ? 282 : 265} r="20" fill="transparent" />

          {/* Pull Bead Outer Ring */}
          <circle
            cx="240"
            cy={isPulling ? 282 : 265}
            r="8"
            fill="url(#brassJoint)"
            stroke="#78350F"
            strokeWidth="1.2"
            className="transition-all duration-200 group-hover:scale-115"
          />

          {/* Bead Center Accent */}
          <circle
            cx="240"
            cy={isPulling ? 282 : 265}
            r="3.5"
            fill={isOn ? theme.hex : "#2D3748"}
            className="transition-all duration-300"
            style={{
              filter: isOn ? `drop-shadow(0 0 6px ${theme.hex})` : "none",
            }}
          />
        </g>
      </svg>

      {/* Floating Helper Label for Pull Cord */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#121620]/90 border border-white/[0.08] text-[11px] font-medium text-slate-400 pointer-events-none whitespace-nowrap shadow-md backdrop-blur-xs"
      >
        Click string to turn {isOn ? "off" : "on"}
      </motion.div>
    </div>
  );
}
