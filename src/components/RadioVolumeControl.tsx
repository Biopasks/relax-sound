
import React, { useState, useCallback, useEffect } from 'react';
import { motion, Easing, Variants } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useMicroAnimations, sliderTrackGradient } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import { Button } from '@/components/ui/button';

const RadioVolumeControl: React.FC = () => {
  const { backgroundMusicVolume, setBackgroundMusicVolume, triggerHapticFeedback } = useSettings();
  const [localVolume, setLocalVolume] = useState(backgroundMusicVolume);
  const { hoverScale, tapScale } = useMicroAnimations();

  useEffect(() => {
    setLocalVolume(backgroundMusicVolume);
  }, [backgroundMusicVolume]);

  const handleSliderValueChange = useCallback((value: number[]) => {
    setLocalVolume(value[0]);
  }, []);

  const handleSliderValueCommit = useCallback((value: number[]) => {
    const newVolume = value[0];
    setBackgroundMusicVolume(newVolume);
    triggerHapticFeedback();
  }, [setBackgroundMusicVolume, triggerHapticFeedback]);

  const toggleMute = useCallback(() => {
    if (localVolume > 0) {
      setBackgroundMusicVolume(0);
    } else {
      setBackgroundMusicVolume(0.15);
    }
    triggerHapticFeedback();
  }, [localVolume, setBackgroundMusicVolume, triggerHapticFeedback]);

  return (
    <motion.div
      className="w-full p-4 bg-magic-gray-dark rounded-xl shadow-xl border border-gray-700 flex items-center gap-4"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.7 } },
      }}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="w-10 h-10 rounded-full flex items-center justify-center text-blue-300 hover:bg-gray-700/80 transition-colors duration-200"
        {...tapScale}
      >
        {localVolume === 0 ? <VolumeX size={24} className="text-gray-400" /> : <Volume2 size={24} className="text-magic-accent-blue" />}
      </Button>
      <Label htmlFor="radio-volume-slider" className="font-semibold text-lg text-gray-200 flex-shrink-0">
        Radio Volume
      </Label>
      <Slider
        id="radio-volume-slider"
        defaultValue={[localVolume]}
        max={1}
        step={0.01}
        onValueChange={handleSliderValueChange}
        onValueCommit={handleSliderValueCommit}
        value={[localVolume]}
        className="flex-1 [&>span:first-child]:h-6 [&>span:first-child]:bg-gray-700 [&>span:first-child>span]:bg-magic-accent-blue [&>span:first-child>span]:h-full [&>span:first-child>span]:w-full"
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          variants={sliderTrackGradient}
          animate="animate"
        />
      </Slider>
    </motion.div>
  );
};

export default RadioVolumeControl;