"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, HelpCircle, HardDrive, Plus, Sparkles, Navigation, FileSpreadsheet, Play, Download, X, Eye, Sun, DollarSign, Activity } from "lucide-react";

interface FloatingQuickActionsProps {
  onDesignSystem: () => void;
  onGenerateProposal: () => void;
}

export function FloatingQuickActions({ onDesignSystem, onGenerateProposal }: FloatingQuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollIntoAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const actionItems = [
    { label: "Design System", icon: Sun, action: onDesignSystem, color: "#F4B400" },
    { label: "Estimate Savings", icon: DollarSign, action: () => scrollIntoAnchor("financial-roi"), color: "#00E676" },
    { label: "Battery Analysis", icon: HardDrive, action: () => scrollIntoAnchor("battery-storage"), color: "#00D4FF" },
    { label: "Charging Schedule", icon: Zap, action: () => scrollIntoAnchor("charging-integration"), color: "#FF9800" },
    { label: "Generate Proposal", icon: FileSpreadsheet, action: onGenerateProposal, color: "#A78BFA" },
    { label: "Export Report", icon: Download, action: () => scrollIntoAnchor("report-center"), color: "#10B981" },
  ];

  return (
    <div className="fixed right-6 bottom-8 z-50 flex flex-col items-end">
      
      {/* Collapsed action cards */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="flex flex-col gap-2 mb-3 bg-[#05070d]/80 border border-white/8 p-2.5 rounded-[20px] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          >
            {actionItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="group flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-[10px] font-extrabold uppercase text-muted-foreground/80 hover:text-white hover:bg-white/4 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{item.label}</span>
                <div
                  className="p-1.5 rounded-lg border flex items-center justify-center transition-colors"
                  style={{
                    background: `${item.color}10`,
                    borderColor: `${item.color}20`,
                  }}
                >
                  <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-linear-to-tr from-[#F4B400] to-[#00E676] hover:from-[#FFC107] hover:to-[#00FF87] flex items-center justify-center text-black font-bold shadow-[0_10px_25px_rgba(244,180,0,0.4)] transition-all transform active:scale-95 cursor-pointer z-10 animate-[pulse_4s_infinite]"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-5 h-5 text-black stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <Zap className="w-5 h-5 text-black fill-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

    </div>
  );
}
