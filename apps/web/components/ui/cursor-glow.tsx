"use client";

import React, { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const [isMobile, setIsMobile] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<"normal" | "button" | "link" | "card">("normal");

  const glowRef = useRef<HTMLDivElement | null>(null);
  
  // Track mouse coordinates
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  
  // Track interpolated coordinates
  const glowX = useRef(0);
  const glowY = useRef(0);
  
  // Track scale properties
  const glowScale = useRef(1);
  const targetScale = useRef(1);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Main animation and tracking lifecycle
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      // Grow slightly while moving
      targetScale.current = 1.08;
    };

    // Fade in/out on document body boundary crossing
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Hover elements categorization via event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.closest("button") || target.closest("a.quote-btn") || target.closest(".glass-btn-active") || target.closest("[role='button']")) {
        setHoverState("button");
      } else if (target.closest("a")) {
        setHoverState("link");
      } else if (
        target.closest(".card-dark-glass") ||
        target.closest(".card-green-glass") ||
        target.closest(".card-blue-glass") ||
        target.closest(".card-purple-glass") ||
        target.closest(".card-amber-glass") ||
        target.closest(".glass-card")
      ) {
        setHoverState("card");
      } else {
        setHoverState("normal");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial check for visibility (if cursor is already inside the viewport)
    setIsVisible(true);

    let animationFrameId: number;

    // GPU optimized interpolation loop running at 60 FPS
    const tick = () => {
      // Ease coordinates
      const ease = 0.09;
      glowX.current += (mouseX.current - glowX.current) * ease;
      glowY.current += (mouseY.current - glowY.current) * ease;
      
      // Interpolate scale back to default
      glowScale.current += (targetScale.current - glowScale.current) * 0.1;
      
      // Decelerate movement scale stretch
      targetScale.current += (1 - targetScale.current) * 0.05;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(calc(${glowX.current}px - 50%), calc(${glowY.current}px - 50%), 0) scale(${glowScale.current})`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, reducedMotion]);

  // Disable completely for performance/accessibility criteria
  if (isMobile || reducedMotion) return null;

  // Render the single absolute layer tracking cursor coords
  return (
    <>
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-opacity duration-300 will-change-transform z-5 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: hoverState === "card" ? "320px" : hoverState === "link" ? "240px" : "280px",
          height: hoverState === "card" ? "320px" : hoverState === "link" ? "240px" : "280px",
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.35) 0%, rgba(0, 210, 106, 0.25) 30%, rgba(0, 255, 136, 0.18) 60%, transparent 100%)",
          filter: hoverState === "button" ? "blur(90px) saturate(1.4)" : "blur(90px)",
          mixBlendMode: "screen",
          opacity: hoverState === "button" ? 0.85 : 0.65,
          transition: "width 250ms ease, height 250ms ease, opacity 200ms ease, filter 200ms ease",
        }}
      />
    </>
  );
}
