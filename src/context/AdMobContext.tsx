import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NativeAdMob } from '@/capacitor-plugins/NativeBridge'; // Updated import path
import { onAdInterstitialShow, onAdAudioPauseError } from '@/utils/analytics';

interface AdMobContextType {
  showInterstitial: () => Promise<void>;
  showRewarded: () => Promise<{ rewarded: boolean; rewardItem?: { amount: number; type: string } }>; // Clarified return type
  isInterstitialReady: boolean;
  isRewardedReady: boolean;
}

const AdMobContext = createContext<AdMobContextType | undefined>(undefined);

export const AdMobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInterstitialReady, setIsInterstitialReady] = useState(false);
  const [isRewardedReady, setIsRewardedReady] = useState(false);

  const initializeAdMob = useCallback(async () => {
    try {
      await NativeAdMob.initialize({
        requestTrackingAuthorization: true, // Request tracking permission for iOS
        testingDevices: [], // Add your test device IDs
        initializeForTesting: false, // Set to true for testing
      });
      console.log('AdMob initialized successfully');
      await loadInterstitial();
      await loadRewarded();
    } catch (error) {
      console.error('AdMob initialization error:', error);
    }
  }, []);

  const loadInterstitial = useCallback(async () => {
    try {
      await NativeAdMob.loadInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', // Test ID
      });
      setIsInterstitialReady(true);
      console.log('Interstitial ad loaded');
    } catch (error) {
      console.error('Interstitial ad load error:', error);
      setIsInterstitialReady(false);
    }
  }, []);

  const showInterstitial = useCallback(async () => {
    if (isInterstitialReady) {
      try {
        await NativeAdMob.showInterstitial();
        setIsInterstitialReady(false); // Ad shown, need to load a new one
        onAdInterstitialShow();
        console.log('Interstitial ad shown');
        // Load a new ad after showing
        loadInterstitial();
      } catch (error) {
        console.error('Interstitial ad show error:', error);
        onAdAudioPauseError();
        setIsInterstitialReady(false);
        loadInterstitial(); // Attempt to load a new ad even on error
      }
    } else {
      console.log('Interstitial ad not ready');
      loadInterstitial(); // Attempt to load if not ready
    }
  }, [isInterstitialReady, loadInterstitial]);

  const loadRewarded = useCallback(async () => {
    try {
      await NativeAdMob.loadRewarded({
        adId: 'ca-app-pub-3940256099942544/5224354917', // Test ID
      });
      setIsRewardedReady(true);
      console.log('Rewarded ad loaded');
    } catch (error) {
      console.error('Rewarded ad load error:', error);
      setIsRewardedReady(false);
    }
  }, []);

  const showRewarded = useCallback(async (): Promise<{ rewarded: boolean; rewardItem?: { amount: number; type: string } }> => {
    if (isRewardedReady) {
      try {
        const result = await NativeAdMob.showRewarded();
        setIsRewardedReady(false); // Ad shown, need to load a new one
        loadRewarded(); // Load a new ad after showing
        return result; // Return result directly
      } catch (error) {
        console.error('Rewarded ad show error:', error);
        setIsRewardedReady(false);
        loadRewarded(); // Attempt to load a new ad even on error
        return { rewarded: false }; // Return false on error
      }
    } else {
      console.log('Rewarded ad not ready');
      loadRewarded(); // Attempt to load if not ready
      return { rewarded: false }; // Return false if ad is not ready
    }
  }, [isRewardedReady, loadRewarded]);

  useEffect(() => {
    initializeAdMob();
  }, [initializeAdMob]);

  return (
    <AdMobContext.Provider value={{ showInterstitial, showRewarded, isInterstitialReady, isRewardedReady }}>
      {children}
    </AdMobContext.Provider>
  );
};

export const useAdMob = () => {
  const context = useContext(AdMobContext);
  if (context === undefined) {
    throw new Error('useAdMob must be used within an AdMobProvider');
  }
  return context;
};