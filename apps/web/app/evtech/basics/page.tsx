"use client";

import { EvtechDashboardTemplate } from "@/components/layout/evtech-dashboard-template";
import { BookOpen, HelpCircle, CheckCircle2 } from "lucide-react";

export default function EVBasicsPage() {
  const stats = [
    { label: "Core Modules", value: "8 Modules", change: "100% Free", changeType: "positive" as const },
    { label: "Learning Hours", value: "4.5 Hrs", change: "Self-paced", changeType: "neutral" as const },
    { label: "Active Students", value: "1,240+", change: "+12% this wk", changeType: "positive" as const },
    { label: "Certification", value: "Included", change: "Verified", changeType: "positive" as const }
  ];

  const widgets = [
    {
      title: "EV Fundamentals & Overview",
      description: "Get started with the absolute basics of Electric Vehicles, from how they operate to key differences from ICE vehicles.",
      content: (
        <div className="w-full space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <BookOpen className="w-5 h-5 text-[#FF9F1A]" />
            <div>
              <p className="text-sm font-bold text-white">Module 1: How EVs Work</p>
              <p className="text-xs text-[#AEB5C0]/75">Understanding energy conversion and drivetrain mechanics.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <BookOpen className="w-5 h-5 text-[#FF9F1A]" />
            <div>
              <p className="text-sm font-bold text-white">Module 2: Drivetrain Configurations</p>
              <p className="text-xs text-[#AEB5C0]/75">BEVs vs HEVs vs PHEVs differences explained simply.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Common EV Myths Debunked",
      description: "Separate facts from fiction regarding EV range, battery lifetime, environmental impact, and grid load.",
      content: (
        <div className="w-full space-y-3 text-xs text-[#AEB5C0]/80">
          <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
            <span className="text-red-400 font-bold">Myth:</span> EV batteries only last 2-3 years.
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <span className="text-emerald-400 font-bold">Fact:</span> Modern EV batteries last 10-15 years or up to 200,000 miles with proper BMS management.
          </div>
        </div>
      )
    }
  ];

  return (
    <EvtechDashboardTemplate
      title="EV Basics"
      subtitle="Learn the core fundamentals and operation principles of Electric Vehicles."
      categoryName="EV Basics"
      stats={stats}
      widgets={widgets}
    />
  );
}
