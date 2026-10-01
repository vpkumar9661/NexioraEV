"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeUpVariants, fadeInVariants, scaleInVariants } from "@/lib/motion";

type RevealVariant = "fade-up" | "fade-in" | "scale-in";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0.15,
  once = true,
  className = "",
  ...props
}: ScrollRevealProps) {
  const getVariants = () => {
    switch (variant) {
      case "fade-in":
        return fadeInVariants;
      case "scale-in":
        return scaleInVariants;
      case "fade-up":
      default:
        return fadeUpVariants;
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible.transition || {}),
            delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
