"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, LayoutDashboard, Compass, Layers, Landmark, Activity, HardDrive, FileText, BookOpen, Bot, Award, Play, X } from "lucide-react";
import { ChargingHero } from "./components/ChargingHero";
import { ChargingStats } from "./components/ChargingStats";
import { ChargingPlanner } from "./components/ChargingPlanner";
import { ChargingNetworkMap } from "./components/ChargingNetworkMap";
import { CostCalculator } from "./components/CostCalculator";
import { EnergyAnalytics } from "./components/EnergyAnalytics";
import { ChargerComparison } from "./components/ChargerComparison";
import { BusinessROI } from "./components/BusinessROI";
import { AIChargingAssistant } from "./components/AIChargingAssistant";
import { ReportCenter } from "./components/ReportCenter";
import { KnowledgeCenter } from "./components/KnowledgeCenter";
import { FloatingQuickActions } from "./components/FloatingQuickActions";

const SECTIONS = [
  { id: "hero", label: "Smart EV Hero", icon: Compass },
  { id: "stats", label: "Quick Statistics", icon: Award },
  { id: "planner", label: "Smart Planner", icon: LayoutDashboard },
  { id: "network-map", label: "Network Map", icon: Layers },
  { id: "cost-calculator", label: "Cost Calculator", icon: Landmark },
  { id: "energy-analytics", label: "Energy Analytics", icon: Activity },
  { id: "charger-comparison", label: "Charger Comparison", icon: HardDrive },
  { id: "business-roi", label: "Business ROI & Subsidies", icon: Landmark },
  { id: "ai-assistant", label: "AI Consultant", icon: Bot },
  { id: "report-center", label: "Report Center", icon: FileText },
  { id: "knowledge-center", label: "Knowledge Center", icon: BookOpen },
];

export default function ChargingSolutionsPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showSimulatingToast, setShowSimulatingToast] = useState(false);
  const [newProjectKey, setNewProjectKey] = useState(0);
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
  }, [newProjectKey]);

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

  const handleNewProject = () => {
    setNewProjectKey((prev) => prev + 1);
    scrollToSection("planner");
    alert("System Config: Project values initialized. Ready to plan new grid site.");
  };

  const handleRunSimulation = () => {
    setShowSimulatingToast(true);
    setTimeout(() => {
      setShowSimulatingToast(false);
      scrollToSection("energy-analytics");
    }, 2500);
  };

  return (
    <div key={newProjectKey} className="h-[calc(100vh-80px)] mt-20 overflow-hidden bg-[#05070d] text-white relative font-sans">
      
      {/* ═══════════════════════════════════════════
          GPU ACCELERATED CHARGING BACKGROUND SYSTEM
          ═══════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 3D grid floor perspective */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent 20%, #05070d 80%), linear-gradient(rgba(0, 230, 118, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 230, 118, 0.15) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Rising light beams / columns */}
        <div className="absolute top-[10%] left-[20%] w-[1px] h-[70vh] bg-linear-to-b from-transparent via-[#00E676]/30 to-transparent blur-xs" />
        <div className="absolute top-[20%] right-[30%] w-[2px] h-[50vh] bg-linear-to-b from-transparent via-[#00D4FF]/30 to-transparent blur-xs animate-pulse duration-[5s]" />
        
        {/* Slow Moving Charging Energy Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <path d="M-50,200 Q200,100 400,300 T900,100" fill="none" stroke="#00E676" strokeWidth="1" strokeDasharray="5 15" className="animate-[energy-flow_10s_linear_infinite]" />
          <path d="M100,50 Q400,200 700,50 T1200,300" fill="none" stroke="#00D4FF" strokeWidth="0.8" strokeDasharray="3 12" className="animate-[energy-flow_12s_linear_infinite_reverse]" />
        </svg>

        {/* Localized charger hologram glow */}
        <div className="absolute top-[40%] left-[10%] w-[350px] h-[350px] bg-radial from-[#00E676]/3 to-transparent blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-radial from-[#00D4FF]/2.5 to-transparent blur-3xl" />
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
          <span className="text-[#00E676]">Charging Solutions</span>
        </nav>

        <div className="flex gap-8 relative items-start flex-1 min-h-0">
          
          {/* ═══════════════════════════════════════════
              LEFT FUTURISTIC SIDEBAR NAVIGATION
              ═══════════════════════════════════════════ */}
          <aside className="hidden lg:flex flex-col gap-1 w-64 shrink-0 bg-white/2 border border-white/5 p-4 rounded-[22px] backdrop-blur-md h-full overflow-y-auto scrollbar-thin shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="px-2 pb-3 mb-2 border-b border-white/5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60">
                SCADA COMMAND BAR
              </span>
            </div>
            
            {SECTIONS.map((sec) => {
              const active = activeSection === sec.id;
              const Icon = sec.icon;

              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? "bg-linear-to-r from-[#00E676]/10 to-[#00D4FF]/5 border border-[#00E676]/30 text-white shadow-[0_4px_15px_-5px_rgba(0,230,118,0.2)]"
                      : "border border-transparent text-muted-foreground/50 hover:text-white hover:bg-white/3"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#00E676]" : "text-muted-foreground/40"}`} />
                  {sec.label}
                </button>
              );
            })}
          </aside>

          {/* ═══════════════════════════════════════════
              MAIN WORKSPACE PAGE SECTIONS
              ═══════════════════════════════════════════ */}
          <main 
            ref={contentContainerRef}
            className="flex-1 h-full overflow-y-auto space-y-16 pr-2 pb-[120px] scrollbar-thin scroll-smooth"
          >
            
            {/* Section 1: Premium Hero */}
            <div id="hero">
              <ChargingHero
                onExplorePlanner={() => scrollToSection("planner")}
                onGenerateProposal={() => scrollToSection("business-roi")}
              />
            </div>

            {/* Section 2: Quick Stats */}
            <div id="stats">
              <ChargingStats />
            </div>

            {/* Section 3: Smart Charging Planner */}
            <div id="planner">
              <ChargingPlanner />
            </div>

            {/* Section 4: Network GIS Map */}
            <div id="network-map">
              <ChargingNetworkMap />
            </div>

            {/* Section 5: Cost Calculator */}
            <div id="cost-calculator">
              <CostCalculator />
            </div>

            {/* Section 6: Energy Analytics */}
            <div id="energy-analytics">
              <EnergyAnalytics />
            </div>

            {/* Section 7: Charger hardware spec matrix */}
            <div id="charger-comparison">
              <ChargerComparison />
            </div>

            {/* Section 8: Financial ROI panel */}
            <div id="business-roi">
              <BusinessROI />
            </div>

            {/* Section 9: AI consultant console */}
            <div id="ai-assistant">
              <AIChargingAssistant />
            </div>

            {/* Section 10: Reports Compiler */}
            <div id="report-center">
              <ReportCenter />
            </div>

            {/* Section 11: Compliance specs manual */}
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
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-muted-foreground cursor-pointer animate-none"
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
                        <Icon className={`w-4 h-4 ${active ? "text-[#00E676]" : "text-muted-foreground/40"}`} />
                        {sec.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/65 text-center font-mono uppercase tracking-widest">
                NexioraEV GIS v3.14
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right Floating Docks Action Menu */}
      <FloatingQuickActions
        onNewProject={handleNewProject}
        onRunSimulation={handleRunSimulation}
      />

      {/* ═══════════════════════════════════════════
          SIMULATOR EMULATOR ACTIVE STATE TOAST
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {showSimulatingToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#0c0e14]/90 border border-[#00E676]/30 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,230,118,0.15)] flex items-center gap-4 text-xs font-bold"
          >
            <div className="w-5 h-5 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin shrink-0" />
            <div>
              <p className="text-white uppercase font-black tracking-wider leading-none">Running Smart Grid Simulation...</p>
              <p className="text-muted-foreground/65 text-[10px] mt-1 font-mono">Simulating load flows on transformer node #NEX-228A</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
