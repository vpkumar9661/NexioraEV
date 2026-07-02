"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { GraduationCap, PlayCircle, FileText } from "lucide-react";

export default function LearningCenterPage() {
  const stats = [
    { label: "Available Courses", value: "14 Courses", change: "Self-Paced", changeType: "neutral" as const },
    { label: "Video Lessons", value: "62 Videos", change: "Full HD", changeType: "neutral" as const },
    { label: "Quizzes & Tests", value: "8 Active", change: "Auto-graded", changeType: "positive" as const },
    { label: "Skill Badges", value: "5 Unlockable", change: "Shareable", changeType: "positive" as const }
  ];

  const widgets = [
    {
      title: "Featured Video Walkthroughs",
      description: "Step-by-step videos mapping how motor magnets function, regenerative brake mechanics, and high-voltage safety rules.",
      content: (
        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
            <span className="text-white font-bold flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-[#FF9F1A]" />
              Intro to BEV Drivetrains
            </span>
            <span className="text-[#AEB5C0]">12:45 min</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
            <span className="text-white font-bold flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-[#FF9F1A]" />
              BMS Balancing Simulators
            </span>
            <span className="text-[#AEB5C0]">18:20 min</span>
          </div>
        </div>
      )
    },
    {
      title: "Technical Whitepapers & Articles",
      description: "Read peer-reviewed research papers and structural diagrams published by Nexiora engineering labs.",
      content: (
        <div className="w-full text-xs text-[#AEB5C0]/85 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Paper: Thermal runaway mitigation protocols (PDF)</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="Learning Center"
      subtitle="Structured courses, dynamic video walkthroughs, and technical whitepapers."
      categoryName="Learning Center"
      stats={stats}
      widgets={widgets}
    />
  );
}
