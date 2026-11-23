import React from "react";

/**
 * Subtle circular decorative elements for the minimal soft dark authentication screen.
 * Low contrast, soft diffuse glow, positioned behind the card, non-interactive, and responsive.
 */
export function AuthDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── Soft Ambient Glow Spheres ── */}
      {/* Top-left soft mint/emerald sphere */}
      <div
        className="absolute rounded-full blur-[120px] will-change-transform opacity-70"
        style={{
          width: 540,
          height: 540,
          top: "-14%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(0, 210, 106, 0.12) 0%, rgba(6, 61, 50, 0.05) 50%, transparent 75%)",
        }}
      />

      {/* Top-right soft electric sky sphere */}
      <div
        className="absolute rounded-full blur-[130px] will-change-transform opacity-60"
        style={{
          width: 500,
          height: 500,
          top: "8%",
          right: "-12%",
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 75%)",
        }}
      />

      {/* Bottom-left soft indigo atmosphere sphere */}
      <div
        className="absolute rounded-full blur-[140px] will-change-transform opacity-50"
        style={{
          width: 580,
          height: 580,
          bottom: "-16%",
          left: "8%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 75%)",
        }}
      />

      {/* Bottom-right subtle emerald highlight */}
      <div
        className="absolute rounded-full blur-[110px] will-change-transform opacity-40"
        style={{
          width: 440,
          height: 440,
          bottom: "-10%",
          right: "6%",
          background: "radial-gradient(circle, rgba(0, 210, 106, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Minimal Geometric Concentric Circles (Reference Style in Dark) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Inner subtle circle */}
        <div
          className="rounded-full border border-white/5 will-change-transform"
          style={{
            width: "680px",
            height: "680px",
            maxWidth: "92vw",
            maxHeight: "92vw",
            boxShadow: "0 0 100px -20px rgba(0, 210, 106, 0.03)",
          }}
        />

        {/* Outer dashed delicate circle */}
        <div
          className="absolute rounded-full border border-dashed border-white/3 will-change-transform"
          style={{
            width: "920px",
            height: "920px",
            maxWidth: "125vw",
            maxHeight: "125vw",
          }}
        />

        {/* Floating tiny soft orbital dots */}
        <div
          className="absolute rounded-full bg-emerald-400/40 shadow-xs"
          style={{
            width: "6px",
            height: "6px",
            top: "22%",
            left: "28%",
            boxShadow: "0 0 12px rgba(0, 210, 106, 0.6)",
          }}
        />
        <div
          className="absolute rounded-full bg-cyan-400/40 shadow-xs"
          style={{
            width: "8px",
            height: "8px",
            bottom: "26%",
            right: "24%",
            boxShadow: "0 0 14px rgba(0, 217, 255, 0.5)",
          }}
        />
      </div>
    </div>
  );
}
