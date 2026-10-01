"use client";

import React, { useEffect, useRef } from "react";

export function HeroVehicle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX.current = (e.clientX - halfW) / halfW;
      targetY.current = (e.clientY - halfH) / halfH;
    };

    const handleMouseLeave = () => {
      targetX.current = 0;
      targetY.current = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Smooth RAF lerp loop to prevent React re-renders
    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.06;
      currentY.current += (targetY.current - currentY.current) * 0.06;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentX.current * 20}px, ${currentY.current * 16}px, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-100 lg:h-120 pointer-events-none select-none overflow-hidden">
      {/* Floating diagnostic sparkles/particles overlay */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-10 will-change-transform"
      >
        <style>{`
          @keyframes float-spark {
            0% { transform: translateY(40px) translateX(0) scale(0.8); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-120px) translateX(20px) scale(1); opacity: 0; }
          }
          .spark-particle {
            position: absolute;
            border-radius: 50%;
            animation: float-spark 6s ease-in-out infinite;
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.35; }
          }
          .glow-pulse-layer {
            animation: glow-pulse 4s ease-in-out infinite;
          }
        `}</style>

        {/* Ambient glow overlays aligned with vehicle tech space */}
        <div className="absolute top-[25%] right-[35%] w-50 h-50 bg-secondary/8 rounded-full blur-[50px] glow-pulse-layer" />
        <div className="absolute bottom-[20%] left-[25%] w-62.5 h-22.5 bg-[#00F5A0]/10 rounded-full blur-2xl glow-pulse-layer" style={{ animationDelay: "2s" }} />

        {/* Diagnostic energy sparks drifting */}
        <div className="spark-particle bg-[#00F5A0] w-1.5 h-1.5 top-[70%] left-[35%]" style={{ animationDelay: "0s", animationDuration: "5s" }} />
        <div className="spark-particle bg-secondary w-1 h-1 top-[55%] left-[50%]" style={{ animationDelay: "2s", animationDuration: "7s" }} />
        <div className="spark-particle bg-accent w-1.5 h-1.5 top-[75%] left-[65%]" style={{ animationDelay: "4s", animationDuration: "6s" }} />
      </div>
    </div>
  );
}

export default HeroVehicle;
