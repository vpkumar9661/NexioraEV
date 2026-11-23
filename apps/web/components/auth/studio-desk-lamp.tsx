"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LampColorTheme } from "./lamp-theme";

interface StudioDeskLampProps {
  theme: LampColorTheme;
  isOn: boolean;
  onToggle: () => void;
}

export function StudioDeskLamp({ theme, isOn, onToggle }: StudioDeskLampProps) {
  return (
    <div
      onClick={onToggle}
      className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group select-none shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
      role="button"
      tabIndex={0}
      aria-label={isOn ? "Turn lamp off" : "Turn lamp on"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* ── Lamp OFF Image (Base layer) ── */}
      <Image
        src="/auth/desk-lamp-off.jpg"
        alt="Studio Desk Lamp (Off)"
        fill
        priority
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* ── Lamp ON Image (Cross-faded with smooth spring animation) ── */}
      <motion.div
        initial={false}
        animate={{ opacity: isOn ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/auth/desk-lamp-on.jpg"
          alt="Studio Desk Lamp (Illuminated)"
          fill
          priority
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* ── Dynamic Color Theme Tint Overlay (When not default amber) ── */}
        {theme.id !== "amber" && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-color"
            style={{
              opacity: isOn ? 0.75 : 0,
              background: `radial-gradient(ellipse 65% 55% at 55% 42%, ${theme.hex} 0%, rgba(${theme.rgb}, 0.35) 45%, transparent 75%)`,
            }}
          />
        )}

        {/* ── Additional Soft Ambient Glow onto Virtual Desk ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 mix-blend-screen"
          style={{
            opacity: isOn ? 0.45 : 0,
            background: `radial-gradient(ellipse 50% 40% at 65% 55%, rgba(${theme.rgb}, 0.5) 0%, transparent 65%)`,
          }}
        />
      </motion.div>

      {/* ── Vignette & Edge Blending (Smooth seamless fade into page background) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 40px 10px #080B11, inset 0 -20px 30px 5px #080B11",
          background: "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 60%, rgba(8, 11, 17, 0.6) 100%)",
        }}
      />

      {/* ── Subtle Interactive Hint Pill ── */}
      <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-[#080B11]/80 border border-white/10 text-xs text-slate-300 flex items-center gap-2 backdrop-blur-sm shadow-md transition-opacity duration-300 opacity-80 group-hover:opacity-100">
        <span
          className="w-2 h-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: isOn ? theme.accent : "#64748B" }}
        />
        <span>Click lamp to switch {isOn ? "off" : "on"}</span>
      </div>
    </div>
  );
}
