"use client";

import React, { useState } from "react";
import { 
  GraduationCap, Award, BookOpen, Clock, Layers, Sliders, CheckCircle, 
  MapPin, Play, Star, ChevronRight, CheckSquare, Zap, Activity 
} from "lucide-react";

// ==========================================
// ACADEMY HERO
// ==========================================

export function AcademyHero() {
  return (
    <section id="hero" className="relative p-6 sm:p-8 rounded-[24px] border border-[#F5B301]/25 bg-linear-to-b from-[#F5B301]/5 to-transparent backdrop-blur-md overflow-hidden min-h-[360px] flex items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#F5B301]/5 blur-[80px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center w-full z-10">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B301]/10 border border-[#F5B301]/20 text-[#F5B301] text-[10px] font-bold uppercase tracking-wider">
            NexioraEV Academy Open
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight text-white leading-tight font-sans">
            Welcome to NexioraEV Academy™
          </h1>
          <p className="text-muted-foreground/85 text-sm sm:text-base leading-relaxed max-w-lg">
            Master Electric Vehicle engineering and cell chemistries through structured courses, virtual laboratories, interactive projects, AI tutoring, and professional certifications.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href="#courses"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#F5B301] text-[#07090e] hover:shadow-[0_0_20px_rgba(245,179,1,0.4)] transition-all"
            >
              Start Learning
            </a>
            <a
              href="#paths"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 bg-white/3 text-white hover:bg-white/5 transition-all"
            >
              Browse Paths
            </a>
            <a
              href="#ai"
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#F5B301]/30 bg-[#F5B301]/10 text-[#F5B301] hover:bg-[#F5B301]/20 transition-all"
            >
              Ask AI Tutor
            </a>
          </div>
        </div>

        {/* Vector SVG Animation */}
        <div className="md:col-span-5 flex items-center justify-center">
          <svg viewBox="-80 -80 160 80" className="w-full max-w-[220px] overflow-visible">
            {/* Hologram rings layers */}
            <ellipse cx="0" cy="15" rx="50" ry="20" fill="none" stroke="rgba(245,179,1,0.15)" strokeWidth="0.8" />
            <ellipse cx="0" cy="15" rx="40" ry="16" fill="none" stroke="rgba(245,179,1,0.1)" strokeWidth="0.8" strokeDasharray="3 3" />
            
            {/* Floating books stack vector */}
            <g transform="translate(0, -10)">
              <rect x="-18" y="-6" width="36" height="12" rx="1.5" fill="#131722" stroke="rgba(245,179,1,0.3)" strokeWidth="0.8" />
              <rect x="-15" y="-12" width="30" height="6" rx="1" fill="#0F172A" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ACADEMY STATISTICS
// ==========================================

const STATS_ITEMS = [
  { label: "Available Courses", value: "14 Courses", desc: "Self-Paced", color: "#F5B301" },
  { label: "Learning Paths", value: "8 Pathways", desc: "Beginner to Pro", color: "#3B82F6" },
  { label: "Virtual Labs", value: "6 Simulators", desc: "Flagship interactive", color: "#10B981" },
  { label: "Engineering Projects", value: "12 Tasks", desc: "Hands-on briefs", color: "#A855F7" },
  { label: "Quiz Assignments", value: "24 Quizzes", desc: "Automated grades", color: "#EC4899" },
  { label: "Certifications", value: "6 Certificates", desc: "QR-code verified", color: "#F59E0B" }
];

export function StatsBar() {
  return (
    <section id="stats" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STATS_ITEMS.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 rounded-[16px] border border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col justify-between"
        >
          <span className="text-[9.5px] font-extrabold text-muted-foreground/40 uppercase tracking-widest leading-none block">
            {stat.label}
          </span>
          <div className="mt-3.5">
            <span className="text-xs font-black text-white block">
              {stat.value}
            </span>
            <span className="text-[9.5px] text-muted-foreground/50 block mt-1">
              {stat.desc}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==========================================
// PERSONAL LEARNING DASHBOARD
// ==========================================

export function PersonalDashboard() {
  return (
    <section id="personal" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Student Progress Dashboard</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Track your ongoing courses, streak metrics, and technical credentials.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Current Course Panel Left */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[9.5px] font-extrabold text-[#F5B301] uppercase tracking-widest block">Active enrollment</span>
            <h3 className="text-sm font-black text-white mt-1">Lithium Battery Engineering & Chemistry</h3>
            <p className="text-xs text-muted-foreground/60 mt-1 leading-normal">Module 3: Battery Thermal runaway boundaries under charging cycles.</p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-muted-foreground/50">Path Progress</span>
              <span className="text-white">65% Completed</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-[#F5B301] rounded-full" style={{ width: "65%" }} />
            </div>
          </div>
        </div>

        {/* Learning metrics right */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Daily Streak</span>
            <strong className="text-lg text-white block mt-2">12 Days 🔥</strong>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block">Hours studied</span>
            <strong className="text-lg text-[#F5B301] block mt-2">18.5 hrs</strong>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// LEARNING PATHS
// ==========================================

const PATHS = [
  { id: "beginner", name: "EV Beginner", duration: "12 hrs", level: "Beginner", modules: 4 },
  { id: "engineer", name: "EV Engineer Specialist", duration: "32 hrs", level: "Intermediate", modules: 8 },
  { id: "battery", name: "Battery Chemistry Master", duration: "24 hrs", level: "Advanced", modules: 6 },
  { id: "charging", name: "Charging Systems Expert", duration: "20 hrs", level: "Intermediate", modules: 5 }
];

export function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState<string>("beginner");

  return (
    <section id="paths" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Curated Learning Paths</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Select a structured pathway milestone to filter engineering roadmap modules.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PATHS.map((p) => {
          const isSelected = p.id === selectedPath;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPath(p.id)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-[#F5B301]/10 border-[#F5B301]/30 text-[#F5B301] shadow-[0_4px_24px_rgba(245,179,1,0.06)]"
                  : "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/4"
              }`}
            >
              <span className="text-[9.5px] font-bold text-muted-foreground/40 uppercase tracking-widest block">{p.level}</span>
              <h4 className="text-xs font-black text-white mt-1">{p.name}</h4>
              <span className="text-[10px] text-muted-foreground/50 block mt-2">
                {p.modules} Modules • {p.duration}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// COURSE LIBRARY
// ==========================================

const COURSES = [
  { title: "Introduction to Electric Vehicles", duration: "4 hrs", difficulty: "Beginner", lessons: 12, rating: 4.8 },
  { title: "High-Voltage battery pack engineering", duration: "8 hrs", difficulty: "Advanced", lessons: 18, rating: 4.9 },
  { title: "Dynamic charging systems structures", duration: "6 hrs", difficulty: "Intermediate", lessons: 14, rating: 4.7 },
  { title: "Power electronics: Inverter designs", duration: "10 hrs", difficulty: "Advanced", lessons: 22, rating: 4.9 }
];

export function CourseLibrary() {
  return (
    <section id="courses" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Course Library</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Filter and enroll in specialized self-paced engineering video classes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COURSES.map((course, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[20px] border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                <span>{course.difficulty}</span>
                <span className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" /> {course.rating}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug uppercase tracking-wide">{course.title}</h4>
            </div>

            <div className="flex justify-between items-center border-t border-white/5 pt-3.5 mt-2">
              <span className="text-[10px] text-muted-foreground/50 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> {course.duration}
              </span>
              <button
                onClick={() => alert(`Enrolling in: ${course.title}`)}
                className="text-[10px] font-black text-[#F5B301] hover:text-white transition-colors cursor-pointer"
              >
                Enroll Course →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// VIRTUAL LABS (LINK REDIRECT WIDGETS)
// ==========================================

const LABS = [
  { title: "Battery Digital Twin™", url: "/evtech/digital-twin", desc: "Model cells and thermal cooling vectors." },
  { title: "Charging Laboratory™", url: "/evtech/charging-hub", desc: "Simulate AC and DC charging sessions." },
  { title: "EV Engineering Studio™", url: "/evtech/digital-studio", desc: "Configure and assemble complete EVs." }
];

export function VirtualLabs() {
  return (
    <section id="labs" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Integrated Virtual Laboratories</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Access platform simulations directly to gain laboratory practical hours credits.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {LABS.map((lab, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="text-[9px] text-[#F5B301] font-bold uppercase tracking-wider block">Simulator Sandbox</span>
              <h4 className="text-xs font-bold text-white mt-1 uppercase tracking-wide">{lab.title}</h4>
              <p className="text-[11.5px] text-muted-foreground/55 mt-2 leading-relaxed">{lab.desc}</p>
            </div>
            <a
              href={lab.url}
              className="w-full py-2 rounded-xl bg-white/3 hover:bg-white/5 text-white text-xs font-bold text-center border border-white/5 transition-colors block"
            >
              Launch Virtual Lab
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// ENGINEERING PROJECTS
// ==========================================

const PROJECTS = [
  { title: "Design a 75 kWh EV battery pack config", time: "12 hrs", difficulty: "Hard" },
  { title: "BMS liquid cooling flow loop balancing", time: "8 hrs", difficulty: "Intermediate" }
];

export function EngineeringProjects() {
  return (
    <section id="projects" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Engineering Design Projects</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Solve engineering scenarios using calculations tools to qualify for credentials.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((proj, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[20px] border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-between gap-4 min-h-[130px]"
          >
            <div>
              <span className="text-[9.5px] font-bold text-purple-400 uppercase block tracking-wider">{proj.difficulty} design task</span>
              <h4 className="text-xs font-bold text-white mt-1.5 uppercase tracking-wide leading-snug">{proj.title}</h4>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] text-muted-foreground/50 font-semibold">Estimated: {proj.time}</span>
              <button
                onClick={() => alert(`Starting engineering task: ${proj.title}`)}
                className="text-[10.5px] font-black text-[#F5B301] hover:text-white cursor-pointer"
              >
                Accept Project →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export type { COURSES };
