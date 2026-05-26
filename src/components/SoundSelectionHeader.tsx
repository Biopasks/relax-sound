
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hourglass, Info, MessageSquare, History as HistoryIcon, Settings as SettingsIcon, ShieldCheck, Type, Heart, X } from 'lucide-react';
import { motion, Variants, MotionProps, AnimatePresence } from 'framer-motion';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations';
import AnimatedText from '@/components/AnimatedText';
import { useSettings } from '@/context/SettingsContext';
import AnimatedLogo from '@/components/AnimatedLogo';
import { cn } from '@/lib/utils';
import HeaderButton from '@/components/HeaderButton';
import HeaderMenuButton from '@/components/HeaderMenuButton';
import { toast } from '@/components/ui/use-toast';
import { formatSecondsToHMS } from '@/utils/time-formatter';
import { useSound } from '@/context/SoundContext';
import NoiseStatusIndicator from './NoiseStatusIndicator'; // Import NoiseStatusIndicator
import { Button } from '@/components/ui/button'; // Import Button for Close button

interface SoundSelectionHeaderProps {
  onPanelToggle: (panelName: 'timer' | 'about' | 'privacy' | 'feedback' | 'textVisualizer' | null) => void;
  remainingTime: number | null;
  isTimerButtonTransparent: boolean;
  setIsTimerButtonTransparent: React.Dispatch<React.SetStateAction<boolean>>;
  isTestModeEnabled: boolean;
  setIsTestModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoundSelectionHeader: React.FC<SoundSelectionHeaderProps> = ({
  onPanelToggle,
  remainingTime,
  isTimerButtonTransparent,
  setIsTimerButtonTransparent,
  isTestModeEnabled,
  setIsTestModeEnabled,
}) => {
  const navigate = useNavigate();
  const { triggerHapticFeedback } = useSettings();
  const { backgroundShimmerGlow, callToActionPulse } = usePowerfulAnimations();
  const { currentNoise, isNoisePlaying } = useSound(); // Added isNoisePlaying

  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const historyIconMotionProps: MotionProps = { animate: { rotate: [0, -10, 10, -10, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 0.5 } };
  const settingsIconMotionProps: MotionProps = { animate: { rotate: [0, 360] }, transition: { duration: 5, repeat: Infinity, ease: "linear" } };
  const timerIconMotionProps: MotionProps = { animate: { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
  const infoIconMotionProps: MotionProps = { animate: { y: [0, -5, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
  const messageIconMotionProps: MotionProps = { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
  const privacyIconMotionProps: MotionProps = { animate: { rotate: [0, 5, -5, 0] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 0.5 } };
  const favoritesIconMotionProps: MotionProps = { animate: { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 0.5 } };
  // Removed shareIconMotionProps

  const expandedMenuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const expandedMenuItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.7 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 10, stiffness: 80 } },
    exit: { opacity: 0, y: 20, scale: 0.7, transition: { duration: 0.15 } },
  };

  const handleTimerButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPanelToggle('timer');
    setIsTimerButtonTransparent(true);
    const fiveMinutesLater = Date.now() + 5 * 60 * 1000;
    localStorage.setItem('soundSelectionTimerButtonHiddenUntil', fiveMinutesLater.toString());
    setTimeout(() => {
      setIsTimerButtonTransparent(false);
      localStorage.removeItem('soundSelectionTimerButtonHiddenUntil');
    }, fiveMinutesLater - Date.now());
  };

  const handlePanelToggleWrapper = (panelName: 'timer' | 'about' | 'privacy' | 'feedback' | 'textVisualizer' | null) => {
    onPanelToggle(panelName);
    setShowMoreOptions(false); // Close menu when opening any panel
  };

  return (
    <header className="px-2 py-2 flex flex-col items-center bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm z-30 flex-shrink-0 relative overflow-hidden rounded-b-3xl border-b border-white/[0.04]">
      {/* Glass shine overlay */}
      <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <motion.div
        className="absolute inset-0 rounded-b-3xl pointer-events-none overflow-hidden"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />
      <motion.div
        className="absolute inset-0 rounded-b-3xl pointer-events-none overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(var(--magic-cyan-accent-rgb), 0.04) 0%, rgba(var(--magic-accent-blue-rgb), 0.04) 25%, transparent 50%, rgba(var(--magic-accent-green-rgb), 0.04) 75%, rgba(var(--magic-cyan-accent-rgb), 0.04) 100%)`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto relative z-20">
        {/* Noise Status Indicator (Absolute positioning on the left, if active) */}
        <AnimatePresence>
          {(currentNoise) && (
            <motion.div
              key="noise-indicator"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0" // Positioned relative to the header
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <NoiseStatusIndicator className="relative" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-1 relative"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", damping: 15, stiffness: 80 }}
        >
          {/* Logo Container (Center) */}
          <div className="flex items-center justify-center w-full relative">
            <motion.div
              className="relative p-1 sm:p-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex-shrink-0 mx-2 overflow-hidden shadow-premium"
              animate={{
                boxShadow: [
                  '0 0 8px rgba(var(--magic-cyan-accent-rgb), 0.08)',
                  '0 0 25px rgba(var(--magic-cyan-accent-rgb), 0.15)',
                  '0 0 8px rgba(var(--magic-cyan-accent-rgb), 0.08)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AnimatedLogo
                text="RelaxSound"
                className="text-center text-base sm:text-lg md:text-xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Navigation Buttons - Ensure they are centered */}
        <motion.div
          className="flex items-center justify-center w-full max-w-lg gap-x-1 sm:gap-x-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] shadow-premium backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <HeaderButton
            icon={HistoryIcon}
            label="History"
            onHeaderButtonClick={() => navigate('/history')}
            iconColorClass="text-magic-accent-green"
            pulseColorRgb="40, 200, 80"
            delay={0.1}
            iconMotionProps={historyIconMotionProps}
          />
          <HeaderButton
            icon={Heart}
            label="Favorites"
            onHeaderButtonClick={() => navigate('/favorites')}
            iconColorClass="text-red-400"
            pulseColorRgb="255, 0, 0"
            delay={0.2}
            iconMotionProps={favoritesIconMotionProps}
          />
          <HeaderButton
            icon={Hourglass}
            label={remainingTime !== null ? formatSecondsToHMS(remainingTime) : 'Timer'}
            onHeaderButtonClick={handleTimerButtonClick}
            iconColorClass="text-magic-accent-blue"
            pulseColorRgb="71, 153, 235"
            delay={0.3}
            iconMotionProps={timerIconMotionProps}
            className={cn(
              isTimerButtonTransparent && "opacity-40",
              "relative",
              remainingTime !== null && "border-2 border-magic-accent-blue/70 shadow-lg"
            )}
          >
            {/* NEW: Subtle glow for active timer */}
            {remainingTime !== null && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(var(--magic-accent-blue-rgb), 0.3)",
                    "0 0 15px rgba(var(--magic-accent-blue-rgb), 0.6)",
                    "0 0 5px rgba(var(--magic-accent-blue-rgb), 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </HeaderButton>
          <HeaderMenuButton
            isOpen={showMoreOptions}
            onClick={() => setShowMoreOptions(prev => !prev)}
            delay={0.4}
            pulseColorRgb="76, 230, 230"
          />
          <HeaderButton
            icon={SettingsIcon}
            label="Settings"
            onHeaderButtonClick={() => navigate('/settings')}
            iconColorClass="text-magic-cyan-accent"
            pulseColorRgb="76, 230, 230"
            delay={0.5}
            iconMotionProps={settingsIconMotionProps}
          />
        </motion.div>

        <AnimatePresence>
          {showMoreOptions && (
            <motion.div
              key="expanded-more-options-menu"
              className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2 rounded-xl bg-black/80 border border-white/[0.08] shadow-premium-lg mt-3 overflow-hidden backdrop-blur-2xl"
              variants={expandedMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={expandedMenuItemVariants}>
                <HeaderButton
                  icon={Info}
                  label="About App"
                  onHeaderButtonClick={() => handlePanelToggleWrapper('about')}
                  iconColorClass="text-blue-300"
                  pulseColorRgb="71, 153, 235"
                  delay={0.1}
                  iconMotionProps={infoIconMotionProps}
                />
              </motion.div>
              <motion.div variants={expandedMenuItemVariants}>
                <HeaderButton
                  icon={ShieldCheck}
                  label="Privacy"
                  onHeaderButtonClick={() => handlePanelToggleWrapper('privacy')}
                  iconColorClass="text-purple-300"
                  pulseColorRgb="178, 85, 247"
                  delay={0.2}
                  iconMotionProps={privacyIconMotionProps}
                />
              </motion.div>
              <motion.div variants={expandedMenuItemVariants}>
                <HeaderButton
                  icon={MessageSquare}
                  label="Feedback"
                  onHeaderButtonClick={() => handlePanelToggleWrapper('feedback')}
                  iconColorClass="text-orange-300"
                  pulseColorRgb="255, 165, 0"
                  delay={0.3}
                  iconMotionProps={messageIconMotionProps}
                />
              </motion.div>
              {/* Share button removed */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default SoundSelectionHeader;