
import { createPortal } from 'react-dom';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import SoundBenefitCard from './SoundBenefitCard';
import { Sound } from '@/assets/audio';
import { cn } from '@/lib/utils';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations';
import AnimatedTextSegment from './AnimatedTextSegment';

interface SoundDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseWithEffects: () => void;
  sound: Sound;
}

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: "easeIn" } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const SoundDetailsPanel: React.FC<SoundDetailsPanelProps> = ({ isOpen, onClose, onCloseWithEffects, sound }) => {
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations();
  const { backgroundShimmerGlow } = usePowerfulAnimations();
  
  if (!sound) {
    return null;
  }

  // Maximize simplification of closing: only haptic feedback and onClose
  const handleClose = useCallback(() => {
    triggerHapticFeedback();
    onClose(); 
    // oncloseWithEffects() removed to exclude its effect on closing
  }, [onClose, triggerHapticFeedback]);

  const titleHighlightWords = {
    "about": "text-sound-details-accent font-bold",
    "sound": "text-sound-details-accent font-bold",
    [sound.name.toLowerCase()]: "text-sound-details-accent font-bold",
  };

  return (
    isOpen && createPortal(
        <motion.div
          key="sound-details-modal"
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={handleClose}
          />

          <motion.div
            className={cn(
              "relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl",
              "h-[90vh] sm:h-[80vh] md:h-[75vh]",
              "bg-black/80 backdrop-blur-2xl",
              "text-foreground border border-white/[0.08] shadow-premium-lg p-6 sm:p-8",
              "flex flex-col rounded-2xl overflow-hidden z-[99991]"
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                background: [
                  `radial-gradient(circle at 50% 50%, rgba(var(--sound-details-accent-rgb), 0.05) 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, rgba(var(--sound-details-accent-rgb), 0.1) 0%, transparent 70%)`,
                  `radial-gradient(circle at 50% 50%, rgba(var(--sound-details-accent-rgb), 0.05) 0%, transparent 70%)`
                ],
                scale: [1, 1.01, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as Easing }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
            />

            <div className="flex justify-between items-center mb-6 flex-shrink-0 relative z-10">
              <AnimatedTextSegment
                text={`About "${sound.name}" Sound`}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-sound-details-accent font-etude-noire truncate max-w-[80%]"
                highlightWords={titleHighlightWords}
                staggerDelay={0.05}
              />
              <Button variant="ghost" size="icon" onClick={handleClose} className="text-muted-foreground hover:text-sound-details-accent transition-colors w-10 h-10 sm:w-12 sm:h-12" {...hoverScale} {...tapScale}>
                <X size={24} />
              </Button>
            </div>

            <div className="flex-1 flex flex-col items-center text-center overflow-y-auto scrollbar-styled relative px-2 w-full">
              <div className="w-full max-w-full"><SoundBenefitCard sound={sound} /></div>
            </div>

            <div className="mt-6 text-center flex-shrink-0 relative z-10">
              <Button onClick={handleClose} className="bg-sound-details-accent/20 hover:bg-sound-details-accent/30 text-sound-details-accent font-semibold py-3 px-6 rounded-full shadow-md border border-sound-details-accent/30" {...hoverScale} {...tapScale}>
                <X size={20} className="mr-2" /> Close
              </Button>
            </div>
          </motion.div>
        </motion.div>,
      document.body
    )
  );
};

export default SoundDetailsPanel;