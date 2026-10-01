/**
 * NexioraEV Premium Motion System
 * Unified motion tokens, easing curves, transition presets, and scroll utilities.
 */

// Premium Easing Curves
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const; // Apple / Tesla fluid deceleration
export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;  // Vercel / Linear snappy curve
export const EASE_SUBTLE = [0.25, 0.1, 0.25, 1] as const;
export const EASE_OUT = [0, 0, 0.2, 1] as const;

// Durations (in seconds for Framer Motion)
export const DURATION_FAST = 0.18;
export const DURATION_NORMAL = 0.28;
export const DURATION_SMOOTH = 0.45;
export const DURATION_CINEMATIC = 0.65;

// Framer Motion Transition Presets
export const transitionPremium = {
  duration: DURATION_SMOOTH,
  ease: EASE_PREMIUM,
};

export const transitionFast = {
  duration: DURATION_FAST,
  ease: EASE_SMOOTH,
};

export const transitionSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const transitionGentleSpring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

// Section & Element Entrance Variants
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION_SMOOTH,
      ease: EASE_PREMIUM,
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_SMOOTH,
    },
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_SMOOTH,
      ease: EASE_PREMIUM,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/**
 * Robust smooth scroll to a target section accounting for fixed navigation bars
 * and nested scroll containers.
 */
export function smoothScrollToSection(
  targetId: string,
  containerElementOrSelector?: HTMLElement | string | null,
  offset = 24
) {
  const target = document.getElementById(targetId);
  if (!target) return;

  let container: HTMLElement | null = null;
  if (typeof containerElementOrSelector === "string") {
    container = document.querySelector(containerElementOrSelector);
  } else if (containerElementOrSelector) {
    container = containerElementOrSelector;
  }

  // If inside a scrollable container (e.g. Solutions dashboard workspace)
  if (container) {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const scrollOffset = targetRect.top - containerRect.top + container.scrollTop - offset;

    container.scrollTo({
      top: Math.max(0, scrollOffset),
      behavior: "smooth",
    });
    return;
  }

  // Fallback to window scroll accounting for fixed navbar (80px)
  const headerHeight = 88;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, targetPosition - headerHeight - offset);

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
