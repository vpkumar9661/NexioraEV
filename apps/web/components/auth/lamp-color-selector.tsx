"use client";

import React from "react";
import { motion } from "framer-motion";
import { Power, RotateCcw } from "lucide-react";
import { LampColorId, LAMP_THEMES } from "./lamp-theme";

interface LampColorSelectorProps {
  activeThemeId: LampColorId;
  onSelectTheme: (id: LampColorId) => void;
  isOn: boolean;
  onTogglePower: () => void;
  onResetLamp?: () => void;
}

const COLOR_OPTIONS: LampColorId[] = ["amber", "green", "cyan", "pink", "white"];

export function LampColorSelector({
  activeThemeId,
  onSelectTheme,
  isOn,
  onTogglePower,
  onResetLamp,
}: LampColorSelectorProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11141D]/90 border border-white/10 shadow-2xl backdrop-blur-md">
      {/* Color Swatch Dots */}
      <div className="flex items-center gap-1.5">
        {COLOR_OPTIONS.map((id) => {
          const theme = LAMP_THEMES[id];
          const isSelected = activeThemeId === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTheme(id)}
              className="relative p-1 rounded-full focus:outline-hidden transition-transform duration-200 hover:scale-115 cursor-pointer"
              title={theme.name}
              aria-label={`Select ${theme.name} light color`}
              aria-pressed={isSelected}
            >
              <span
                className="block w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: theme.hex,
                  boxShadow: isSelected
                    ? `0 0 12px ${theme.hex}, inset 0 1px 1px rgba(255,255,255,0.7)`
                    : "inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              />

              {/* Active Selection Ring */}
              {isSelected && (
                <motion.span
                  layoutId="activeColorRing"
                  className="absolute inset-0 rounded-full border-2 transition-colors duration-300"
                  style={{ borderColor: theme.hex }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="w-px h-4 bg-white/10 mx-0.5" />

      {/* Reset Lamp Position Button */}
      {onResetLamp && (
        <button
          type="button"
          onClick={onResetLamp}
          className="p-1.5 rounded-full text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200 cursor-pointer"
          title="Reset lamp position"
          aria-label="Reset lamp position"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Power Toggle Button */}
      <button
        type="button"
        onClick={onTogglePower}
        className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
          isOn
            ? "text-emerald-400 hover:bg-white/10"
            : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
        }`}
        title={isOn ? "Turn lamp off" : "Turn lamp on"}
        aria-label={isOn ? "Turn lamp off" : "Turn lamp on"}
      >
        <Power className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
