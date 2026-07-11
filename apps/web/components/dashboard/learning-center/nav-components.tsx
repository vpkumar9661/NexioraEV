"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, ChevronRight, Bookmark, Sliders, MapPin, 
  Download, BrainCircuit, Share2, ArrowUp, Sparkles, FileText
} from "lucide-react";

// ==========================================
// BREADCRUMB
// ==========================================

export function AcademyBreadcrumb() {
  return (
    <nav className="sticky top-[72px] z-40 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[12px] font-semibold text-muted-foreground/60">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/evtech" className="hover:text-white transition-colors">
            EVTech
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5B301] font-bold">NexioraEV Academy™</span>
        </div>
        <span className="hidden sm:inline text-[10px] text-[#F5B301] font-extrabold uppercase tracking-wider">
          Learn • Practice • Build • Get Certified
        </span>
      </div>
    </nav>
  );
}

// ==========================================
// LEFT STICKY COURSE NAVIGATION
// ==========================================

interface AcademyLeftSidebarNavProps {
  activeSection: string;
}

const SECTIONS = [
  { id: "hero", label: "Academy Home" },
  { id: "stats", label: "Academy Stats" },
  { id: "personal", label: "Student Dashboard" },
  { id: "paths", label: "Learning Paths" },
  { id: "courses", label: "Courses Library" },
  { id: "labs", label: "Virtual Labs Hub" },
  { id: "projects", label: "Engineering Projects" },
  { id: "assessments", label: "Practice Tests" },
  { id: "certifications", label: "Certification Center" },
  { id: "library", label: "Books & Papers" },
  { id: "videos", label: "Video Lectures" },
  { id: "ai", label: "AI Tutor Chat" },
  { id: "community", label: "Study Forums" },
  { id: "leaderboard", label: "Leaderboard Ranking" },
  { id: "achievements", label: "Academy Badges" },
  { id: "downloads", label: "Formulas & Handbooks" },
  { id: "faq", label: "FAQs Search" }
];

export function AcademyLeftSidebarNav({ activeSection }: AcademyLeftSidebarNavProps) {
  return (
    <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-[140px] w-[180px] z-35">
      <nav className="p-3 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md space-y-0.5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 shadow-2xl">
        <p className="text-[10px] font-extrabold text-muted-foreground/40 uppercase tracking-widest px-2.5 pb-2">
          Academy Map
        </p>
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 border ${
                isActive
                  ? "bg-[#F5B301]/10 text-[#F5B301] border-[#F5B301]/25 shadow-[0_0_10px_rgba(245,179,1,0.1)]"
                  : "text-muted-foreground/60 hover:text-white hover:bg-white/3 border-transparent"
              }`}
            >
              <span className="truncate">{section.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

// ==========================================
// RIGHT FLOATING TOOLBAR
// ==========================================

export function AcademyFloatingToolbar() {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Academy dashboard link copied to clipboard.");
    }
  };

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-2">
      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        title="Bookmark lesson"
        className={`p-2.5 rounded-xl border transition-all shadow-lg cursor-pointer ${
          isBookmarked
            ? "bg-[#F5B301] border-[#F5B301] text-[#07090e]"
            : "bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
        }`}
      >
        <Bookmark className="w-4.5 h-4.5" />
      </button>

      <a
        href="#courses"
        title="Browse Courses"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <FileText className="w-4.5 h-4.5" />
      </a>

      <a
        href="#ai"
        title="AI Tutor Helper"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <BrainCircuit className="w-4.5 h-4.5" />
      </a>

      <button
        onClick={handleShare}
        title="Share Academy Link"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg cursor-pointer"
      >
        <Share2 className="w-4.5 h-4.5" />
      </button>

      <button
        onClick={scrollToTop}
        title="Scroll to top"
        className="p-2.5 rounded-xl border bg-[#F5B301]/20 border-[#F5B301]/30 text-[#F5B301] hover:bg-[#F5B301]/30 transition-all shadow-lg cursor-pointer"
      >
        <ArrowUp className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
