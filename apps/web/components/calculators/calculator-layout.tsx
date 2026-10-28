"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Home, 
  Calculator, 
  ArrowLeft, 
  HelpCircle, 
  RotateCcw, 
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import { CalculatorConfig, CALCULATORS_CONFIG } from "@/config/calculators";

interface CalculatorLayoutProps {
  config: CalculatorConfig;
  onReset: () => void;
  isCalculating?: boolean;
  children: ReactNode;
  methodology: {
    formula: string;
    description: string;
    assumptions: string[];
    limitations: string[];
  };
}

export function CalculatorLayout({
  config,
  onReset,
  isCalculating = false,
  children,
  methodology,
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-[#05070D] text-white font-sans overflow-x-hidden pt-24 pb-20">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute -top-[10%] left-1/4 w-[650px] h-[650px] rounded-full blur-[160px] opacity-25"
          style={{ background: `radial-gradient(circle, ${config.accentColor} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute top-[40%] right-10 w-[550px] h-[550px] rounded-full blur-[140px] opacity-15"
          style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }}
        />
        <div 
          className="absolute -bottom-[10%] left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
          style={{ background: "radial-gradient(circle, #00E676 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Home className="size-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="size-3 text-white/30" />
          <Link href="/evtech/calculators-tools" className="hover:text-white transition-colors">
            Calculators & Tools
          </Link>
          <ChevronRight className="size-3 text-white/30" />
          <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">
            {config.shortTitle}
          </span>
        </nav>

        {/* Back Link + Other Calculators Shortcut Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
          <Link 
            href="/evtech/calculators-tools"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E676] hover:text-[#00D4FF] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>All Calculators Directory</span>
          </Link>

          {/* Quick switcher tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
            {CALCULATORS_CONFIG.map((calc) => {
              const isActive = calc.id === config.id;
              return (
                <Link
                  key={calc.id}
                  href={calc.canonicalHref}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-white/10 text-white border border-white/20 shadow-sm"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {calc.shortTitle}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Header Block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#00E676]">
            <Sparkles className="size-3 text-[#00E676]" />
            <span>{config.badgeText}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
                {config.title}
              </h1>
              <p className="text-sm sm:text-base text-[#A8B7C5] mt-2 max-w-3xl leading-relaxed">
                {config.description}
              </p>
            </div>

            <button
              onClick={onReset}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-[#CBD5E1] hover:text-white transition-all self-start md:self-auto shrink-0"
              title="Reset inputs to standard baseline defaults"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Main Calculator Body (Inputs + Results Grid) */}
        <div className="pt-2">
          {children}
        </div>

        {/* Formula, Methodology, Assumptions & Limitations Accordion Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
            <div className="p-2 rounded-lg bg-[#00E676]/10 text-[#00E676]">
              <HelpCircle className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Calculation Methodology & Transparency</h3>
              <p className="text-xs text-[#94A3B8]">Documented formulas, system assumptions, and verified physics equations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#CBD5E1]">
            {/* Left: Formula & Mathematical Model */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#00D4FF] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Zap className="size-3" />
                <span>Primary Formula</span>
              </h4>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-[11.5px] text-[#00E676] overflow-x-auto">
                {methodology.formula}
              </div>
              <p className="leading-relaxed text-[#94A3B8]">
                {methodology.description}
              </p>
            </div>

            {/* Right: Key Assumptions & Disclaimers */}
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="size-3 text-[#00E676]" />
                  <span>Key Assumptions</span>
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-[#94A3B8]">
                  {methodology.assumptions.map((assump, i) => (
                    <li key={i}>{assump}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#F59E0B] uppercase tracking-wider text-[11px] mb-1">
                  Limitations & Real-World Variables
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-[#94A3B8]/80 text-[11px]">
                  {methodology.limitations.map((limit, i) => (
                    <li key={i}>{limit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
