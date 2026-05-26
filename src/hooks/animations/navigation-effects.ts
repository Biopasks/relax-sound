
import { Transition, TargetAndTransition, Easing, Variants } from 'framer-motion';

export const navTileTextShadow: Variants = {
  whileHover: {
    textShadow: "0 0 10px rgba(255,255,255,0.5)",
    transition: { duration: 0.3 }
  }
};

export const navTileBgGradientShift: Variants = {
  whileHover: {
    backgroundPositionX: ["0%", "100%"],
    transition: { duration: 1.0, repeat: Infinity, ease: "linear" }
  }
};

export const navActiveIndicatorVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.4 } },
  exit: { opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.3 } },
};

// Варианты для анимации покоя и входа центральной кнопки
export const navCentralButtonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
      duration: 0.5,
      ease: "easeOut" as Easing
    }
  },
  whileHover: {
    scale: 1.1,
    y: -8,
    boxShadow: "0 0 25px 8px rgba(var(--magic-accent-blue-rgb), 0.7)",
    rotateX: 5,
    rotateY: -5,
    transition: { duration: 0.3, ease: "easeOut" as Easing }
  },
  whileTap: {
    scale: 0.9,
    y: 2,
    boxShadow: "0 0 10px 3px rgba(var(--magic-accent-blue-rgb), 0.4)",
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.2, ease: "easeIn" as Easing }
  }
};

// Варианты для взаимодействия периферийных кнопок (при открытом меню)
export const navItemInteractionVariants: Variants = {
  whileHover: {
    scale: 1.1,
    y: -8,
    boxShadow: "0 0 25px 8px rgba(var(--magic-accent-blue-rgb), 0.7)",
    rotateX: 5,
    rotateY: -5,
    transition: { duration: 0.3, ease: "easeOut" as Easing }
  },
  whileTap: {
    scale: 0.9,
    y: 2,
    boxShadow: "0 0 10px 3px rgba(var(--magic-accent-blue-rgb), 0.4)",
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.2, ease: "easeIn" as Easing }
  }
};


export const navSettingsIconVariants: Variants = {
  animate: {
    rotate: [0, 360],
    scale: [1, 1.05, 1],
    transition: {
      rotate: { duration: 15, repeat: Infinity, ease: "linear" as Easing } as Transition,
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" as Easing } as Transition
    }
  },
  whileHover: {
    scale: 1.2,
    rotate: 30,
    transition: { duration: 0.2 }
  }
};