"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, ChevronRight, Bookmark, Sliders, MapPin, 
  Download, BrainCircuit, Share2, ArrowUp, Sparkles, Settings
} from "lucide-react";

// ==========================================
// BREADCRUMB
// ==========================================

export function ToolkitBreadcrumb() {
  return (
    <nav className="sticky top-[72px] z-40 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[12px] font-semibold text-[#AEB5C0]/60">
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
          <span className="text-[#00C853] font-bold">Engineering Toolkit</span>
        </div>
        <span className="hidden sm:inline text-[10px] text-[#00C853] font-extrabold uppercase tracking-wider">
          Calculate • Analyze • Optimize • Engineer
        </span>
      </div>
    </nav>
  );
}

// ==========================================
// LEFT STICKY COURSE NAVIGATION
// ==========================================

interface ToolkitLeftSidebarNavProps {
  activeSection: string;
}

const SECTIONS = [
  { id: "hero", label: "Toolkit Home" },
  { id: "stats", label: "Toolkit Stats" },
  { id: "categories", label: "Categories" },
  { id: "battery", label: "Battery Tools" },
  { id: "charging", label: "Charging Tools" },
  { id: "motor", label: "Motor Tools" },
  { id: "performance", label: "Performance Tools" },
  { id: "energy", label: "Energy & Cost" },
  { id: "environment", label: "Environment" },
  { id: "converters", label: "Converters" },
  { id: "formulas", label: "Formula Library" },
  { id: "references", label: "References" },
  { id: "ai", label: "AI Engineering" },
  { id: "downloads", label: "Downloads" },
  { id: "faq", label: "FAQ Support" }
];

export function ToolkitLeftSidebarNav({ activeSection }: ToolkitLeftSidebarNavProps) {
  return (
    <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-[140px] w-[180px] z-35">
      <nav className="p-3 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md space-y-0.5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 shadow-2xl">
        <p className="text-[10px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2.5 pb-2">
          Toolkit Map
        </p>
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 border ${
                isActive
                  ? "bg-[#00C853]/10 text-[#00C853] border-[#00C853]/25 shadow-[0_0_10px_rgba(0,200,83,0.1)]"
                  : "text-[#AEB5C0]/60 hover:text-white hover:bg-white/3 border-transparent"
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

export function ToolkitFloatingToolbar() {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Toolkit link copied to clipboard.");
    }
  };

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-2">
      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        title="Bookmark tool page"
        className={`p-2.5 rounded-xl border transition-all shadow-lg cursor-pointer ${
          isBookmarked
            ? "bg-[#00C853] border-[#00C853] text-[#07090e]"
            : "bg-[#131722]/90 border-white/10 text-[#AEB5C0] hover:text-white hover:bg-white/5"
        }`}
      >
        <Bookmark className="w-4.5 h-4.5" />
      </button>

      <a
        href="#categories"
        title="Browse categories"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <Settings className="w-4.5 h-4.5" />
      </a>

      <a
        href="#ai"
        title="AI Engineering Assistant"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <BrainCircuit className="w-4.5 h-4.5" />
      </a>

      <button
        onClick={handleShare}
        title="Share Toolkit Link"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all shadow-lg cursor-pointer"
      >
        <Share2 className="w-4.5 h-4.5" />
      </button>

      <button
        onClick={scrollToTop}
        title="Scroll to top"
        className="p-2.5 rounded-xl border bg-[#00C853]/20 border-[#00C853]/30 text-[#00C853] hover:bg-[#00C853]/30 transition-all shadow-lg cursor-pointer"
      >
        <ArrowUp className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
