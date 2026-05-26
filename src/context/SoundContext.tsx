
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { NativeAudio } from '@/capacitor-plugins/NativeBridge';
import { Sound, sounds } from '@/assets/audio';
import { useSettings } from './SettingsContext';
import { showSuccess, showError } from '@/utils/toast';
import { useSession } from '../context/SessionContext';
import { Capacitor } from '@capacitor/core';

interface SoundContextType {
  currentNoise: Sound | null;
  isNoisePlaying: boolean;
  isNoiseLoading: boolean;
  playPauseNoise: (sound: Sound) => Promise<boolean>;
  stopAll: () => void;
  stopNoise: () => void;
  setNoiseVolume: (volume: number) => void;
  setSleepTimer: (durationSeconds: number | null) => void;
  remainingTime: number | null;
  isNoiseMuted: boolean;
  toggleNoiseMute: () => void;
  updateVinylDesign: (designId: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentNoise, setCurrentNoise] = useState<Sound | null>(null);
  const [isNoisePlaying, setIsNoisePlaying] = useState(false);
  const [isNoiseLoading, setIsNoiseLoading] = useState(false); // NEW: Initialize loading state
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isNoiseMuted, setIsNoiseMuted] = useState(false);
  const [isNativeAudioReady, setIsNativeAudioReady] = useState(false);

  const { volume: settingsVolume } = useSettings();
  const { recordSession } = useSession();

  // Refs for current state to be accessible inside callbacks
  const isNoisePlayingRef = useRef(isNoisePlaying);
  const currentNoiseRef = useRef(currentNoise);
  const isNoiseLoadingRef = useRef(isNoiseLoading);
  const noiseAssetIdRef = useRef<string | null>(null); // Asset ID for NativeAudio (noise)
  const sleepTimerTimeoutRef = useRef<number | null>(null);
  const sleepTimerIntervalRef = useRef<number | null>(null);
  const noiseSessionStartTimeRef = useRef<number | null>(null);

  // Update refs on state change
  useEffect(() => { isNoisePlayingRef.current = isNoisePlaying; }, [isNoisePlaying]);
  useEffect(() => { currentNoiseRef.current = currentNoise; }, [currentNoise]);
  useEffect(() => { isNoiseLoadingRef.current = isNoiseLoading; }, [isNoiseLoading]);

  // Initialize native audio system (mock for web, real for native)
  const initializeAudioSystem = useCallback(async () => {
    console.log("[SoundContext] Initializing native audio system...");
    try {
      // IMPORTANT: We no longer pass soundFiles for initial preload.
      // Audio will be loaded lazily upon selection.
      await NativeAudio.init({ soundFiles: [] }); 
      setIsNativeAudioReady(true);
      console.log("[SoundContext] Native audio system ready.");
    } catch (e) {
      console.error("[SoundContext] Error initializing native audio system:", e);
      showError("Failed to initialize audio system.");
    }
  }, []);

  useEffect(() => {
    initializeAudioSystem();
    return () => {
      console.log("[SoundContext] SoundProvider unmounting. Cleaning up NativeAudio.");
      NativeAudio.dispose().catch(e => console.error("[SoundContext] Error cleaning up NativeAudio:", e));
    };
  }, [initializeAudioSystem]);

  const clearSleepTimer = useCallback(() => {
    console.log("[SoundContext] clearSleepTimer called.");
    if (sleepTimerTimeoutRef.current) {
      clearTimeout(sleepTimerTimeoutRef.current);
      sleepTimerTimeoutRef.current = null;
    }
    if (sleepTimerIntervalRef.current) {
      clearInterval(sleepTimerIntervalRef.current);
      sleepTimerIntervalRef.current = null;
    }
    setRemainingTime(null);
  }, []);

  const stopNoise = useCallback(async (stoppedManually: boolean = true) => {
    console.log(`[SoundContext] stopNoise called. stoppedManually: ${stoppedManually}, noiseAssetIdRef.current: ${noiseAssetIdRef.current}, currentNoiseRef.current: ${currentNoiseRef.current?.name || 'null'}, noiseSessionStartTimeRef.current: ${noiseSessionStartTimeRef.current}`);
    
    if (noiseAssetIdRef.current) {
      try {
        await NativeAudio.stop({ assetId: noiseAssetIdRef.current });
        await NativeAudio.unload({ assetId: noiseAssetIdRef.current });

        if (currentNoiseRef.current && noiseSessionStartTimeRef.current) {
          const duration = (Date.now() - noiseSessionStartTimeRef.current) / 1000;
          recordSession({
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            soundName: currentNoiseRef.current.name,
            startTime: noiseSessionStartTimeRef.current,
            durationSeconds: Math.round(duration),
            endTime: Date.now(),
            stoppedManually: stoppedManually,
          });
        }
      } catch (e) {
        console.error(`[SoundContext] Error stopping/unloading noise asset ${noiseAssetIdRef.current}:`, e);
      } finally {
        noiseAssetIdRef.current = null;
        noiseSessionStartTimeRef.current = null;
      }
    }
    setIsNoisePlaying(false);
    setIsNoiseMuted(false);
    setCurrentNoise(null); // Clear current noise
    clearSleepTimer();
  }, [clearSleepTimer, recordSession]);

  const stopAll = useCallback(async () => {
    console.log("[SoundContext] stopAll called.");
    await stopNoise();
  }, [stopNoise]);

  // Effect to handle volume changes from settings for noise
  useEffect(() => {
    console.log(`[SoundContext] settingsVolume changed to: ${settingsVolume}. noiseAssetIdRef.current: ${noiseAssetIdRef.current}, isNoisePlayingRef.current: ${isNoisePlayingRef.current}`);
    if (noiseAssetIdRef.current && isNoisePlayingRef.current && !isNoiseMuted) {
      NativeAudio.setVolume({ assetId: noiseAssetIdRef.current, volume: settingsVolume })
        .catch(e => console.error("[SoundContext] Error setting native audio volume:", e));
    }
  }, [settingsVolume, isNoiseMuted]);

  const playPauseNoise = useCallback(async (sound: Sound): Promise<boolean> => {
    console.log(`[SoundContext] playPauseNoise called with sound: ${sound?.name || 'null'}. Current isNoisePlaying: ${isNoisePlayingRef.current}, Current currentNoise: ${currentNoiseRef.current?.name || 'null'}`);
    if (!sound) {
      console.warn("[SoundContext] playPauseNoise called with null. Aborting.");
      return false;
    }

    // Prevent duplicate actions during loading
    if (isNoiseLoadingRef.current) {
      console.log("[SoundContext] Currently loading, ignoring duplicate action.");
      return false;
    }

    // Case 1: Tapping the currently playing noise (toggle play/pause)
    if (currentNoiseRef.current?.id === sound.id) {
      if (isNoisePlayingRef.current) {
        console.log(`[SoundContext] Pausing current noise: ${sound.name}`);
        // Pause the audio
        if (noiseAssetIdRef.current) {
          await NativeAudio.pause({ assetId: noiseAssetIdRef.current });
        }
        setIsNoisePlaying(false);
        showSuccess(`Paused: ${sound.name}`);
        return false; // Return false as we paused
      } else {
        console.log(`[SoundContext] Resuming current noise: ${sound.name}`);
        // Resume the audio
        if (noiseAssetIdRef.current) {
          await NativeAudio.play({ assetId: noiseAssetIdRef.current });
        }
        setIsNoisePlaying(true);
        showSuccess(`Resumed: ${sound.name}`);
        noiseSessionStartTimeRef.current = Date.now(); // Reset session start time on resume
        return true; // Return true as we resumed
      }
    }
    // Case 2: Tapping a different noise, or no noise is playing
    else {
      console.log(`[SoundContext] Switching to new noise: ${sound.name}. Stopping previous if any.`);
      
      setIsNoiseLoading(true); // Start loading
      isNoiseLoadingRef.current = true;
      
      // Ensure previous noise is completely stopped before starting new one
      if (isNoisePlayingRef.current || currentNoiseRef.current) {
        await stopNoise();
      }

      setCurrentNoise(sound);
      setIsNoisePlaying(true);
      setIsNoiseMuted(false);
      noiseSessionStartTimeRef.current = Date.now();

      const newAssetId = `noise-sound-${sound.id}-${Date.now()}`;
      noiseAssetIdRef.current = newAssetId;

      try {
        console.log(`[SoundContext] Preloading and playing noise: ${sound.name} (assetId: ${newAssetId}, path: /audio/${sound.fileName})`);
        
        // Preload and play the new sound
        await NativeAudio.preload({
          assetId: newAssetId,
          assetPath: `/audio/${sound.fileName}`,
          volume: settingsVolume,
          loop: sound.loop,
        });
        
        await NativeAudio.play({ assetId: newAssetId });
        await NativeAudio.setVolume({ assetId: newAssetId, volume: settingsVolume });
        showSuccess(`Started sound: ${sound.name}`);
        setIsNoiseLoading(false); // Loading complete
        isNoiseLoadingRef.current = false;
        return true; // Successful start
      } catch (e) {
        console.error(`[SoundContext] Error playing noise ${sound.name}:`, e);
        showError(`Failed to play sound "${sound.name}".`);
        await stopNoise();
        setIsNoiseLoading(false); // Loading failed
        isNoiseLoadingRef.current = false;
        return false; // Failed start
      }
    }
  }, [settingsVolume, stopNoise]);

  const setNoiseVolume = useCallback(async (volume: number) => {
    console.log(`[SoundContext] setNoiseVolume called for volume: ${volume}. noiseAssetIdRef.current: ${noiseAssetIdRef.current}`);
    if (noiseAssetIdRef.current) {
      await NativeAudio.setVolume({ assetId: noiseAssetIdRef.current, volume });
    }
  }, []);

  const setSleepTimer = useCallback(async (durationSeconds: number | null) => {
    console.log("[SoundContext] setSleepTimer called with duration:", durationSeconds);
    clearSleepTimer();

    if (durationSeconds !== null && durationSeconds > 0) {
      console.log(`[SoundContext] Setting sleep timer for ${durationSeconds} seconds.`);
      setRemainingTime(durationSeconds);

      sleepTimerIntervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          const newTime = (prev !== null && prev > 0 ? prev - 1 : 0);
          return newTime;
        });
      }, 1000) as unknown as number;

      sleepTimerTimeoutRef.current = setTimeout(async () => {
        console.log("[SoundContext] Sleep timer finished. Stopping noise.");
        await stopNoise(false);
        showSuccess("Sleep timer finished. Noise stopped.");
        clearSleepTimer();
      }, durationSeconds * 1000) as unknown as number;
    }
  }, [clearSleepTimer, stopNoise]);

  const toggleNoiseMute = useCallback(async () => {
    console.log(`[SoundContext] toggleNoiseMute called. Current isNoiseMuted: ${isNoiseMuted}, noiseAssetIdRef.current: ${noiseAssetIdRef.current}`);
    if (!noiseAssetIdRef.current) {
      console.log("[SoundContext] No noise asset to mute/unmute. Skipping.");
      return;
    }

    const newMuteState = !isNoiseMuted;
    setIsNoiseMuted(newMuteState);

    if (newMuteState) {
      await NativeAudio.setVolume({ assetId: noiseAssetIdRef.current, volume: 0 });
    } else {
      await NativeAudio.setVolume({ assetId: noiseAssetIdRef.current, volume: settingsVolume });
    }
  }, [isNoiseMuted, settingsVolume]);

  const updateVinylDesign = useCallback((designId: string) => {
    setCurrentNoise(prev => prev ? { ...prev, vinylDesignId: designId } : null);
  }, []);

  return (
    <SoundContext.Provider
      value={{
        currentNoise,
        isNoisePlaying,
        isNoiseLoading,
        playPauseNoise,
        stopAll,
        stopNoise,
        setNoiseVolume,
        setSleepTimer,
        remainingTime,
        isNoiseMuted,
        toggleNoiseMute,
        updateVinylDesign,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = React.useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};