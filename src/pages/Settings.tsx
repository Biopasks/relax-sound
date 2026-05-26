
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMicroAnimations, headerButton3DTilt, usePowerfulAnimations } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { Volume2, VolumeX, Sun, Moon, Palette, Bell, Zap, FlaskConical, Lightbulb, Settings2, Sparkles, Waves, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useSound } from '@/context/SoundContext';
import MagicBackButton from '@/components/MagicBackButton';

const MotionButton = motion(Button);
const MotionSlider = motion(Slider);
const MotionSelectTrigger = motion(SelectTrigger);

const GlassSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}> = ({ children, className, variants }) => (
  <motion.div
    variants={variants}
    className={cn(
      "w-full p-4 rounded-2xl",
      "bg-white/5 dark:bg-black/20 backdrop-blur-xl",
      "border border-white/10 dark:border-white/5",
      "shadow-lg shadow-black/5",
      "transition-all duration-300",
      className
    )}
  >
    {children}
  </motion.div>
);

const SettingRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  description?: string;
}> = ({ icon, label, children, description }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-3 min-w-0">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <Label className="text-base font-semibold text-foreground truncate block">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">{description}</p>
        )}
      </div>
    </div>
    <div className="shrink-0">
      {children}
    </div>
  </div>
);

const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }) => (
  <div className="w-full px-1 pt-2 pb-1">
    <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">{title}</h2>
    {subtitle && <p className="text-xs text-muted-foreground/30 mt-0.5">{subtitle}</p>}
  </div>
);

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const {
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
    triggerHapticFeedback
  } = useSettings();
  const { setNoiseVolume } = useSound();

  const [localVolume, setLocalVolume] = useState(volume);
  const { hoverScale, tapScale } = useMicroAnimations();

  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);

  const handleSliderValueChange = useCallback((value: number[]) => {
    setLocalVolume(value[0]);
  }, []);

  const handleSliderValueCommit = useCallback((value: number[]) => {
    setVolume(value[0]);
    setNoiseVolume(value[0]);
    triggerHapticFeedback();
  }, [setVolume, setNoiseVolume, triggerHapticFeedback]);

  const handleGoBack = useCallback(() => {
    triggerHapticFeedback();
    navigate(-1);
  }, [navigate, triggerHapticFeedback]);

  const handleToggleTestMode = useCallback(() => {
    setIsTestModeEnabled(prev => !prev);
    triggerHapticFeedback();
    toast({
      title: "Test Mode",
      description: isTestModeEnabled ? "Test mode disabled." : "Test mode enabled! All sounds unlocked.",
      className: "bg-black/70 backdrop-blur-xl border-white/10 text-white",
    });
  }, [isTestModeEnabled, setIsTestModeEnabled, triggerHapticFeedback]);

  const pageVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 18, stiffness: 100 } },
  };

  return (
    <motion.div
      className="relative flex flex-col h-full min-h-0 items-center text-foreground px-4 py-2 bg-background select-none"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.header
        className="w-full z-10 pt-4 pb-2 flex-shrink-0"
        variants={itemVariants}
      >
        <div className="w-full max-w-2xl mx-auto flex justify-between items-center mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <MagicBackButton />
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center mx-2">
            <motion.h1
              className="text-xl sm:text-2xl font-bold text-foreground drop-shadow-md font-etude-noire text-center flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Settings2 className="w-5 h-5 text-muted-foreground/70" />
              Settings
            </motion.h1>
          </div>

          <div className="w-10" />
        </div>
      </motion.header>

      <motion.main
        className="flex-1 min-h-0 flex flex-col items-center w-full max-w-2xl px-2 py-4 pb-20 gap-2 overflow-y-auto scrollbar-styled z-10"
        variants={{
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <SectionHeader title="Audio" subtitle="Sound output preferences" />
        <GlassSection variants={itemVariants}>
          <SettingRow
            icon={localVolume === 0 ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} className="text-green-400" />}
            label="Volume"
            description="Master output level"
          >
            <MotionSlider
              id="volume-slider"
              defaultValue={[localVolume]}
              max={1}
              step={0.1}
              onValueChange={handleSliderValueChange}
              onValueCommit={handleSliderValueCommit}
              value={[localVolume]}
              className="w-28 sm:w-36 [&>span:first-child]:h-6 [&>span:first-child]:bg-white/10 [&>span:first-child>span]:bg-green-400 [&>span:first-child>span]:h-full"
              {...hoverScale}
              {...tapScale}
            />
          </SettingRow>
        </GlassSection>

        <SectionHeader title="Appearance" subtitle="Visual customization" />
        <GlassSection variants={itemVariants}>
          <SettingRow
            icon={<Palette size={18} className="text-purple-400" />}
            label="Theme"
            description="Color scheme preference"
          >
            <Select value={theme} onValueChange={(value: 'light' | 'dark' | 'system') => { setTheme(value); triggerHapticFeedback(); }}>
              <MotionSelectTrigger
                id="theme-select"
                className="w-[130px] bg-white/5 border-white/10 text-foreground"
                {...hoverScale}
                {...tapScale}
              >
                <SelectValue placeholder="Select Theme" />
              </MotionSelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-foreground">
                <SelectItem value="light">
                  <span className="flex items-center gap-2"><Sun size={14} /> Light</span>
                </SelectItem>
                <SelectItem value="dark">
                  <span className="flex items-center gap-2"><Moon size={14} /> Dark</span>
                </SelectItem>
                <SelectItem value="system">
                  <span className="flex items-center gap-2"><Settings2 size={14} /> System</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </GlassSection>

        <SectionHeader title="Behavior" subtitle="Interaction preferences" />
        <GlassSection variants={itemVariants}>
          <SettingRow
            icon={<Zap size={18} className="text-cyan-400" />}
            label="Vibro"
            description="Haptic feedback on interactions"
          >
            <Switch
              id="haptic-switch"
              checked={hapticFeedbackEnabled}
              onCheckedChange={(checked) => { setHapticFeedbackEnabled(checked); triggerHapticFeedback(); }}
              className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-white/10"
              {...hoverScale}
              {...tapScale}
            />
          </SettingRow>
        </GlassSection>

        <GlassSection variants={itemVariants}>
          <SettingRow
            icon={<Bell size={18} className="text-orange-400" />}
            label="Notifications"
            description="App notifications"
          >
            <Switch
              id="notifications-switch"
              checked={notificationsEnabled}
              onCheckedChange={(checked) => { setNotificationsEnabled(checked); triggerHapticFeedback(); }}
              className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-white/10"
              {...hoverScale}
              {...tapScale}
            />
          </SettingRow>
        </GlassSection>

        <SectionHeader title="Advanced" subtitle="Developer options" />
        <GlassSection variants={itemVariants}>
          <SettingRow
            icon={<FlaskConical size={18} className={isTestModeEnabled ? "text-yellow-300" : "text-muted-foreground/50"} />}
            label="Test Mode"
            description="Unlock all premium features"
          >
            <Switch
              id="test-mode-switch"
              checked={isTestModeEnabled}
              onCheckedChange={handleToggleTestMode}
              className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-white/10"
              {...hoverScale}
              {...tapScale}
            />
          </SettingRow>
        </GlassSection>
      </motion.main>
    </motion.div>
  );
};

export default Settings;
