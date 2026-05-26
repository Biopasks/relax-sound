
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Hourglass, Info } from 'lucide-react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useMicroAnimations, headerButton3DTilt, usePowerfulAnimations } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';
import AnimatedText from '@/components/AnimatedText';
import FactDisplay from '@/components/FactDisplay';
import PulsatingButtonWrapper from '../PulsatingButtonWrapper';
import { useSound } from '@/context/SoundContext';
import { formatSecondsToHMS } from '@/utils/time-formatter';
import { playUiSound } from '@/utils/audio-effects';
import HeaderButton from '../HeaderButton';
import MagicBackButton from '../MagicBackButton'; // Используем MagicBackButton

const MotionButton = motion(Button);

interface PlayerHeaderProps {
  onPanelToggle: (panelName: 'timer' | 'soundDetails' | null) => void;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ onPanelToggle }) => {
  const navigate = useNavigate();
  const { currentNoise, isNoisePlaying, remainingTime } = useSound();
  const {
    triggerHapticFeedback,
  }
  = useSettings();
  const { backgroundShimmerGlow, callToActionPulse } = usePowerfulAnimations();

  const [isTimerButtonTransparent, setIsTimerButtonTransparent] = useState(false);

  const timerIconMotionProps: MotionProps = {
    animate: { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };
  const infoIconMotionProps: MotionProps = { animate: { y: [0, -5, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };


  useEffect(() => {
    const hiddenUntil = localStorage.getItem('playerTimerButtonHiddenUntil');
    if (hiddenUntil) {
      const hiddenUntilTimestamp = parseInt(hiddenUntil, 10);
      const now = Date.now();
      if (now < hiddenUntilTimestamp) {
        setIsTimerButtonTransparent(true);
        const remainingTime = hiddenUntilTimestamp - now;
        const timeoutId = setTimeout(() => {
          setIsTimerButtonTransparent(false);
          localStorage.removeItem('playerTimerButtonHiddenUntil');
        }, remainingTime);
        return () => clearTimeout(timeoutId);
      } else {
        localStorage.removeItem('playerTimerButtonHiddenUntil');
        setIsTimerButtonTransparent(false);
      }
    }
  }, []);

  const handleTimerButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPanelToggle('timer');
    triggerHapticFeedback();
    setIsTimerButtonTransparent(true);
    const fiveMinutesLater = Date.now() + 5 * 60 * 1000;
    localStorage.setItem('playerTimerButtonHiddenUntil', fiveMinutesLater.toString());
    setTimeout(() => {
      setIsTimerButtonTransparent(false);
      localStorage.removeItem('playerTimerButtonHiddenUntil');
    }, fiveMinutesLater - Date.now());
  };

  return (
    <header className="w-full p-2 z-10 border-b border-white/[0.04] pb-3 relative flex-shrink-0 bg-gradient-to-b from-black/20 to-transparent">
      {/* Glass shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center mb-4">
        {/* Left Group: Back */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="flex items-center gap-1 sm:gap-2">
          <MagicBackButton />
        </motion.div>

        {/* Center Group: Title */}
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 sm:gap-1 mx-1 sm:mx-2 relative">
          <div className="flex items-center justify-center relative w-full">
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-md font-etude-noire text-center flex items-baseline"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm sm:text-base md:text-lg text-gray-300 mr-1 sm:mr-2 hidden sm:inline">Playing:</span>
              <AnimatedText
                text={currentNoise?.name || 'Loading...'}
                className="inline-block capitalize font-bold text-white"
                staggerDelay={0.05}
                wordVariants={useMicroAnimations().dominoText.child}
              />
            </motion.h1>
          </div>
        </div>

        {/* Right Group: Info and Timer */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="flex items-center gap-1 sm:gap-2 relative">
          {/* Info Button */}
          <HeaderButton
            icon={Info}
            label="Info"
            onHeaderButtonClick={() => onPanelToggle('soundDetails')}
            iconColorClass="text-blue-300"
            pulseColorRgb="71, 153, 235"
            delay={0.2}
            iconMotionProps={infoIconMotionProps}
          />
          {/* Timer Button */}
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
        </motion.div>
      </div>
      {currentNoise?.facts && currentNoise.facts.length > 0 && (
        <FactDisplay facts={currentNoise.facts} intervalMs={7000} className="mt-4 w-full max-w-2xl mx-auto" />
      )}
    </header>
  );
};

export default PlayerHeader;