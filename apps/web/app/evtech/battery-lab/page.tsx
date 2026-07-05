"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardBreadcrumb } from "@/components/dashboard/battery-lab/breadcrumb";
import { SidebarNav } from "@/components/dashboard/battery-lab/sidebar-nav";
import { FloatingToolbar } from "@/components/dashboard/battery-lab/floating-toolbar";
import { HeroSection } from "@/components/dashboard/battery-lab/hero-section";
import { StatsBar } from "@/components/dashboard/battery-lab/stats-bar";
import { TechExplorer } from "@/components/dashboard/battery-lab/tech-explorer";
import { ChemistryComparison } from "@/components/dashboard/battery-lab/chemistry-comparison";
import { PackExplorer } from "@/components/dashboard/battery-lab/pack-explorer";
import { BMSSystem } from "@/components/dashboard/battery-lab/bms-system";
import { ChargingBehaviour } from "@/components/dashboard/battery-lab/charging-behaviour";
import { HealthCenter } from "@/components/dashboard/battery-lab/health-center";
import { ThermalManagement } from "@/components/dashboard/battery-lab/thermal-management";
import { SafetyModules } from "@/components/dashboard/battery-lab/safety-modules";
import { InnovationTimeline } from "@/components/dashboard/battery-lab/innovation-timeline";
import { BatteryCalculators } from "@/components/dashboard/battery-lab/battery-calculators";
import { ResearchLibrary } from "@/components/dashboard/battery-lab/research-library";
import { VideoLearning } from "@/components/dashboard/battery-lab/video-learning";
import { AIAssistant } from "@/components/dashboard/battery-lab/ai-assistant";
import { BatteryQuiz } from "@/components/dashboard/battery-lab/battery-quiz";
import { DownloadCenter } from "@/components/dashboard/battery-lab/download-center";
import { FAQSection } from "@/components/dashboard/battery-lab/faq-section";
import { RelatedModules } from "@/components/dashboard/battery-lab/related-modules";
import { ContinueCTA } from "@/components/dashboard/battery-lab/continue-cta";

const SECTION_IDS = [
  "hero", "stats", "explorer", "comparison", "pack", "bms", "charging",
  "health", "thermal", "safety", "timeline", "calculators", "library",
  "videos", "ai", "quiz", "downloads", "faq"
];

export default function BatteryLabPage() {
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
      {/* Ambient background glow design */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-1/3 w-[600px] h-[600px] bg-[#8B5CF6]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb navigation */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-10">
        <DashboardBreadcrumb />
      </div>

      {/* Sidebar navigation */}
      <SidebarNav activeSection={activeSection} />

      {/* Floating Toolbar */}
      <FloatingToolbar />

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Live Battery Stats */}
        <StatsBar />

        {/* Section 3: Battery Technology Explorer */}
        <TechExplorer />

        {/* Section 4: Battery Comparison Center */}
        <ChemistryComparison />

        {/* Section 5: Interactive Battery Pack */}
        <PackExplorer />

        {/* Section 6: Battery Management System */}
        <BMSSystem />

        {/* Section 7: Charging Behaviour */}
        <ChargingBehaviour />

        {/* Section 8: Battery Health Center */}
        <HealthCenter />

        {/* Section 9: Thermal Management */}
        <ThermalManagement />

        {/* Section 10: Battery Safety */}
        <SafetyModules />

        {/* Section 11: Battery Innovation Timeline */}
        <InnovationTimeline />

        {/* Section 12: Battery Calculators */}
        <BatteryCalculators />

        {/* Section 13: Research Library */}
        <ResearchLibrary />

        {/* Section 14: Video Learning */}
        <VideoLearning />

        {/* Section 15: AI Battery Assistant */}
        <AIAssistant />

        {/* Section 16: Battery Quiz */}
        <BatteryQuiz />

        {/* Section 17: Download Center */}
        <DownloadCenter />

        {/* Section 18: FAQ */}
        <FAQSection />

        {/* Section 19: Related Modules */}
        <RelatedModules />

        {/* Section 20: CTA */}
        <ContinueCTA />
      </main>
    </div>
  );
}
