"use client";

import React, { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // References to the 3 layered elements
  const dotRef = useRef<HTMLDivElement | null>(null);
  const innerGlowRef = useRef<HTMLDivElement | null>(null);
  const outerGlowRef = useRef<HTMLDivElement | null>(null);

  // Raw mouse coordinates
  const mouse = useRef({ x: -100, y: -100, isVisible: false });

  // Layered interpolated positions for multi-tier depth physics
  const dotPos = useRef({ x: -100, y: -100 });
  const innerPos = useRef({ x: -100, y: -100, scale: 1 });
  const outerPos = useRef({ x: -100, y: -100, scale: 1 });

  // Hover target scale & opacity (handled purely in RAF, no React state re-renders)
  const targetScale = useRef({ inner: 1, outer: 1 });
  const targetOpacity = useRef({ dot: 0, inner: 0.45, outer: 0.22 });

  useEffect(() => {
    setIsMounted(true);

    const checkDisabled = () => {
      const isMobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsDisabled(isMobile || reducedMotion);
    };

    checkDisabled();
    window.addEventListener("resize", checkDisabled, { passive: true });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", checkDisabled);

    return () => {
      window.removeEventListener("resize", checkDisabled);
      mq.removeEventListener("change", checkDisabled);
    };
  }, []);

  useEffect(() => {
    if (isDisabled || !isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.isVisible = true;
    };

    const handleMouseLeave = () => {
      mouse.current.isVisible = false;
    };

    const handleMouseEnter = () => {
      mouse.current.isVisible = true;
    };

    // Detect hover element type via event delegation without triggering React state updates
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.closest("button") ||
        target.closest("a.quote-btn") ||
        target.closest(".glass-btn-active") ||
        target.closest("[role='button']")
      ) {
        targetScale.current = { inner: 1.35, outer: 1.15 };
        targetOpacity.current = { dot: 0.8, inner: 0.7, outer: 0.35 };
      } else if (target.closest("a")) {
        targetScale.current = { inner: 1.2, outer: 1.08 };
        targetOpacity.current = { dot: 0.6, inner: 0.55, outer: 0.28 };
      } else if (
        target.closest(".card-dark-glass") ||
        target.closest(".glass-card") ||
        target.closest("[data-slot='card']") ||
        target.closest(".premium-card")
      ) {
        targetScale.current = { inner: 1.1, outer: 1.25 };
        targetOpacity.current = { dot: 0.4, inner: 0.5, outer: 0.32 };
      } else {
        targetScale.current = { inner: 1, outer: 1 };
        targetOpacity.current = { dot: 0, inner: 0.45, outer: 0.22 };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.body.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    let animationFrameId: number;

    // Zero-overhead 60-120fps RAF physics loop
    const renderLoop = () => {
      const { x, y, isVisible } = mouse.current;

      if (isVisible) {
        // Tier 1: Fast responsive pointer dot (lerp: 0.35)
        dotPos.current.x += (x - dotPos.current.x) * 0.35;
        dotPos.current.y += (y - dotPos.current.y) * 0.35;

        // Tier 2: Moderately responsive inner energetic ring (lerp: 0.14)
        innerPos.current.x += (x - innerPos.current.x) * 0.14;
        innerPos.current.y += (y - innerPos.current.y) * 0.14;
        innerPos.current.scale += (targetScale.current.inner - innerPos.current.scale) * 0.1;

        // Tier 3: Slow, cinematic ambient atmosphere aura (lerp: 0.055)
        outerPos.current.x += (x - outerPos.current.x) * 0.055;
        outerPos.current.y += (y - outerPos.current.y) * 0.055;
        outerPos.current.scale += (targetScale.current.outer - outerPos.current.scale) * 0.06;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
          dotRef.current.style.opacity = `${targetOpacity.current.dot}`;
        }

        if (innerGlowRef.current) {
          innerGlowRef.current.style.transform = `translate3d(${innerPos.current.x}px, ${innerPos.current.y}px, 0) translate(-50%, -50%) scale(${innerPos.current.scale})`;
          innerGlowRef.current.style.opacity = `${targetOpacity.current.inner}`;
        }

        if (outerGlowRef.current) {
          outerGlowRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%) scale(${outerPos.current.scale})`;
          outerGlowRef.current.style.opacity = `${targetOpacity.current.outer}`;
        }
      } else {
        if (dotRef.current) dotRef.current.style.opacity = "0";
        if (innerGlowRef.current) innerGlowRef.current.style.opacity = "0";
        if (outerGlowRef.current) outerGlowRef.current.style.opacity = "0";
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDisabled, isMounted]);

  if (isDisabled || !isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-5 overflow-hidden">
      {/* Tier 3: Slow Ambient Glow Atmosphere (wide, soft) */}
      <div
        ref={outerGlowRef}
        className="absolute top-0 left-0 w-105 h-105 rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0, 245, 160, 0.16) 0%, rgba(0, 217, 255, 0.08) 35%, transparent 70%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
          opacity: 0,
          transition: "opacity 300ms ease-out",
        }}
      />

      {/* Tier 2: Medium Inner Energy Ring */}
      <div
        ref={innerGlowRef}
        className="absolute top-0 left-0 w-35 h-35 rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0, 245, 160, 0.28) 0%, rgba(0, 217, 255, 0.12) 45%, transparent 75%)",
          filter: "blur(24px)",
          mixBlendMode: "screen",
          opacity: 0,
          transition: "opacity 200ms ease-out",
        }}
      />

      {/* Tier 1: Fast Responsive Pointer Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#00F5A0] will-change-transform"
        style={{
          opacity: 0,
          transition: "opacity 150ms ease-out",
        }}
      />
    </div>
  );
}

export default CursorGlow;
