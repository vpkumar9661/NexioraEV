"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, ArrowUpRight, Zap, RefreshCw, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhysicsViewportProps {
  speed: number;
  onAccelerate: (isPressing: boolean) => void;
  onBrake: (isPressing: boolean) => void;
  currentEvent: string | null;
  aiAdvice: string;
}

export function PhysicsViewport({
  speed,
  onAccelerate,
  onBrake,
  currentEvent,
  aiAdvice
}: PhysicsViewportProps) {
  const [roadTranslate, setRoadTranslate] = useState<number>(0);

  // Animate the road stripes scrolling depending on speed
  useEffect(() => {
    let frameId: number;
    const update = () => {
      setRoadTranslate((t) => (t + speed * 0.15) % 40);
      frameId = requestAnimationFrame(update);
    };
    if (speed > 0) {
      frameId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(frameId);
  }, [speed]);

  return (
    <section id="viewport" className="space-y-6 relative z-20">
      <div>
        <h2 className="text-xl font-black text-white font-sans">Interactive Proving Viewport</h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Control vehicle throttle states. Slide accelerator and brake inputs to test chassis dynamics.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        
        {/* SVG Rolling Road Viewport Left */}
        <div className="md:col-span-7 rounded-[24px] border border-white/5 bg-black/50 p-6 flex flex-col justify-between min-h-[280px] relative overflow-hidden">
          {/* Engineering blueprint coordinates overlay */}
          <div className="absolute top-4 left-4 z-10 text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider">
            Vector proving coordinates HUD
          </div>

          <div className="flex-1 flex items-center justify-center relative py-6">
            <svg viewBox="-100 -50 200 100" className="w-full h-full max-h-[140px] overflow-visible">
              
              {/* Dynamic scrolling horizon stars/grids */}
              <line x1="-100" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              
              {/* Proving road boundary limits */}
              <line x1="-30" y1="20" x2="-80" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="30" y1="20" x2="80" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Scrolling center stripes line */}
              {(() => {
                const lines = [];
                for (let i = 0; i < 4; i++) {
                  const progress = ((roadTranslate + i * 10) % 40) / 40;
                  const startY = 20 + progress * 30;
                  const endY = startY + 6;
                  // Perspective projections width
                  const startX = 0;
                  lines.push(
                    <line
                      key={i}
                      x1={startX}
                      y1={startY}
                      x2={startX}
                      y2={endY}
                      stroke="#22D3EE"
                      strokeWidth={1 + progress * 1.5}
                      opacity={progress}
                    />
                  );
                }
                return lines;
              })()}

              {/* Isometric car box */}
              <g transform="translate(0, 30)">
                <rect x="-18" y="-12" width="36" height="15" rx="3" fill="#131722" stroke="rgba(255,255,255,0.15)" />
                <rect x="-14" y="-8" width="28" height="10" rx="2" fill="#0F172A" stroke="#22D3EE" strokeWidth="0.8" />
                
                {/* Wheels spin */}
                <circle cx="-11" cy="4" r="5" fill="#111" stroke="rgba(255,255,255,0.3)" />
                <line x1="-11" y1="-1" x2="-11" y2="9" stroke="white" strokeWidth="0.5" className="animate-spin" style={{ transformOrigin: "-11px 4px", animationDuration: speed > 0 ? `${10 / speed}s` : "0s" }} />

                <circle cx="11" cy="4" r="5" fill="#111" stroke="rgba(255,255,255,0.3)" />
                <line x1="11" y1="-1" x2="11" y2="9" stroke="white" strokeWidth="0.5" className="animate-spin" style={{ transformOrigin: "11px 4px", animationDuration: speed > 0 ? `${10 / speed}s` : "0s" }} />
              </g>

              {/* Charging energy vector glow during speed increases */}
              {speed > 100 && (
                <circle cx="0" cy="20" r="28" fill="url(#heatGlow)" className="animate-pulse" pointerEvents="none" />
              )}
            </svg>
          </div>

          {/* User driving pedals controls bottom */}
          <div className="flex gap-4 justify-center items-center z-10">
            <button
              onMouseDown={() => onAccelerate(true)}
              onMouseUp={() => onAccelerate(false)}
              onMouseLeave={() => onAccelerate(false)}
              onTouchStart={() => onAccelerate(true)}
              onTouchEnd={() => onAccelerate(false)}
              className="px-5 py-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 text-[#22D3EE] font-black text-xs select-none cursor-pointer"
            >
              Accelerate (Throttle)
            </button>
            <button
              onMouseDown={() => onBrake(true)}
              onMouseUp={() => onBrake(false)}
              onMouseLeave={() => onBrake(false)}
              onTouchStart={() => onBrake(true)}
              onTouchEnd={() => onBrake(false)}
              className="px-5 py-3 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-black text-xs select-none cursor-pointer"
            >
              Brake (Regeneration)
            </button>
          </div>
        </div>

        {/* AI Performance Coach & Notification Popups Right */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          
          {/* Notification feed top */}
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md flex-1 flex flex-col justify-center min-h-[100px]">
            <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider block mb-2 border-b border-white/5 pb-1">
              Engineering alerts feed
            </span>
            <AnimatePresence mode="wait">
              {currentEvent ? (
                <motion.div
                  key={currentEvent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-2.5 items-start text-xs p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10"
                >
                  <AlertCircle className="w-4.5 h-4.5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Systems notification</strong>
                    <span className="text-muted-foreground/75">{currentEvent}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground/35 text-xs py-4">
                  Normal continuous cruising patterns.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Coach Advisor bottom */}
          <div className="p-4 rounded-xl border border-white/5 bg-[#131722]/50 backdrop-blur-md space-y-2 text-xs">
            <span className="text-[9px] text-purple-400 font-black uppercase tracking-wider block">
              AI Coach advice
            </span>
            <p className="text-muted-foreground/85 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5 font-semibold">
              {aiAdvice}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
