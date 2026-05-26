
import { createPortal } from 'react-dom';
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Palette } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations';
import { vinylDesigns, VinylDesign } from '@/lib/vinyl-designs';
import AnimatedTextSegment from '../AnimatedTextSegment';
import { vinylDesignAuraColors } from '@/hooks/animations/utils'; // Import color utility

interface VinylDesignSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDesignId: string;
  onDesignSelect: (designId: string) => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetVariants: Variants = {
  hidden: { y: "100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 120, duration: 0.6 } },
};

const VinylDesignSelectionSheet: React.FC<VinylDesignSelectionSheetProps> = ({
  isOpen,
  onClose,
  selectedDesignId,
  onDesignSelect,
}) => {
  const { triggerHapticFeedback } = useSettings();
  const { hoverScale, tapScale } = useMicroAnimations();
  const { backgroundShimmerGlow } = usePowerfulAnimations();
  const [flashDesignId, setFlashDesignId] = useState<string | null>(null);

  const handleSelect = useCallback((designId: string) => {
    setFlashDesignId(designId);
    onDesignSelect(designId);
    triggerHapticFeedback();
    
    // Clear flash effect after animation duration
    setTimeout(() => {
      setFlashDesignId(null);
      onClose();
    }, 500); 
  }, [onDesignSelect, onClose, triggerHapticFeedback]);

  const flashVariants: Variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.5, 2.5],
      transition: { duration: 0.5, ease: "easeOut" as Easing }
    }
  };

  const pulseVariants = (colorRgb: string): Variants => ({
    animate: {
      boxShadow: [
        `0 0 0px rgba(${colorRgb}, 0)`,
        `0 0 10px 3px rgba(${colorRgb}, 0.6)`,
        `0 0 0px rgba(${colorRgb}, 0)`
      ],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut" as Easing,
      }
    }
  });

  return (
    isOpen && createPortal(
        <motion.div
          key="vinyl-design-sheet"
          className="fixed inset-0 z-[99992] flex items-center justify-center p-0" 
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />

          <motion.div
            className={cn(
              "relative w-full h-dvh max-w-full",
              "bg-black/80 backdrop-blur-2xl",
              "text-foreground border-t border-white/[0.08] shadow-premium-lg p-6 sm:p-8",
              "flex flex-col rounded-none overflow-hidden z-[99993]"
            )}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" {...backgroundShimmerGlow('var(--app-global-accent-rgb)')} />

            <div className="flex justify-between items-center mb-6 flex-shrink-0 relative z-10">
              <AnimatedTextSegment text="Select Design" className="text-xl sm:text-2xl font-bold text-magic-cyan-accent font-etude-noire" staggerDelay={0.05} />
              <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-magic-cyan-accent transition-colors w-10 h-10 sm:w-12 sm:h-12" {...hoverScale} {...tapScale}>
                <X size={24} />
              </Button>
            </div>

            <div           className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 content-start overflow-y-auto scrollbar-styled relative z-10 pb-28"> 
              {vinylDesigns.map((design: VinylDesign) => {
                const colorRgb = vinylDesignAuraColors[design.id] || 'var(--radio-aura-classic-black-rgb)';
                return (
                  <motion.div
                    key={design.id}
                    className={cn("relative p-2 min-h-[90px] rounded-xl border-2 cursor-pointer transition-all duration-200 overflow-hidden", design.id === selectedDesignId ? "border-magic-cyan-accent bg-magic-cyan-accent/20 shadow-lg shadow-magic-cyan-accent/30" : "border-gray-700/50 bg-magic-gray-dark/50 hover:border-gray-500/70")}
                    onClick={() => handleSelect(design.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence>
                      {flashDesignId === design.id && (
                        <motion.div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: `radial-gradient(circle at center, rgba(${colorRgb}, 0.8) 0%, transparent 70%)` }} variants={flashVariants} initial="initial" animate="animate" exit="initial" />
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col items-center justify-center text-center relative z-10">
                      <motion.div className={cn("w-12 h-12 rounded-full mb-1 flex-shrink-0 border-2 flex items-center justify-center")} variants={pulseVariants(colorRgb)} animate="animate" style={{ borderColor: `rgba(${colorRgb}, 0.7)`, background: `radial-gradient(circle at center, rgba(${colorRgb}, 0.2) 0%, transparent 70%)` }}>
                        <div className={cn("w-8 h-8 rounded-full", design.mainDisc)} />
                      </motion.div>
                      <p className={cn("text-[10px] sm:text-xs font-bold leading-tight w-full", design.id === selectedDesignId ? "text-white" : "text-gray-100")}>{design.name}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 text-center flex-shrink-0 relative z-10">
              <Button onClick={onClose} className="bg-magic-cyan-accent/20 hover:bg-magic-cyan-accent/30 text-magic-cyan-accent font-semibold py-3 px-6 rounded-full shadow-md border border-magic-cyan-accent/30" {...hoverScale} {...tapScale}>
                <X size={20} className="mr-2" /> Close
              </Button>
            </div>
          </motion.div>
        </motion.div>,
      document.body
    )
  );
};

export default VinylDesignSelectionSheet;