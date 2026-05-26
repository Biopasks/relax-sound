
import { Transition, TargetAndTransition, Easing, Variants } from 'framer-motion';

export const privacyButtonEntry: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } }
};

export const privacyButtonHover: Variants = {
  whileHover: {
    color: "hsl(var(--magic-cyan-accent))",
    transition: { duration: 0.3 }
  }
};

export const textVisualizerButtonEntry: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } }
};

export const textVisualizerButtonTap: Variants = {
  whileTap: {
    scale: [1, 0.9, 1.1, 1],
    transition: { duration: 0.3, ease: "easeOut" as Easing }
  }
};

export const logoTiltHover: Variants = {
  whileHover: {
    rotateX: 8,
    rotateY: -8,
    transition: { duration: 0.4, ease: "easeOut" as Easing }
  }
};