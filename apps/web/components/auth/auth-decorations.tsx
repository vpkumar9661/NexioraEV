import React from "react";

/**
 * Subtle circular decorative elements for the minimal soft authentication screen.
 * Low contrast, soft, positioned behind the card, non-interactive, and responsive.
 */
export function AuthDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── Soft Ambient Glow Spheres ── */}
      {/* Top-left soft mint/emerald sphere */}
      <div
        className="absolute rounded-full blur-[110px] will-change-transform opacity-60"
        style={{
          width: 520,
          height: 520,
          top: "-12%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(0, 210, 106, 0.08) 0%, rgba(226, 232, 240, 0.4) 60%, transparent 75%)",
        }}
      />

      {/* Top-right soft electric sky sphere */}
      <div
        className="absolute rounded-full blur-[120px] will-change-transform opacity-50"
        style={{
          width: 480,
          height: 480,
          top: "5%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(226, 232, 240, 0.5) 60%, transparent 75%)",
        }}
      />

      {/* Bottom-left soft warm neutral sphere */}
      <div
        className="absolute rounded-full blur-[130px] will-change-transform opacity-70"
        style={{
          width: 550,
          height: 550,
          bottom: "-15%",
          left: "10%",
          background: "radial-gradient(circle, rgba(203, 213, 225, 0.45) 0%, rgba(241, 245, 249, 0.3) 60%, transparent 75%)",
        }}
      />

      {/* Bottom-right subtle accent sphere */}
      <div
        className="absolute rounded-full blur-[100px] will-change-transform opacity-40"
        style={{
          width: 420,
          height: 420,
          bottom: "-8%",
          right: "5%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Minimal Geometric Concentric Circles (Reference Style) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Inner subtle circle */}
        <div
          className="rounded-full border border-slate-300/40 will-change-transform"
          style={{
            width: "680px",
            height: "680px",
            maxWidth: "92vw",
            maxHeight: "92vw",
            boxShadow: "0 0 80px -20px rgba(0, 0, 0, 0.02)",
          }}
        />

        {/* Outer dashed delicate circle */}
        <div
          className="absolute rounded-full border border-dashed border-slate-300/30 will-change-transform"
          style={{
            width: "920px",
            height: "920px",
            maxWidth: "125vw",
            maxHeight: "125vw",
          }}
        />

        {/* Floating tiny soft orbital dots */}
        <div
          className="absolute rounded-full bg-slate-300/60 shadow-xs"
          style={{
            width: "6px",
            height: "6px",
            top: "22%",
            left: "28%",
          }}
        />
        <div
          className="absolute rounded-full bg-emerald-400/40 shadow-xs"
          style={{
            width: "8px",
            height: "8px",
            bottom: "26%",
            right: "24%",
          }}
        />
      </div>
    </div>
  );
}
