
import { Howl, Howler } from 'howler';
import { NativeAudioPlugin } from './NativeBridge';

/**
 * WebAudioManager implements the NativeAudioPlugin interface for the web platform using Howler.js.
 * This provides more reliable and consistent audio playback in the browser,
 * managing streaming, looping, and volume.
 */
class WebAudioManager implements NativeAudioPlugin {
  private howlInstances: Map<string, Howl> = new Map();
  private playingHowls: Map<string, number> = new Map(); // Maps assetId to Howl sound ID (number)

  constructor() {
    Howler.autoUnlock = true;
    Howler.html5PoolSize = 10;
    console.log("[WebAudioManager] Howler.js initialized with autoUnlock and html5PoolSize.");
  }

  async init(options: { soundFiles: { id: string; fileName: string; }[]; }): Promise<boolean> {
    console.log("[WebAudioManager] init called. Skipping initial preload of all sounds for faster startup.");
    // Мы больше не ждем загрузки всех файлов здесь.
    return true;
  }

  async preload(options: { assetId: string; assetPath: string; volume?: number; loop?: boolean; audioChannelNum?: number; isUrl?: boolean }): Promise<void> {
    if (this.howlInstances.has(options.assetId)) {
      console.log(`[WebAudioManager] Asset ${options.assetId} is already preloaded. Skipping preload.`);
      return;
    }

    console.log(`[WebAudioManager] Preloading: ${options.assetId} - ${options.assetPath} (isUrl: ${options.isUrl}, loop: ${options.loop}, volume: ${options.volume})`);
    return new Promise((resolve, reject) => {
      const sound = new Howl({
        src: [options.assetPath],
        html5: options.isUrl || false, // Use HTML5 Audio for URL streaming (important for radio) or if explicitly requested
        loop: options.loop || false,
        volume: options.volume ?? 1.0,
        preload: true, // Explicitly enable preloading
        onload: () => {
          this.howlInstances.set(options.assetId, sound);
          console.log(`[WebAudioManager] Howl instance preloaded for: ${options.assetId}`);
          resolve();
        },
        onloaderror: (id, err) => {
          console.error(`[WebAudioManager] Howl load error for ${options.assetId} (ID: ${id}):`, err);
          reject(new Error(`Failed to load audio for ${options.assetId}: ${err}`));
        },
        onplayerror: (id, err) => {
          console.error(`[WebAudioManager] Howl play error for ${options.assetId} (ID: ${id}):`, err);
        },
        // Enable faster loading with minimal initial buffering
        buffer: true // Ensures audio is buffered for immediate playback
      });
    });
  }

  async play(options: { assetId: string; loop?: boolean; }): Promise<void> {
    console.log(`[WebAudioManager] play called for asset: ${options.assetId}`);
    const sound = this.howlInstances.get(options.assetId);
    if (!sound) {
      console.error(`[WebAudioManager] Asset ${options.assetId} is not preloaded.`);
      throw new Error(`Asset ${options.assetId} is not preloaded.`);
    }

    // Stop any previous playback of this specific assetId
    if (this.playingHowls.has(options.assetId)) {
      sound.stop(this.playingHowls.get(options.assetId));
      this.playingHowls.delete(options.assetId);
      console.log(`[WebAudioManager] Stopped previous playback of ${options.assetId}.`);
    }

    sound.loop(options.loop || sound.loop()); // Apply looping setting, prioritizing options.loop
    const soundId = sound.play();
    this.playingHowls.set(options.assetId, soundId);
    console.log(`[WebAudioManager] Playing Howl instance for ${options.assetId} (Howl sound ID: ${soundId})`);
  }

  async pause(options: { assetId: string; }): Promise<void> {
    console.log(`[WebAudioManager] pause called for asset: ${options.assetId}`);
    const sound = this.howlInstances.get(options.assetId);
    if (sound && this.playingHowls.has(options.assetId)) {
      sound.pause(this.playingHowls.get(options.assetId));
      console.log(`[WebAudioManager] Paused Howl instance for: ${options.assetId}`);
    }
  }

  async setSleepTimer(options: { durationMinutes: number; }): Promise<void> {
    console.log(`[WebAudioManager] setSleepTimer called for ${options.durationMinutes} minutes. (Mock)`);
    // Handled by SoundContext
  }

  async stop(options: { assetId: string; }): Promise<void> {
    console.log(`[WebAudioManager] stop called for asset: ${options.assetId}`);
    const sound = this.howlInstances.get(options.assetId);
    if (sound && this.playingHowls.has(options.assetId)) {
      sound.stop(this.playingHowls.get(options.assetId));
      this.playingHowls.delete(options.assetId); // Ensure removed from playing map
      console.log(`[WebAudioManager] Stopped Howl instance for: ${options.assetId}`);
    }
  }

  async unload(options: { assetId: string; }): Promise<void> {
    console.log(`[WebAudioManager] unload called for asset: ${options.assetId}`);
    const sound = this.howlInstances.get(options.assetId);
    if (sound) {
      sound.unload();
      this.howlInstances.delete(options.assetId);
      this.playingHowls.delete(options.assetId); // Ensure removed from playing map
      console.log(`[WebAudioManager] Unloaded Howl instance for: ${options.assetId}`);
    }
  }

  async setVolume(options: { assetId: string; volume: number; }): Promise<void> {
    console.log(`[WebAudioManager] setVolume called for asset: ${options.assetId} to ${options.volume}`);
    const sound = this.howlInstances.get(options.assetId);
    if (sound) {
      sound.volume(options.volume);
    }
  }

  async setPan(options: { pan: number; }): Promise<void> {
    console.log(`[WebAudioManager] setPan called to ${options.pan} (Mock)`);
    // Howler.js supports panning, but it's per sound. Not implemented in mock for simplicity.
  }

  async sendNotification(options: { title: string; body: string; }): Promise<void> {
    console.log(`[WebAudioManager] sendNotification called: ${options.title} - ${options.body} (Mock)`);
    // ... (notification logic)
  }

  async dispose(): Promise<void> {
    console.log("[WebAudioManager] dispose called. Unloading all Howl instances.");
    for (const assetId of this.howlInstances.keys()) {
      this.unload({ assetId });
    }
    this.howlInstances.clear();
    this.playingHowls.clear();
    Howler.unload(); // Unload all sounds and clear audio context
  }
}

export default WebAudioManager;