"use client";

import { useEffect, useState } from "react";
import {
  DashboardBreadcrumb,
  SidebarNav,
  FloatingToolbar,
  HeroSection,
  StatsBar,
  TechExplorer,
  ChargingStandards,
  InteractiveStation,
  ChargingSimulator,
  CostCalculator,
  TripPlanner,
  ConnectorExplorer,
  SafetyCenter,
  SmartCharging,
  NetworkDashboard,
  ResearchLibrary,
  VideoLearning,
  AIAssistant,
  ChargingQuiz,
  DownloadCenter,
  FAQSection,
  ContinueCTA
} from "@/components/dashboard/charging-hub";

const SECTION_IDS = [
  "hero",
  "stats",
  "explorer",
  "standards",
  "station",
  "simulator",
  "calculator",
  "planner",
  "connector",
  "safety",
  "smart",
  "network",
  "library",
  "videos",
  "ai",
  "quiz",
  "downloads",
  "faq",
  "cta"
];

export default function ChargingHubPage() {
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
      {/* Charging Hub specific background elements: Cyan energy flows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#22D3EE]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb navigation */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
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

        {/* Section 2: Live charging stats counters */}
        <StatsBar />

        {/* Section 3: Tech Explorer */}
        <TechExplorer />

        {/* Section 4: Standards Comparison matrix */}
        <ChargingStandards />

        {/* Section 5: Charger station hardware inspector */}
        <InteractiveStation />

        {/* Section 6: Live Charging session simulator */}
        <ChargingSimulator />

        {/* Section 7: Grid cost and savings calculator */}
        <CostCalculator />

        {/* Section 8: Trip planning optimizer */}
        <TripPlanner />

        {/* Section 9: Connector gallery pins inspector */}
        <ConnectorExplorer />

        {/* Section 10: Charging Safety module */}
        <SafetyCenter />

        {/* Section 11: Smart Charging V2G networks */}
        <SmartCharging />

        {/* Section 12: Grid Load & network occupancies */}
        <NetworkDashboard />

        {/* Section 13: Standards documents catalog */}
        <ResearchLibrary />

        {/* Section 14: Video Courses */}
        <VideoLearning />

        {/* Section 15: AI Chat prompt advisor */}
        <AIAssistant />

        {/* Section 16: Certification Quiz panel */}
        <ChargingQuiz />

        {/* Section 17: Reference PDF manuals */}
        <DownloadCenter />

        {/* Section 18: FAQ accordion */}
        <FAQSection />

        {/* Section 19/20: Drivetrain Components transition CTA */}
        <ContinueCTA />
      </main>
    </div>
  );
}
