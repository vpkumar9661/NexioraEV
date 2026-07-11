"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Activity, Box } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

interface WidgetItem {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface SolutionsDashboardTemplateProps {
  title: string;
  subtitle: string;
  categoryName: string;
  stats: StatItem[];
  widgets: WidgetItem[];
}

export function SolutionsDashboardTemplate({
  title,
  subtitle,
  categoryName,
  stats,
  widgets
}: SolutionsDashboardTemplateProps) {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground/60">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/solutions" className="hover:text-white transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#00D26A] font-semibold">{categoryName}</span>
        </nav>

        {/* Glassmorphic Page Header */}
        <header className="relative overflow-hidden rounded-[20px] border border-white/5 bg-linear-to-b from-white/4 to-transparent p-6 sm:p-8 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Box className="w-40 h-40 text-[#00D26A]" />
          </div>
          
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-[11px] font-bold uppercase tracking-wider">
              NexioraEV Solution — Live Status
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {title}
            </h1>
            <p className="text-muted-foreground/85 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-[16px] border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col justify-between h-[105px]"
            >
              <span className="text-[12px] font-bold text-muted-foreground/60 uppercase tracking-wider">{stat.label}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                {stat.change && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    stat.changeType === "positive" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : stat.changeType === "negative"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : "bg-white/5 text-muted-foreground border border-white/10"
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Placeholder Dashboard Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {widgets.map((widget, idx) => (
            <div 
              key={idx}
              className={`rounded-[20px] border border-white/5 bg-white/1 overflow-hidden flex flex-col shadow-lg ${
                idx === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="px-5 py-4 border-b border-white/5 bg-white/2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00D26A]" />
                  <span className="text-sm font-bold text-white tracking-wide">{widget.title}</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D26A] animate-pulse" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between min-h-[220px]">
                <p className="text-[12.5px] text-muted-foreground/70 mb-4">{widget.description}</p>
                <div className="flex-1 flex items-center justify-center bg-white/1 border border-white/5 rounded-[12px] p-4">
                  {widget.content}
                </div>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
