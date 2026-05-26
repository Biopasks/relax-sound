
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, Variants, Transition, Easing, AnimatePresence } from 'framer-motion';
import { Sound } from '@/assets/audio';
import { cn } from '@/lib/utils';
import { useMicroAnimations, getSoundCardEffects } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { vinylDesignAuraColors } from '@/hooks/animations/utils';
import { Star, Lock } from 'lucide-react';
import { onFavoriteToggled, onAdRewardedUnlock } from '@/utils/analytics';
import { useAdMob } from '@/context/AdMobContext';
import { showSuccess, showError } from '@/utils/toast';
import { useSound } from '@/context/SoundContext';

interface SoundCardProps {
  sound: Sound;
  onSelect: (sound: Sound) => void;
  isSelected: boolean;
  isCasinoHighlighted: boolean;
}

const backgroundGlowVariants: Variants = {
  animate: {
    opacity: 1,
    transition: { duration: 0 }
  },
  selected: {
    opacity: 1,
    scale: 1.05,
    transition: { duration: 0.5, ease: "easeOut" as Easing } as Transition
  },
  highlighted: {
    opacity: 1,
    scale: [1, 1.02, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as Easing } as Transition
  }
};

const SoundCard: React.FC<SoundCardProps> = memo(({ sound, onSelect, isSelected, isCasinoHighlighted }) => {
  const Icon = sound.icon;
  const { hoverScale, tapScale, soundCardBorderPulseHover } = useMicroAnimations();
  const { triggerHapticFeedback, isTestModeEnabled, favoriteSounds, toggleFavoriteSound, unlockedPremiumSounds, unlockSound } = useSettings();
  const { showRewarded, isRewardedReady } = useAdMob();
  const { currentNoise, isNoiseLoading } = useSound();

  const [isHovered, setIsHovered] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const burstTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPremium = sound.isPremium;
  const isPermanentlyUnlocked = unlockedPremiumSounds.includes(sound.id);
  const isTemporarilyUnlocked = sound.isUnlocked;
  const isActuallyLocked = isPremium && !isTestModeEnabled && !isPermanentlyUnlocked && !isTemporarilyUnlocked;

  const isFavorite = favoriteSounds.includes(sound.id);

  const {
    cardAnimate,
    cardTransition,
    iconAnimate,
    iconTransition,
    idleParticles,
    selectionBurstParticles,
  } = getSoundCardEffects(sound.id);

  useEffect(() => {
    if (isSelected) {
      setShowBurst(true);
      if (burstTimeoutRef.current) {
        clearTimeout(burstTimeoutRef.current);
      }
      burstTimeoutRef.current = setTimeout(() => {
        setShowBurst(false);
      }, (selectionBurstParticles?.[0]?.transition?.duration || 0.8) * 1000 + (selectionBurstParticles?.[selectionBurstParticles.length - 1]?.transition?.delay || 0));
    } else {
      setShowBurst(false);
    }
    return () => {
      if (burstTimeoutRef.current) {
        clearTimeout(burstTimeoutRef.current);
      }
    };
  }, [isSelected, selectionBurstParticles]);

  const cardVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 1.0,
        delay: Math.random() * 0.3,
        ...cardTransition
      },
      ...cardAnimate
    },
    hover: { scale: 1.05, transition: { duration: 0.2 }, ...soundCardBorderPulseHover.whileHover },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const iconBaseVariants: Variants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, -5, 5, -5, 5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 7.0,
        ease: "easeInOut" as Easing,
        repeat: Infinity,
        delay: Math.random() * 0.5,
        ...iconTransition
      },
      ...iconAnimate
    },
    selected: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        rotate: { duration: 3.0, ease: "linear" as Easing, repeat: Infinity } as Transition,
        scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as Easing, repeatType: "reverse" } as Transition
      }
    }
  };

  const patternColorRgb = vinylDesignAuraColors[sound.vinylDesignId] || 'var(--radio-aura-classic-black-rgb)';

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteSound(sound.id);
    onFavoriteToggled(sound.name, !isFavorite);
    triggerHapticFeedback();
  };

  const handleUnlockSound = async (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHapticFeedback();

    if (!isRewardedReady) {
      showError("Ad not ready yet. Please try again in a few seconds.");
      return;
    }

    showSuccess("Loading ad...");
    const result = await showRewarded();

    if (result.rewarded) {
      unlockSound(sound.id);
      onAdRewardedUnlock(sound.name);
      showSuccess(`Sound "${sound.name}" unlocked!`);
    } else {
      showError("Ad was not watched completely. Sound not unlocked.");
    }
  };

  // Memoize the click handler to prevent unnecessary re-renders
  const handleCardClick = useCallback(() => {
    if (!isActuallyLocked) {
      onSelect(sound);
      triggerHapticFeedback();
    }
  }, [isActuallyLocked, onSelect, sound, triggerHapticFeedback]);

  return (
    <motion.div
      className={cn(
        "relative w-full rounded-2xl cursor-pointer",
        "bg-white/[0.03] backdrop-blur-xl",
        "border border-white/[0.06]",
        "overflow-hidden transition-all duration-500",
        "shadow-premium hover:shadow-premium-lg",
        "flex flex-col items-center justify-center p-0.5",
        isHovered ? "border-white/[0.12] bg-white/[0.05]" : "",
        isSelected ? "ring-1 ring-magic-accent-green/60 border-magic-accent-green/40" : "",
        isCasinoHighlighted ? "ring-1 ring-yellow-400/60 border-yellow-400/40" : "",
        isActuallyLocked ? "opacity-80" : ""
      )}
       variants={cardVariants}
       initial="initial"
       animate="animate"
       whileHover="hover"
       whileTap="tap"
       onClick={handleCardClick}
    >
      {/* Glass shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

      {/* Loading indicator overlay */}
      {currentNoise?.id === sound.id && isNoiseLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(${patternColorRgb}, 0.08) 0%, rgba(var(--magic-gray-dark-rgb), 0.6) 100%)`,
        }}
        variants={backgroundGlowVariants}
        animate={isSelected ? "selected" : isCasinoHighlighted ? "highlighted" : "animate"}
      />

      {/* Vinyl design - auto-scales to container */}
      <motion.div
        className="relative rounded-full bg-white/[0.03] border border-white/[0.06] flex-shrink-0"
        style={{
          width: '42%',
          paddingBottom: '42%',
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)"
        }}
        variants={iconBaseVariants}
        animate={isSelected ? "selected" : "animate"}
      >
        <div className="absolute inset-[12%] rounded-full bg-white/[0.02] flex items-center justify-center"
          style={{ boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)" }}
        >
          <Icon className={cn("w-3/5 h-3/5", sound.iconColorClass)} />
        </div>
        <div className="absolute w-[12%] h-[12%] rounded-full bg-white/80"
          style={{
            top: '44%',
            left: '44%',
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)"
          }}
        />
      </motion.div>

      {/* Sound name - flex child at bottom */}
      <div className="mt-auto w-full z-10 px-0.5">
        <span className="text-white/90 text-[8px] sm:text-[10px] font-semibold text-center block leading-tight line-clamp-1 bg-black/40 backdrop-blur-sm rounded-md px-0.5 py-0">
          {sound.name}
        </span>
      </div>

      {/* Lock overlay */}
      {isActuallyLocked && (
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center p-4">
            <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium tracking-wide">
              {isPremium ? "Premium" : "Locked"}
            </p>
          </div>
        </motion.div>
      )}

      {/* Favorite button */}
      <motion.button
        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 border border-white/[0.06]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleFavorite}
      >
        <Star
          className={cn(
            "w-5 h-5 transition-colors",
            isFavorite ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(255,200,0,0.5)]" : "text-white/50"
          )}
        />
      </motion.button>

      {/* Unlock button */}
      {isActuallyLocked && (
        <motion.button
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-magic-accent-green/90 to-magic-accent-green text-black rounded-full font-medium text-sm tracking-wide transition-all duration-300 shadow-lg shadow-magic-accent-green/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlockSound}
        >
          Unlock
        </motion.button>
      )}

      {/* Selection burst effect */}
      <AnimatePresence>
        {showBurst && selectionBurstParticles && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectionBurstParticles.map((particle, index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-magic-accent-green rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                {...particle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle particles */}
      {idleParticles && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {idleParticles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              {...particle}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
});

export default SoundCard;