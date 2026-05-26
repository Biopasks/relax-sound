
import { useEffect, useState, useCallback } from 'react';
import { NativeAudio } from '@/capacitor-plugins/NativeBridge';
import { sounds } from '@/assets/audio';

interface UseAudioPreloaderResult {
  isPreloading: boolean;
  progress: number;
  preloadAll: () => Promise<void>;
  preloadSpecific?: (soundIds: string[]) => Promise<void>;
  preloadCommon?: () => Promise<void>;
}

/**
 * Manages audio preloading with optimized strategy for faster startup.
 * Instead of preloading all sounds at once, this hook provides utilities
 * for selective preloading and lazy loading when needed.
 */
export const useAudioPreloader = (): UseAudioPreloaderResult => {
  const [isPreloading, setIsPreloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const preloadAll = useCallback(async () => {
    // Skip preloading all sounds for faster startup - now handled lazily in SoundContext
    console.log('[useAudioPreloader] Skipping bulk preload for faster startup. Sounds will load on demand.');
    return;
  }, []);

  // Optimized function to preload only specific sounds (e.g., most popular ones)
  const preloadSpecific = useCallback(async (soundIds: string[]) => {
    if (isPreloading || !soundIds.length) return;

    setIsPreloading(true);
    setProgress(0);

    const soundsToPreload = sounds.filter(sound => soundIds.includes(sound.id));
    const totalFiles = soundsToPreload.length;
    let loadedCount = 0;

    console.log(`[useAudioPreloader] Starting preload for ${totalFiles} specific sounds.`);

    for (const sound of soundsToPreload) {
      const assetId = `preload-${sound.id}`;
      const assetPath = `/audio/${sound.fileName}`;

      try {
        // Check if already preloaded (optional, but good for robustness)
        // Note: WebAudioManager checks this internally, but we call it here for consistency
        await NativeAudio.preload({
          assetId: assetId,
          assetPath: assetPath,
          volume: 0, // Preload with 0 volume to avoid sound bursts
          loop: sound.loop,
        });
        
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFiles) * 100));
        console.log(`[useAudioPreloader] Preloaded ${sound.name} (${loadedCount}/${totalFiles})`);
      } catch (error) {
        console.error(`[useAudioPreloader] Failed to preload ${sound.name}:`, error);
        // Continue loading other sounds even if one fails
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFiles) * 100));
      }
    }

    console.log('[useAudioPreloader] Specific preloading complete.');
    setIsPreloading(false);
  }, [isPreloading]);

  // Function to preload only the most commonly used sounds
  const preloadCommon = useCallback(async () => {
    // Preload only the most popular sounds for immediate availability
    const commonSoundIds = ['noise', 'rain', 'ocean']; // Most commonly used sounds
    await preloadSpecific(commonSoundIds);
  }, [preloadSpecific]);

  return { isPreloading, progress, preloadAll, preloadSpecific, preloadCommon };
};