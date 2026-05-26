
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSettings } from '@/context/SettingsContext';
import { useMicroAnimations } from '@/hooks/use-animations'; // Обновленный импорт

interface RadioVolumeStackProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  className?: string;
  stackHeightClass?: string;
  stackWidthClass?: string;
  segmentCount?: number;
  activeColorClass?: string;
  inactiveColorClass?: string;
}

const MotionButton = motion(Button);

const RadioVolumeStack: React.FC<RadioVolumeStackProps> = ({
  volume,
  onVolumeChange,
  className,
  stackHeightClass = "h-20",
  stackWidthClass = "w-8",
  segmentCount = 5,
  activeColorClass = "bg-magic-accent-green",
  inactiveColorClass = "bg-gray-700/50",
}) => {
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations(); // Обновленный импорт

  const [isMuted, setIsMuted] = useState(volume === 0);
  const [lastVolume, setLastVolume] = useState(volume > 0 ? volume : 0.15);

  useEffect(() => {
    setIsMuted(volume === 0);
    if (volume > 0) {
      setLastVolume(volume);
    }
  }, [volume]);

  const handleToggleMute = useCallback(() => {
    triggerHapticFeedback();
    if (isMuted) {
      onVolumeChange(lastVolume);
    } else {
      onVolumeChange(0);
    }
  }, [isMuted, lastVolume, onVolumeChange, triggerHapticFeedback]);

  const handleSliderValueChange = useCallback((value: number[]) => {
    onVolumeChange(value[0]);
  }, [onVolumeChange]);

  const segments = Array.from({ length: segmentCount }).map((_, i) => {
    const segmentVolumeThreshold = (i + 1) / segmentCount;
    const isActive = volume >= segmentVolumeThreshold;
    return (
      <motion.div
        key={i}
        className={cn(
          "flex-1 rounded-sm mx-0.5",
          isActive ? activeColorClass : inactiveColorClass
        )}
        initial={{ opacity: 0.5, scaleY: 0.8 }}
        animate={{ opacity: isActive ? 1 : 0.5, scaleY: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.1 }}
      />
    );
  }).reverse();

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center p-1 bg-magic-gray-dark/70 rounded-xl shadow-xl border border-gray-700/50",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <MotionButton
        variant="ghost"
        size="icon"
        onClick={handleToggleMute}
        className="w-8 h-8 rounded-full flex items-center justify-center text-blue-300 hover:bg-gray-700/80 transition-colors duration-200 mb-2"
        {...tapScale}
        asChild
      >
        {isMuted ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-magic-accent-green" />}
      </MotionButton>

      <div className={cn("relative flex flex-col-reverse justify-end", stackHeightClass, stackWidthClass)}>
        <div className="absolute inset-0 flex flex-col justify-end">
          {segments}
        </div>
        <Slider
          orientation="vertical"
          defaultValue={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleSliderValueChange}
          value={[volume]}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default RadioVolumeStack;