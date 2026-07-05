"use client";

import { BookOpen, Clock, BarChart, ChevronRight, Zap, Battery, Cpu, Plug, Leaf, Shield, Settings, Rocket } from "lucide-react";
import Link from "next/link";

const MODULES = [
  { id: 1, title: "How Electric Vehicles Work", desc: "Energy conversion, drivetrain mechanics, and fundamental operation principles.", icon: Zap, time: "30 min", difficulty: "Beginner", color: "#8B5CF6" },
  { id: 2, title: "Battery Technology Deep Dive", desc: "Li-ion, LFP, Solid State cells, BMS architecture, and thermal management.", icon: Battery, time: "45 min", difficulty: "Intermediate", color: "#7C3AED" },
  { id: 3, title: "Electric Motor Types", desc: "PMSM, Induction, SRM motors — torque curves, efficiency maps, and cooling.", icon: Cpu, time: "25 min", difficulty: "Intermediate", color: "#6D28D9" },
  { id: 4, title: "Charging Infrastructure", desc: "Level 1/2/3, CCS2, CHAdeMO, NACS standards, and grid integration.", icon: Plug, time: "30 min", difficulty: "Beginner", color: "#3B82F6" },
  { id: 5, title: "EV Environmental Impact", desc: "Carbon footprint, lifecycle analysis, recycling, and sustainability benefits.", icon: Leaf, time: "20 min", difficulty: "Beginner", color: "#10B981" },
  { id: 6, title: "Safety & Regulations", desc: "Crash safety, battery containment, AIS standards, and homologation.", icon: Shield, time: "25 min", difficulty: "Advanced", color: "#F59E0B" },
  { id: 7, title: "Maintenance & Ownership", desc: "Servicing intervals, tire management, software updates, and total cost of ownership.", icon: Settings, time: "20 min", difficulty: "Beginner", color: "#06B6D4" },
  { id: 8, title: "Future of Electric Mobility", desc: "V2G, autonomous driving, solid-state batteries, and flying taxis.", icon: Rocket, time: "25 min", difficulty: "All Levels", color: "#EC4899" },
];

export function LearningModules() {
  return (
    <section id="modules" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Learning Modules</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">8 comprehensive modules covering everything about Electric Vehicles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="group relative rounded-[18px] border border-white/5 bg-white/2 hover:bg-white/4 p-5 transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" style={{ backgroundColor: mod.color }} />

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${mod.color}15`, borderColor: `${mod.color}25` }}>
                  <Icon className="w-5 h-5" style={{ color: mod.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#AEB5C0]/40">Module {mod.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#A78BFA] transition-colors truncate">{mod.title}</h3>
                  <p className="text-[12px] text-[#AEB5C0]/60 mt-1 leading-relaxed line-clamp-2">{mod.desc}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex items-center gap-1 text-[11px] text-[#AEB5C0]/50">
                      <Clock className="w-3 h-3" /> {mod.time}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#AEB5C0]/50">
                      <BarChart className="w-3 h-3" /> {mod.difficulty}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#AEB5C0]/20 group-hover:text-[#A78BFA] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
