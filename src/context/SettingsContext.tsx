
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { useColorScheme } from '@/hooks/use-color-scheme'; // Import hook to determine system theme

type Theme = 'light' | 'dark' | 'system';

interface SettingsContextType {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>; // Correct typing
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hapticFeedbackEnabled: boolean;
  setHapticFeedbackEnabled: React.Dispatch<React.SetStateAction<boolean>>; // Correct typing
  notificationsEnabled: boolean;
  setNotificationsEnabled: React.Dispatch<React.SetStateAction<boolean>>; // Correct typing
  isTestModeEnabled: boolean;
  setIsTestModeEnabled: React.Dispatch<React.SetStateAction<boolean>>; // Correct typing
  radioButtonClickCount: number;
  setRadioButtonClickCount: React.Dispatch<React.SetStateAction<number>>; // Correct typing
  currentRadioAuraColorIndex: number;
  setCurrentRadioAuraColorIndex: React.Dispatch<React.SetStateAction<number>>; // FIXED: Type changed to number
  triggerHapticFeedback: () => void;
  backgroundMusicVolume: number;
  setBackgroundMusicVolume: React.Dispatch<React.SetStateAction<number>>; // Correct typing
  hasCompletedMagicOnboarding: boolean; // NEW: Added property
  setHasCompletedMagicOnboarding: React.Dispatch<React.SetStateAction<boolean>>; // NEW: Added function
  favoriteSounds: string[]; // NEW: List of favorite sound IDs
  toggleFavoriteSound: (soundId: string) => void; // NEW: Function to add/remove from favorites
  unlockedPremiumSounds: string[]; // NEW: List of unlocked premium sound IDs
  unlockSound: (soundId: string) => void; // NEW: Function to unlock sound
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_KEY = 'appSettings';

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme(); // Use hook to get system theme

  const [volume, setVolume] = useState(0.5);
  const [theme, setThemeState] = useState<Theme>('system'); // Initialize with 'system'
  const [hapticFeedbackEnabled, setHapticFeedbackEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isTestModeEnabled, setIsTestModeEnabled] = useState(false);
  const [radioButtonClickCount, setRadioButtonClickCount] = useState(0);
  const [currentRadioAuraColorIndex, setCurrentRadioAuraColorIndex] = useState(0);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(0.7); // CHANGED: Increased default volume
  const [hasCompletedMagicOnboarding, setHasCompletedMagicOnboarding] = useState(false); // NEW: Onboarding state
  const [favoriteSounds, setFavoriteSounds] = useState<string[]>([]); // NEW: State for favorite sounds
  const [unlockedPremiumSounds, setUnlockedPremiumSounds] = useState<string[]>([]); // NEW: State for unlocked premium sounds

  // Load settings on startup
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { value } = await Preferences.get({ key: SETTINGS_KEY });
        if (value) {
          const savedSettings = JSON.parse(value);
          setVolume(savedSettings.volume ?? 0.5);
          setThemeState(savedSettings.theme ?? 'system'); // Load saved theme
          setHapticFeedbackEnabled(savedSettings.hapticFeedbackEnabled ?? true);
          setNotificationsEnabled(savedSettings.notificationsEnabled ?? true);
          setIsTestModeEnabled(savedSettings.isTestModeEnabled ?? false);
          setRadioButtonClickCount(savedSettings.radioButtonClickCount ?? 0);
          setCurrentRadioAuraColorIndex(savedSettings.currentRadioAuraColorIndex ?? 0);
          setBackgroundMusicVolume(savedSettings.backgroundMusicVolume ?? 0.7); // CHANGED: Increased default volume
          setHasCompletedMagicOnboarding(savedSettings.hasCompletedMagicOnboarding ?? false); // NEW: Load onboarding state
          setFavoriteSounds(savedSettings.favoriteSounds ?? []); // NEW: Load favorite sounds
          setUnlockedPremiumSounds(savedSettings.unlockedPremiumSounds ?? []); // NEW: Load unlocked sounds
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    };
    loadSettings();
  }, []);

  // Save settings on change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await Preferences.set({
          key: SETTINGS_KEY,
          value: JSON.stringify({
            volume,
            theme,
            hapticFeedbackEnabled,
            notificationsEnabled,
            isTestModeEnabled,
            radioButtonClickCount,
            currentRadioAuraColorIndex,
            backgroundMusicVolume,
            hasCompletedMagicOnboarding, // NEW: Save onboarding state
            favoriteSounds, // NEW: Save favorite sounds
            unlockedPremiumSounds, // NEW: Save unlocked sounds
          }),
        });
      } catch (e) {
        console.error("Failed to save settings:", e);
      }
    };
    saveSettings();
  }, [
    volume,
    theme,
    hapticFeedbackEnabled,
    notificationsEnabled,
    isTestModeEnabled,
    radioButtonClickCount,
    currentRadioAuraColorIndex,
    backgroundMusicVolume,
    hasCompletedMagicOnboarding, // NEW: Added to dependencies
    favoriteSounds, // NEW: Added to dependencies
    unlockedPremiumSounds, // NEW: Added to dependencies
  ]);

  // Apply theme to HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme, systemTheme]);

  const triggerHapticFeedback = useCallback(() => {
    if (hapticFeedbackEnabled && Capacitor.isPluginAvailable('Haptics')) {
      Haptics.impact({ style: ImpactStyle.Light });
    }
  }, [hapticFeedbackEnabled]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleFavoriteSound = useCallback((soundId: string) => {
    setFavoriteSounds(prevFavorites => {
      if (prevFavorites.includes(soundId)) {
        return prevFavorites.filter(id => id !== soundId);
      } else {
        return [...prevFavorites, soundId];
      }
    });
  }, []);

  const unlockSound = useCallback((soundId: string) => {
    setUnlockedPremiumSounds(prevUnlocked => {
      if (!prevUnlocked.includes(soundId)) {
        return [...prevUnlocked, soundId];
      }
      return prevUnlocked;
    });
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        volume,
        setVolume,
        theme,
        setTheme,
        hapticFeedbackEnabled,
        setHapticFeedbackEnabled,
        notificationsEnabled,
        setNotificationsEnabled,
        isTestModeEnabled,
        setIsTestModeEnabled,
        radioButtonClickCount,
        setRadioButtonClickCount,
        currentRadioAuraColorIndex,
        setCurrentRadioAuraColorIndex,
        triggerHapticFeedback,
        backgroundMusicVolume,
        setBackgroundMusicVolume,
        hasCompletedMagicOnboarding, // NEW: Export
        setHasCompletedMagicOnboarding, // NEW: Export
        favoriteSounds, // NEW: Export
        toggleFavoriteSound, // NEW: Export
        unlockedPremiumSounds, // NEW: Export
        unlockSound, // NEW: Export
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};