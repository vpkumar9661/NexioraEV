"use client";

import { useEffect, useState } from "react";
import { 
  ToolkitBreadcrumb,
  ToolkitLeftSidebarNav,
  ToolkitFloatingToolbar,
  HeroSection,
  StatsBar,
  ToolCategories,
  BatteryTools,
  ChargingTools,
  MotorTools,
  PerformanceTools,
  EnergyCostTools,
  EnvironmentalTools,
  ConvertersSection,
  FormulaLibrary,
  AIPlanner,
  DownloadsCenter,
  FAQSection
} from "@/components/dashboard/calculators-tools";

const SECTION_IDS = [
  "hero",
  "stats",
  "categories",
  "battery",
  "charging",
  "motor",
  "performance",
  "energy",
  "environment",
  "converters",
  "formulas",
  "references",
  "ai",
  "downloads",
  "faq"
];

export default function CalculatorsToolsPage() {
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll active section tracking
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
      {/* Emerald themed ambient glowing backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#00C853]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#3B82F6]/1 rounded-full blur-[150px]" />
      </div>

      {/* Sticky breadcrumbs */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <ToolkitBreadcrumb />
      </div>

      {/* Sticky Left navigation */}
      <ToolkitLeftSidebarNav activeSection={activeSection} />

      {/* Floating Toolbar Shortcuts */}
      <ToolkitFloatingToolbar />

      {/* Main Content Workspace Layout */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Stats bar */}
        <StatsBar />

        {/* Section 3: Categories shortcuts */}
        <ToolCategories />

        {/* Section 4: Battery Config calculators */}
        <BatteryTools />

        {/* Section 5: Charging speed calculators */}
        <ChargingTools />

        {/* Section 6: Motor RPM calculations */}
        <MotorTools />

        {/* Section 7: WLTP Drag ranges estimators */}
        <PerformanceTools />

        {/* Section 8: TCO monthly savings ledger */}
        <EnergyCostTools />

        {/* Section 9: Carbon Pine offsets equivalent */}
        <EnvironmentalTools />

        {/* Section 10: SI conversions forms */}
        <ConvertersSection />

        {/* Section 11/12: Formulas library and cell chemistries references */}
        <FormulaLibrary />

        {/* Section 13: AI advisor planner */}
        <AIPlanner />

        {/* Section 14/15: PDF guides download & FAQ accordions */}
        <DownloadsCenter />

        {/* Section 16: FAQ Section */}
        <FAQSection />

      </main>
    </div>
  );
}
