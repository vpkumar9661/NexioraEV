"use client";

import { useState } from "react";
import { Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZZES: Record<"beginner" | "intermediate" | "advanced", Question[]> = {
  beginner: [
    {
      q: "What does the abbreviation 'LFP' stand for in EV battery chemistry?",
      options: [
        "Lithium Fluoride Polymer",
        "Lithium Iron Phosphate",
        "Lithium Flow Pack",
        "Liquid Fuel Polymer"
      ],
      correct: 1,
      explanation: "LFP stands for Lithium Iron Phosphate (LiFePO4). It is known for safety and long cycle life."
    },
    {
      q: "What is the typical voltage of a standard EV auxiliary starter battery?",
      options: ["12 Volts", "48 Volts", "400 Volts", "800 Volts"],
      correct: 0,
      explanation: "Like standard petrol cars, EVs use a small 12-volt battery to power low-voltage accessories like headlights, screens, and ECUs."
    },
    {
      q: "Which cooling system configuration is most common in high-performance EVs?",
      options: ["Air Cooling", "Liquid Cooling", "Ice Trays", "No Cooling needed"],
      correct: 1,
      explanation: "Active Liquid cooling using ethylene-glycol is the standard for long-range, fast-charging EVs."
    }
  ],
  intermediate: [
    {
      q: "Which BMS algorithm uses current integration over time to estimate State of Charge (SOC)?",
      options: [
        "Kalman Filtering",
        "Coulomb Counting",
        "Open Circuit Voltage (OCV) lookup",
        "Impedance Spectroscopy"
      ],
      correct: 1,
      explanation: "Coulomb Counting integrates the measured current over time to track the absolute amount of charge entering or leaving the cells."
    },
    {
      q: "What is the primary gas released during a catastrophic LFP cell thermal runaway venting event?",
      options: ["Pure Oxygen", "Carbon Dioxide & Hydrogen", "Argon", "Helium"],
      correct: 1,
      explanation: "Thermal venting releases combustible gases including Carbon Monoxide, Hydrogen, and organic solvent vapors."
    },
    {
      q: "What is the purpose of constant voltage (CV) charging phase in batteries?",
      options: [
        "To maximize speed",
        "To safely saturate active chemical structures near full capacity",
        "To discharge cells",
        "To heat the battery"
      ],
      correct: 1,
      explanation: "CV phase keeps voltage stable while tapering current down, preventing chemical plating and over-voltage stress."
    }
  ],
  advanced: [
    {
      q: "What is the primary electrochemical cause of dendrite growth on lithium metal anodes?",
      options: [
        "Local current density hot spots during high-rate charging",
        "High storage temperatures",
        "Mechanical crash shock",
        "Glycol cooling leaks"
      ],
      correct: 0,
      explanation: "High local current density causes uneven lithium plating during fast charging, forming metallic needles (dendrites) that can pierce separators."
    },
    {
      q: "What is the SEI layer and where does it form?",
      options: [
        "Solid Electrolyte Interphase on the anode surface",
        "Safety Exhaust Indicator on the casing",
        "Sensor Electronic Interface inside the BMS",
        "State of Efficiency Indicator in the motor"
      ],
      correct: 0,
      explanation: "The Solid Electrolyte Interphase (SEI) forms on the anode during initial charge cycles. It protects the electrode but consumes active lithium."
    },
    {
      q: "How does active balancing differ from passive balancing in a high-voltage BMS?",
      options: [
        "Active balancing burns off excess energy through resistors.",
        "Active balancing transfers charge from higher cells to lower cells via capacitors/inductors.",
        "Active balancing is done only when driving.",
        "Active balancing increases overall temperature."
      ],
      correct: 1,
      explanation: "Active balancing transfers charge between cells dynamically, preserving pack energy rather than wasting it as heat."
    }
  ]
};

export function BatteryQuiz() {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [qIndex, setQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = QUIZZES[level];
  const activeQuestion = questions[qIndex]!;

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setSelectedAns(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAns(idx);
  };

  const handleSubmit = () => {
    if (selectedAns === null || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedAns === activeQuestion.correct) {
      setScore(score + 1);
    }
  };

  const resetQuiz = () => {
    setQIndex(0);
    setSelectedAns(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <section id="quiz" className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Battery Intelligence Quiz</h2>
          <p className="text-sm text-muted-foreground/60 mt-1">Test your electrochemistry knowledge and unlock battery credentials</p>
        </div>

        {/* Difficulty controls selector */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-white/5 border border-white/5">
          {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl);
                setQIndex(0);
                setSelectedAns(null);
                setIsSubmitted(false);
                setScore(0);
                setShowResult(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                level === lvl
                  ? "bg-[#10B981] text-white shadow-md"
                  : "text-muted-foreground/60 hover:text-white"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] border border-white/5 bg-white/2 p-6 min-h-[300px] flex flex-col justify-between gap-6">
        
        {/* Scoreboard screen */}
        {showResult ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/25 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-[#6EE7B7] animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-lg font-extrabold text-white">Quiz Completed!</h4>
              <p className="text-sm text-muted-foreground/60">
                You scored <span className="text-[#6EE7B7] font-black">{score} out of {questions.length}</span> in the <span className="font-bold uppercase text-white">{level}</span> section.
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
            >
              <RotateCcw className="w-4 h-4" /> Retry Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40">
              <span>Question {qIndex + 1} of {questions.length}</span>
              <span>{level} Category</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-[#10B981] transition-all duration-300"
                style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h3 className="text-sm font-extrabold text-white leading-relaxed">
              {activeQuestion.q}
            </h3>

            {/* Multiple Choice answers list */}
            <div className="grid gap-2.5">
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedAns === idx;
                const isCorrect = idx === activeQuestion.correct;
                let bgStyle = "bg-white/1 border-white/5 hover:border-white/10 hover:bg-white/2";
                
                if (isSubmitted) {
                  if (isCorrect) bgStyle = "bg-emerald-500/10 border-emerald-500/30 text-[#6EE7B7]";
                  else if (isSelected) bgStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400";
                  else bgStyle = "opacity-40 bg-transparent border-white/5";
                } else if (isSelected) {
                  bgStyle = "bg-[#10B981]/15 border-[#10B981] text-[#6EE7B7]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-4 rounded-xl border text-left font-semibold text-xs transition-all flex items-center justify-between gap-3 ${bgStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explanation */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-white/1 border border-white/5 text-[11.5px] text-muted-foreground/85 leading-relaxed animate-in fade-in duration-200">
                <span className="font-bold text-white block mb-1">Explanation:</span>
                {activeQuestion.explanation}
              </div>
            )}

            {/* Actions button */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              {!isSubmitted ? (
                <button
                  disabled={selectedAns === null}
                  onClick={handleSubmit}
                  className="px-5 py-2.5 rounded-xl bg-[#10B981] disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none hover:bg-[#059669] hover:scale-[1.02] text-white font-bold text-xs transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all group"
                >
                  {qIndex < questions.length - 1 ? "Next Question" : "See Results"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
