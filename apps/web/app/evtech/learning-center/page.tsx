"use client";

import { useEffect, useState } from "react";
import { 
  AcademyBreadcrumb, 
  AcademyLeftSidebarNav, 
  AcademyFloatingToolbar,
  AcademyHero,
  StatsBar,
  PersonalDashboard,
  LearningPaths,
  CourseLibrary,
  VirtualLabs,
  EngineeringProjects,
  AcademyQuiz,
  CertificationCenter,
  ResourceLibrary,
  VideoAcademy,
  AITutor,
  CommunityHub,
  AchievementsHub
} from "@/components/dashboard/learning-center";

const SECTION_IDS = [
  "hero",
  "stats",
  "personal",
  "paths",
  "courses",
  "labs",
  "projects",
  "assessments",
  "certifications",
  "library",
  "videos",
  "ai",
  "community",
  "achievements",
  "downloads"
];

export default function LearningCenterPage() {
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
      {/* Gold themed ambient glowing backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/4 w-[600px] h-[600px] bg-[#F5B301]/1 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] left-1/3 w-[600px] h-[600px] bg-[#8B5CF6]/1 rounded-full blur-[150px]" />
      </div>

      {/* Sticky breadcrumbs */}
      <div className="pt-[72px] px-4 sm:px-6 lg:px-8 relative z-40">
        <AcademyBreadcrumb />
      </div>

      {/* Sticky Left course navigation */}
      <AcademyLeftSidebarNav activeSection={activeSection} />

      {/* Floating Toolbar Shortcuts */}
      <AcademyFloatingToolbar />

      {/* Main Content Workspace Layout */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16">
        
        {/* Section 1: Hero */}
        <AcademyHero />

        {/* Section 2: Stats bar */}
        <StatsBar />

        {/* Section 3: Student Dashboard progress */}
        <PersonalDashboard />

        {/* Section 4: Learning Paths roadmaps */}
        <LearningPaths />

        {/* Section 5: Course Library filter cards */}
        <CourseLibrary />

        {/* Section 6: Virtual Laboratories launch templates */}
        <VirtualLabs />

        {/* Section 7: Engineering Projects specifications */}
        <EngineeringProjects />

        {/* Section 8: Graded practice tests assessments */}
        <AcademyQuiz />

        {/* Section 9: QR Certificate generator centers */}
        <CertificationCenter />

        {/* Section 10: Technical Reference papers library */}
        <ResourceLibrary />

        {/* Section 11: Documentaries lessons videos */}
        <VideoAcademy />

        {/* Section 12: AI Tutor chat inputs */}
        <AITutor />

        {/* Section 13/14: Study groups community forums & leaderboard ranking */}
        <CommunityHub />

        {/* Section 15/16: Unlocked achievements badges & handbooks download center */}
        <AchievementsHub />

      </main>
    </div>
  );
}
