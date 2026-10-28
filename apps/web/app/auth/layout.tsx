"use client";

import { ReactNode, useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@nexiora/shared";

// ─── Seeded PRNG for deterministic particle positions ───
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Types ───
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
}

// ─── Auth Particles (sparse, green/cyan/blue) ───
function AuthParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const particles = useMemo<Particle[]>(() => {
    const rng = seededRandom(314);
    const colors = [
      "#00F5A0", // electric green
      "#00D9FF", // electric cyan
      "#39E8C8", // teal
      "#00F5A0",
      "#00D9FF",
      "#3B82F6", // occasional blue
    ];
    return Array.from({ length: 28 }).map((_, i) => {
      const opacity = rng() * 0.25 + 0.08;
      return {
        id: i,
        x: rng() * 100,
        y: rng() * 100,
        size: rng() * 3 + 1.2,
        color: colors[i % colors.length]!,
        delay: rng() * 12,
        duration: rng() * 18 + 14,
        opacity,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            filter: `blur(${p.size * 0.4}px)`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}40`,
            animation: reducedMotion
              ? "none"
              : `auth-particle-drift-${p.id % 4} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Energy Ribbons (SVG, behind card) ───
function EnergyRibbons({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ribbon 1: emerald curve */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        style={{
          animation: "auth-ribbon-flow-1 20s ease-in-out infinite",
          opacity: 0.35,
        }}
      >
        <defs>
          <linearGradient id="ribbon1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5A0" stopOpacity="0" />
            <stop offset="30%" stopColor="#00F5A0" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#39E8C8" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#00D9FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbon1Blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <path
          d="M-100,350 C200,200 400,500 600,300 C800,100 1000,450 1300,280"
          fill="none"
          stroke="url(#ribbon1Grad)"
          strokeWidth="2.5"
          filter="url(#ribbon1Blur)"
        />
        <path
          d="M-100,350 C200,200 400,500 600,300 C800,100 1000,450 1300,280"
          fill="none"
          stroke="url(#ribbon1Grad)"
          strokeWidth="1"
          opacity="0.8"
        />
      </svg>

      {/* Ribbon 2: cyan wave */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        style={{
          animation: "auth-ribbon-flow-2 25s ease-in-out 3s infinite",
          opacity: 0.25,
        }}
      >
        <defs>
          <linearGradient id="ribbon2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
            <stop offset="25%" stopColor="#00D9FF" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#00F5A0" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#39E8C8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbon2Blur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path
          d="M-100,480 C150,550 350,350 550,460 C750,570 950,320 1300,400"
          fill="none"
          stroke="url(#ribbon2Grad)"
          strokeWidth="2"
          filter="url(#ribbon2Blur)"
        />
        <path
          d="M-100,480 C150,550 350,350 550,460 C750,570 950,320 1300,400"
          fill="none"
          stroke="url(#ribbon2Grad)"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </svg>

      {/* Ribbon 3: faint tertiary */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        style={{
          animation: "auth-ribbon-flow-3 30s ease-in-out 7s infinite",
          opacity: 0.18,
        }}
      >
        <defs>
          <linearGradient id="ribbon3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39E8C8" stopOpacity="0" />
            <stop offset="40%" stopColor="#00F5A0" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#00D9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#39E8C8" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbon3Blur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path
          d="M-100,250 C300,320 500,150 700,250 C900,350 1100,180 1300,220"
          fill="none"
          stroke="url(#ribbon3Grad)"
          strokeWidth="1.8"
          filter="url(#ribbon3Blur)"
        />
      </svg>
    </div>
  );
}

// ─── Perspective Grid (EV energy grid at bottom) ───
function PerspectiveGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
      style={{
        height: "35%",
        perspective: "800px",
        perspectiveOrigin: "50% 0%",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-20%",
          right: "-20%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: "rotateX(55deg)",
          backgroundImage: `
            linear-gradient(90deg, rgba(0, 245, 160, 0.06) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 217, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: reducedMotion ? "none" : "auth-grid-scroll 8s linear infinite",
        }}
      />
    </div>
  );
}

// ─── Cursor Glow for Auth (desktop only, green-cyan) ───
function AuthCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.08;
    currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.08;
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${currentPos.current.x - 200}px, ${currentPos.current.y - 200}px, 0)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Only enable on non-touch desktop devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[1] hidden md:block"
      style={{
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0,245,160,0.06) 0%, rgba(0,217,255,0.03) 40%, transparent 70%)",
        willChange: "transform",
        transform: "translate3d(-200px, -200px, 0)",
      }}
    />
  );
}

// ─── Layout Styles (injected once) ───
const AUTH_LAYOUT_STYLES = `
  /* Auth particle drifts — 4 variations */
  @keyframes auth-particle-drift-0 {
    0%, 100% { transform: translate3d(0, 0, 0); opacity: var(--p-opacity, 0.15); }
    25% { transform: translate3d(15px, -20px, 0); opacity: calc(var(--p-opacity, 0.15) * 1.3); }
    50% { transform: translate3d(-10px, -35px, 0); opacity: var(--p-opacity, 0.15); }
    75% { transform: translate3d(20px, -15px, 0); opacity: calc(var(--p-opacity, 0.15) * 0.7); }
  }
  @keyframes auth-particle-drift-1 {
    0%, 100% { transform: translate3d(0, 0, 0); }
    33% { transform: translate3d(-18px, 25px, 0); }
    66% { transform: translate3d(12px, -18px, 0); }
  }
  @keyframes auth-particle-drift-2 {
    0%, 100% { transform: translate3d(0, 0, 0); }
    25% { transform: translate3d(22px, 14px, 0); }
    50% { transform: translate3d(-8px, 30px, 0); }
    75% { transform: translate3d(-20px, 8px, 0); }
  }
  @keyframes auth-particle-drift-3 {
    0%, 100% { transform: translate3d(0, 0, 0); }
    30% { transform: translate3d(-14px, -22px, 0); }
    60% { transform: translate3d(18px, 10px, 0); }
  }

  /* Energy ribbon flows */
  @keyframes auth-ribbon-flow-1 {
    0%, 100% { transform: translate3d(0, 0, 0) scaleY(1); }
    25% { transform: translate3d(30px, -15px, 0) scaleY(1.05); }
    50% { transform: translate3d(-20px, 10px, 0) scaleY(0.95); }
    75% { transform: translate3d(15px, -8px, 0) scaleY(1.02); }
  }
  @keyframes auth-ribbon-flow-2 {
    0%, 100% { transform: translate3d(0, 0, 0) scaleY(1); }
    33% { transform: translate3d(-25px, 12px, 0) scaleY(1.08); }
    66% { transform: translate3d(20px, -18px, 0) scaleY(0.92); }
  }
  @keyframes auth-ribbon-flow-3 {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(35px, -20px, 0); }
  }

  /* Ambient gradient breathing */
  @keyframes auth-ambient-breathe {
    0%, 100% { opacity: var(--ab-from, 0.5); transform: scale(1); }
    50% { opacity: var(--ab-to, 0.7); transform: scale(1.04); }
  }

  /* Perspective grid scroll */
  @keyframes auth-grid-scroll {
    from { background-position: 0 0; }
    to { background-position: 0 60px; }
  }

  /* Glass card shimmer */
  @keyframes auth-glass-shimmer {
    0% { transform: translateX(-200%) rotate(-15deg); opacity: 0; }
    15% { opacity: 0.4; }
    30% { transform: translateX(200%) rotate(-15deg); opacity: 0; }
    100% { opacity: 0; }
  }

  /* Border illumination rotation */
  @keyframes auth-border-glow-rotate {
    0% { filter: hue-rotate(0deg); opacity: 0.6; }
    50% { filter: hue-rotate(25deg); opacity: 0.9; }
    100% { filter: hue-rotate(0deg); opacity: 0.6; }
  }

  /* Entrance animation for card */
  @keyframes auth-card-entrance {
    0% { opacity: 0; transform: translateY(20px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AUTH_LAYOUT_STYLES }} />

      <div
        className="relative flex min-h-screen flex-col items-center overflow-x-hidden px-4 pt-28 pb-12 sm:pt-32 sm:pb-16"
        style={{ background: "#050A12" }}
      >
        {/* ═══ LAYER 1: Deep midnight base ═══ */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #050A12 0%, #081522 35%, #063D32 80%, #050A12 100%)",
            opacity: 0.5,
          }}
        />

        {/* ═══ LAYER 2: Cinematic ambient lighting ═══ */}
        {/* Upper-left emerald glow */}
        <div
          className="absolute rounded-full blur-[120px] will-change-transform"
          style={{
            width: 600,
            height: 600,
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(0,245,160,0.12) 0%, rgba(6,61,50,0.08) 50%, transparent 70%)",
            animation: reducedMotion
              ? "none"
              : "auth-ambient-breathe 15s ease-in-out infinite",
            "--ab-from": "0.8",
            "--ab-to": "1",
          } as React.CSSProperties}
        />
        {/* Right cyan glow */}
        <div
          className="absolute rounded-full blur-[100px] will-change-transform"
          style={{
            width: 500,
            height: 500,
            top: "20%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(0,217,255,0.08) 0%, rgba(0,217,255,0.03) 50%, transparent 70%)",
            animation: reducedMotion
              ? "none"
              : "auth-ambient-breathe 20s ease-in-out 4s infinite",
            "--ab-from": "0.6",
            "--ab-to": "0.85",
          } as React.CSSProperties}
        />
        {/* Bottom restrained green glow */}
        <div
          className="absolute rounded-full blur-[110px] will-change-transform"
          style={{
            width: 550,
            height: 400,
            bottom: "-5%",
            left: "15%",
            background:
              "radial-gradient(circle, rgba(0,245,160,0.06) 0%, transparent 60%)",
            animation: reducedMotion
              ? "none"
              : "auth-ambient-breathe 22s ease-in-out 8s infinite",
            "--ab-from": "0.5",
            "--ab-to": "0.75",
          } as React.CSSProperties}
        />
        {/* Distant violet-blue atmosphere */}
        <div
          className="absolute rounded-full blur-[130px] will-change-transform"
          style={{
            width: 400,
            height: 400,
            top: "40%",
            left: "60%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.03) 50%, transparent 70%)",
            animation: reducedMotion
              ? "none"
              : "auth-ambient-breathe 25s ease-in-out 12s infinite",
          }}
        />

        {/* ═══ LAYER 3: Energy Ribbons ═══ */}
        <EnergyRibbons reducedMotion={reducedMotion} />

        {/* ═══ LAYER 4: Floating Particles ═══ */}
        <AuthParticles reducedMotion={reducedMotion} />

        {/* ═══ LAYER 5: Perspective EV Grid ═══ */}
        <PerspectiveGrid reducedMotion={reducedMotion} />

        {/* ═══ LAYER 6: Cursor Glow ═══ */}
        <AuthCursorGlow />

        {/* ═══ LAYER 7: Soft vignette overlay ═══ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 45%, transparent 0%, rgba(5,10,18,0.6) 100%)",
          }}
        />

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="w-full max-w-[480px] relative z-10 my-auto">
          {/* Logo / Brand */}
          <div className="mb-8 flex justify-center">
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(13, 24, 35, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow:
                  "0 8px 32px -4px rgba(0, 0, 0, 0.45), 0 0 24px -4px rgba(0, 245, 160, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
              }}
              aria-label="NexioraEV Home"
            >
              {/* Restrained emerald & cyan halo */}
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500 blur-md"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0, 245, 160, 0.3) 0%, rgba(0, 217, 255, 0.18) 50%, transparent 80%)",
                }}
              />
              <Image
                src="/brand/nexiora-logo.png"
                alt={APP_NAME || "NexioraEV"}
                width={970}
                height={299}
                priority
                className="h-9 sm:h-10.5 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
