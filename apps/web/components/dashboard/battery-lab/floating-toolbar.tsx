"use client";

import { useState } from "react";
import { 
  Bookmark, BarChart3, Download, Bot, StickyNote, Share2, ArrowUp
} from "lucide-react";

const TOOLS = [
  { id: "bookmark", icon: Bookmark, label: "Bookmarks", href: "#" },
  { id: "progress", icon: BarChart3, label: "Progress Check", href: "#quiz" },
  { id: "downloads", icon: Download, label: "Downloads", href: "#downloads" },
  { id: "ai", icon: Bot, label: "Ask AI Assistant", href: "#ai" },
  { id: "calculator", icon: BarChart3, label: "Battery Calculators", href: "#calculators" },
  { id: "share", icon: Share2, label: "Share Platform", href: "#" },
];

export function FloatingToolbar() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hidden lg:flex fixed right-[max(1rem,calc((100vw-1280px)/2-80px))] top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2">
      <div className="p-2 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md space-y-1.5">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.id} className="relative">
              <a
                href={tool.href}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#AEB5C0]/60 hover:text-[#6EE7B7] hover:bg-[#10B981]/10 transition-all duration-200 border border-transparent hover:border-[#10B981]/20"
                aria-label={tool.label}
              >
                <Icon className="w-4 h-4" />
              </a>
              {hoveredTool === tool.id && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#131722] border border-white/10 text-[11px] font-bold text-white whitespace-nowrap shadow-lg">
                  {tool.label}
                </div>
              )}
            </div>
          );
        })}

        <div className="w-full h-px bg-white/5" />

        <button
          onClick={scrollToTop}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#AEB5C0]/60 hover:text-[#6EE7B7] hover:bg-[#10B981]/10 transition-all duration-200 border border-transparent hover:border-[#10B981]/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
