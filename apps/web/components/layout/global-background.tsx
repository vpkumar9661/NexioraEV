"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

// ---------- Utility: seeded pseudo-random for deterministic layouts ----------
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------- Types ----------
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  baseOpacity: number;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface ConstellationLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  duration: number;
}

export function GlobalAmbientBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Generate deterministic data with useMemo
  const stars = useMemo<Star[]>(() => {
    const rng = seededRandom(42);
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 1.8 + 0.4,
      delay: rng() * 8,
      duration: rng() * 4 + 2,
      baseOpacity: rng() * 0.5 + 0.15,
    }));
  }, []);

  const floatingParticles = useMemo<FloatingParticle[]>(() => {
    const rng = seededRandom(77);
    const colors = [
      "rgba(0, 230, 118, OPACITY)",    // green
      "rgba(0, 212, 255, OPACITY)",     // cyan
      "rgba(139, 92, 246, OPACITY)",    // purple
      "rgba(59, 130, 246, OPACITY)",    // blue
      "rgba(0, 230, 118, OPACITY)",     // green
    ];
    return Array.from({ length: 20 }).map((_, i) => {
      const opacity = rng() * 0.15 + 0.05;
      return {
        id: i,
        x: rng() * 100,
        y: rng() * 100,
        size: rng() * 4 + 2,
        color: (colors[i % colors.length] ?? "rgba(0, 230, 118, OPACITY)").replace("OPACITY", opacity.toFixed(2)),
        delay: rng() * 10,
        duration: rng() * 15 + 20,
        opacity,
      };
    });
  }, []);

  const shootingStars = useMemo<ShootingStar[]>(() => {
    const rng = seededRandom(99);
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      x: rng() * 60 + 10,
      y: rng() * 30 + 5,
      delay: i * (rng() * 12 + 8),
      duration: rng() * 1 + 1.5,
    }));
  }, []);

  const constellationLines = useMemo<ConstellationLine[]>(() => {
    const rng = seededRandom(123);
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x1: rng() * 80 + 10,
      y1: rng() * 80 + 10,
      x2: rng() * 80 + 10,
      y2: rng() * 80 + 10,
      delay: rng() * 20,
      duration: rng() * 8 + 6,
    }));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const disableAnimations = reducedMotion || isMobile;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* ═══════════════════════════════════════════
          LAYER 1: Deep Premium Gradient
          ═══════════════════════════════════════════ */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #04080F 0%, #07141C 40%, #081A20 100%)",
        }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 2: Animated Mesh Gradients
          ═══════════════════════════════════════════ */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[160px]"
        style={{
          top: "5%",
          left: "10%",
          background: "radial-gradient(circle, rgba(0, 230, 118, 0.06) 0%, transparent 70%)",
          animation: disableAnimations ? "none" : "mesh-drift-1 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{
          top: "35%",
          right: "5%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
          animation: disableAnimations ? "none" : "mesh-drift-2 35s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[150px]"
        style={{
          bottom: "10%",
          left: "25%",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 70%)",
          animation: disableAnimations ? "none" : "mesh-drift-3 40s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          bottom: "5%",
          right: "15%",
          background: "radial-gradient(circle, rgba(0, 230, 118, 0.035) 0%, transparent 70%)",
          animation: disableAnimations ? "none" : "mesh-drift-1 45s ease-in-out infinite reverse",
        }}
      />

      {/* ═══════════════════════════════════════════
          LAYER 3: Twinkling Stars
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.baseOpacity,
              animation: disableAnimations
                ? "none"
                : `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          LAYER 4: Shooting Stars
          ═══════════════════════════════════════════ */}
      {!disableAnimations && (
        <div className="absolute inset-0">
          {shootingStars.map((ss) => (
            <div
              key={ss.id}
              className="absolute"
              style={{
                left: `${ss.x}%`,
                top: `${ss.y}%`,
                width: "120px",
                height: "2px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0, 230, 118, 0.6), transparent)",
                animation: `shoot ${ss.duration + 10}s linear ${ss.delay}s infinite`,
                transformOrigin: "left center",
              }}
            />
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          LAYER 5: Floating Glowing Particles
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0">
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              filter: `blur(${p.size * 0.6}px)`,
              animation: disableAnimations
                ? "none"
                : `float-gentle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          LAYER 6: Constellation Lines
          ═══════════════════════════════════════════ */}
      {!disableAnimations && (
        <svg className="absolute inset-0 w-full h-full">
          {constellationLines.map((line) => (
            <line
              key={line.id}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="rgba(0, 230, 118, 0.12)"
              strokeWidth="0.5"
              style={{
                animation: `constellation-fade ${line.duration}s ease-in-out ${line.delay}s infinite`,
              }}
            />
          ))}
        </svg>
      )}

      {/* ═══════════════════════════════════════════
          LAYER 7: Aurora Effect
          ═══════════════════════════════════════════ */}
      {!disableAnimations && (
        <>
          <div
            className="absolute w-[120%] h-[250px] blur-[100px]"
            style={{
              top: "15%",
              left: "-10%",
              background: "linear-gradient(90deg, transparent 0%, rgba(0, 230, 118, 0.06) 25%, rgba(0, 212, 255, 0.05) 50%, rgba(139, 92, 246, 0.04) 75%, transparent 100%)",
              animation: "aurora-drift 25s ease-in-out infinite",
              borderRadius: "50%",
            }}
          />
          <div
            className="absolute w-full h-[180px] blur-[80px]"
            style={{
              top: "22%",
              left: "-5%",
              background: "linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.04) 30%, rgba(0, 230, 118, 0.05) 60%, transparent 100%)",
              animation: "aurora-drift 30s ease-in-out 5s infinite reverse",
              borderRadius: "50%",
            }}
          />
        </>
      )}

      {/* ═══════════════════════════════════════════
          LAYER 8: Ambient Light Rays
          ═══════════════════════════════════════════ */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full"
        style={{
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(0, 230, 118, 0.05) 0%, rgba(0, 212, 255, 0.02) 40%, transparent 70%)",
          animation: disableAnimations ? "none" : "light-breathe 12s ease-in-out infinite",
        }}
      />

      {/* Circuit Grid Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      {/* Soft Vertical Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(4, 8, 15, 0.15) 50%, rgba(4, 8, 15, 0.5) 100%)",
        }}
      />
    </div>
  );
}

export default GlobalAmbientBackground;
