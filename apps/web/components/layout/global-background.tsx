"use client";

import React, { useEffect, useState } from "react";

export function GlobalAmbientBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate a fixed set of particles on load
    const temp = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 6
    }));
    setParticles(temp);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07090e]">
      
      {/* 1. LAYERED MESH GRADIENTS */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-accent/2.5 blur-[120px] animate-pulse" style={{ animationDuration: "16s" }} />
      <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#00C853]/2.5 blur-[150px] animate-pulse" style={{ animationDuration: "20s" }} />
      <div className="absolute bottom-[20%] left-[25%] w-[550px] h-[550px] rounded-full bg-secondary/2 blur-[130px] animate-pulse" style={{ animationDuration: "18s" }} />
      <div className="absolute bottom-[5%] right-[20%] w-[450px] h-[450px] rounded-full bg-[#F4B400]/1 blur-[110px] animate-pulse" style={{ animationDuration: "22s" }} />

      {/* 2. CIRCUIT-INSPIRED PATTERNS (Low Opacity Grid Overlay) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[32px_32px] opacity-75" />

      {/* 3. FLOATING PARTICLES */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/10 animate-bounce"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${12 + p.delay}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* 4. SOFT VERTICAL GRADIENT VIGNETTE */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#07090e]/40 to-[#07090e]" />
    </div>
  );
}
export default GlobalAmbientBackground;
