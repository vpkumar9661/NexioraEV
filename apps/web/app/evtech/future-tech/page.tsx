"use client";

import { useEffect, useState } from "react";
import {
  DashboardBreadcrumb,
  SidebarNav,
  FloatingToolbar,
  HeroSection,
  StatsBar,
  TechTimeline,
  InnovationHub,
  SolidStateBatteryCenter,
  HydrogenLab,
  WirelessChargingLab,
  AutonomousDrivingLab,
  SmartCityExplorer,
  AIMobilityCenter,
  V2G_V2H_Lab,
  FutureConceptGallery,
  ResearchLibrary,
  VideoCenter,
  AIFutureAssistant,
  FutureQuiz,
  DownloadCenter,
  FAQSection,
  ContinueCTA
} from "@/components/dashboard/future-tech";

const SECTION_IDS = [
  "hero",
  "stats",
  "timeline",
  "hub",
  "solidstate",
  "hydrogen",
  "wireless",
  "autonomous",
  "smartcity",
  "aimobility",
  "v2g",
  "concepts",
  "library",
  "videos",
  "ai",
  "quiz",
  "downloads",
  "faq",
  "cta"
];

export default function FutureTechPage() {
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
      {/* Dynamic energy gradients glow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/1.5 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/1.5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1.5 rounded-full blur-[150px]" />
      </div>

      {/* Breadcrumb sticky */}
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

        {/* Section 2: Live stats counts */}
        <StatsBar />

        {/* Section 3: Tech timelines predicted */}
        <TechTimeline />

        {/* Section 4: Innovation Hub specifications */}
        <InnovationHub />

        {/* Section 5: Solid State cells comparison */}
        <SolidStateBatteryCenter />

        {/* Section 6: Hydrogen Membrane PEM loop */}
        <HydrogenLab />

        {/* Section 7: Inductive dynamic wireless coils spacing */}
        <WirelessChargingLab />

        {/* Section 8: Sensor fusion Lidar radar sweeps */}
        <AutonomousDrivingLab />

        {/* Section 9: Smart city solar roads and communication grids */}
        <SmartCityExplorer />

        {/* Section 10: AI fleet controls algorithms details */}
        <AIMobilityCenter />

        {/* Section 11: V2G/V2H bidirectional grid loops */}
        <V2G_V2H_Lab />

        {/* Section 12: eVTOL dynamic blueprints galleries */}
        <FutureConceptGallery />

        {/* Section 13: Publications libraries guides */}
        <ResearchLibrary />

        {/* Section 14: Documentaries videos lists */}
        <VideoCenter />

        {/* Section 15: AI Advisor questions answers */}
        <AIFutureAssistant />

        {/* Section 16: Certification quiz badges */}
        <FutureQuiz />

        {/* Section 17: Reference PDF maps downloads */}
        <DownloadCenter />

        {/* Section 18: Accordion FAQs queries */}
        <FAQSection />

        {/* Section 19/20: CTA main general learning transition */}
        <ContinueCTA />
      </main>
    </div>
  );
}
