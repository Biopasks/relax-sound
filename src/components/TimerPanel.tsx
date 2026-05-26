
import { createPortal } from 'react-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, Variants, AnimationGeneratorType, Easing } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations'; // Updated import
import { showSuccess, showError } from '@/utils/toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";
import { useSound } from '@/context/SoundContext';
import { useSettings } from '@/context/SettingsContext';
import { X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatSecondsToHMS } from '@/utils/time-formatter';

const MotionButton = motion(Button);
const MotionSelectTrigger = motion(SelectTrigger);

interface TimerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
};

const TimerPanel: React.FC<TimerPanelProps> = ({ isOpen, onClose }) => {
  const { setSleepTimer, remainingTime } = useSound();
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const { hoverScale, tapScale, pulseSlow } = useMicroAnimations(); // Updated import
  const { triggerHapticFeedback } = useSettings();
  const { panelBounce, backgroundShimmerGlow } = usePowerfulAnimations(); // Import panelBounce

  useEffect(() => {
    if (isOpen) {
      if (remainingTime !== null) {
        const totalMinutes = Math.floor(remainingTime / 60);
        setSelectedHours(Math.floor(totalMinutes / 60));
        setSelectedMinutes(totalMinutes % 60);
      } else {
        setSelectedHours(1);
        setSelectedMinutes(0);
      }
    }
  }, [isOpen, remainingTime]);

  const timerOptions = [
    { label: '15 minutes', value: 15 },
    { label: '30 minutes', value: 30 },
    { label: '45 minutes', value: 45 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 },
    { label: 'Off', value: 0 },
  ];

  const handleSetTimer = useCallback((durationMinutes: number) => {
    setSleepTimer(durationMinutes === 0 ? null : durationMinutes * 60);
    if (durationMinutes > 0) {
      showSuccess(`Timer set for ${durationMinutes} minutes.`);
    } else {
      showSuccess('Timer turned off.');
    }
    triggerHapticFeedback();
    onClose();
  }, [setSleepTimer, showSuccess, onClose, triggerHapticFeedback]);

  const handleCustomSetTimer = useCallback(() => {
    const totalSeconds = (selectedHours * 60 + selectedMinutes) * 60;
    if (totalSeconds > 0) {
      setSleepTimer(totalSeconds);
      showSuccess(`Timer set for ${selectedHours}h ${selectedMinutes}m.`);
      triggerHapticFeedback();
      onClose();
    } else {
      showError('Please select a time for the timer.');
    }
  }, [selectedHours, selectedMinutes, setSleepTimer, showSuccess, showError, onClose, triggerHapticFeedback]);

  const generateNumbers = (min: number, max: number) => {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  };

  return (
    isOpen && createPortal(
        <motion.div
          key="timer-modal"
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={() => { onClose(); triggerHapticFeedback(); }}
          />

          <motion.div
            className={cn(
              "relative w-full max-w-md sm:max-w-lg md:max-w-xl",
              "h-auto max-h-[85vh] sm:max-h-[75vh]",
              "bg-black/80 backdrop-blur-2xl",
              "text-foreground border border-white/[0.08] shadow-premium-lg p-6 sm:p-8",
              "flex flex-col rounded-2xl overflow-hidden z-[99991]"
            )}
            variants={panelBounce}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
              animate={{
                background: [
                  `radial-gradient(circle at 50% 50%, rgba(var(--magic-cyan-accent-rgb), 0.05) 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, rgba(var(--magic-cyan-accent-rgb), 0.1) 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, rgba(var(--magic-cyan-accent-rgb), 0.05) 0%, transparent 70%)`
                ],
                scale: [1, 1.01, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as Easing }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
              {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
            />

            <div className="flex justify-between items-center mb-6 relative z-10 flex-shrink-0">
              <h2 className="text-2xl font-bold text-primary font-flemmatico flex items-center gap-2">
                <Clock size={24} /> Sleep Timer
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { onClose(); triggerHapticFeedback(); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </Button>
            </div>

            <motion.p
              className="text-base text-muted-foreground font-flemmatico mb-6 text-center relative z-10 flex-shrink-0"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              Set the time until automatic stop
            </motion.p>

            <motion.div
              className="grid grid-cols-3 gap-3 py-4 relative z-10 flex-shrink-0"
              variants={{
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {timerOptions.map((option) => (
                <motion.div key={option.value} variants={itemVariants}>
                  <MotionButton
                    onClick={() => handleSetTimer(option.value)}
                    className={`w-full py-4 rounded-lg text-base font-medium transition-all duration-200 shadow-md ${
                      option.value === 0
                        ? 'bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/30'
                        : 'bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30'
                    }`}
                    {...hoverScale}
                    {...tapScale}
                  >
                    {option.label}
                  </MotionButton>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-5 pt-4 border-t border-border/50 mt-6 relative z-10 flex-1 overflow-y-auto scrollbar-styled"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={itemVariants} className="text-xl font-semibold text-foreground flex-shrink-0">Or set manually</motion.span>
              <div className="flex items-center gap-4 flex-shrink-0">
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                  <span className="text-base text-muted-foreground mb-2">Hours</span>
                  <Select value={selectedHours.toString()} onValueChange={(value) => { setSelectedHours(parseInt(value)); triggerHapticFeedback(); }}>
                    <MotionSelectTrigger className="w-28 h-16 text-3xl bg-input border border-border text-primary font-extrabold rounded-lg shadow-md animate-border-glow" {...hoverScale} {...tapScale}>
                      <SelectValue placeholder="00" />
                    </MotionSelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground shadow-lg">
                      <SelectScrollUpButton />
                      {generateNumbers(0, 23).map((num) => (
                        <SelectItem key={num} value={num.toString()} className="text-lg h-12 py-2">{num.toString().padStart(2, '0')}</SelectItem>
                      ))}
                      <SelectScrollDownButton />
                    </SelectContent>
                  </Select>
                </motion.div>
                <span className="text-4xl text-primary font-bold mt-8">:</span>
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                  <span className="text-base text-muted-foreground mb-2">Minutes</span>
                  <Select value={selectedMinutes.toString()} onValueChange={(value) => { setSelectedMinutes(parseInt(value)); triggerHapticFeedback(); }}>
                    <MotionSelectTrigger className="w-28 h-16 text-3xl bg-input border border-border text-primary font-extrabold rounded-lg shadow-md animate-border-glow" {...hoverScale} {...tapScale}>
                      <SelectValue placeholder="00" />
                    </MotionSelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground shadow-lg">
                      <SelectScrollUpButton />
                      {generateNumbers(0, 59).map((num) => (
                        <SelectItem key={num} value={num.toString()} className="text-lg h-12 py-2">{num.toString().padStart(2, '0')}</SelectItem>
                      ))}
                      <SelectScrollDownButton />
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
              <MotionButton onClick={handleCustomSetTimer} className="w-full bg-primary/20 hover:bg-primary/30 text-primary font-semibold py-5 rounded-lg shadow-md border border-primary/30 flex-shrink-0" {...hoverScale} {...tapScale} variants={itemVariants}>
                Set {selectedHours}h {selectedMinutes}m
              </MotionButton>
            </motion.div>

            <motion.div className="text-center text-base font-medium pt-4 mt-auto relative z-10 flex-shrink-0" variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              {remainingTime === null ? (
                <motion.span className="text-destructive text-xl font-bold" {...pulseSlow}>Timer not set</motion.span>
              ) : (
                <span className="text-foreground text-xl font-bold">{formatSecondsToHMS(remainingTime)}</span>
              )}
            </motion.div>
          </motion.div>
        </motion.div>,
      document.body
    )
  );
};

export default TimerPanel;