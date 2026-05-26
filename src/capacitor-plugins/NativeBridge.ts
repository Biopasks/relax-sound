
import { registerPlugin } from '@capacitor/core';
import WebAudioManager from './web-audio-manager'; // Import new WebAudioManager

// Define the interface for NativeAudioPlugin to match its actual API.
export interface NativeAudioPlugin {
  init(options: { soundFiles: { id: string, fileName: string }[] }): Promise<boolean>;
  preload(options: { assetId: string; assetPath: string; volume?: number; loop?: boolean; audioChannelNum?: number; isUrl?: boolean }): Promise<void>;
  play(options: { assetId: string, loop?: boolean }): Promise<void>;
  pause(options: { assetId: string }): Promise<void>;
  setSleepTimer(options: { durationMinutes: number }): Promise<void>;
  stop(options: { assetId: string }): Promise<void>;
  unload(options: { assetId: string; }): Promise<void>;
  setVolume(options: { assetId: string; volume: number }): Promise<void>;
  setPan(options: { pan: number }): Promise<void>; // New function for setting stereo panning (-1 to 1)
  sendNotification(options: { title: string; body: string }): Promise<void>;
  dispose(): Promise<void>; // New function for resource cleanup
}

// Extend AdMobPlugin to include missing methods and properties
export interface NativeAdMobPlugin {
  initialize(options: { requestTrackingAuthorization?: boolean; testingDevices?: string[]; initializeForTesting?: boolean; }): Promise<void>;
  loadInterstitial(options: { adId: string }): Promise<void>;
  showInterstitial(): Promise<void>;
  loadRewarded(options: { adId: string }): Promise<void>;
  showRewarded(): Promise<{ rewarded: boolean; rewardItem?: { amount: number; type: string } }>;
}

// Interface for the native Dialog plugin
export interface NativeDialogPlugin {
  alert(options: { title: string; message: string }): Promise<void>;
  confirm(options: { title: string; message: string; okButtonTitle?: string; cancelButtonTitle?: string }): Promise<{ value: boolean }>;
  prompt(options: { title: string; message: string; okButtonTitle?: string; cancelButtonTitle?: string; inputPlaceholder?: string; inputText?: string }): Promise<{ value: string; cancelled: boolean }>;
}

class NativeAdMobWeb implements NativeAdMobPlugin {
  private listeners: { [key: string]: Function[] } = {};
  private interstitialLoaded = false;
  private rewardedLoaded = false;

  async initialize(options: { requestTrackingAuthorization?: boolean; testingDevices?: string[]; initializeForTesting?: boolean; }): Promise<void> {
    console.log("[NativeAdMobWeb] Initialization (Mock)");
  }

  async loadInterstitial(options: { adId: string }): Promise<void> {
    console.log(`[NativeAdMobWeb] Loading interstitial ad for ${options.adId} (Mock)`);
    this.interstitialLoaded = true;
  }

  async showInterstitial(): Promise<void> {
    console.log("[NativeAdMobWeb] Showing interstitial ad (Mock)");
    if (this.interstitialLoaded) {
      return new Promise(resolve => setTimeout(() => {
        this.triggerAdClosed();
        this.interstitialLoaded = false;
        resolve();
      }, 2000));
    } else {
      console.warn("[NativeAdMobWeb] Interstitial ad not loaded.");
      return Promise.reject("Interstitial ad not loaded");
    }
  }

  async loadRewarded(options: { adId: string }): Promise<void> {
    console.log(`[NativeAdMobWeb] Loading rewarded ad for ${options.adId} (Mock)`);
    this.rewardedLoaded = true;
  }

  async showRewarded(): Promise<{ rewarded: boolean; rewardItem?: { amount: number; type: string } }> {
    console.log(`[NativeAdMobWeb] Showing rewarded ad (Mock)`);
    if (this.rewardedLoaded) {
      return new Promise(resolve => setTimeout(() => {
        const rewarded = Math.random() > 0.3; // Simulate success/failure
        this.triggerAdClosed();
        this.rewardedLoaded = false;
        resolve({ rewarded, rewardItem: rewarded ? { amount: 1, type: 'unlock' } : undefined });
      }, 3000));
    } else {
      console.warn("[NativeAdMobWeb] Rewarded ad not loaded.");
      return Promise.reject("Rewarded ad not loaded");
    }
  }

  async addListener(eventName: 'onAdShow' | 'onAdClosed', listenerFunc: () => void): Promise<any> {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listenerFunc);
    return { remove: () => this.removeListener(eventName, listenerFunc) };
  }

  private removeListener(eventName: string, listenerFunc: Function) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== listenerFunc
      );
    }
  }

  triggerAdShow() {
    this.listeners['onAdShow']?.forEach(listener => listener());
  }

  triggerAdClosed() {
    this.listeners['onAdClosed']?.forEach(listener => listener());
  }
}

class NativeDialogWeb implements NativeDialogPlugin {
  async alert(options: { title: string; message: string }): Promise<void> {
    alert(`${options.title}\n${options.message}`);
  }

  async confirm(options: { title: string; message: string; okButtonTitle?: string; cancelButtonTitle?: string }): Promise<{ value: boolean }> {
    const result = confirm(`${options.title}\n${options.message}`);
    return { value: result };
  }

  async prompt(options: { title: string; message: string; okButtonTitle?: string; cancelButtonTitle?: string; inputPlaceholder?: string; inputText?: string }): Promise<{ value: string; cancelled: boolean }> {
    const result = prompt(`${options.title}\n${options.message}`, options.inputText || options.inputPlaceholder || '');
    return { value: result || '', cancelled: result === null };
  }
}

export const NativeAudio = registerPlugin<NativeAudioPlugin>('NativeAudio', {
  web: () => new WebAudioManager(),
});

export const NativeAdMob = registerPlugin<NativeAdMobPlugin>('NativeAdMob', {
  web: () => new NativeAdMobWeb(),
});

export const NativeDialog = registerPlugin<NativeDialogPlugin>('NativeDialog', {
  web: () => new NativeDialogWeb(),
});