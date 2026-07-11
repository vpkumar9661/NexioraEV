"use client";

import { CheckCircle2, Circle, ChevronDown } from "lucide-react";

const STEPS = [
  { id: 1, title: "Introduction to EVs", time: "15 min", done: true },
  { id: 2, title: "History of Electric Vehicles", time: "20 min", done: true },
  { id: 3, title: "How Electric Vehicles Work", time: "30 min", done: false },
  { id: 4, title: "Battery Technology", time: "45 min", done: false },
  { id: 5, title: "Electric Motors", time: "25 min", done: false },
  { id: 6, title: "Charging Infrastructure", time: "30 min", done: false },
  { id: 7, title: "Advantages & Challenges", time: "20 min", done: false },
  { id: 8, title: "Maintenance & Safety", time: "25 min", done: false },
  { id: 9, title: "Future of Mobility", time: "20 min", done: false },
];

interface LearningRoadmapProps {
  completedSteps: number[];
  onToggleStep: (stepId: number) => void;
}

export function LearningRoadmap({ completedSteps, onToggleStep }: LearningRoadmapProps) {
  const completedCount = completedSteps.length;
  const progressPercent = Math.round((completedCount / STEPS.length) * 100);

  return (
    <section id="roadmap" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Learning Roadmap</h2>
          <p className="text-sm text-muted-foreground/60 mt-1">Track your learning journey through EV fundamentals</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-[#A78BFA]">{progressPercent}%</span>
          <span className="text-[11px] text-muted-foreground/50 block">Complete</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#8B5CF6] to-[#A78BFA] transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Roadmap Steps */}
      <div className="space-y-0">
        {STEPS.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          const prevStep = idx > 0 ? STEPS[idx - 1] : undefined;
          const isCurrent = !isCompleted && (idx === 0 || (prevStep !== undefined && completedSteps.includes(prevStep.id)));
          return (
            <div key={step.id} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onToggleStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border ${
                    isCompleted
                      ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                      : isCurrent
                      ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/40 text-[#A78BFA] animate-pulse"
                      : "bg-white/5 border-white/10 text-muted-foreground/40"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-[11px] font-bold">{step.id}</span>
                  )}
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`w-0.5 h-10 ${isCompleted ? "bg-[#8B5CF6]/40" : "bg-white/5"}`} />
                )}
              </div>

              {/* Step content */}
              <div className={`pb-6 pt-1 flex-1 flex items-start justify-between ${
                isCurrent ? "opacity-100" : isCompleted ? "opacity-70" : "opacity-40"
              }`}>
                <div>
                  <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  <span className="text-[11px] text-muted-foreground/55">{step.time}</span>
                </div>
                {isCurrent && (
                  <span className="text-[10px] font-bold text-[#A78BFA] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
