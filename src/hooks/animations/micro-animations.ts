
import { Transition, TargetAndTransition, Easing, Variants, AnimationGeneratorType } from 'framer-motion';

// Импорт из новых модульных файлов
import { getSoundCardEffects } from './sound-card-effects';
import { headerIconHoverRotate, headerLabelFade, headerButton3DTilt } from './header-button-effects';
import { sliderThumbGlow, playPauseAuraPulse, sliderTrackGradient } from './player-controls-effects';
import { privacyButtonEntry, privacyButtonHover, textVisualizerButtonEntry, textVisualizerButtonTap, logoTiltHover } from './onboarding-effects';
import { navTileTextShadow, navTileBgGradientShift, navActiveIndicatorVariants, navCentralButtonVariants, navItemInteractionVariants, navSettingsIconVariants } from './navigation-effects'; // Обновленный импорт

export const useMicroAnimations = () => {
  return {
    hoverScale: { whileHover: { scale: 1.05 }, transition: { duration: 0.4 } },
    hoverLift: { whileHover: { y: -4 }, transition: { duration: 0.4 } },
    hoverGlow: { whileHover: { boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" } },
    
    tapScale: { whileTap: { scale: 0.95 } },
    tapPush: { whileTap: { y: 2 } },
    tapShrink: { whileTap: { scale: 0.98 } },
    
    focusBorder: { whileFocus: { borderColor: "#3b82f6", boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" } },
    
    pulseSlow: { animate: { opacity: [1, 0.7, 1], transition: { duration: 4.0, repeat: Infinity } } },
    pulseFast: { animate: { opacity: [1, 0.5, 1], transition: { duration: 1.0, repeat: Infinity } } },
    
    textReveal: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.0 } },
    textFade: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } },
    
    iconSpin: { whileHover: { rotate: 360 }, transition: { duration: 1.0 } },
    iconBounce: { whileHover: { scale: 1.2 }, transition: { type: "spring" as AnimationGeneratorType, stiffness: 400, damping: 10 } },
    
    bgGradientShift: {
      animate: {
        background: [
          "linear-gradient(45deg, #1e40af, #3b82f6)",
          "linear-gradient(45deg, #3b82f6, #60a5fa)",
          "linear-gradient(45deg, #60a5fa, #1e40af)"
        ],
        backgroundSize: "200% 200%",
        transition: { duration: 6.0, repeat: Infinity }
      }
    },
    
    borderPulse: {
      animate: {
        borderColor: ["#3b82f6", "#60a5fa", "#3b82f6"],
        transition: { duration: 4.0, repeat: Infinity }
      }
    },
    
    shadowFloat: {
      animate: {
        boxShadow: [
          "0 4px 6px rgba(0, 0, 0, 0.1)",
          "0 10px 15px rgba(0, 0, 0, 0.2)",
          "0 4px 6px rgba(0, 0, 0, 0.1)"
        ],
        transition: { duration: 4.0, repeat: Infinity }
      }
    },
    
    colorShift: {
      animate: {
        color: ["#3b82f6", "#60a5fa", "#3b82f6"],
        transition: { duration: 6.0, repeat: Infinity }
      }
    },
    
    scaleBreathe: {
      animate: {
        scale: [1, 1.02, 1],
        transition: { duration: 4.0, repeat: Infinity }
      }
    },
    
    rotateSlow: {
      animate: {
        rotate: 360,
        transition: { duration: 90, repeat: Infinity, ease: "linear" as Easing }
      }
    },
    
    opacityFlicker: {
      animate: {
        opacity: [1, 0.8, 1, 0.9, 1],
        transition: { duration: 2.0, repeat: Infinity }
      }
    },
    
    positionDrift: {
      animate: {
        x: [0, 2, 0, -2, 0],
        y: [0, 1, 0, -1, 0],
        transition: { duration: 8.0, repeat: Infinity }
      }
    },
    shake: {
      animate: {
        x: [0, -8, 8, -8, 8, -4, 4, 0],
        transition: { duration: 1.0, ease: "easeInOut" as Easing }
      }
    },
    
    complexHover: {
      whileHover: {
        scale: 1.1,
        rotate: 5,
        y: -5,
        transition: { duration: 0.6 }
      }
    },
    
    staggerChildren: {
      variants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }
    },
    
    pageSlide: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
      transition: { duration: 1.0 }
    },
    
    modalScale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: { duration: 1.2 }
    },
    
    notificationSlide: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
      transition: { duration: 0.6 }
    },
    
    progressFill: {
      initial: { width: 0 },
      animate: { width: "100%" },
      transition: { duration: 4.0, ease: "easeOut" as Easing }
    },
    
    morphCircle: {
      animate: {
        borderRadius: ["50%", "20%", "50%"],
        transition: { duration: 4.0, repeat: Infinity }
      }
    },
    
    depthParallax: {
      whileHover: {
        scale: 1.1,
        z: 20,
        transition: { duration: 0.6 }
      }
    },
    float: {
      animate: {
        y: [0, -10, 0],
        transition: { duration: 6.0, repeat: Infinity, ease: "easeInOut" as Easing }
      }
    },
    dominoText: {
      parent: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
          },
        },
      },
      child: {
        hidden: { opacity: 0, y: 20, rotateX: 90 },
        visible: {
          opacity: 1,
          y: [20, 0],
          rotateX: 0,
          transition: {
            type: "tween" as AnimationGeneratorType,
            duration: 1.6,
            ease: "easeOut" as Easing,
          } as Transition,
        },
      },
    },
    
    // Реэкспорт из модульных файлов
    getSoundCardEffects,
    headerIconHoverRotate,
    headerLabelFade,
    headerButton3DTilt,
    sliderThumbGlow,
    playPauseAuraPulse,
    sliderTrackGradient,
    privacyButtonEntry,
    privacyButtonHover,
    textVisualizerButtonEntry,
    textVisualizerButtonTap,
    logoTiltHover,
    navTileTextShadow,
    navTileBgGradientShift,
    navActiveIndicatorVariants,
    navCentralButtonVariants, // Обновленный экспорт
    navItemInteractionVariants, // Новый экспорт
    navSettingsIconVariants,

    soundCardBorderPulseHover: {
      whileHover: {
        boxShadow: "0 0 20px 8px rgba(var(--magic-accent-blue-rgb), 0.8)",
        transition: { duration: 0.3 }
      }
    },
  };
};