import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import NotFound from "@/pages/NotFound";
import BottomNav from "@/components/BottomNav";
import { SoundProvider, useSound } from "@/context/SoundContext";
import { AdMobProvider } from "@/context/AdMobContext";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import BackgroundEffects from "@/components/BackgroundEffects";
import { motion, AnimatePresence, Variants } from "framer-motion";
import GameLoadingBar from "@/components/GameLoadingBar";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import { sounds } from "@/assets/audio";
import MagicOnboardingScreen, { onboardingSteps } from "@/components/MagicOnboardingScreen";
import { SessionProvider } from "@/context/SessionContext";
import GlobalParticleBurst from "@/components/GlobalParticleBurst";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { cn } from "@/lib/utils";
import { PlayerProps } from "@/pages/Player";
import { useNeuralLayout } from "@/hooks/use-neural-layout";
import { vinylDesignAuraColors } from "@/hooks/animations/utils";

const LazySoundSelection = React.lazy(() => import("@/pages/SoundSelection").then(module => ({ default: module.default })));
const LazyPlayer = React.lazy(() => import("@/pages/Player").then(module => ({ default: module.default }))) as React.LazyExoticComponent<React.FC<PlayerProps>>;
const LazyHistory = React.lazy(() => import("@/pages/History").then(module => ({ default: module.default })));
const LazySettings = React.lazy(() => import("@/pages/Settings").then(module => ({ default: module.default })));
const LazyFavorites = React.lazy(() => import("@/pages/Favorites").then(module => ({ default: module.default })));

const pageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

const AppContent = React.memo(() => {
  const { navRef } = useNeuralLayout();
  const { hasCompletedMagicOnboarding, setHasCompletedMagicOnboarding } = useSettings();
  const { currentNoise } = useSound();

  useEffect(() => {
    if (!currentNoise) return;
    const designId = currentNoise.vinylDesignId;
    const auraVar = vinylDesignAuraColors[designId];
    if (auraVar) {
      const rgb = getComputedStyle(document.documentElement).getPropertyValue(auraVar.replace('var(', '').replace(')', '')).trim();
      if (rgb) {
        document.documentElement.style.setProperty('--current-theme-rgb', rgb);
      }
    }
  }, [currentNoise]);

  const [triggerGlobalCloseEffects, setTriggerGlobalCloseEffects] = useState(false);

  const handleGlobalCloseEffects = useCallback(() => {
    setTriggerGlobalCloseEffects(true);
    Haptics.impact({ style: ImpactStyle.Heavy });
  }, []);

  const onParticleBurstComplete = useCallback(() => {
    setTriggerGlobalCloseEffects(false);
  }, []);

  const [isAppGlobalLoading, setIsAppGlobalLoading] = useState(true);
  const [globalLoadingProgress, setGlobalLoadingProgress] = useState(0);
  const [globalStatusText, setGlobalStatusText] = useState("Preparing system...");

  const allImageUrls = useMemo(() => {
    const onboardingImages = onboardingSteps.flatMap(step => step.images || []);
    const soundImages = sounds.flatMap(sound => sound.images || []);
    return [...new Set([...onboardingImages, ...soundImages])];
  }, []);
  const { isLoading: areImagesLoading, progress: imageLoadingProgress } = useImagePreloader(allImageUrls);

  useEffect(() => {
    if (!areImagesLoading) {
      setGlobalLoadingProgress(100);
      setGlobalStatusText("Loading complete!");
      const timer = setTimeout(() => setIsAppGlobalLoading(false), 300);
      return () => clearTimeout(timer);
    }
    const interval = setInterval(() => {
      setGlobalLoadingProgress(prev => Math.min(prev + 5, 90));
      setGlobalStatusText(`Loading resources: ${Math.min(Math.floor(imageLoadingProgress * 100), 90)}%`);
    }, 200);
    return () => clearInterval(interval);
  }, [areImagesLoading, imageLoadingProgress]);

  const handleOnboardingComplete = useCallback(() => {
    setHasCompletedMagicOnboarding(true);
  }, [setHasCompletedMagicOnboarding]);

  const triggerAppShakeEffect = useCallback(() => {
    Haptics.impact({ style: ImpactStyle.Light });
  }, []);

  return (
    <TooltipProvider>
      <Toaster position="top-right" />
      <div className="fixed inset-0 w-full overflow-hidden" style={{ background: `linear-gradient(135deg, rgb(5,5,10) 0%, rgba(var(--current-theme-rgb, 59,130,246), 0.1) 30%, rgba(var(--current-theme-rgb, 59,130,246), 0.06) 70%, rgb(5,5,10) 100%)` }}>
        <BackgroundEffects currentSoundId={currentNoise?.id || null} />

        <div className="w-full relative" style={{ height: 'calc(100vh - var(--nav-height, 80px))', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {isAppGlobalLoading ? (
              <motion.div key="global-loading" variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
                <GameLoadingBar progress={globalLoadingProgress} statusText={globalStatusText} />
              </motion.div>
            ) : !hasCompletedMagicOnboarding ? (
              <MagicOnboardingScreen key="onboarding-screen" onComplete={handleOnboardingComplete} />
            ) : (
              <motion.div key="main-app-routes" variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full relative z-[10001]">
                <Suspense fallback={<GameLoadingBar progress={100} statusText="Loading complete!" />}>
                  <Routes>
                    <Route path="/" element={<LazySoundSelection />} />
                    <Route path="/player" element={<LazyPlayerWrapper onCloseWithEffects={handleGlobalCloseEffects} />} />
                    <Route path="/history" element={<LazyHistory />} />
                    <Route path="/settings" element={<LazySettings />} />
                    <Route path="/favorites" element={<LazyFavorites />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {triggerGlobalCloseEffects && (
            <GlobalParticleBurst key="particle-burst" onComplete={onParticleBurstComplete} />
          )}
        </AnimatePresence>
      </div>
      
      {!isAppGlobalLoading && hasCompletedMagicOnboarding && <BottomNav ref={navRef} triggerAppShakeEffect={triggerAppShakeEffect} />}
    </TooltipProvider>
  );
});

const LazyPlayerWrapper: React.FC<{ onCloseWithEffects: () => void }> = ({ onCloseWithEffects }) => (
  <LazyPlayer onCloseWithEffects={onCloseWithEffects} />
);

const App = () => (
  <BrowserRouter>
    <SettingsProvider>
      <SessionProvider>
        <SoundProvider>
          <AdMobProvider>
            <AppContent />
          </AdMobProvider>
        </SoundProvider>
      </SessionProvider>
    </SettingsProvider>
  </BrowserRouter>
);

export default App;
