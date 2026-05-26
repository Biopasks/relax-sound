
import React from 'react';
import { motion, AnimatePresence, Variants, Easing, TargetAndTransition } from 'framer-motion';
import { Cloud, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSound } from '@/context/SoundContext';
import { useMicroAnimations } from '@/hooks/use-animations';
import AnimatedText from './AnimatedText';
import { playUiSound } from '@/utils/audio-effects';
import { useNavigate } from 'react-router-dom';

interface NoiseStatusIndicatorProps {
  className?: string;
}

const indicatorVariants: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.5,
      delay: 0.2,
    },
  },
  exit: { opacity: 0, x: -50, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } },
};

const iconPulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as Easing,
    },
  },
};

const textScrollAnimation: TargetAndTransition = {
  x: ['0%', '-100%'],
  transition: {
    x: {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const NoiseStatusIndicator: React.FC<NoiseStatusIndicatorProps> = ({ className }) => {
  const { currentNoise, isNoisePlaying, playPauseNoise } = useSound();
  const { hoverScale, tapScale } = useMicroAnimations();
  const navigate = useNavigate();

  const handleIndicatorClick = () => {
    if (currentNoise) {
      playUiSound('light-tap.mp3');
      // If we are on the home page, toggle playback
      if (window.location.pathname === '/') {
        playPauseNoise(currentNoise);
      } else {
        // If we are on the player page, just navigate to it
        navigate('/player'); 
      }
    } else {
      playUiSound('light-tap.mp3');
      navigate('/');
    }
  };

  if (!currentNoise && !isNoisePlaying) {
    return null;
  }

  const IconComponent = currentNoise?.icon || Cloud; // Use current sound icon or Cloud by default

  return (
    <AnimatePresence>
      {(currentNoise || isNoisePlaying) && (
        <motion.div
          className={cn(
            "flex items-center gap-2 p-2 rounded-full bg-magic-accent-blue/20 backdrop-blur-sm border border-magic-accent-blue/40 shadow-lg cursor-pointer",
            "text-magic-accent-blue hover:bg-magic-accent-blue/30 transition-colors duration-200",
            className
          )}
          variants={indicatorVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleIndicatorClick}
          {...hoverScale}
          {...tapScale}
        >
          <motion.div variants={iconPulseVariants} animate="animate">
            <IconComponent size={20} className={cn("flex-shrink-0", currentNoise?.iconColorClass || "text-white")} />
          </motion.div>
          <div className="flex-1 min-w-0 overflow-hidden relative h-6 flex items-center">
            <AnimatePresence mode="wait">
              {isNoisePlaying && currentNoise ? (
                <motion.div
                  key="playing-status"
                  className="absolute whitespace-nowrap text-sm font-semibold text-white"
                  initial={{ x: '0%' }}
                  animate={currentNoise.name.length > 15 ? { x: textScrollAnimation.x } : { x: '0%' }}
                  transition={currentNoise.name.length > 15 ? textScrollAnimation.transition : {}}
                >
                  <AnimatedText
                    text={currentNoise.name}
                    className="inline-block"
                    staggerDelay={0.02}
                    wordVariants={useMicroAnimations().dominoText.child}
                  />
                </motion.div>
              ) : (
                <motion.span
                  key="paused-status"
                  className="text-sm font-semibold text-gray-300 whitespace-nowrap"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  Paused
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isNoisePlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoiseStatusIndicator;