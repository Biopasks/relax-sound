
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/context/SettingsContext';
import { useMicroAnimations } from '@/hooks/use-animations';

interface OnboardingArrowIndicatorProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isVisible: boolean;
  className?: string;
}

const arrowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: [0.9, 1.1, 0.9],
    boxShadow: [
      "0 0 0px 0px rgba(var(--magic-green-fire-rgb), 0)",
      "0 0 15px 5px rgba(var(--magic-green-fire-rgb), 0.6)",
      "0 0 0px 0px rgba(var(--magic-green-fire-rgb), 0)"
    ],
    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
    transition: {
      opacity: { duration: 0.6, ease: "easeOut" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      filter: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 20px 8px rgba(var(--magic-green-fire-rgb), 0.8)",
    filter: "brightness(1.8)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 0 5px 2px rgba(var(--magic-green-fire-rgb), 0.4)",
    filter: "brightness(1.2)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const OnboardingArrowIndicator: React.FC<OnboardingArrowIndicatorProps> = ({
  direction,
  onClick,
  isVisible,
  className,
}) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations();

  return (
    <motion.button
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-[1003] flex items-center justify-center",
        "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full",
        "bg-magic-cyan-accent/20 backdrop-blur-sm border border-magic-cyan-accent/40",
        "text-magic-cyan-accent hover:text-white transition-all duration-200",
        direction === 'left' ? 'left-1 sm:left-2 md:left-3' : 'right-1 sm:right-2 md:right-3',
        className
      )}
      onClick={() => {
        onClick();
        triggerHapticFeedback();
      }}
      variants={arrowVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      {...hoverScale}
      {...tapScale}
    >
      <Icon size={20} className="sm:size-24 md:size-28" />
    </motion.button>
  );
};

export default OnboardingArrowIndicator;