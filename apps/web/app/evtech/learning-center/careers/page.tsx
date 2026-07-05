"use client";

import { useEffect, useState } from "react";
import { 
  CareerBreadcrumb,
  CareerLeftSidebarNav,
  CareerFloatingToolbar,
  CareerHero,
  StatsBar,
  PersonalDashboard,
  CareerRoadmaps,
  SkillsMatrix,
  PortfolioBuilder,
  InterviewCenter,
  ResumeBuilder,
  InternshipReadiness,
  AICareerCoach,
  CareerProgress,
  AchievementsHub,
  FAQSection,
  CareerCTA
} from "@/components/dashboard/learning-center/careers";

const SECTION_IDS = [
  "hero",
  "stats",
  "personal",
  "roadmaps",
  "skills",
  "portfolio",
  "interview",
  "resume",
  "readiness",
  "ai",
  "progress",
  "achievements",
  "faq",
  "cta"
];

export default function CareerHubPage() {
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
      {/* Royal Gold themed ambient glowing backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#F4B400]/1 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#10B981]/1 rounded-full blur-[150px]" />
      </div>

      {/* Sticky breadcrumbs */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <CareerBreadcrumb />
      </div>

      {/* Sticky Left navigation */}
      <CareerLeftSidebarNav activeSection={activeSection} />

      {/* Floating Toolbar Shortcuts */}
      <CareerFloatingToolbar />

      {/* Main Content Workspace Layout */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        
        {/* Section 1: Hero */}
        <CareerHero />

        {/* Section 2: Stats bar */}
        <StatsBar />

        {/* Section 3: Student progress dashboard */}
        <PersonalDashboard />

        {/* Section 4: EV Career Roadmaps */}
        <CareerRoadmaps />

        {/* Section 5: Competencies Skills Matrix */}
        <SkillsMatrix />

        {/* Section 6/7: Portfolios & Project Showcase */}
        <PortfolioBuilder />

        {/* Section 8: Graded Interview whiteboard */}
        <InterviewCenter />

        {/* Section 9: Resumes PDF compilers */}
        <ResumeBuilder />

        {/* Section 10: Internship & Job readiness dashboards */}
        <InternshipReadiness />

        {/* Section 11: AI Career coach chat */}
        <AICareerCoach />

        {/* Section 12: Career timeline milestones */}
        <CareerProgress />

        {/* Section 13/14: Unlocked achievements badges & downloads */}
        <AchievementsHub />

        {/* Section 15: Accordions FAQs */}
        <FAQSection />

        {/* Section 16: Placement CTA */}
        <CareerCTA />

      </main>
    </div>
  );
}
