"use client";

import { useEffect, useState } from "react";
import {
  DashboardBreadcrumb,
  SidebarNav,
  FloatingToolbar,
  HeroSection,
  StatsBar,
  ArchitectureExplorer,
  ExplodedView,
  PowertrainExplorer,
  ComponentGallery,
  PowerFlow,
  MotorLab,
  ControllerLab,
  ChassisSystems,
  ThermalManagement,
  HighVoltage,
  ComponentComparison,
  MaintenanceCenter,
  ResearchLibrary,
  VideoLearning,
  AIComponentAssistant,
  ComponentQuiz,
  DownloadCenter,
  FAQSection,
  ContinueCTA
} from "@/components/dashboard/ev-components";

const SECTION_IDS = [
  "hero",
  "stats",
  "architecture",
  "exploded",
  "powertrain",
  "gallery",
  "powerflow",
  "motorlab",
  "controller",
  "chassis",
  "thermal",
  "hv",
  "compare",
  "maintenance",
  "library",
  "videos",
  "ai",
  "quiz",
  "downloads",
  "faq",
  "cta"
];

export default function EVComponentsPage() {
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll-based active section tracking
  useEffect(() => {
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
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans overflow-hidden">
      {/* EV Components specific background elements: Cyan/Purple glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#22D3EE]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb navigation */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-45">
        <DashboardBreadcrumb />
      </div>

      {/* Sidebar navigation */}
      <SidebarNav activeSection={activeSection} />

      {/* Floating Action Toolbar */}
      <FloatingToolbar />

      {/* Main Content Workspace Layout */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Stats HUD */}
        <StatsBar />

        {/* Section 3: Clickable EV Architecture */}
        <ArchitectureExplorer />

        {/* Section 4: Exploded Assembly visualizer */}
        <ExplodedView />

        {/* Section 5: Axle conversion chain flowchart */}
        <PowertrainExplorer />

        {/* Section 6: List grid of components */}
        <ComponentGallery />

        {/* Section 7: Animated power transmission flows */}
        <PowerFlow />

        {/* Section 8: BLDC vs Induction lab curves */}
        <MotorLab />

        {/* Section 9: Inverters and gates logic details */}
        <ControllerLab />

        {/* Section 10: Steering suspension braking ABS */}
        <ChassisSystems />

        {/* Section 11: Liquid cooling loop plate pathways */}
        <ThermalManagement />

        {/* Section 12: Pyro fuses safety isolations */}
        <HighVoltage />

        {/* Section 13: Technical specifications matrices */}
        <ComponentComparison />

        {/* Section 14: Inspection intervals scheduler */}
        <MaintenanceCenter />

        {/* Section 15: Publications guides libraries */}
        <ResearchLibrary />

        {/* Section 16: Lecture courses list */}
        <VideoLearning />

        {/* Section 17: AI specialized answers box */}
        <AIComponentAssistant />

        {/* Section 18: Score certifications quiz */}
        <ComponentQuiz />

        {/* Section 19: CAD STEP drawings spreadsheets downloads */}
        <DownloadCenter />

        {/* Section 20: Accordion queries */}
        <FAQSection />

        {/* Section 21/22: Future Tech transition CTA */}
        <ContinueCTA />
      </main>
    </div>
  );
}
