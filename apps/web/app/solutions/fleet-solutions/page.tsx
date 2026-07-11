"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, LayoutDashboard, Compass, Layers, Landmark, Activity, HardDrive, FileText, BookOpen, Bot, Award, Play, X, RefreshCcw, Sun, Flame, Clock, Truck, ShieldAlert } from "lucide-react";

import { FleetHero } from "./components/FleetHero";
import { FleetStats } from "./components/FleetStats";
import { FleetOperationsMap } from "./components/FleetOperationsMap";
import { VehicleMonitor } from "./components/VehicleMonitor";
import { RouteIntelligence } from "./components/RouteIntelligence";
import { ChargingManagement } from "./components/ChargingManagement";
import { FleetCostAnalytics } from "./components/FleetCostAnalytics";
import { PredictiveMaintenance } from "./components/PredictiveMaintenance";
import { DriverPerformance } from "./components/DriverPerformance";
import { CarbonDashboard } from "./components/CarbonDashboard";
import { AIFleetConsultant } from "./components/AIFleetConsultant";
import { FleetReportCenter } from "./components/FleetReportCenter";
import { KnowledgeCenter } from "./components/KnowledgeCenter";
import { FloatingQuickActions } from "./components/FloatingQuickActions";

const SECTIONS = [
  { id: "hero", label: "Fleet Hero", icon: Compass },
  { id: "stats", label: "Fleet Statistics", icon: Award },
  { id: "fleet-operations", label: "Fleet Operations", icon: Layers },
  { id: "vehicle-monitoring", label: "Vehicle Monitoring", icon: Truck },
  { id: "route-intelligence", label: "Route Intelligence", icon: Compass },
  { id: "charging-management", label: "Charging Management", icon: Sun },
  { id: "cost-analysis", label: "Fleet Analytics", icon: Landmark },
  { id: "maintenance", label: "Maintenance", icon: ShieldAlert },
  { id: "driver-performance", label: "Driver Performance", icon: Award },
  { id: "carbon-dashboard", label: "Carbon Dashboard", icon: Activity },
  { id: "ai-consultant", label: "AI Consultant", icon: Bot },
  { id: "report-center", label: "Reports", icon: FileText },
  { id: "knowledge-center", label: "Knowledge Center", icon: BookOpen },
];

export default function FleetSolutionsPage() {
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
    scrollToSection("vehicle-monitoring");
    alert("System Config: Fleet optimization metrics refreshed. Ready to design new dispatch loops.");
  };

  const handleRunSimulation = () => {
    setShowSimulatingToast(true);
    setTimeout(() => {
      setShowSimulatingToast(false);
      scrollToSection("maintenance");
    }, 2500);
  };

  return (
    <div key={newProjectKey} className="h-[calc(100vh-80px)] mt-20 overflow-hidden bg-[#05070d] text-white relative font-sans">
      
      {/* ═══════════════════════════════════════════
          GPU ACCELERATED FLEET BACKGROUND SYSTEM
          ═══════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 3D grid floor perspective */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent 20%, #05070d 80%), linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Ambient Aurora glow balls */}
        <div className="absolute top-[10%] left-[5%] w-[550px] h-[550px] bg-radial from-[#3B82F6]/2.5 to-transparent blur-3xl" />
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
          <span className="text-[#00E676]">Fleet Solutions</span>
        </nav>

        <div className="flex gap-8 relative items-start flex-1 min-h-0">
          
          {/* ═══════════════════════════════════════════
              LEFT FUTURISTIC SIDEBAR NAVIGATION
              ═══════════════════════════════════════════ */}
          <aside className="hidden lg:flex flex-col gap-1 w-64 shrink-0 bg-white/2 border border-white/5 p-4 rounded-[22px] backdrop-blur-md h-full overflow-y-auto scrollbar-thin shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="px-2 pb-3 mb-2 border-b border-white/5 flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
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
                        ? "bg-linear-to-r from-[#3B82F6]/10 to-[#00D4FF]/5 border border-[#3B82F6]/30 text-white shadow-[0_4px_15px_-5px_rgba(59,130,246,0.2)]"
                        : "border border-transparent text-muted-foreground/50 hover:text-white hover:bg-white/3"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-muted-foreground/40"}`} />
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
            
            {/* Section 1: Premium Hero */}
            <div id="hero">
              <FleetHero
                onManageFleet={() => scrollToSection("vehicle-monitoring")}
                onGenerateReport={() => scrollToSection("report-center")}
              />
            </div>

            {/* Section 2: Quick Statistics */}
            <div id="stats">
              <FleetStats />
            </div>

            {/* Section 3: Live Fleet Operations */}
            <div id="fleet-operations">
              <FleetOperationsMap />
            </div>

            {/* Section 4: Vehicle Monitoring */}
            <div id="vehicle-monitoring">
              <VehicleMonitor />
            </div>

            {/* Section 5: AI Route Intelligence */}
            <div id="route-intelligence">
              <RouteIntelligence />
            </div>

            {/* Section 6: Smart Charging Management */}
            <div id="charging-management">
              <ChargingManagement />
            </div>

            {/* Section 7: Fleet Cost Analytics */}
            <div id="cost-analysis">
              <FleetCostAnalytics />
            </div>

            {/* Section 8: Predictive Maintenance */}
            <div id="maintenance">
              <PredictiveMaintenance />
            </div>

            {/* Section 9: Driver Performance */}
            <div id="driver-performance">
              <DriverPerformance />
            </div>

            {/* Section 10: Carbon Impact Dashboard */}
            <div id="carbon-dashboard">
              <CarbonDashboard />
            </div>

            {/* Section 11: AI Fleet Consultant */}
            <div id="ai-consultant">
              <AIFleetConsultant />
            </div>

            {/* Section 12: Report Center */}
            <div id="report-center">
              <FleetReportCenter />
            </div>

            {/* Section 13: Knowledge Center */}
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
          className="w-12 h-12 rounded-full bg-linear-to-tr from-[#3B82F6] to-[#00D4FF] hover:from-[#3B82F6] hover:to-[#00E5FF] flex items-center justify-center text-black font-bold shadow-[0_10px_25px_rgba(59,130,246,0.4)] cursor-pointer animate-[pulse_3s_infinite]"
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
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
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
                            ? "bg-linear-to-r from-[#3B82F6]/10 to-[#00D4FF]/5 border border-[#3B82F6]/30 text-white shadow-[0_4px_15px_-5px_rgba(59,130,246,0.2)]"
                            : "border border-transparent text-muted-foreground/50 hover:text-white hover:bg-white/3"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? "text-[#3B82F6]" : "text-muted-foreground/40"}`} />
                        {sec.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/65 text-center font-mono uppercase tracking-widest">
                NexioraEV Fleet v4.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Simulation Active Loading Toast */}
      <AnimatePresence>
        {showSimulatingToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3.5 px-6 py-4 rounded-[20px] border border-[#ef4444]/30 bg-[#05070d]/90 backdrop-blur-2xl shadow-[0_24px_50px_rgba(239,68,68,0.2)]"
          >
            <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-rose-500 animate-spin" />
            <div className="text-xs">
              <span className="font-extrabold text-white block">Running Active Diagnostics Scan</span>
              <span className="text-[10px] text-muted-foreground/60 block mt-0.5">Scanning motor windings & calipers wear profiles...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Floating Quick Actions */}
      <FloatingQuickActions
        onNewProject={handleNewProject}
        onRunSimulation={handleRunSimulation}
      />

    </div>
  );
}
