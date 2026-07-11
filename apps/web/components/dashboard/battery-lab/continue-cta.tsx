"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export function ContinueCTA() {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[#10B981]/15 bg-linear-to-br from-[#10B981]/6 via-transparent to-[#3B82F6]/4 p-8 sm:p-12">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#10B981]/8 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#3B82F6]/5 rounded-full blur-[80px]" />

      {/* Animated charging pack */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
          <rect x="20" y="20" width="80" height="140" rx="16" fill="#131722" stroke="#10B981" strokeWidth="2" />
          <rect x="40" y="8" width="40" height="14" rx="6" fill="#131722" stroke="#10B981" strokeWidth="1.5" />
          {/* Battery filling stages */}
          <rect x="30" y="128" width="60" height="22" rx="4" fill="#10B981" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="30" y="100" width="60" height="22" rx="4" fill="#10B981" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="30" y="72" width="60" height="22" rx="4" fill="#3B82F6" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
          </rect>
          {/* Bolt icon */}
          <path d="M 55,42 L 50,58 H 57 L 52,74 L 68,52 H 61 L 66,42 Z" fill="#6EE7B7" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-2xl space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#6EE7B7] text-[11px] font-bold uppercase tracking-wider">
          <Zap className="w-3 h-3" />
          Ready for Grid Infrastructure?
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          Continue to{" "}
          <span className="bg-linear-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
            Charging Hub
          </span>
        </h2>
        <p className="text-muted-foreground/70 text-sm leading-relaxed max-w-lg">
          Explore AC/DC high-voltage grid topologies, rapid charging connector standards, and smart load-balancing setups in our Charging Hub.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/evtech/charging-hub"
            className="px-6 py-3 rounded-xl font-bold bg-[#10B981] text-white hover:bg-[#059669] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_24px_rgba(16,185,129,0.3)] flex items-center gap-2 group text-sm"
          >
            Enter Charging Hub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/evtech"
            className="px-6 py-3 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 text-sm"
          >
            All Powertrain Modules
          </a>
        </div>
      </div>
    </section>
  );
}
