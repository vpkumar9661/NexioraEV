"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, History, Cpu, ThumbsUp, Plug, ShieldCheck, 
  Download, HelpCircle, ChevronRight
} from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Overview", icon: BookOpen },
  { id: "roadmap", label: "Learning Path", icon: ChevronRight },
  { id: "explorer", label: "How EV Works", icon: Cpu },
  { id: "modules", label: "Modules", icon: BookOpen },
  { id: "comparison", label: "EV vs ICE", icon: ThumbsUp },
  { id: "architecture", label: "Architecture", icon: Cpu },
  { id: "videos", label: "Videos", icon: History },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

interface SidebarNavProps {
  activeSection: string;
}

export function SidebarNav({ activeSection }: SidebarNavProps) {
  return (
    <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-[140px] w-[180px] z-30">
      <nav className="p-3 rounded-[16px] border border-white/5 bg-white/[0.02] backdrop-blur-md space-y-1">
        <p className="text-[10px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">
          Navigation
        </p>
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#8B5CF6]/10 text-[#A78BFA] border border-[#8B5CF6]/20"
                  : "text-[#AEB5C0]/60 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{section.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
