"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, LayoutDashboard, Compass, Layers, Landmark, Activity, HardDrive, FileText, BookOpen, Bot, Award, Play, X, Radio, ShieldAlert, Clock, Store } from "lucide-react";

import { BusinessHero } from "./components/BusinessHero";
import { BusinessStats } from "./components/BusinessStats";
import { WorkplaceCharging } from "./components/WorkplaceCharging";
import { MonetizationHub } from "./components/MonetizationHub";
import { RetailAttraction } from "./components/RetailAttraction";
import { PolicyIncentives } from "./components/PolicyIncentives";
import { AIBusinessConsultant } from "./components/AIBusinessConsultant";
import { ReportCenter } from "./components/ReportCenter";
import { KnowledgeCenter } from "./components/KnowledgeCenter";
import { FloatingQuickActions } from "./components/FloatingQuickActions";

const SECTIONS = [
  { id: "hero", label: "Business Hero", icon: Compass },
  { id: "stats", label: "Quick Statistics", icon: Award },
  { id: "workplace-charging", label: "Workplace Charging", icon: Radio },
  { id: "monetization-hub", label: "Monetization Hub", icon: Landmark },
  { id: "retail-attraction", label: "Retail Attraction", icon: Store },
  { id: "policy-incentives", label: "Policy & Incentives", icon: ShieldAlert },
  { id: "ai-consultant", label: "AI Business Advisor", icon: Bot },
  { id: "report-center", label: "Report Center", icon: FileText },
  { id: "knowledge-center", label: "Knowledge Center", icon: BookOpen },
];

export default function BusinessSolutionsPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showOptimizeToast, setShowOptimizeToast] = useState(false);
  const [optimizerKey, setOptimizerKey] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Intersection observer to track current scroll active section
  useEffect(() => {
    const container = contentContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) {
          setActiveSection(first.target.id);
        }
      },
      {
        root: container,
        rootMargin: "-10% 0px -60% 0px",
        threshold: 0
      }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [optimizerKey]);

  const scrollToSection = (id: string) => {
    const container = contentContainerRef.current;
    const el = document.getElementById(id);
    if (container && el) {
      const containerTop = container.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      const offset = elTop - containerTop + container.scrollTop;
      container.scrollTo({
        top: offset - 20,
        behavior: "smooth"
      });
    }
  };

  const handleOptimizeRates = () => {
    setOptimizerKey((prev) => prev + 1);
    scrollToSection("workplace-charging");
    alert("System Config: Tariff rates optimized. Workplace employee charging incentives synchronized.");
  };

  const handleGenerateReport = () => {
    setShowOptimizeToast(true);
    setTimeout(() => {
      setShowOptimizeToast(false);
      scrollToSection("report-center");
    }, 2500);
  };

  return (
    <div key={optimizerKey} className="h-[calc(100vh-80px)] mt-20 overflow-hidden bg-[#05070d] text-white relative font-sans">
      
      {/* ═══════════════════════════════════════════
          GPU ACCELERATED SMART GRID BACKGROUND SYSTEM
          ═══════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 3D grid floor perspective */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent 20%, #05070d 80%), linear-gradient(rgba(0, 230, 118, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 230, 118, 0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Ambient Aurora glow balls */}
        <div className="absolute top-[10%] left-[5%] w-[550px] h-[550px] bg-radial from-[#00E676]/2 to-transparent blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-radial from-[#4F46E5]/2 to-transparent blur-3xl" />

        {/* Floating particles simulation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-1 h-1 bg-[#00E676] rounded-full top-[15%] left-[25%] animate-[ping_4s_infinite]" />
          <div className="absolute w-1.5 h-1.5 bg-[#00D4FF] rounded-full top-[45%] left-[75%] animate-[ping_6s_infinite_delay-1000]" />
          <div className="absolute w-1 h-1 bg-[#4F46E5] rounded-full top-[75%] left-[45%] animate-[ping_5s_infinite_delay-2000]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col pb-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[12px] font-bold text-muted-foreground/50 uppercase tracking-widest mb-4 shrink-0">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/solutions" className="hover:text-white transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#00E676]">Business Solutions</span>
        </nav>

        <div className="flex gap-8 relative items-start flex-1 min-h-0">
          
          {/* ═══════════════════════════════════════════
              LEFT FUTURISTIC SIDEBAR NAVIGATION
              ═══════════════════════════════════════════ */}
          <aside className="hidden lg:flex flex-col gap-1 w-64 shrink-0 bg-white/2 border border-white/5 p-4 rounded-[22px] backdrop-blur-md h-full overflow-y-auto scrollbar-thin shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="px-2 pb-3 mb-2 border-b border-white/5 flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60">
                SCADA COMMAND BAR
              </span>
            </div>
            
            <div className="flex-1 flex flex-col gap-1">
              {SECTIONS.map((sec) => {
                const active = activeSection === sec.id;
                const Icon = sec.icon;

                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                      active
                        ? "bg-linear-to-r from-[#00E676]/10 to-[#00D4FF]/5 border border-[#00E676]/30 text-white shadow-[0_4px_15px_-5px_rgba(0,230,118,0.2)]"
                        : "border border-transparent text-muted-foreground/50 hover:text-white hover:bg-white/3"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-[#00E676]" : "text-muted-foreground/45"}`} />
                    {sec.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ═══════════════════════════════════════════
              MAIN WORKSPACE PAGE SECTIONS
              ═══════════════════════════════════════════ */}
          <main 
            ref={contentContainerRef}
            className="flex-1 h-full overflow-y-auto space-y-16 pr-2 pb-[120px] scrollbar-thin scroll-smooth"
          >
            
            {/* Section 1: Business Hero */}
            <div id="hero">
              <BusinessHero
                onOptimizeRates={handleOptimizeRates}
                onGenerateReport={handleGenerateReport}
              />
            </div>

            {/* Section 2: Quick Statistics */}
            <div id="stats">
              <BusinessStats />
            </div>

            {/* Section 3: Workplace Charging */}
            <div id="workplace-charging">
              <WorkplaceCharging />
            </div>

            {/* Section 4: Monetization Hub */}
            <div id="monetization-hub">
              <MonetizationHub />
            </div>

            {/* Section 5: Retail Attraction */}
            <div id="retail-attraction">
              <RetailAttraction />
            </div>

            {/* Section 6: Policy & Incentives */}
            <div id="policy-incentives">
              <PolicyIncentives />
            </div>

            {/* Section 7: AI Business Consultant */}
            <div id="ai-consultant">
              <AIBusinessConsultant />
            </div>

            {/* Section 8: Report Center */}
            <div id="report-center">
              <ReportCenter />
            </div>

            {/* Section 9: Knowledge Center */}
            <div id="knowledge-center">
              <KnowledgeCenter />
            </div>

          </main>
        </div>
      </div>

      {/* Mobile/Tablet Menu Button */}
      <div className="lg:hidden fixed bottom-8 left-6 z-40">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="w-12 h-12 rounded-full bg-linear-to-tr from-[#00E676] to-[#00D4FF] hover:from-[#00FF87] hover:to-[#00E5FF] flex items-center justify-center text-black font-bold shadow-[0_10px_25px_rgba(0,230,118,0.4)] cursor-pointer animate-[pulse_3s_infinite]"
        >
          <LayoutDashboard className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Mobile/Tablet Sidebar Drawer overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#05070d]/95 border-r border-white/8 p-5 z-50 backdrop-blur-2xl flex flex-col justify-between lg:hidden shadow-[5px_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60">
                      SCADA COMMAND BAR
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-muted-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin">
                  {SECTIONS.map((sec) => {
                    const active = activeSection === sec.id;
                    const Icon = sec.icon;

                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          scrollToSection(sec.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                          active
                            ? "bg-linear-to-r from-[#00E676]/10 to-[#00D4FF]/5 border border-[#00E676]/30 text-white shadow-[0_4px_15px_-5px_rgba(0,230,118,0.2)]"
                            : "border border-transparent text-muted-foreground/50 hover:text-white hover:bg-white/3"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? "text-[#00E676]" : "text-muted-foreground/45"}`} />
                        {sec.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/65 text-center font-mono uppercase tracking-widest">
                NexioraEV Business v3.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Optimizer Active Loading Toast */}
      <AnimatePresence>
        {showOptimizeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3.5 px-6 py-4 rounded-[20px] border border-[#00E676]/30 bg-[#05070d]/90 backdrop-blur-2xl shadow-[0_24px_50px_rgba(0,230,118,0.2)]"
          >
            <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-[#00E676] animate-spin" />
            <div className="text-xs">
              <span className="font-extrabold text-white block">Compiling Business Proposal</span>
              <span className="text-[10px] text-muted-foreground/60 block mt-0.5">Sizing carbon offsets and balancing charger grids...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Floating Quick Actions */}
      <FloatingQuickActions
        onOptimizeRates={handleOptimizeRates}
        onGenerateReport={handleGenerateReport}
      />

    </div>
  );
}
