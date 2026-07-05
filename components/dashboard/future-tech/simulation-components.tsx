"use client";

import React, { useState, useMemo } from "react";
import { 
  BrainCircuit, Award, Cpu, RefreshCw, BarChart3, HelpCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// FUTURE MOBILITY SIMULATOR
// ==========================================

export function FutureMobilitySimulator() {
  const [vehicle, setVehicle] = useState<string>("flying");
  const [speed, setSpeed] = useState<number>(100);

  const stats = useMemo(() => {
    let range = 450;
    let consumption = 180; // Wh/km

    if (vehicle === "flying") {
      range = 280;
      consumption = 420; // high lift consumption
    } else if (vehicle === "robotaxi") {
      range = 520;
      consumption = 140; // optimized autonomous glide
    }

    const duration = parseFloat((range / speed).toFixed(1));

    return { range: Math.round(range * (100 / speed)), consumption, duration };
  }, [vehicle, speed]);

  return (
    <section id="simulator" className="space-y-6 border-t border-white/5 pt-6">
      <div>
        <h2 className="text-xl font-black text-white">Future Mobility Simulator</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Simulate range, speed limits, and average battery consumption variables on speculative vehicle platforms.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <span className="text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Vector platform flight diagnostics</span>
          
          <div className="flex-1 flex items-center justify-center relative py-4">
            <svg viewBox="-80 -40 160 80" className="w-full max-w-[200px] aspect-square overflow-visible">
              {/* Proving guidelines */}
              <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              
              {/* Flying eVTOL custom shape */}
              {vehicle === "flying" ? (
                <g>
                  {/* Cabin */}
                  <rect x="-18" y="-8" width="36" height="16" rx="3" fill="#132732" stroke="#22D3EE" strokeWidth="0.8" />
                  {/* Props */}
                  <line x1="-30" y1="-8" x2="-6" y2="-8" stroke="#AEB5C0" strokeWidth="1" className="animate-pulse" />
                  <line x1="6" y1="-8" x2="30" y2="-8" stroke="#AEB5C0" strokeWidth="1" className="animate-pulse" />
                  <circle cx="-18" cy="-8" r="2.5" fill="#22D3EE" />
                  <circle cx="18" cy="-8" r="2.5" fill="#22D3EE" />
                </g>
              ) : (
                // Robotaxi shape
                <g>
                  <rect x="-20" y="5" width="40" height="15" rx="4" fill="#0E2D23" stroke="#10B981" strokeWidth="0.8" />
                  <circle cx="-12" cy="20" r="3.5" fill="#111" stroke="white" strokeWidth="0.5" />
                  <circle cx="12" cy="20" r="3.5" fill="#111" stroke="white" strokeWidth="0.5" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Inputs */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Speculative Platform</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="flying">eVTOL Flying Multi-Rotor</option>
              <option value="robotaxi">Autonomous L4 City Robotaxi</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-[#AEB5C0]/40 uppercase">Target Speed</span>
              <span className="text-white">{speed} km/h</span>
            </div>
            <input
              type="range"
              min="50"
              max="220"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Range target</span>
              <strong className="text-xs text-cyan-300 block mt-0.5">{stats.range} km</strong>
            </div>
            <div>
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Avg Consumption</span>
              <strong className="text-xs text-white block mt-0.5">{stats.consumption} Wh/km</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// AI MOBILITY CENTER (FLEETS OPTIMIZATION)
// ==========================================

export function AIMobilityCenter() {
  return (
    <section id="aimobility" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">AI Mobility Optimization</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-0.5">Explore standard fleet controls algorithms and battery optimization loops.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#22D3EE]">
            <Cpu className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Fleet Routing AI</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            Monitors municipal traffic loads and weather constraints, adjusting robotaxis fleets paths dynamically to maximize energy conservation.
          </p>
        </div>

        <div className="md:col-span-6 p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
          <div className="flex gap-2 items-center border-b border-white/5 pb-2.5 text-[#22D3EE]">
            <BrainCircuit className="w-4.5 h-4.5" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Predictive Maintenance Loops</span>
          </div>
          <p className="text-xs text-[#AEB5C0]/85 leading-relaxed">
            Continuously runs cell voltage variance calculations, predicting BMS dendrite hazards before physical component faults happen.
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// AI FUTURE ASSISTANT
// ==========================================

export function AIFutureAssistant() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const qnaMap: Record<string, string> = {
    "solid": "Solid-state cells replace liquid organic electrolytes with solid ceramic plates. Doubling energy density limits and eliminating thermal fire hazards.",
    "hydrogen": "Hydrogen fuel cells combine hydrogen with ambient oxygen. PEM membranes separate electrons, producing electricity and water emissions. Excellent for heavy duty transits.",
    "robotaxi": "Robotaxis utilize sensor fusion (Lidar, radar, camera data) evaluated by central AI computers, replacing steering controls with automated drive vectors.",
    "v2g": "Vehicle-to-Grid (V2G) allows bidirectional charging grids connection, drawing power back from parked EVs during municipal load spikes to stabilize utilities."
  };

  const handleSelectQuestion = (key: string) => {
    setSelectedQuestion(key);
    setAnswer(qnaMap[key] || "");
  };

  return (
    <section id="ai" className="space-y-6 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-purple-400 animate-pulse" />
        <h2 className="text-xl font-black text-white">AI Futurist Advisor</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Buttons list */}
        <div className="md:col-span-5 flex flex-col gap-2 p-3 rounded-2xl border border-white/5 bg-black/40">
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">Select Query Profile</span>
          {[
            { id: "solid", label: "Will solid-state batteries replace lithium-ion?" },
            { id: "hydrogen", label: "Will hydrogen replace EVs?" },
            { id: "robotaxi", label: "How will Robotaxis work?" },
            { id: "v2g", label: "What is Vehicle-to-Grid?" }
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => handleSelectQuestion(q.id)}
              className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                selectedQuestion === q.id
                  ? "bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE]"
                  : "bg-white/2 border-white/5 text-[#AEB5C0] hover:text-white"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Readout answer panel */}
        <div className="md:col-span-7 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex flex-col justify-center min-h-[160px]">
          {answer ? (
            <div className="space-y-2">
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">AI Agent Prognostics</span>
              <p className="text-xs text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
                {answer}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/45 text-xs flex flex-col items-center justify-center gap-2">
              <BrainCircuit className="w-8 h-8 text-[#AEB5C0]/20" />
              <span>Select an innovation question profile on the left to activate AI advisor simulation.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FUTURE QUIZ
// ==========================================

const QUESTIONS = [
  {
    q: "Which emerging battery technology replaces the liquid organic solvent with a solid ceramic layer?",
    options: ["Sodium Ion cells", "LFP Prismatic modules", "Solid-State batteries", "Graphene super-capacitors"],
    ans: 2,
    exp: "Solid-state batteries replace the liquid electrolyte with solid polymers or ceramic membranes, preventing dendrites piercing and zeroing thermal runaway fire hazards."
  },
  {
    q: "What is the primary grid stabilization advantage of Vehicle-to-Grid (V2G) bidirectional systems?",
    options: ["Recharging EVs during high grid peak loads", "Stabilizing utility load frequencies by drawing power from parked EVs", "Reducing the physical weight of onboard battery packs", "Enhancing wireless magnetic charging couplings"],
    ans: 1,
    exp: "V2G allows parked EVs to supply battery currents back to the grid during municipal peak demand spikes, stabilizing power frequencies."
  }
];

export function FutureQuiz() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleOptionClick = (optIdx: number) => {
    if (showFeedback) return;
    setSelectedOpt(optIdx);
    setShowFeedback(true);
    if (optIdx === QUESTIONS[activeIdx]!.ans) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowFeedback(false);
    if (activeIdx < QUESTIONS.length - 1) {
      setActiveIdx((i) => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setActiveIdx(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz" className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Interactive Certification Quiz</h2>
        <p className="text-xs text-[#AEB5C0]/60 mt-1">Answer technical questions to earn Future Tech innovation badges.</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md p-5 sm:p-6 space-y-6">
        {quizFinished ? (
          <div className="text-center py-6 space-y-4">
            <Award className="w-12 h-12 text-[#22D3EE] mx-auto animate-bounce" />
            <h4 className="text-base font-extrabold text-white">Quiz Module Complete!</h4>
            <p className="text-xs text-[#AEB5C0]/75">
              Score achieved: <strong>{score} / {QUESTIONS.length}</strong> correct answers.
            </p>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-[#22D3EE] text-[#07090e] font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">
              <span>Question {activeIdx + 1} of {QUESTIONS.length}</span>
              <span>Score: {score}</span>
            </div>

            <h4 className="text-xs font-bold text-white leading-relaxed">
              {QUESTIONS[activeIdx]!.q}
            </h4>

            <div className="space-y-2">
              {QUESTIONS[activeIdx]!.options.map((opt, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const isCorrect = oIdx === QUESTIONS[activeIdx]!.ans;
                let optStyle = "bg-white/2 border-white/5 hover:border-white/10";
                if (showFeedback) {
                  if (isCorrect) optStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
                  else if (isSelected) optStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300";
                  else optStyle = "bg-white/1 border-white/5 opacity-55";
                }
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionClick(oIdx)}
                    disabled={showFeedback}
                    className={`w-full py-2.5 px-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${optStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="space-y-3 border-t border-white/5 pt-4">
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Electrochemical Explanation</span>
                <p className="text-xs text-[#AEB5C0]/80 leading-relaxed bg-white/1 p-3 rounded-xl border border-white/5">
                  {QUESTIONS[activeIdx]!.exp}
                </p>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-purple-500 text-white font-bold text-xs rounded-xl hover:bg-purple-600 transition-colors cursor-pointer"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
