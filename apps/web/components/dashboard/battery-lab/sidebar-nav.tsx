"use client";

import { 
  BookOpen, ChevronRight, Cpu, HelpCircle, History, 
  ShieldAlert, Settings, Thermometer, Zap, Activity, 
  Table, BarChart3, LineChart, FileText, Play, BrainCircuit,
  Award, Download, Sparkles
} from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Overview", icon: BookOpen },
  { id: "stats", label: "Stats & Diagnostics", icon: Activity },
  { id: "virtual-lab", label: "Virtual Lab", icon: Sparkles },
  { id: "explorer", label: "Chemistries", icon: BrainCircuit },
  { id: "comparison", label: "Comparison", icon: Table },
  { id: "pack", label: "Pack Explorer", icon: Cpu },
  { id: "bms", label: "BMS Loop", icon: Settings },
  { id: "charging", label: "Charging Behaviors", icon: Zap },
  { id: "health", label: "Health Center", icon: LineChart },
  { id: "thermal", label: "Thermal Loop", icon: Thermometer },
  { id: "safety", label: "Safety Protocols", icon: ShieldAlert },
  { id: "timeline", label: "Innovation Path", icon: History },
  { id: "calculators", label: "Calculators", icon: BarChart3 },
  { id: "library", label: "Technical Library", icon: FileText },
  { id: "videos", label: "Video Lessons", icon: Play },
  { id: "ai", label: "AI Explanations", icon: BrainCircuit },
  { id: "quiz", label: "Battery Quiz", icon: Award },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "faq", label: "FAQ Support", icon: HelpCircle },
];

interface SidebarNavProps {
  activeSection: string;
}

export function SidebarNav({ activeSection }: SidebarNavProps) {
  return (
    <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-[140px] w-[180px] z-30">
      <nav className="p-3 rounded-[16px] border border-white/5 bg-white/2 backdrop-blur-md space-y-1 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        <p className="text-[10px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">
          Lab Navigator
        </p>
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#10B981]/10 text-[#6EE7B7] border border-[#10B981]/20"
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
