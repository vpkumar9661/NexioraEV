"use client";

import React, { useState } from "react";
import { BookOpen, ShieldCheck, ChevronRight, Cpu } from "lucide-react";

interface GuideTopic {
  id: string;
  name: string;
  category: string;
  details: string;
  tips: string[];
}

export function KnowledgeCenter() {
  const [activeTopic, setActiveTopic] = useState<string>("prompts");

  const topics: Record<string, GuideTopic> = {
    prompts: {
      id: "prompts",
      name: "EV Prompt Engineering Handbook",
      category: "Prompt Library",
      details: "Provides pre-written prompt templates to consult AI: (1) 'Assess battery life cycles degradation rate for Fleet A LFP packs,' (2) 'Optimize local microgrid load shifting using hourly utility pricing,' (3) 'Simulate carbon credit outputs PM E-Drive compliance.'",
      tips: [
        "Include active telemetry values to get high-accuracy model responses.",
        "Add localized utility tariff boundaries when asking for cost optimizations.",
        "Use markdown tables formats to compare multi-car statistics.",
      ],
    },
    tutorials: {
      id: "tutorials",
      name: "Smart Grid Machine Learning Models",
      category: "AI Tutorials",
      details: "Learn how Nexiora Custom EV models forecast parameters: (1) Recurrent Neural Network (LSTM) layers evaluate voltage sags, (2) Gradient Boosted trees model solar panel yields, (3) Edge-computing algorithms verify OCPP charger connections.",
      tips: [
        "Refer to our API docs to fetch live sub-meter readings.",
        "Optimize custom model parameters using PyTorch integrations.",
        "Deploy local anomaly monitors directly on fast-charging stations.",
      ],
    },
  };

  const current = topics[activeTopic]!;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Topics list */}
        <div className="lg:col-span-5 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
              COGNITIVE TRAINING REFERENCE MANUALS
            </span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <BookOpen className="w-5 h-5 text-[#00E676]" />
              Knowledge Center
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {Object.values(topics).map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeTopic === topic.id
                    ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                    : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                }`}
              >
                <div>
                  <span className="text-xs font-black block">{topic.name}</span>
                  <span className="text-[9px] opacity-50 block mt-0.5">{topic.category}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/45" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details panel */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div>
              <span className="text-[8px] font-black text-black px-2 py-0.5 rounded bg-[#00E676] uppercase tracking-widest">
                Compliance Guide Details
              </span>
              <h3 className="text-base font-black text-white mt-2.5">{current.name}</h3>
            </div>

            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              {current.details}
            </p>

            <div className="border-t border-white/5 pt-4 space-y-2">
              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase block">Core Recommendations</span>
              <div className="space-y-1.5 text-xs text-white">
                {current.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/1 border border-white/5 rounded-xl p-3 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[10.5px]">
              <span className="font-extrabold text-white block">AI Cognitive Models Sync Live</span>
              <p className="text-muted-foreground/70 leading-relaxed">
                Tutorial guides and news indices compile daily. Consult API docs to build specialized automated scripts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
