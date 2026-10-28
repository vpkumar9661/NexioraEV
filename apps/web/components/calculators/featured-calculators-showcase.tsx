"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, Gauge, ShieldCheck, CreditCard, TrendingUp, Sparkles } from "lucide-react";
import { CALCULATORS_CONFIG } from "@/config/calculators";

const ICON_MAP: Record<string, React.ReactNode> = {
  "charging-cost": <Zap className="size-5 text-[#00E676]" />,
  "range-estimator": <Gauge className="size-5 text-[#00D4FF]" />,
  "battery-health": <ShieldCheck className="size-5 text-[#00E676]" />,
  "emi-loan": <CreditCard className="size-5 text-[#00D4FF]" />,
  "total-cost-of-ownership": <TrendingUp className="size-5 text-[#00E676]" />,
};

export function FeaturedCalculatorsShowcase() {
  return (
    <section id="interactive-suite" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 text-[#00E676] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="size-3" />
            <span>Interactive Calculators Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dedicated EV Planning Calculators
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Real-world mathematical modeling engines for direct tariff savings, 8-factor range estimates, battery SOH projections, loan financing, and lifecycle TCO.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CALCULATORS_CONFIG.map((calc) => (
          <div
            key={calc.id}
            className="group relative rounded-2xl bg-white/3 backdrop-blur-xl border border-white/10 hover:border-[#00E676]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,230,118,0.1)] hover:-translate-y-0.5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#00E676]/10 group-hover:border-[#00E676]/30 transition-colors">
                  {ICON_MAP[calc.id]}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 text-[#94A3B8] group-hover:text-white group-hover:border-white/20 transition-colors">
                  {calc.badgeText}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00E676] transition-colors">
                  {calc.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed line-clamp-3">
                  {calc.description}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#64748B]">
                {calc.canonicalHref.split("/").pop()}
              </span>
              <Link
                href={calc.canonicalHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00E676] group-hover:text-[#00D4FF] transition-colors"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
