
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Variants, Transition, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Sparkles, Music, TrendingUp, Lightbulb, Clock, Cpu, Zap, Cloud, Code, Rocket, Shield, Globe, Brain, Heart, LucideIcon, X, Volume2, History, Share2 } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useMicroAnimations, logoTiltHover, usePowerfulAnimations } from '@/hooks/use-animations';
import { cn } from '@/lib/utils';
import TourSlide from './TourSlide';
import OnboardingArrowIndicator from './OnboardingArrowIndicator';
import { NativeDialog } from '@/capacitor-plugins';

const MotionButton = motion(Button);

interface MagicOnboardingScreenProps {
  onComplete: () => void;
}

interface OnboardingStep {
  title: string;
  description: string;
  images?: string[];
  icon: LucideIcon;
  backgroundEffect: string;
  layoutType: 'image-top' | 'icon-top';
}

export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome!",
    description: "Discover a world of calm and productivity with our app. We will help you improve sleep, concentration, and relaxation.",
    images: [
      'https://picsum.photos/seed/welcome_app/400/200?random=1',
    ],
    icon: Sparkles,
    backgroundEffect: 'sparkle-burst',
    layoutType: 'image-top',
  },
  {
    title: "Sound Selection",
    description: "On the main screen, choose one of many relaxing sounds. Just tap the card to start playback.",
    images: [
      'https://picsum.photos/seed/sound_selection/400/200?random=2',
    ],
    icon: Music,
    backgroundEffect: 'particle-flow',
    layoutType: 'icon-top',
  },
  {
    title: "Player Controls",
    description: "In the player, you can manage playback, adjust volume, and turn on background radio to create the perfect atmosphere.",
    images: [
      'https://picsum.photos/seed/relaxing_music_visual/400/200?random=1',
    ],
    icon: Volume2,
    backgroundEffect: 'glow-pulse',
    layoutType: 'image-top',
  },
  {
    title: "Sleep Timer",
    description: "Set a sleep timer so the sounds automatically turn off when you fall asleep. Save battery and enjoy a smooth transition to sleep.",
    images: [
      'https://picsum.photos/seed/sleep_timer/400/200?random=4',
    ],
    icon: Clock,
    backgroundEffect: 'wave-visualizer',
    layoutType: 'icon-top',
  },
  {
    title: "Extra Features",
    description: "Explore listening history, customize the app, and share it with friends. Your journey to calmness begins!",
    images: [
      'https://picsum.photos/seed/extra_features/400/200?random=5',
    ],
    icon: Lightbulb,
    backgroundEffect: 'code-rain',
    layoutType: 'image-top',
  },
];

// --- PREMIUM VORTEX GRID: GOLDEN RATIO SYMMETRY & QUANTUM ANCHORS ---
// Dynamic Fibonacci-based layout ratios for perfect visual harmony
const GOLDEN_RATIO = 1.61803398875;
const VORTEX_ANCHORS = {
  center: { x: '50%', y: '50%' },
  top: { x: '50%', y: '10%' },
  bottom: { x: '50%', y: '90%' },
  left: { x: '10%', y: '50%' },
  right: { x: '90%', y: '50%' },
};

// Quantum-inspired animation variants with spiral symmetry
const vortexSlideVariants: Variants[] = [
  {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      y: 0,
      opacity: 0,
      scale: 0.8,
      rotate: direction * 15,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 30,
        duration: 1.2,
        ease: 'easeOut',
      } as Transition,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      y: 0,
      opacity: 0,
      scale: 0.8,
      rotate: direction * -15,
      filter: 'blur(10px)',
      transition: { duration: 0.8, ease: 'easeIn' } as Transition,
    }),
  },
  {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      y: 0,
      opacity: 0,
      scale: 0.8,
      rotateY: direction * 90,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 30,
        duration: 1.2,
        ease: 'easeOut',
      } as Transition,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      y: 0,
      opacity: 0,
      scale: 0.8,
      rotateY: direction * -90,
      filter: 'blur(10px)',
      transition: { duration: 0.8, ease: 'easeIn' } as Transition,
    }),
  },
  {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      x: 0,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)',
    }),
    center: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 30,
        duration: 1.2,
        ease: 'easeOut',
      } as Transition,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      x: 0,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)',
      transition: { duration: 0.8, ease: 'easeIn' } as Transition,
    }),
  },
];

const vortexExitVariants: Variants = {
  initial: { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0, filter: 'blur(0px)' },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 0.3,
    rotate: 720,
    x: 0,
    y: 0,
    filter: 'blur(20px) brightness(0.5) hue-rotate(180deg)',
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      when: 'beforeChildren',
    },
  },
};

const vortexButtonVariants: Variants = {
  initial: {
    boxShadow: '0 0 0px rgba(var(--magic-accent-green-rgb), 0)',
    scale: 1,
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 0 20px 8px rgba(var(--magic-green-fire-rgb), 0.8)',
    filter: 'brightness(1.2)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  tap: {
    scale: 0.95,
    boxShadow: '0 0 8px 3px rgba(var(--magic-green-fire-rgb), 0.5)',
    filter: 'brightness(0.9)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
  vortexPulse: {
    boxShadow: [
      '0 0 0px 0px rgba(var(--magic-green-fire-rgb), 0.1)',
      '0 0 25px 10px rgba(var(--magic-green-fire-rgb), 0.9)',
      '0 0 0px 0px rgba(var(--magic-green-fire-rgb), 0.1)',
    ],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const vortexNavVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
};

const MagicOnboardingScreen: React.FC<MagicOnboardingScreenProps> = ({ onComplete }) => {
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations();
  const { backgroundShimmerGlow } = usePowerfulAnimations();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [scrolledToBottomMap, setScrolledToBottomMap] = useState<Record<number, boolean>>({});
  const [isExiting, setIsExiting] = useState(false);

  // Motion value for horizontal drag (quantum anchor for swipe)
  const x = useMotionValue(0);
  
  // Background transformation based on drag position (subtle vortex effect)
  const xInput = [-500, 0, 500];
  const background = useTransform(x, xInput, [
    `radial-gradient(circle at ${VORTEX_ANCHORS.left.x} ${VORTEX_ANCHORS.left.y}, rgba(var(--magic-gray-dark-rgb), 0.9) 0%, rgba(var(--magic-gray-dark-rgb), 1) 100%)`,
    `radial-gradient(circle at ${VORTEX_ANCHORS.center.x} ${VORTEX_ANCHORS.center.y}, rgba(var(--magic-gray-dark-rgb), 0.8) 0%, rgba(var(--magic-gray-dark-rgb), 1) 100%)`,
    `radial-gradient(circle at ${VORTEX_ANCHORS.right.x} ${VORTEX_ANCHORS.right.y}, rgba(var(--magic-gray-dark-rgb), 0.9) 0%, rgba(var(--magic-gray-dark-rgb), 1) 100%)`,
  ]);

  const handleScrolledToBottom = useCallback((slideIndex: number, scrolled: boolean) => {
    setScrolledToBottomMap(prev => ({ ...prev, [slideIndex]: scrolled }));
  }, []);

  const isCurrentSlideScrolledToBottom = scrolledToBottomMap[currentStepIndex] || false;
  const isLastSlide = currentStepIndex === onboardingSteps.length - 1;

  const handleNext = useCallback(() => {
    triggerHapticFeedback();
    if (currentStepIndex < onboardingSteps.length - 1) {
      setDirection(1);
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsExiting(true);
    }
  }, [currentStepIndex, onboardingSteps.length, triggerHapticFeedback]);

  const handlePrevious = useCallback(() => {
    triggerHapticFeedback();
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex, triggerHapticFeedback]);

  const handleSkip = useCallback(async () => {
    triggerHapticFeedback();
    const { value } = await NativeDialog.confirm({
      title: "Skip Tutorial?",
      message: "Are you sure you want to skip the tutorial slides? You can always find the information in the settings.",
      okButtonTitle: "Yes, Skip",
      cancelButtonTitle: "Cancel",
    });

    if (value) {
      setIsExiting(true);
    }
  }, [triggerHapticFeedback]);

  const handleDragEnd = useCallback((event: any, info: any) => {
    const offset = info.offset.x;
    const swipeThreshold = 100;

    if (offset < -swipeThreshold) {
      if (currentStepIndex < onboardingSteps.length - 1) {
        handleNext();
      } else if (isLastSlide && isCurrentSlideScrolledToBottom) {
        setIsExiting(true);
      }
    } else if (offset > swipeThreshold) {
      if (currentStepIndex > 0) {
        handlePrevious();
      }
    }
  }, [currentStepIndex, onboardingSteps.length, handleNext, handlePrevious, isLastSlide, isCurrentSlideScrolledToBottom]);

  // --- PREMIUM VORTEX GRID: ADAPTIVE AI LAYERS FOR ALL DEVICES ---
  // Calculate golden ratio based dimensions for perfect centering
  const vortexDimensions = useMemo(() => {
    // Remove fixed dimensions, use flexbox for responsive sizing
    return {
      width: 'min(92vw, 620px)',
      maxWidth: '620px',
      // Remove fixed height, let content determine height
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 overflow-hidden"
      variants={vortexExitVariants}
      initial="initial"
      animate={isExiting ? "exit" : "animate"}
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete();
        }
      }}
      style={{ background }}
    >
      {/* --- QUANTUM ANCHOR: DYNAMIC BACKGROUND VORTEX --- */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--magic-gray-dark-rgb),0.8)] to-[rgba(var(--magic-gray-dark-rgb),1)]"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {/* --- PREMIUM VORTEX: GLOBAL SHIMMER GLOW --- */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />

      {/* --- MAIN VORTEX MODAL: GOLDEN RATIO SYMMETRY --- */}
      <motion.div
        className="relative bg-card/80 backdrop-blur-md border border-magic-cyan-accent/50 rounded-3xl p-3 sm:p-5 shadow-2xl text-center flex flex-col justify-between z-[1002] overflow-visible"
        style={vortexDimensions}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.4 }}
      >
        {/* --- PREMIUM VORTEX: CONTENT SHIMMER GLOW --- */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
        />

        {/* --- QUANTUM ANCHOR: PROGRESS BAR --- */}
        <motion.div
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-magic-cyan-accent to-magic-accent-green rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStepIndex + 1) / onboardingSteps.length * 100}%` }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />

        {/* --- QUANTUM ANCHOR: SKIP BUTTON --- */}
        <motion.div
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <MotionButton
            variant="ghost"
            onClick={handleSkip}
            className="bg-magic-gray-dark/70 hover:bg-magic-gray-light/70 text-magic-cyan-accent border border-magic-cyan-accent/40 shadow-md text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full transition-all duration-200 flex items-center"
            {...hoverScale}
            {...tapScale}
          >
            <X size={14} className="mr-1" /> Skip
          </MotionButton>
        </motion.div>

        {/* --- PREMIUM VORTEX: ADAPTIVE AI LAYER FOR CONTENT --- */}
        <div className="flex flex-col h-full relative z-10 overflow-visible rounded-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStepIndex}
              className="absolute inset-0 flex flex-col h-full relative z-10"
              custom={direction}
              variants={vortexSlideVariants[currentStepIndex % vortexSlideVariants.length]}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              onDragEnd={handleDragEnd}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              style={{ x }}
            >
              {/* --- QUANTUM ANCHOR: NAVIGATION ARROWS --- */}
              <OnboardingArrowIndicator
                direction="left"
                onClick={handlePrevious}
                isVisible={currentStepIndex > 0}
              />

              {/* --- PREMIUM VORTEX: TOUR SLIDE COMPONENT --- */}
              <TourSlide
                title={onboardingSteps[currentStepIndex].title}
                description={onboardingSteps[currentStepIndex].description}
                images={onboardingSteps[currentStepIndex].images}
                icon={onboardingSteps[currentStepIndex].icon}
                index={currentStepIndex}
                layoutType={onboardingSteps[currentStepIndex].layoutType}
                onScrolledToBottom={handleScrolledToBottom}
              />

              <OnboardingArrowIndicator
                direction="right"
                onClick={handleNext}
                isVisible={isCurrentSlideScrolledToBottom && !isLastSlide}
              />

              {/* --- PREMIUM VORTEX: NAVIGATION CONTROLS --- */}
              <motion.div
                className="flex flex-col items-center mt-3 sm:mt-4"
                variants={vortexNavVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* --- QUANTUM ANCHOR: DOTS INDICATOR --- */}
                <div className="flex space-x-1 sm:space-x-1.5 mb-2 sm:mb-3">
                  {onboardingSteps.map((_, index) => (
                    <motion.button
                      key={index}
                      className={cn(
                        "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-300",
                        index === currentStepIndex ? "bg-magic-cyan-accent scale-125" : "bg-gray-600 hover:bg-gray-400"
                      )}
                      onClick={() => {
                        setDirection(index > currentStepIndex ? 1 : -1);
                        setCurrentStepIndex(index);
                        triggerHapticFeedback();
                      }}
                      {...hoverScale}
                      {...tapScale}
                      animate={{
                        boxShadow: index === currentStepIndex
                          ? ["0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)", "0 0 6px rgba(var(--magic-cyan-accent-rgb), 0.8)", "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)"]
                          : "none"
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>

                {/* --- PREMIUM VORTEX: ACTION BUTTONS LAYOUT --- */}
                <div className={cn(
                  "flex items-center w-full px-1 sm:px-2",
                  isLastSlide && isCurrentSlideScrolledToBottom ? "justify-center" : "justify-between"
                )}>
                  {/* --- QUANTUM ANCHOR: BACK BUTTON --- */}
                  <div className="w-24 h-10 sm:w-32 sm:h-14 flex items-center justify-start">
                    {currentStepIndex > 0 && !(isLastSlide && isCurrentSlideScrolledToBottom) && (
                      <MotionButton
                        variant="ghost"
                        onClick={handlePrevious}
                        className="w-full h-full bg-magic-gray-dark/70 hover:bg-magic-gray-light/70 text-gray-300 hover:text-magic-cyan-accent font-bold py-1 px-2 sm:py-2 sm:px-3 rounded-full shadow-xl border border-gray-600/40 text-xs sm:text-lg flex items-center justify-center"
                        {...hoverScale}
                        {...tapScale}
                        variants={vortexButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        animate="vortexPulse"
                      >
                        <ChevronLeft size={16} className="mr-0.5 sm:mr-1" /> Back
                      </MotionButton>
                    )}
                  </div>

                  {/* --- QUANTUM ANCHOR: STEP COUNTER --- */}
                  <motion.div
                    className="flex items-baseline gap-0.5 sm:gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.span
                      key={`current-step-${currentStepIndex}`}
                      className="text-magic-cyan-accent font-extrabold text-base sm:text-xl drop-shadow-lg"
                      initial={{ y: -10, opacity: 0, filter: "blur(5px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {currentStepIndex + 1}
                    </motion.span>
                    <span className="text-gray-500 text-[10px] sm:text-xs"> / {onboardingSteps.length}</span>
                  </motion.div>

                  {/* --- QUANTUM ANCHOR: NEXT/START BUTTON --- */}
                  <div className="w-24 h-10 sm:w-32 sm:h-14 flex items-center justify-end">
                    {isLastSlide && isCurrentSlideScrolledToBottom ? (
                      <MotionButton
                        onClick={() => setIsExiting(true)}
                        className="w-full h-full bg-magic-cyan-accent hover:bg-magic-cyan-accent/80 text-white font-bold py-1 px-2 sm:py-2 sm:px-3 rounded-full shadow-lg text-xs sm:text-lg flex items-center justify-center"
                        {...hoverScale}
                        {...tapScale}
                        variants={vortexButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        animate="vortexPulse"
                      >
                        <Sparkles size={16} className="mr-0.5 sm:mr-1 animate-pulse" /> Start <Sparkles size={16} className="ml-0.5 sm:ml-1 animate-pulse" />
                      </MotionButton>
                    ) : (
                      <MotionButton
                        onClick={handleNext}
                        className="w-full h-full bg-magic-cyan-accent/20 hover:bg-magic-cyan-accent/30 text-magic-cyan-accent font-bold py-1 px-2 sm:py-2 sm:px-3 rounded-full shadow-xl border border-magic-cyan-accent/30 transition-all duration-200 text-xs sm:text-lg flex items-center justify-center"
                        {...hoverScale}
                        {...tapScale}
                        variants={vortexButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        animate="vortexPulse"
                        // REMOVED: disabled={!isCurrentSlideScrolledToBottom}
                      >
                        Next <ChevronRight size={16} className="ml-0.5 sm:ml-1" />
                      </MotionButton>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- QUANTUM ANCHOR: SWIPE HINT --- */}
        {currentStepIndex === 0 && (
          <motion.div
            className="absolute bottom-32 sm:bottom-36 right-4 text-magic-cyan-accent flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0.8, 1, 0], x: [0, -5, 5, -5, 5, 0, 0] }}
            transition={{
              opacity: { duration: 4, repeat: Infinity, delay: 1 },
              x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <ChevronLeft size={14} /> Swipe <ChevronRight size={14} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MagicOnboardingScreen;