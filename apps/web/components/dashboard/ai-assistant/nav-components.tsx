"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, ChevronRight, Bookmark, Sliders, MapPin, 
  Download, BrainCircuit, Share2, ArrowUp, Sparkles, MessageSquare, Plus 
} from "lucide-react";

// ==========================================
// BREADCRUMB
// ==========================================

export function AIBreadcrumb() {
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
          <span className="text-[#7C4DFF] font-bold">AI Command Center</span>
        </div>
        <span className="hidden sm:inline text-[10px] text-[#7C4DFF] font-extrabold uppercase tracking-wider">
          Ask • Analyze • Learn • Design • Optimize
        </span>
      </div>
    </nav>
  );
}

// ==========================================
// LEFT SIDEBAR (RECENT CHATS FOLDERS)
// ==========================================

interface AILeftSidebarProps {
  activeSection: string;
  onNewChat: () => void;
}

const SECTIONS = [
  { id: "hero", label: "Center Home" },
  { id: "quickactions", label: "Quick Actions" },
  { id: "chat", label: "Conversation" },
  { id: "planner", label: "Trip Planner" },
  { id: "battery", label: "Battery Advisor" },
  { id: "charging", label: "Charging Advisor" },
  { id: "vehicle", label: "Vehicle Advisor" },
  { id: "document", label: "Doc Analyzer" },
  { id: "voice", label: "Voice Assistant" },
  { id: "faq", label: "FAQ Support" }
];

export function AILeftSidebar({ activeSection, onNewChat }: AILeftSidebarProps) {
  return (
    <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-[140px] w-[180px] z-35">
      <div className="p-3 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md space-y-4 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 shadow-2xl">
        <button
          onClick={onNewChat}
          className="w-full py-2 rounded-lg bg-[#7C4DFF] hover:bg-[#7C4DFF]/90 text-white text-[11px] font-black transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> New Chat
        </button>

        <nav className="space-y-0.5">
          <p className="text-[10px] font-extrabold text-muted-foreground/40 uppercase tracking-widest px-2.5 pb-2">
            AI Map
          </p>
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 border ${
                  isActive
                    ? "bg-[#7C4DFF]/10 text-[#7C4DFF] border-[#7C4DFF]/25 shadow-[0_0_10px_rgba(124,77,255,0.1)]"
                    : "text-muted-foreground/60 hover:text-white hover:bg-white/3 border-transparent"
                }`}
              >
                <span className="truncate">{section.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ==========================================
// RIGHT FLOATING TOOLBAR
// ==========================================

interface AIFloatingToolbarProps {
  onNewChat: () => void;
}

export function AIFloatingToolbar({ onNewChat }: AIFloatingToolbarProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("AI Command Center link copied to clipboard.");
    }
  };

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-2">
      <button
        onClick={onNewChat}
        title="Start New Chat"
        className="p-2.5 rounded-xl border bg-[#7C4DFF] border-[#7C4DFF] text-white hover:bg-[#7C4DFF]/90 transition-all shadow-lg flex items-center justify-center cursor-pointer"
      >
        <Plus className="w-4.5 h-4.5" />
      </button>

      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        title="Bookmark convo"
        className={`p-2.5 rounded-xl border transition-all shadow-lg cursor-pointer ${
          isBookmarked
            ? "bg-[#7C4DFF] border-[#7C4DFF] text-white"
            : "bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
        }`}
      >
        <Bookmark className="w-4.5 h-4.5" />
      </button>

      <a
        href="#chat"
        title="Focus Chat Workspace"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg flex items-center justify-center"
      >
        <MessageSquare className="w-4.5 h-4.5" />
      </a>

      <button
        onClick={handleShare}
        title="Share AI Center Link"
        className="p-2.5 rounded-xl border bg-[#131722]/90 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-lg cursor-pointer"
      >
        <Share2 className="w-4.5 h-4.5" />
      </button>

      <button
        onClick={scrollToTop}
        title="Scroll to top"
        className="p-2.5 rounded-xl border bg-[#7C4DFF]/20 border-[#7C4DFF]/30 text-[#7C4DFF] hover:bg-[#7C4DFF]/30 transition-all shadow-lg cursor-pointer"
      >
        <ArrowUp className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
