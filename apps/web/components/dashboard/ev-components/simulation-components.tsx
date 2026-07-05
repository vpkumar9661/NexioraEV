"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Play, Pause, FastForward, BrainCircuit, 
  Award, RefreshCcw, BarChart3, HelpCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// POWER FLOW SIMULATOR
// ==========================================

export function PowerFlow() {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1); // speed multiplier
  const [soc, setSoc] = useState<number>(65);

  const stats = useMemo(() => {
    // Dynamic electrical conversions
    const current = Math.round(120 * speed);
    const volt = 400;
    const power = parseFloat(((volt * current) / 1000).toFixed(1)); // kW
    const efficiency = 94; // percentage
    return { current, volt, power, efficiency };
  }, [speed]);

  return (
    <section id="powerflow" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Power Flow Simulator</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Animate real-time energy flow tracking from the storage cells out to traction wheels.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Animation window */}
        <div className="md:col-span-7 rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center text-[10px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider">
            <span>Dynamic energy transmission paths</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setSpeed((s) => (s === 1 ? 2 : 1))}
                className={`p-1 rounded text-white cursor-pointer ${speed === 2 ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5"}`}
              >
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative py-6">
            <svg viewBox="0 0 200 60" className="w-full max-w-[280px] overflow-visible">
              {/* Flow points grid */}
              <circle cx="15" cy="30" r="10" fill="#1E293B" stroke="rgba(255,255,255,0.1)" />
              <text x="15" y="32" fill="#AEB5C0" fontSize="5" textAnchor="middle">GRID</text>

              <line x1="25" y1="30" x2="65" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

              <circle cx="75" cy="30" r="12" fill="#311F42" stroke="#8B5CF6" strokeWidth="1" />
              <text x="75" y="32" fill="#C084FC" fontSize="5" textAnchor="middle" fontWeight="bold">BATTERY</text>

              <line x1="87" y1="30" x2="127" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

              <circle cx="137" cy="30" r="10" fill="#132732" stroke="#22D3EE" strokeWidth="1" />
              <text x="137" y="32" fill="#22D3EE" fontSize="5" textAnchor="middle" fontWeight="bold">MOTOR</text>

              <line x1="147" y1="30" x2="185" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

              <circle cx="185" cy="30" r="8" fill="#111" stroke="rgba(255,255,255,0.2)" />
              <text x="185" y="32" fill="#AEB5C0" fontSize="5" textAnchor="middle">WHEEL</text>

              {/* Pulsing flow particle */}
              {isRunning && (
                <motion.circle
                  cx="15"
                  cy="30"
                  r="3"
                  fill="#22D3EE"
                  animate={{
                    cx: [15, 75, 137, 185],
                    opacity: [1, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3 / speed,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Readout statistics */}
        <div className="md:col-span-5 p-5 rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-4 text-xs">
          <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Telemetry diagnostics</span>
          
          <div className="space-y-3 font-semibold text-[#AEB5C0]/85">
            <div className="flex justify-between">
              <span>Converter Voltage:</span>
              <strong className="text-white">{stats.volt} V DC</strong>
            </div>
            <div className="flex justify-between">
              <span>Phase Current Draw:</span>
              <strong className="text-white">{stats.current} A RMS</strong>
            </div>
            <div className="flex justify-between">
              <span>Continuous Output Power:</span>
              <strong className="text-cyan-300">{stats.power} kW</strong>
            </div>
            <div className="flex justify-between">
              <span>Inverter Conversion Efficiency:</span>
              <strong className="text-[#10B981]">{stats.efficiency}%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENT COMPARISON
// ==========================================

export function ComponentComparison() {
  return (
    <section id="compare" className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Component Specifications Matrix</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Examine side-by-side spec comparisons for motor and power electronics lines.</p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#131722]/50 backdrop-blur-md overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-white/5 text-[#AEB5C0]/50 text-[10px] uppercase font-bold tracking-wider bg-white/1">
              <th className="p-4">Component Profile</th>
              <th className="p-4">Efficiency</th>
              <th className="p-4">Operating Speed</th>
              <th className="p-4">Thermal Limits</th>
              <th className="p-4">Estimated Cost</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-white/90">
            <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
              <td className="p-4 font-bold">PMSM Traction Motor</td>
              <td className="p-4 text-[#10B981]">97% Max</td>
              <td className="p-4">16,000 RPM</td>
              <td className="p-4">Up to 140°C</td>
              <td className="p-4 text-purple-300">$$$ High (Magnets)</td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
              <td className="p-4 font-bold">AC Induction Motor</td>
              <td className="p-4 text-[#10B981]">92% Max</td>
              <td className="p-4">20,000 RPM</td>
              <td className="p-4">Up to 180°C</td>
              <td className="p-4 text-purple-300">$$ Medium</td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
              <td className="p-4 font-bold">SiC MOSFET Inverter</td>
              <td className="p-4 text-[#10B981]">99% Max</td>
              <td className="p-4">20 kHz switching</td>
              <td className="p-4">Up to 175°C</td>
              <td className="p-4 text-purple-300">$$$ High (SiC wafers)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ==========================================
// AI COMPONENT ASSISTANT
// ==========================================

export function AIComponentAssistant() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const qnaMap: Record<string, string> = {
    "pmsm": "Permanent Magnet Synchronous Motors use rare-earth magnets on the rotor to lock rotation speeds to stator frequency fields. Enabling highest power density.",
    "inverter": "The inverter switches battery DC power on and off thousands of times per second (PWM) to feed 3-phase AC voltage phases into stator coils, governing rotor rotations.",
    "regen": "By commanding negative torque phases, motor windings convert kinetic energy into electricity, step-charging the battery pack up to 25% range gains.",
    "diff": "PMSMs utilize permanent magnets on the rotor for locked synchronicity, while BLDC motors are driven by simpler trap-wave stator pulses for cheaper applications."
  };

  const handleSelectQuestion = (key: string) => {
    setSelectedQuestion(key);
    setAnswer(qnaMap[key] || "");
  };

  return (
    <section id="ai" className="space-y-6 border-t border-white/5 pt-6">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-purple-400 animate-pulse" />
        <h2 className="text-2xl font-extrabold text-white">AI Engineering Specialist</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        {/* Buttons list */}
        <div className="md:col-span-5 flex flex-col gap-2 p-3 rounded-2xl border border-white/5 bg-black/40">
          <span className="text-[9.5px] font-extrabold text-[#AEB5C0]/40 uppercase tracking-widest px-2 pb-2">Select Query Profile</span>
          {[
            { id: "pmsm", label: "How does a PMSM work?" },
            { id: "inverter", label: "What is an inverter's core function?" },
            { id: "regen", label: "Why is regenerative braking important?" },
            { id: "diff", label: "Difference between BLDC and PMSM?" }
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
              <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">AI Agent Diagnostics</span>
              <p className="text-xs text-[#AEB5C0]/85 leading-relaxed bg-white/1 p-3.5 rounded-xl border border-white/5">
                {answer}
              </p>
            </div>
          ) : (
            <div className="text-center p-4 text-[#AEB5C0]/45 text-xs flex flex-col items-center justify-center gap-2">
              <BrainCircuit className="w-8 h-8 text-[#AEB5C0]/20" />
              <span>Select an EV engineering question profile on the left to activate AI advisor simulation.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENT QUIZ
// ==========================================

const QUESTIONS = [
  {
    q: "Which device converts direct current battery voltage to low-power auxiliary 12V grids?",
    options: ["SiC Inverter", "Onboard AC Charger", "DC/DC Converter", "BMS central node"],
    ans: 2,
    exp: "A DC/DC converter steps down the high traction battery voltage (e.g. 400V or 800V) to low 12V voltage levels to power electronics like lights and dash screens."
  },
  {
    q: "Why do Silicon Carbide (SiC) switches improve EV range compared to standard Silicon IGBTs?",
    options: ["SiC increases motor rotor magnetic flux strength", "SiC switches faster with reduced conversion heat losses", "SiC prevents cells dendritic formations", "SiC eliminates copper winding resistances"],
    ans: 1,
    exp: "SiC semiconductors can switch currents at higher speeds, dramatically decreasing heat energy waste in the inverter and yielding an average 5% to 8% range extension."
  }
];

export function ComponentQuiz() {
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
        <h2 className="text-2xl font-extrabold text-white">Interactive Certification Quiz</h2>
        <p className="text-sm text-[#AEB5C0]/60 mt-1">Answer technical questions to earn EV Component certifications.</p>
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
                <span className="text-[9px] text-[#AEB5C0]/40 font-bold uppercase tracking-wider block">Engineering Explanation</span>
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
