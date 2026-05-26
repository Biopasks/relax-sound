
import { Transition, TargetAndTransition, Easing, Variants } from 'framer-motion';

export const sliderThumbGlow: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(var(--magic-accent-blue-rgb), 0)",
      "0 0 8px rgba(var(--magic-accent-blue-rgb), 0.6)",
      "0 0 0px rgba(var(--magic-accent-blue-rgb), 0)"
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as Easing }
  }
};

export const playPauseAuraPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(255,255,255,0.1)",
      "0 0 20px 10px rgba(255,255,255,0.5)",
      "0 0 0px rgba(255,255,255,0.1)"
    ],
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as Easing }
  }
};

export const sliderTrackGradient: Variants = {
  animate: {
    backgroundPositionX: ["0%", "100%"],
    transition: { duration: 10, repeat: Infinity, ease: "linear" as Easing }
  }
};