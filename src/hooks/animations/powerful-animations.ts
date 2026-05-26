
import { Transition, Easing, AnimationGeneratorType, Variants } from 'framer-motion';

export const usePowerfulAnimations = () => {
  return {
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 1.2, ease: "backOut" as Easing }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 1.4 }
    },
    slideInRight: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 1.4 }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration: 1.8, ease: "circOut" as Easing }
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring" as AnimationGeneratorType,
          damping: 10,
          stiffness: 100
        }
      }
    },
    flipIn: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      transition: { duration: 1.6, ease: "backOut" as Easing }
    },
    glowPulse: {
      animate: {
        boxShadow: [
          "0 0 0px 0px rgba(59, 130, 246, 0.1)",
          "0 0 15px 5px rgba(59, 130, 246, 0.4)",
          "0 0 0px 0px rgba(59, 130, 246, 0.1)"
        ],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as Easing } as Transition
      }
    },
    shimmer: {
      animate: {
        background: [
          "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)",
          "linear-gradient(90deg, #3b82f6 100%, #60a5fa 50%, #3b82f6 0%)"
        ],
        backgroundSize: "200% 200%",
        transition: { duration: 4, repeat: Infinity }
      }
    },
    panelBounce: {
      initial: { opacity: 0, y: 100, scale: 0.8 },
      animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as AnimationGeneratorType, damping: 15, stiffness: 120, duration: 0.6 } },
      exit: { opacity: 0, y: 100, scale: 0.8, transition: { duration: 0.4, ease: "easeIn" as Easing } },
    },
    particleFlow: (colorRgb: string) => ({
      animate: {
        background: [
          `radial-gradient(circle at 10% 50%, rgba(${colorRgb}, 0.05) 0%, transparent 70%)`,
          `radial-gradient(circle at 90% 50%, rgba(${colorRgb}, 0.1) 0%, transparent 70%)`,
          `radial-gradient(circle at 10% 50%, rgba(${colorRgb}, 0.05) 0%, transparent 70%)`
        ],
        scale: [1, 1.01, 1]
      },
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as Easing } as Transition
    }),
    sendIconPulse: {
      animate: {
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as Easing } as Transition
      }
    },
    imageParallax: (scrollY: number) => ({
      y: scrollY * 0.2,
      scale: 1 + scrollY * 0.0001,
      transition: { type: "spring" as AnimationGeneratorType, stiffness: 300, damping: 30 }
    }),
    cardLift: { // Перенесено из микро-анимаций
      whileHover: { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
      transition: { duration: 0.3 }
    },
    emptyIconBounce: {
      animate: {
        y: [0, -20, 0, -10, 0],
        scale: [1, 1.1, 1, 1.05, 1],
        transition: {
          duration: 2.5,
          ease: "easeOut" as Easing,
          repeat: Infinity,
          delay: 0.5
        } as Transition
      }
    },
    backgroundShimmerGlow: (colorRgb: string = '150, 100, 255') => ({ // По умолчанию app-global-accent-rgb
      animate: {
        background: [
          `radial-gradient(circle at 20% 80%, rgba(${colorRgb}, 0.1) 0%, transparent 60%)`, // Увеличено с 0.03
          `radial-gradient(circle at 80% 20%, rgba(${colorRgb}, 0.2) 0%, transparent 60%)`, // Увеличено с 0.05
          `radial-gradient(circle at 20% 80%, rgba(${colorRgb}, 0.1) 0%, transparent 60%)`  // Увеличено с 0.03
        ],
        boxShadow: [
          `0 0 8px rgba(${colorRgb}, 0.3)`,  // Увеличено с 0.1
          `0 0 25px rgba(${colorRgb}, 0.6)`, // Увеличено с 0.3
          `0 0 8px rgba(${colorRgb}, 0.3)`   // Увеличено с 0.1
        ],
        transition: {
          background: { duration: 15, repeat: Infinity, ease: "easeInOut" as Easing },
          boxShadow: { duration: 8, repeat: Infinity, ease: "easeInOut" as Easing }
        } as Transition
      }
    }),
    callToActionPulse: { // NEW: Анимация для эффекта "нажми меня"
      animate: {
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 0 0px rgba(var(--magic-green-fire-rgb), 0)",
          "0 0 20px 8px rgba(var(--magic-green-fire-rgb), 0.8)",
          "0 0 0px rgba(var(--magic-green-fire-rgb), 0)"
        ],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut" as Easing,
          delay: 0.5 // Начинается немного позже других элементов
        } as Transition
      }
    },
  };
};