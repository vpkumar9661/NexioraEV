"use client";

import React, { useState } from "react";
import { Compass, ShieldCheck, Zap, Activity, Cpu } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  creator: string;
  latency: string;
  accuracy: string;
  cost: string;
  description: string;
}

export function ModelCenter() {
  const [selectedModel, setSelectedModel] = useState("custom-ev");

  const models: Record<string, AIModel> = {
    "custom-ev": { id: "custom-ev", name: "Nexiora Custom EV LLM", creator: "Nexiora Core", latency: "110 ms", accuracy: "99.78%", cost: "$0.002 / 1k tok", description: "Fine-tuned specifically for electrochemical cell degradation, OCPP grid scheduling protocols, and V2G arbitrage telemetry parameters." },
    "gpt-4o": { id: "gpt-4o", name: "GPT-4o Enterprise", creator: "OpenAI", latency: "380 ms", accuracy: "97.4%", cost: "$0.015 / 1k tok", description: "General enterprise LLM used for multi-language customer consultations, document intelligence scanning, and reports auditing." },
    "claude-sonnet": { id: "claude-sonnet", name: "Claude 3.5 Sonnet", creator: "Anthropic", latency: "420 ms", accuracy: "98.1%", cost: "$0.018 / 1k tok", description: "Advanced reasoning model used to draft tenant lease structures, compile grid engineering codes, and analyze risk indices." },
  };

  const active = (models[selectedModel] ?? models["custom-ev"]) as AIModel;

  return (
    <section className="p-6 md:p-8 rounded-[28px] border border-white/8 bg-[#05070d]/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left selector list */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest block">
                COGNITIVE LLM COMPILER
              </span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                <Cpu className="w-5 h-5 text-[#00E676]" />
                AI Model Center
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {Object.values(models).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    selectedModel === m.id
                      ? "border-[#00E676] bg-[#00E676]/10 text-white shadow-[0_0_15px_rgba(0,230,118,0.15)]"
                      : "border-white/5 bg-white/2 text-muted-foreground/60 hover:bg-white/4"
                  }`}
                >
                  <div>
                    <span className="text-xs font-black block">{m.name}</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">{m.creator}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-muted-foreground/75 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
            <p>Calculations show latency ratings across active edge node servers.</p>
          </div>
        </div>

        {/* Right Details inspector */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-[#131722]/55 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 pb-2">
              <span>ACTIVE MODEL COMPARATIVE TELEMETRIES</span>
              <span>Clearing Indices</span>
            </div>

            <div className="grid grid-cols-3 gap-3.5 text-center text-xs font-bold">
              <div className="bg-white/2 border border-white/5 p-3 rounded-xl">
                <span className="text-[8px] text-muted-foreground/40 uppercase block">Inference Latency</span>
                <span className="text-white block mt-1.5 font-black">{active.latency}</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-3 rounded-xl">
                <span className="text-[8px] text-muted-foreground/40 uppercase block">Model Accuracy</span>
                <span className="text-[#00E676] block mt-1.5 font-black">{active.accuracy}</span>
              </div>

              <div className="bg-white/2 border border-white/5 p-3 rounded-xl">
                <span className="text-[8px] text-muted-foreground/40 uppercase block">Estimated Cost</span>
                <span className="text-[#00D4FF] block mt-1.5 font-black">{active.cost}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground/80 leading-relaxed border-t border-white/5 pt-4">
              {active.description}
            </p>
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground/50 font-mono uppercase tracking-wider">
            <span>Model: {active.name}</span>
            <span>Creator: {active.creator}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
