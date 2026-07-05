"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardBreadcrumb } from "@/components/dashboard/ev-basics/breadcrumb";
import { SidebarNav } from "@/components/dashboard/ev-basics/sidebar-nav";
import { FloatingToolbar } from "@/components/dashboard/ev-basics/floating-toolbar";
import { HeroSection } from "@/components/dashboard/ev-basics/hero-section";
import { StatsBar } from "@/components/dashboard/ev-basics/stats-bar";
import { LearningRoadmap } from "@/components/dashboard/ev-basics/learning-roadmap";
import { EVExplorer } from "@/components/dashboard/ev-basics/ev-explorer";
import { LearningModules } from "@/components/dashboard/ev-basics/learning-modules";
import { EVComparison } from "@/components/dashboard/ev-basics/ev-comparison";
import { EVArchitecture } from "@/components/dashboard/ev-basics/ev-architecture";
import { VideoLibrary } from "@/components/dashboard/ev-basics/video-library";
import { DownloadCenter } from "@/components/dashboard/ev-basics/download-center";
import { AIAssistantCard } from "@/components/dashboard/ev-basics/ai-assistant-card";
import { FAQSection } from "@/components/dashboard/ev-basics/faq-section";
import { RelatedModules } from "@/components/dashboard/ev-basics/related-modules";
import { ContinueCTA } from "@/components/dashboard/ev-basics/continue-cta";

const SECTION_IDS = ["hero", "roadmap", "explorer", "modules", "comparison", "architecture", "videos", "downloads", "faq"];
const STORAGE_KEY = "nexiora-ev-basics-progress";

export default function EVBasicsPage() {
  // Learning progress persistence
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState("hero");

  // Load persisted progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompletedSteps(JSON.parse(saved));
    } catch {}
  }, []);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
    } catch {}
  }, [completedSteps]);

  // Toggle step completion
  const toggleStep = useCallback((stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  }, []);

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
    <div className="min-h-screen bg-[#07090e] text-white font-sans">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/[0.015] rounded-full blur-[120px]" />
      </div>

      {/* Breadcrumb */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-10">
        <DashboardBreadcrumb />
      </div>

      {/* Sidebar Navigation */}
      <SidebarNav activeSection={activeSection} />

      {/* Floating Toolbar */}
      <FloatingToolbar />

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Stats */}
        <StatsBar />

        {/* Section 3: Learning Roadmap + AI Assistant (2-col layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <LearningRoadmap completedSteps={completedSteps} onToggleStep={toggleStep} />
          </div>
          <div className="lg:col-span-2">
            <AIAssistantCard />
          </div>
        </div>

        {/* Section 4: Interactive EV Explorer */}
        <EVExplorer />

        {/* Section 5: Learning Modules */}
        <LearningModules />

        {/* Section 6: EV vs ICE Comparison */}
        <EVComparison />

        {/* Section 7: EV Architecture */}
        <EVArchitecture />

        {/* Section 8: Video Library */}
        <VideoLibrary />

        {/* Section 9: Downloads */}
        <DownloadCenter />

        {/* Section 10: FAQ */}
        <FAQSection />

        {/* Section 11: Related Modules */}
        <RelatedModules />

        {/* Section 12: Continue CTA */}
        <ContinueCTA />
      </main>
    </div>
  );
}
