"use client";

import React, { useState } from "react";
import { 
  Award, BrainCircuit, Play, FileDown, Search, HelpCircle, 
  ChevronDown, ChevronRight, FileText, Globe, Sparkles 
} from "lucide-react";

// ==========================================
// ASSESSMENTS PRACTICE QUIZ
// ==========================================

const QUESTIONS = [
  {
    q: "Which parameter describes the maximum continuous current rating limits a battery cell can output safely?",
    options: ["State of Health (SOH)", "Continuous C-Rate discharge", "Nominal cell voltage", "Specific energy density"],
    ans: 1,
    exp: "Continuous C-rate defines cell current capabilities relative to capacity limits without spawning thermal runaway hazards."
  }
];

export function AcademyQuiz() {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  return (
    <section id="assessments" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Academy Assessments</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Test your EV systems design knowledge with graded conceptual practice exams.</p>
      </div>

      <div className="max-w-2xl p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4">
        <span className="text-[10px] text-purple-400 font-extrabold uppercase block tracking-wider">Module Exam Question 1</span>
        <h4 className="text-xs font-bold text-white leading-relaxed">{QUESTIONS[0]!.q}</h4>
        
        <div className="space-y-2">
          {QUESTIONS[0]!.options.map((opt, oIdx) => {
            const isSelected = selectedOpt === oIdx;
            let optStyle = "bg-white/2 border-white/5 hover:border-white/10";
            if (showFeedback) {
              if (oIdx === QUESTIONS[0]!.ans) optStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
              else if (isSelected) optStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300";
            }
            return (
              <button
                key={oIdx}
                onClick={() => {
                  setSelectedOpt(oIdx);
                  setShowFeedback(true);
                }}
                disabled={showFeedback}
                className={`w-full py-2.5 px-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${optStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="space-y-2 border-t border-white/5 pt-3">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Detailed Explanation</span>
            <p className="text-xs text-[#AEB5C0]/75 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
              {QUESTIONS[0]!.exp}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ==========================================
// CERTIFICATION CENTER
// ==========================================

export function CertificationCenter() {
  const [userName, setUserName] = useState<string>("");
  const [certType, setCertType] = useState<string>("fundamentals");
  const [issuedCert, setIssuedCert] = useState<any>(null);

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Please enter a candidate name to issue credentials.");
      return;
    }
    const certId = "NEX-" + Math.floor(100000 + Math.random() * 900000);
    setIssuedCert({
      name: userName,
      title: certType === "fundamentals" ? "EV Engineering Fundamentals" : "Battery Specialist Architect",
      id: certId,
      date: new Date().toLocaleDateString()
    });
  };

  return (
    <section id="certifications" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Certification Center</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Input your name and select a path to generate downloadable verification certificates.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Input Form Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between min-h-[220px]">
          <form onSubmit={handleIssue} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Candidate Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Alan Turing"
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#F5B301] placeholder:text-[#AEB5C0]/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Specialized Track</label>
              <select
                value={certType}
                onChange={(e) => setCertType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="fundamentals">EV Fundamentals Certificate</option>
                <option value="battery">Battery Specialist Architect</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#F5B301] text-[#07090e] text-xs font-black transition-all hover:shadow-[0_0_15px_rgba(245,179,1,0.3)] cursor-pointer"
            >
              Issue Credential Certificate
            </button>
          </form>
        </div>

        <div className="md:col-span-7 p-6 rounded-2xl border border-[#F5B301]/25 bg-linear-to-b from-[#F5B301]/5 to-transparent backdrop-blur-md flex flex-col justify-center min-h-[200px] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-40 h-40 bg-[#F5B301]/5 rounded-full blur-2xl pointer-events-none" />
          
          {issuedCert ? (
            <div className="space-y-4 border border-white/5 p-5 rounded-xl bg-black/40 relative z-10 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#F5B301] font-extrabold uppercase tracking-widest block">NexioraEV Academy Certification</span>
                  <h4 className="text-sm font-black text-white">{issuedCert.title}</h4>
                </div>
                <Award className="w-10 h-10 text-[#F5B301] shrink-0" />
              </div>

              <div className="border-t border-white/5 pt-3.5">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Candidate</span>
                <strong className="text-base text-white block uppercase tracking-wide">{issuedCert.name}</strong>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-white/5 pt-3 text-[10px] text-[#AEB5C0]/50 font-semibold">
                <span>Verification ID: {issuedCert.id}</span>
                <span>Issued Date: {issuedCert.date}</span>
                <span className="text-emerald-400 font-extrabold cursor-pointer hover:underline" onClick={() => alert("Verification code matches.")}>
                  QR Verified
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/40 text-xs flex flex-col items-center justify-center gap-2">
              <Award className="w-8 h-8 text-[#AEB5C0]/25" />
              <span>Input a candidate name to issue a professional certificate.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// TECHNICAL RESOURCE LIBRARY
// ==========================================

const PAPERS = [
  { title: "BMS architecture & battery balancing rules", doc: "BMS-Design.pdf", type: "Standard" },
  { title: "High-voltage direct charging protocol guidelines", doc: "DC-Charging.pdf", type: "Paper" }
];

export function ResourceLibrary() {
  return (
    <section id="library" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Books & Papers Library</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Read technical notes and reference manuals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAPERS.map((p, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 flex justify-between items-center"
          >
            <div className="flex gap-3 items-start">
              <FileText className="w-5 h-5 text-[#F5B301] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase block tracking-wider">{p.type}</span>
                <h4 className="text-xs font-bold text-white mt-1 leading-snug">{p.title}</h4>
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading: ${p.doc}`)}
              className="p-2 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <FileDown className="w-4.5 h-4.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// VIDEO ACADEMY
// ==========================================

const VIDEOS = [
  { title: "Introduction to cell packaging", duration: "10 mins" },
  { title: "BMS thermal limits and safety", duration: "15 mins" }
];

export function VideoAcademy() {
  return (
    <section id="videos" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Video Academy</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Watch tutorials detailing high-voltage electronics and component configurations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VIDEOS.map((vid, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-white/5 bg-white/2 flex justify-between items-center"
          >
            <div className="flex items-center gap-3 text-xs">
              <Play className="w-4 h-4 text-[#F5B301] fill-[#F5B301] shrink-0" />
              <strong className="text-white block font-sans">{vid.title}</strong>
            </div>
            <span className="text-[10px] text-[#AEB5C0]/50 font-bold">{vid.duration}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// AI TUTOR HELP
// ==========================================

export function AITutor() {
  const [query, setQuery] = useState<string>("");
  const [reply, setReply] = useState<string>("");

  const qna: Record<string, string> = {
    "c-rate": "C-rate represents the charge or discharge current relative to capacity limits. A 1C rate drains a 75 kWh battery at 75 kW continuously.",
    "runaway": "Thermal runaway occurs when cell temperatures exceed safe bounds, sparking cascading self-heating chemical reactions that lead to battery combustion."
  };

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.toLowerCase().trim();
    if (clean.includes("c-rate") || clean.includes("c rate")) {
      setReply(qna["c-rate"]!);
    } else if (clean.includes("runaway") || clean.includes("thermal")) {
      setReply(qna["runaway"]!);
    } else {
      setReply("The Academy AI Tutor resolves questions regarding C-rates or Thermal Runaway. Try query: 'Explain C-rate'.");
    }
  };

  return (
    <section id="ai" className="space-y-6 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-[#F5B301] animate-pulse" />
        <h2 className="text-xl font-black text-white">AI Tutor Assistant</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Form panel Left */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-between min-h-[160px]">
          <form onSubmit={handleAsk} className="space-y-3 text-xs">
            <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Ask Tutor</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Explain C-rate"
              className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none focus:border-[#F5B301] placeholder:text-[#AEB5C0]/25"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Consult AI Tutor
            </button>
          </form>
        </div>

        {/* Reply output Panel Right */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[150px]">
          {reply ? (
            <div className="space-y-2 text-xs">
              <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider block">Tutor Prognostics</span>
              <p className="text-xs text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5">
                {reply}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/35 text-xs">
              Consult the AI Tutor by submitting a concept question on the left.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// LEADERBOARD & COMMUNITY
// ==========================================

export function CommunityHub() {
  return (
    <section id="community" className="space-y-6">
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Forums Discussions Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Discussion Forums</span>
          <div className="space-y-2">
            {[
              { title: "Tesla structural pack battery design analysis", count: "12 replies" },
              { title: "Sodium-ion cell solid interfaces degradation", count: "18 replies" }
            ].map((th, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/1 border border-white/5">
                <span className="text-white font-bold truncate pr-3">{th.title}</span>
                <span className="text-[#AEB5C0]/50 shrink-0">{th.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Streaks Right */}
        <div id="leaderboard" className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Student Leaderboard</span>
          
          <div className="space-y-2">
            {[
              { rank: "1st", name: "Sarah Croft", score: "2450 points" },
              { rank: "2nd", name: "Alan Turing", score: "2100 points" }
            ].map((p, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/1 border border-white/5">
                <span className="text-white font-bold">{p.rank} • {p.name}</span>
                <span className="text-[#F5B301] font-bold">{p.score}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// ACHIEVEMENTS & DOWNLOADS
// ==========================================

export function AchievementsHub() {
  return (
    <section id="achievements" className="space-y-6">
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* Badges Left */}
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Unlocked badges</span>
          
          <div className="space-y-2">
            {[
              { title: "EV Explorer", desc: "Completed first introductory course module." },
              { title: "Battery Scientist", desc: "Passed battery chemistry lab certification." }
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

        {/* Handbooks Downloads Right */}
        <div id="downloads" className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#AEB5C0]/40 font-extrabold uppercase tracking-widest block border-b border-white/5 pb-2">Downloads center</span>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <button
                onClick={() => alert("Downloading: EV-Handbooks.pdf")}
                className="py-2.5 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all text-[11px] font-bold cursor-pointer"
              >
                Engineering Handbook
              </button>
              <button
                onClick={() => alert("Downloading: Formula-Sheets.pdf")}
                className="py-2.5 rounded-xl border border-white/5 bg-white/3 text-[#AEB5C0] hover:text-white hover:bg-white/5 transition-all text-[11px] font-bold cursor-pointer"
              >
                Formula Sheet
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
export type { QUESTIONS };
