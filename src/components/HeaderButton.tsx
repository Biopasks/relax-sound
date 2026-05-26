
import React from 'react';
import { motion, MotionProps, Easing, Variants } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { useMicroAnimations, headerIconHoverRotate, headerButton3DTilt } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';

// Define the HeaderButton's specific props
interface HeaderButtonSpecificProps {
  icon: LucideIcon;
  label: string;
  onHeaderButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconColorClass: string;
  pulseColorRgb: string;
  delay: number;
  iconMotionProps: MotionProps;
  className?: string;
  isTrigger?: boolean;
}

type HeaderButtonProps = HeaderButtonSpecificProps & React.ComponentPropsWithoutRef<typeof motion.button>;

const HeaderButton = React.forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({
    icon: Icon,
    label,
    onHeaderButtonClick,
    iconColorClass,
    pulseColorRgb,
    delay,
    iconMotionProps,
    className,
    isTrigger = false,
    ...restProps
  }, ref) => {
    const { hoverScale, tapScale } = useMicroAnimations();
    const { triggerHapticFeedback } = useSettings();

    const internalClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      triggerHapticFeedback();
      onHeaderButtonClick?.(event);
    };

    const commonButtonClasses = cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "w-14 h-14 sm:w-15 sm:h-15 md:w-16 md:h-16",
      "rounded-full backdrop-blur-sm relative z-10",
      "border border-white/[0.06]",
      "transition-all duration-300 ease-in-out flex items-center justify-center",
      "overflow-hidden bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.12]",
      className
    );

    const wrapperMotionProps: Variants = {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay } },
      whileHover: { ...hoverScale.whileHover, ...headerButton3DTilt.whileHover },
      whileTap: { ...tapScale.whileTap },
    };

    const buttonContent = (
      <motion.div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(90deg, rgba(var(--magic-gray-dark-rgb), 0.8) 0%, rgba(var(--magic-gray-light-rgb), 0.5) 50%, rgba(var(--magic-gray-dark-rgb), 0.8) 100%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPositionX: ["0%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear" as Easing,
            delay: delay + 0.1
          }}
        />

        {/* Pulsating border effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{ borderColor: `rgba(${pulseColorRgb}, 0.5)` }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.8, 0.4],
            borderColor: [`rgba(${pulseColorRgb}, 0.4)`, `rgba(${pulseColorRgb}, 0.8)`, `rgba(${pulseColorRgb}, 0.4)`]
          }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon with its own animations */}
        <motion.div animate={iconMotionProps.animate} transition={iconMotionProps.transition} variants={headerIconHoverRotate} whileHover="whileHover" className="relative z-20">
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
            <Icon size={20} className={cn("text-white", iconColorClass)} /> {/* Reduced icon size */}
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
      </motion.div>
    );

    if (isTrigger) {
      return (
        <motion.button
          type="button"
          className={commonButtonClasses}
          onClick={internalClickHandler}
          ref={ref}
          {...restProps}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <motion.div
        className={cn("flex flex-col items-center justify-center flex-shrink-0", className)}
        variants={wrapperMotionProps}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <motion.button
          type="button"
          className={commonButtonClasses}
          onClick={internalClickHandler}
          ref={ref}
          {...restProps}
        >
          {buttonContent}
        </motion.button>
        <span className="text-[0.65rem] sm:text-xs mt-1 font-semibold text-white/80 whitespace-nowrap text-center leading-tight">
          {label}
        </span>
      </motion.div>
    );
  }
);

HeaderButton.displayName = 'HeaderButton';

export default HeaderButton;