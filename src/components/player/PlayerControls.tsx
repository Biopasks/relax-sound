
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Palette, Info } from 'lucide-react';
import { motion, AnimatePresence, Easing, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMicroAnimations, playPauseAuraPulse, sliderThumbGlow, sliderTrackGradient } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';
import SoundWaveVisualizer from '@/components/SoundWaveVisualizer';
import AnimatedText from '@/components/AnimatedText';
import { vinylDesigns } from '@/lib/vinyl-designs';
import { playUiSound } from '@/utils/audio-effects';
import { useSound } from '@/context/SoundContext';
import VinylCenterVisualizer from '@/components/VinylCenterVisualizer';
import { formatSecondsToHMS } from '@/utils/time-formatter';
import { usePowerfulAnimations } from '@/hooks/use-animations';
import VinylDesignSelectionSheet from './VinylDesignSelectionSheet'; // Import new component

const MotionButton = motion(Button);
const MotionSlider = motion(Slider);

interface PlayerControlsProps {
  onCloseWithEffects: () => void;
  onPanelToggle: (panelName: 'soundDetails' | null) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ onCloseWithEffects, onPanelToggle }) => {
  const {
    currentNoise,
    isNoisePlaying,
    playPauseNoise,
    remainingTime,
    setNoiseVolume,
    updateVinylDesign,
  } = useSound();
  const {
    volume: settingsVolume,
    triggerHapticFeedback,
  }
  = useSettings();

  const [localVolume, setLocalVolume] = useState(settingsVolume);
  const [selectedVinylDesignId, setSelectedVinylDesignId] = useState(vinylDesigns[0].id);
  const [isDesignSheetOpen, setIsDesignSheetOpen] = useState(false); // NEW: State for modal window

  const { hoverScale, tapScale, dominoText } = useMicroAnimations();
  const { glowPulse } = usePowerfulAnimations();

  const currentVinylDesign = vinylDesigns.find(design => design.id === selectedVinylDesignId) || vinylDesigns[0];

  useEffect(() => {
    if (currentNoise) { // Use currentNoise
      setSelectedVinylDesignId(currentNoise.vinylDesignId);
    }
  }, [currentNoise]);

  useEffect(() => {
    setLocalVolume(settingsVolume);
  }, [settingsVolume]);

  const handleSliderValueChange = useCallback((value: number[]) => {
    setLocalVolume(value[0]);
  }, []);

  const handleSliderValueCommit = useCallback((value: number[]) => {
    setNoiseVolume(value[0]); // Use setNoiseVolume
    triggerHapticFeedback();
  }, [setNoiseVolume, triggerHapticFeedback]);

  if (!currentNoise) { // Only render if there's a current noise
    return null;
  }

  const Icon = currentNoise.icon; // Use currentNoise.icon

  return (
    <main className="relative flex-1 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center w-full px-3 py-3 gap-4 overflow-hidden">
      {/* Only render the vinyl player for noise */}
      <motion.div
        className="relative w-full max-w-[42%] sm:max-w-[200px] md:max-w-[280px] aspect-square flex items-center justify-center rounded-full cursor-pointer
                   bg-black/80 border border-white/[0.08] shadow-premium-lg flex-shrink-0"
        onClick={() => {
          playPauseNoise(currentNoise); // Use playPauseNoise
          triggerHapticFeedback();
          playUiSound('light-tap.mp3');
        }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(var(--magic-accent-blue-rgb), 0)",
            "0 0 40px 10px rgba(var(--magic-accent-blue-rgb), 0.3)",
            "0 0 0px rgba(var(--magic-accent-blue-rgb), 0)"
          ],
          scale: [1, 1.01, 1],
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" as Easing },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" as Easing },
        }}
        {...hoverScale}
      >
        <SoundWaveVisualizer isPlaying={isNoisePlaying} /> {/* Use isNoisePlaying */}

        <div className={cn("absolute inset-0.5 rounded-full border-2", currentVinylDesign.outerRim)} />

        <motion.div
          className={cn("absolute w-[85%] h-[85%] rounded-full flex items-center justify-center animate-radial-pulse border border-gray-700/50", currentVinylDesign.mainDisc)}
          animate={isNoisePlaying ? { rotate: [0, 360], scale: [1, 1.005, 1] } : { rotate: 0, scale: 1 }} // Use isNoisePlaying
          transition={{
            rotate: { duration: isNoisePlaying ? 6 : 0.5, ease: "linear" as Easing, repeat: isNoisePlaying ? Infinity : 0 }, // Use isNoisePlaying
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" as Easing }
          }}
        >
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
              duration: 4,
              repeat: Infinity,
              ease: "linear" as Easing,
              delay: 0.5
            }}
          />

          <div className={cn("absolute w-[80%] h-[80%] rounded-full flex items-center justify-center", currentVinylDesign.outerCircle)}>
            <div className={cn("absolute w-[60%] h-[60%] rounded-full flex items-center justify-center", currentVinylDesign.innerCircle1)}>
              <div className={cn("absolute w-[40%] h-[40%] rounded-full flex items-center justify-center", currentVinylDesign.innerCircle2)}>
                <VinylCenterVisualizer isPlaying={isNoisePlaying} iconColorClass={currentNoise.iconColorClass} /> {/* Use isNoisePlaying and currentNoise */}

                <motion.div
                  animate={{ y: [0, -5, 0], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as Easing }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <Icon className={cn("drop-shadow-md", currentNoise.iconColorClass, "opacity-100 w-full h-full p-2")} /> {/* Use currentNoise */}
                </motion.div>

                <div className={cn("absolute w-8 h-8 rounded-full z-10", currentVinylDesign.centerHole)} />
                <motion.div
                  variants={playPauseAuraPulse}
                  animate={isNoisePlaying ? "animate" : { scale: 1, opacity: 1 }} // Use isNoisePlaying
                >
                  {isNoisePlaying ? <Pause size={48} className="text-white" /> : <Play size={48} className="text-white translate-x-1" />} {/* Use isNoisePlaying */}
                </motion.div>

                <AnimatedText
                  text={currentNoise.name} // Use currentNoise
                  className={cn(
                    "absolute z-50 text-xl sm:text-2xl md:text-3xl font-etude-noire font-bold px-2 py-1 rounded-md drop-shadow-lg",
                    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", // PERFECT CENTERING
                    currentVinylDesign.stickerBg, 
                    currentVinylDesign.stickerText
                  )}
                  staggerDelay={0.05}
                  wordVariants={dominoText.child}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {!isNoisePlaying && ( // Use isNoisePlaying
            <motion.div
              key="aura-indicator-container"
              className="absolute inset-0 flex items-center justify-center rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-magic-accent-blue/20"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as Easing }}
              />

              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`pulse-ring-${i}`}
                  className="absolute rounded-full border-2 border-magic-accent-blue/70"
                  style={{
                    width: `${60 + i * 15}%`,
                    height: `${60 + i * 15}%`,
                  }}
                  animate={{
                    scale: [1, 1.1 + i * 0.05, 1],
                    opacity: [0.8 - i * 0.2, 0.2 - i * 0.05, 0.8 - i * 0.2],
                    filter: [`blur(${i * 0.5}px)`, `blur(${i * 1.5}px)`, `blur(${i * 0.5}px)`],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut" as Easing,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="flex flex-col items-center justify-center gap-2 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full">
            <MotionButton
              onClick={() => onPanelToggle('soundDetails')}
              className="bg-white/[0.04] hover:bg-white/[0.08] text-white/80 font-semibold py-2 px-6 rounded-full shadow-premium border border-white/[0.06] text-base w-full backdrop-blur-sm"
              {...hoverScale}
              {...tapScale}
              animate={glowPulse.animate}
              transition={glowPulse.animate.transition}
            >
              <Info size={24} className="mr-3 text-white/60" /> Sound Details
            </MotionButton>
          </div>

          <div className="w-full">
            <MotionButton
              variant="outline"
              onClick={() => {
                setIsDesignSheetOpen(true);
                triggerHapticFeedback();
              }}
              className="bg-white/[0.02] hover:bg-white/[0.06] text-white/70 border-white/[0.08] px-6 py-2 rounded-full text-base shadow-premium w-full backdrop-blur-sm"
              {...hoverScale}
              {...tapScale}
              animate={glowPulse.animate}
              transition={glowPulse.animate.transition}
              disabled={!currentNoise}
            >
              <Palette size={24} className="mr-3 text-white/50" />
              Design: {currentVinylDesign.name}
            </MotionButton>
          </div>
        </div>

        {remainingTime !== null && (
          <motion.div
            className="text-lg font-semibold text-white/80 bg-white/[0.03] px-4 py-2 rounded-full shadow-premium border border-white/[0.06] w-full text-center backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Timer: {formatSecondsToHMS(remainingTime)}
          </motion.div>
        )}

        <motion.div
          className="w-full p-2 bg-white/[0.03] rounded-xl shadow-premium border border-white/[0.06] flex items-center gap-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {localVolume === 0 ? <VolumeX size={24} className="text-white/40" /> : <Volume2 size={24} className="text-white/60" />}
          <MotionSlider
            id="volume-slider"
            defaultValue={[localVolume]}
            max={1}
            step={0.1}
            onValueChange={handleSliderValueChange}
            onValueCommit={handleSliderValueCommit}
            value={[localVolume]}
            className="flex-1"
            {...hoverScale}
            {...tapScale}
          />
        </motion.div>
      </motion.div>
      
      {/* NEW: Modal window for design selection */}
      <VinylDesignSelectionSheet
        isOpen={isDesignSheetOpen}
        onClose={() => setIsDesignSheetOpen(false)}
        selectedDesignId={selectedVinylDesignId}
        onDesignSelect={(id) => { setSelectedVinylDesignId(id); updateVinylDesign(id); }}
      />
    </main>
  );
};

export default PlayerControls;