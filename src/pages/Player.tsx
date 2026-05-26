
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';

import PlayerHeader from '@/components/player/PlayerHeader';
import PlayerControls from '@/components/player/PlayerControls';
import PlayerPanelsManager from '@/components/player/PlayerPanelsManager';
import { usePowerfulAnimations } from '@/hooks/use-animations';
import GameLoadingBar from '@/components/GameLoadingBar'; // Import GameLoadingBar

type ActivePanel = 'timer' | 'about' | 'soundDetails' | null;

export interface PlayerProps {
  onCloseWithEffects: () => void;
}

const Player: React.FC<PlayerProps> = ({ onCloseWithEffects }) => {
  const navigate = useNavigate();
  const { currentNoise, isNoisePlaying, isNoiseLoading } = useSound(); // Use isNoiseLoading
  const { hasCompletedMagicOnboarding } = useSettings();
  const { backgroundShimmerGlow } = usePowerfulAnimations();

  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  useEffect(() => {
    console.log("[Player] Component mounted. currentNoise:", currentNoise?.name, "isNoisePlaying:", isNoisePlaying, "isNoiseLoading:", isNoiseLoading, "hasCompletedMagicOnboarding:", hasCompletedMagicOnboarding);
    
    // If noise is not active, and it's not loading, and onboarding is complete, navigate to sound selection
    if (!currentNoise && hasCompletedMagicOnboarding && !isNoiseLoading) {
      console.log("[Player] No active sound and not loading, navigating to /.");
      navigate('/');
    }

    if (!hasCompletedMagicOnboarding) {
      console.log("[Player] Onboarding not completed, navigating to /.");
      navigate('/');
    }

    return () => {
      console.log("[Player] Component unmounting. Playback state is now managed by SoundContext globally.");
    };
  }, [currentNoise, navigate, isNoisePlaying, hasCompletedMagicOnboarding, isNoiseLoading]);

  const handlePanelToggle = useCallback((panelName: ActivePanel) => {
    console.log("[Player] handlePanelToggle called. Toggling panel:", panelName);
    setActivePanel(prev => (prev === panelName ? null : panelName));
  }, []);

  const handlePanelClose = useCallback(() => {
    console.log("[Player] handlePanelClose called. Setting activePanel to null.");
    setActivePanel(null);
  }, []);

  // If loading, show loading indicator
  if (isNoiseLoading) {
    // Use GameLoadingBar to indicate audio loading
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black">
        <GameLoadingBar progress={50} statusText={`Loading ${currentNoise?.name || 'Sound'}...`} />
      </div>
    );
  }

  // Render PlayerControls only if currentNoise is active
  if (!currentNoise) {
    console.log("[Player] Rendering null because currentNoise is not active.");
    return null;
  }

  return (
    <div className="relative flex flex-col h-full items-center justify-between text-gray-100 overflow-hidden bg-black select-none">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />

      <PlayerHeader onPanelToggle={handlePanelToggle} />

      {/* Main container for vinyl and controls. Limit width and center. */}
      <div className="flex-1 w-full max-w-4xl mx-auto overflow-hidden flex flex-col items-center justify-center">
        {currentNoise && (
          <PlayerControls
            onCloseWithEffects={onCloseWithEffects}
            onPanelToggle={handlePanelToggle}
          />
        )}
      </div>

      {/* Panels */}
      {activePanel !== null && (
        <div className="fixed inset-0 z-[99989]">
          <PlayerPanelsManager
            activePanel={activePanel}
            onPanelClose={handlePanelClose}
            onCloseWithEffects={onCloseWithEffects}
          />
        </div>
      )}
    </div>
  );
};

export default Player;