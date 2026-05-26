
import React from 'react';
import { motion, Variants, Easing, Transition } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useMicroAnimations, headerButton3DTilt } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';

interface HeaderMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  delay?: number;
  className?: string;
  pulseColorRgb: string;
}

const MotionButton = motion(Button); // Create Motion version of Button component

const HeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({ isOpen, onClick, delay = 0, className, pulseColorRgb }) => {
  const { hoverScale, tapScale } = useMicroAnimations();
  const { triggerHapticFeedback } = useSettings();

  const iconVariants: Variants = {
    closed: { rotate: 0, scale: 1 },
    open: { rotate: 135, scale: 1.1, transition: { duration: 0.3, ease: "easeOut" as Easing } },
  };

  const pulseVariants: Variants = {
    initial: {
      scale: [1, 1.05, 1],
      opacity: [0.4, 0.8, 0.4],
      boxShadow: [
        `0 0 0px rgba(${pulseColorRgb}, 0)`,
        `0 0 15px 5px rgba(${pulseColorRgb}, 0.6)`,
        `0 0 0px rgba(${pulseColorRgb}, 0)`
      ],
    },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.4, 0.8, 0.4],
      boxShadow: [
        `0 0 0px rgba(${pulseColorRgb}, 0)`,
        `0 0 15px 5px rgba(${pulseColorRgb}, 0.6)`,
        `0 0 0px rgba(${pulseColorRgb}, 0)`
      ],
      transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" } as Transition
    },
    open: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6],
      boxShadow: [
        `0 0 0px rgba(${pulseColorRgb}, 0)`,
        `0 0 20px 8px rgba(${pulseColorRgb}, 0.8)`,
        `0 0 0px rgba(${pulseColorRgb}, 0)`
      ],
      transition: { duration: 2.0, repeat: Infinity, ease: "easeInOut" as Easing } as Transition
    }
  };

  const internalClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    triggerHapticFeedback();
    onClick();
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center flex-shrink-0",
        className
      )}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay } }}
      // whileHover and whileTap are now applied to MotionButton below
    >
      <MotionButton // Use MotionButton
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16", // Adaptive button size
          "rounded-full backdrop-blur-sm relative z-10",
          "border border-transparent",
          "transition-all duration-200 ease-in-out flex flex-col items-center justify-center",
          "overflow-hidden",
          "bg-magic-gray-dark/70 text-magic-cyan-accent hover:bg-magic-gray-light/70 hover:text-white",
          isOpen && "bg-magic-cyan-accent/90 text-white hover:bg-magic-cyan-accent" // Bright style when open
        )}
        onClick={internalClickHandler}
        whileHover={{ ...hoverScale.whileHover, ...headerButton3DTilt.whileHover }} // Apply hover animations here
        whileTap={{ scale: 0.9, y: 2 }} // More pronounced tap animation: shrink and shift down
      >
        {/* Pulsating border effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          animate={isOpen ? "open" : "animate"}
          variants={pulseVariants}
          style={{ borderColor: `rgba(${pulseColorRgb}, 0.5)` }}
        />

        {/* Icon with transforming animation */}
        <motion.div
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          className="relative z-20"
        >
          {/* NEW: Inner motion.div for icon specific styling */}
          <motion.div
            className="relative flex items-center justify-center w-full h-full rounded-full"
            whileHover={{
              scale: 1.1, // Slightly enlarge icon on hover
              filter: "brightness(1.5) saturate(1.5)", // Make icon brighter and more saturated
              transition: { duration: 0.2 }
            }}
            style={{
              background: `radial-gradient(circle at center, rgba(${pulseColorRgb}, 0.1) 0%, transparent 70%)`,
            }}
            animate={{
              background: [
                `radial-gradient(circle at center, rgba(${pulseColorRgb}, 0.1) 0%, transparent 70%)`,
                `radial-gradient(circle at center, rgba(${pulseColorRgb}, 0.2) 0%, transparent 70%)`,
                `radial-gradient(circle at center, rgba(${pulseColorRgb}, 0.1) 0%, transparent 70%)`
              ],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as Easing }
            }}
          >
            {isOpen ? <X size={20} className="text-white" /> : <Plus size={20} />} {/* Reduced icon size */}
          </motion.div>
        </motion.div>

        {/* Subtle shine/scanline effect */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.15) 60%, transparent 100%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPositionX: ["-100%", "100%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear" as Easing,
            delay: delay + 0.1
          }}
        />
      </MotionButton>
      <span
        className={cn("text-[0.6rem] sm:text-xs mt-1 font-semibold text-gray-300 whitespace-nowrap", isOpen ? "text-white" : "text-magic-cyan-accent")} // Bright text when open
      >
        {isOpen ? "Close" : "More"}
      </span>
    </motion.div>
  );
};

export default HeaderMenuButton;