"use client";

import React, { useState } from "react";
import { 
  Award, BrainCircuit, Play, FileDown, Search, HelpCircle, 
  ChevronDown, ChevronRight, FileText, Globe, Sparkles 
} from "lucide-react";

// ==========================================
// INTERVIEW CENTER (WHITEBOARD SANDBOX)
// ==========================================

export function InterviewCenter() {
  const [userCode, setUserCode] = useState<string>("def calculate_thermal_load(mass_kg, spec_heat, delta_temp):\n    # Write calculations loop here\n    return 0");
  const [feedback, setFeedback] = useState<string>("");

  const handleRun = () => {
    if (userCode.includes("mass_kg * spec_heat * delta_temp") || userCode.includes("mass_kg*spec_heat*delta_temp")) {
      setFeedback("Formula validation: Correct! The thermal load Q = m * C * dT was successfully modeled. Excellent system design implementation.");
    } else {
      setFeedback("Formula validation failed: Target thermal calculation loop must evaluate Q = mass_kg * spec_heat * delta_temp parameters.");
    }
  };

  return (
    <section id="interview" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Interactive Interview Whiteboard</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Solve coding and design problems to receive instant validation scores.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Editor Left */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between min-h-[220px]">
          <div className="space-y-2 text-xs">
            <span className="text-[10px] text-purple-400 font-extrabold uppercase block tracking-wider">Problem: Calculate heat capacity thermal loads</span>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-32 p-3 font-mono text-[11px] text-[#A8FFB2] bg-[#07090e] border border-white/10 rounded-xl focus:outline-none focus:border-[#F4B400]"
            />
          </div>
          <button
            onClick={handleRun}
            className="w-full mt-3 py-2 bg-[#F4B400] text-[#07090e] font-black text-xs rounded-xl hover:shadow-[0_0_15px_rgba(244,180,0,0.3)] transition-all cursor-pointer"
          >
            Submit Calculations Code
          </button>
        </div>

        {/* Diagnostic Output Right */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[160px]">
          {feedback ? (
            <div className="space-y-2 text-xs">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">AI Evaluator Diagnostics</span>
              <p className="text-xs text-[#AEB5C0]/80 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5 font-semibold">
                {feedback}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/35 text-xs">
              Submit your thermal calculations code on the left to receive AI validator output diagnostics.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// RESUME BUILDER
// ==========================================

export function ResumeBuilder() {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("Battery Engineer");
  const [skills, setSkills] = useState<string>("BMS algorithms, thermal cooling");
  const [resumeData, setResumeData] = useState<any>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Candidate name required to compile ATS resumes.");
      return;
    }
    setResumeData({ name, role, skills });
  };

  return (
    <section id="resume" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white font-sans">EV Technical Resume Builder</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Input experience highlights to generate formatted modern resume templates.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Input Form Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between min-h-[220px]">
          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alan Turing"
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#F4B400] placeholder:text-[#AEB5C0]/25"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Target Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#F4B400]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Key Competencies</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#F4B400]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#F4B400] text-[#07090e] text-xs font-black transition-all hover:shadow-[0_0_15px_rgba(244,180,0,0.3)] cursor-pointer"
            >
              Compile ATS Resume
            </button>
          </form>
        </div>

        {/* Output PDF Preview Right */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[220px] relative overflow-hidden">
          {resumeData ? (
            <div className="space-y-4 border border-white/5 p-5 rounded-xl bg-black/40 relative z-10">
              <div className="flex justify-between items-start border-b border-white/5 pb-2">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">{resumeData.name}</h4>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">{resumeData.role}</span>
                </div>
                <button
                  onClick={() => alert("Downloading compiled resume PDF templates...")}
                  className="p-1.5 rounded bg-white/5 border border-white/5 text-[#AEB5C0] hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-[#AEB5C0]/85 space-y-2">
                <div>
                  <strong className="text-white block uppercase tracking-widest text-[9px] mb-1">Competencies</strong>
                  <span>{resumeData.skills}</span>
                </div>
                <div className="border-t border-white/5 pt-2">
                  <strong className="text-white block uppercase tracking-widest text-[9px] mb-1">Education & Certifications</strong>
                  <span>NexioraEV Academy Battery Specialist, EV Proving grounds simulator honors.</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/40 text-xs flex flex-col items-center justify-center gap-2">
              <FileText className="w-8 h-8 text-[#AEB5C0]/25" />
              <span>Input experience highlights to generate resume previews.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// JOB READINESS GAPS
// ==========================================

export function InternshipReadiness() {
  return (
    <section id="readiness" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Internship & Job Readiness</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Analyze technical skills, gaps checklists, and recommended hiring companies.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Strengths panel Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase block tracking-wider">Hiring Recommendations</span>
          <p className="text-xs text-[#AEB5C0]/75 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5">
            Suggested Roles: Junior Battery Engineer, BMS firmware Specialist, thermal testing associate.<br />
            Target Partners: Tesla, Rivian, Lucid Motors, CATL, Nexiora Automotive partners.
          </p>
        </div>

        {/* Gaps analysis right */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase block tracking-wider">Competency Gap Checklists</span>
          <p className="text-xs text-[#AEB5C0]/75 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5">
            Missing requirements:<br />
            * Complete 3D Exploded components project under EV Studio.<br />
            * Solve Whiteboard system design coding equations exams.
          </p>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// AI CAREER COACH
// ==========================================

export function AICareerCoach() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const qnaMap: Record<string, string> = {
    "roadmap": "Based on current market profiles, specialized Battery Engineers with BMS tuning skills see 45% YoY growth. Recommending courses in high voltage balancing.",
    "resume": "BMS engineers should prioritize listing calculations models (C-rates, cell degradation vectors) on resume templates. ATS parsers look for ISO 26262 safety standards.",
    "portfolio": "Embed two virtual lab reports (BMS thermal spikes, V2G municipal grid load feeds) to demonstrate hands-on physics simulator experiences to employers."
  };

  const handleAsk = (key: string) => {
    setSelectedTopic(key);
    setResponse(qnaMap[key] || "");
  };

  return (
    <section id="ai" className="space-y-6 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-[#F4B400] animate-pulse" />
        <h2 className="text-xl font-black text-white font-sans">AI Career Coach</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Buttons left */}
        <div className="md:col-span-5 flex flex-col gap-2 p-3 rounded-2xl border border-white/5 bg-black/40">
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">Select Query Profiles</span>
          {[
            { id: "roadmap", label: "Suggest career paths & study timelines" },
            { id: "resume", label: "Provide ATS keywords advice" },
            { id: "portfolio", label: "Suggest projects to add to portfolio" }
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => handleAsk(q.id)}
              className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                selectedTopic === q.id
                  ? "bg-[#F4B400]/15 border-[#F4B400]/30 text-[#F4B400]"
                  : "bg-white/2 border-white/5 text-[#AEB5C0] hover:text-white"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Readout coach Right */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[150px]">
          {response ? (
            <div className="space-y-2 text-xs">
              <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider block">Career Coach Prognostics</span>
              <p className="text-xs text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
                {response}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/35 text-xs">
              Select a career query profile on the left to consult the AI Coach.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// CAREER PROGRESS TIMELINE
// ==========================================

export function CareerProgress() {
  return (
    <section id="progress" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Career Milestones Progress</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Track your ongoing roadmap timelines and targets benchmarks.</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md space-y-4">
        <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Academic Roadmap Progress</span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <strong>Milestone 1: EV Basics</strong>
            <span className="text-[10px] text-white block mt-1">100% Completed</span>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <strong>Milestone 2: Labs Pro</strong>
            <span className="text-[10px] text-white block mt-1">100% Completed</span>
          </div>
          <div className="p-3 bg-[#F4B400]/10 border border-[#F4B400]/20 text-cyan-300 rounded-xl">
            <strong>Milestone 3: Projects</strong>
            <span className="text-[10px] text-white block mt-1">Ongoing Design</span>
          </div>
          <div className="p-3 bg-white/1 border border-white/5 text-[#AEB5C0] rounded-xl">
            <strong>Milestone 4: Placement</strong>
            <span className="text-[10px] block mt-1">Locked</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ACHIEVEMENTS & FAQ & CTA
// ==========================================

export function AchievementsHub() {
  return (
    <section id="achievements" className="space-y-6">
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Achievements Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Unlocked Badges</span>
          <div className="space-y-2">
            {[
              { title: "Industry Ready Candidate", desc: "Completed all core courses and generated portfolio." },
              { title: "BMS Expert Specialist", desc: "Completed whiteboard simulator algorithms coding." }
            ].map((b, idx) => (
              <div key={idx} className="flex gap-2 items-start text-xs">
                <div className="w-8 h-8 rounded-lg border border-purple-500/20 bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block">{b.title}</strong>
                  <span className="text-[10px] text-[#AEB5C0]/50 block">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads Right */}
        <div id="downloads" className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Downloads center</span>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <button
                onClick={() => alert("Downloading: Resume-Templates.pdf")}
                className="py-2.5 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all text-[11px] font-bold cursor-pointer"
              >
                Resume template
              </button>
              <button
                onClick={() => alert("Downloading: Interview-Guide.pdf")}
                className="py-2.5 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all text-[11px] font-bold cursor-pointer"
              >
                Interview guide
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// FAQ Accordions
const FAQS = [
  { q: "How long does it take to get NexioraEV Certified?", a: "Typically 6 to 9 months of self-paced study mapping about 4-6 hours weekly. Completing simulated design projects and practice whiteboard tests is required." },
  { q: "Do auto manufacturers hire from Nexiora Academy?", a: "Yes. Our technical reports, CAD blueprints configurations, and custom verification QR credentials links can be shared directly with placement managers at partner manufacturers." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Frequently Asked Questions</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Explore answers relating to placements, certs, and roadmap targets.</p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#F4B400]/20 bg-[#F4B400]/3"
                  : "border-white/5 bg-white/2 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-xs font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#AEB5C0]/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#F4B400]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-4 text-[11.5px] text-[#AEB5C0]/75 leading-relaxed pl-5 border-t border-white/5 pt-2">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Final CTA
export function CareerCTA() {
  return (
    <section id="cta" className="p-6 sm:p-8 rounded-[24px] border border-[#F4B400]/25 bg-linear-to-b from-[#F4B400]/5 to-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4B400]/5 blur-2xl pointer-events-none" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
        <div className="space-y-2">
          <span className="text-[9.5px] font-extrabold text-[#F4B400] uppercase tracking-widest block">Start Your EV Career Journey Today</span>
          <h3 className="text-lg font-bold text-white">Become a NexioraEV Certified Engineer</h3>
          <p className="text-xs text-[#AEB5C0]/60 max-w-md leading-relaxed">
            Consolidate your courses progress, download templates and guides, and share your verification link with auto manufacturers placement partners.
          </p>
        </div>
        <button
          onClick={() => alert("Redirecting to hiring partner portal configurations...")}
          className="px-5 py-2.5 rounded-xl bg-[#F4B400] text-[#07090e] font-black text-xs shrink-0 hover:shadow-[0_0_15px_rgba(244,180,0,0.3)] transition-all cursor-pointer"
        >
          Explore Placement Portal
        </button>
      </div>
    </section>
  );
}
export type { FAQS };
