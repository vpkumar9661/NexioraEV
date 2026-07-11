"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Home, ChevronRight, Bookmark, Sliders, MapPin, 
  Download, BrainCircuit, Share2, ArrowUp, FileText 
} from "lucide-react";

// ==========================================
// BREADCRUMB
// ==========================================

export function DashboardBreadcrumb() {
  return (
    <nav className="sticky top-[72px] z-40 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-[12px] font-semibold text-muted-foreground/60">
        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/evtech" className="hover:text-white transition-colors">
          EVTech
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#22D3EE] font-bold">Charging Hub</span>
      </div>
    </nav>
  );
}

// ==========================================
// SIDEBAR NAV
// ==========================================

interface SidebarNavProps {
  activeSection: string;
}

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "stats", label: "Stats Bar" },
  { id: "explorer", label: "Charging Tech" },
  { id: "standards", label: "Standards Compare" },
  { id: "station", label: "Station Inspector" },
  { id: "simulator", label: "Charging Sim" },
  { id: "calculator", label: "Cost Calculator" },
  { id: "planner", label: "Trip Planner" },
  { id: "connector", label: "Connector Gallery" },
  { id: "safety", label: "Safety Center" },
  { id: "smart", label: "Smart & V2G" },
  { id: "network", label: "Network Dashboard" },
  { id: "library", label: "Research Library" },
  { id: "videos", label: "Video Lessons" },
  { id: "ai", label: "AI Advisor" },
  { id: "quiz", label: "Quiz Certification" },
  { id: "downloads", label: "Download Center" },
  { id: "faq", label: "FAQ Support" }
];

export function SidebarNav({ activeSection }: SidebarNavProps) {
  return (
    <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-[140px] w-[180px] z-30">
      <nav className="p-3 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md space-y-0.5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 shadow-2xl">
        <p className="text-[10px] font-extrabold text-muted-foreground/40 uppercase tracking-widest px-2.5 pb-2">
          Hub Sections
        </p>
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 border ${
                isActive
                  ? "bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/25 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
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
// FLOATING TOOLBAR
// ==========================================

export function FloatingToolbar() {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Charging Hub dashboard link copied to clipboard.");
    }
  };

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-2">
      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        title="Bookmark Section"
        className={`p-2.5 rounded-xl border transition-all shadow-lg cursor-pointer ${
          isBookmarked
            ? "bg-[#22D3EE] border-[#22D3EE] text-[#07090e]"
            : "bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
        }`}
      >
        <Bookmark className="w-4.5 h-4.5" />
      </button>

      <a
        href="#calculator"
        title="Cost Calculator"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <Sliders className="w-4.5 h-4.5" />
      </a>

      <a
        href="#planner"
        title="Trip Route Planner"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <MapPin className="w-4.5 h-4.5" />
      </a>

      <a
        href="#downloads"
        title="Download Technical Guides"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <Download className="w-4.5 h-4.5" />
      </a>

      <a
        href="#ai"
        title="AI Assistant Wizard"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <BrainCircuit className="w-4.5 h-4.5" />
      </a>

      <button
        onClick={handleShare}
        title="Share Dashboard"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg cursor-pointer"
      >
        <Share2 className="w-4.5 h-4.5" />
      </button>

      <button
        onClick={scrollToTop}
        title="Scroll to top"
        className="p-2.5 rounded-xl border bg-[#22D3EE]/20 border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/30 transition-all shadow-lg cursor-pointer"
      >
        <ArrowUp className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
