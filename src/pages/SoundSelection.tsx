
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SoundCard from '@/components/SoundCard';
import { useSound } from '@/context/SoundContext';
import { sounds } from '@/assets/audio';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { useCasinoCardEffect } from '@/hooks/use-casino-card-effect';
import { cn } from '@/lib/utils';

import TimerPanel from '@/components/TimerPanel';
import AboutAppPanel from '@/components/AboutAppPanel';
import PrivacyPolicyPanel from '@/components/PrivacyPolicyPanel';
import FeedbackPanel from '@/components/FeedbackPanel';
import TextVisualizerPanel from '@/components/TextVisualizerPanel';
import SoundSelectionHeader from '@/components/SoundSelectionHeader';
import SoundGrid from '@/components/SoundGrid';
import { useAudioPreloader } from '@/hooks/useAudioPreloader'; // Import the new hook

type ActivePanel = 'timer' | 'about' | 'privacy' | 'feedback' | 'textVisualizer' | null;

const SoundSelection: React.FC = () => {
  const navigate = useNavigate();
  const { currentNoise, isNoisePlaying, playPauseNoise, remainingTime } = useSound();
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const { triggerHapticFeedback, isTestModeEnabled, setIsTestModeEnabled } = useSettings();
  const { backgroundShimmerGlow } = usePowerfulAnimations();
  const { preloadCommon, isPreloading } = useAudioPreloader(); // Use the preloader hook with common sounds only

  const [isTimerButtonTransparent, setIsTimerButtonTransparent] = useState(false);

  const { highlightedCardIndex, startCasinoEffect, stopCasinoEffect } = useCasinoCardEffect();

  // Preload only common sounds on component mount for faster initial experience
  useEffect(() => {
    if (preloadCommon) {
      preloadCommon();
    }
  }, [preloadCommon]);

  useEffect(() => {
    const hiddenUntil = localStorage.getItem('soundSelectionTimerButtonHiddenUntil');
    if (hiddenUntil) {
      const hiddenUntilTimestamp = parseInt(hiddenUntil, 10);
      const now = Date.now();
      if (now < hiddenUntilTimestamp) {
        setIsTimerButtonTransparent(true);
        const remainingTime = hiddenUntilTimestamp - now;
        const timeoutId = setTimeout(() => {
          setIsTimerButtonTransparent(false);
          localStorage.removeItem('soundSelectionTimerButtonHiddenUntil');
        }, remainingTime);
        return () => clearTimeout(timeoutId);
      } else {
        localStorage.removeItem('soundSelectionTimerButtonHiddenUntil');
        setIsTimerButtonTransparent(false);
      }
    }
  }, []);

  useEffect(() => {
    // Start casino effect immediately without waiting for preloading
    startCasinoEffect(sounds.length);
    return () => {
      stopCasinoEffect();
    };
  }, [startCasinoEffect, stopCasinoEffect]);

  const handleSoundSelect = async (sound: typeof sounds[0]) => {
    stopCasinoEffect();
    triggerHapticFeedback();

    const isTogglingCurrent = currentNoise?.id === sound.id;
    const isPausing = isTogglingCurrent && isNoisePlaying;
    
    // Wait for the sound operation to complete before navigating
    // This ensures the audio state is properly synchronized
    try {
      const result = await playPauseNoise(sound);
      
      // Only navigate if we're not pausing and the operation was successful
      if (!isPausing && result) {
        navigate('/player');
      }
    } catch (e) {
      console.error("Error during sound playback initiation:", e);
      // If an error occurred, don't navigate to player page
    }
  };

  const handlePanelToggle = (panelName: ActivePanel) => {
    triggerHapticFeedback();
    if (activePanel === panelName) {
      setActivePanel(null);
    } else {
      setActivePanel(panelName);
    }
  };

  return (
    <div className="flex flex-col h-full text-gray-100 overflow-hidden select-none relative">
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 0% 50%, rgba(76, 175, 80, 0.04) 0%, transparent 50%),
                      radial-gradient(ellipse at 100% 50%, rgba(0, 255, 255, 0.04) 0%, transparent 50%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />

      {/* Full-width Header (flex-shrink-0) */}
      <SoundSelectionHeader
        onPanelToggle={handlePanelToggle}
        remainingTime={remainingTime}
        isTimerButtonTransparent={isTimerButtonTransparent}
        setIsTimerButtonTransparent={setIsTimerButtonTransparent}
        isTestModeEnabled={isTestModeEnabled}
        setIsTestModeEnabled={setIsTestModeEnabled}
      />

      {/* Content Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <SoundGrid
            sounds={sounds}
            onSoundSelect={handleSoundSelect}
            currentSound={currentNoise}
            highlightedCardIndex={highlightedCardIndex}
          />
        </div>
      </div>

      <TimerPanel isOpen={activePanel === 'timer'} onClose={() => setActivePanel(null)} />
      <AboutAppPanel isOpen={activePanel === 'about'} onClose={() => setActivePanel(null)} />
      <PrivacyPolicyPanel isOpen={activePanel === 'privacy'} onClose={() => setActivePanel(null)} />
      <FeedbackPanel isOpen={activePanel === 'feedback'} onClose={() => setActivePanel(null)} />
      <TextVisualizerPanel isOpen={activePanel === 'textVisualizer'} onClose={() => setActivePanel(null)} />
    </div>
  );
};

export default SoundSelection;