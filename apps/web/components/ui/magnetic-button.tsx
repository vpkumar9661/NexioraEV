"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function MagneticButton({
  children,
  className = "",
  maxDistance = 5,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Disable on mobile or reduced-motion
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDisabled(isMobile || reducedMotion);
  }, []);

  const x = useSpring(0, { stiffness: 350, damping: 22 });
  const y = useSpring(0, { stiffness: 350, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    x.set(deltaX * maxDistance);
    y.set(deltaY * maxDistance);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (disabled) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
