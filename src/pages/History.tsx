
import React from 'react';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations';
import { useSettings } from '@/context/SettingsContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HistoryCard from '@/components/HistoryCard';
import { NativeDialog } from '@/capacitor-plugins/NativeBridge';
import { useSession } from '@/context/SessionContext';
import { cn } from '@/lib/utils';
import MagicBackButton from '@/components/MagicBackButton'; // Import MagicBackButton

const MotionButton = motion(Button);

const History: React.FC = () => {
  const { sessionHistory, clearHistory } = useSession();
  const { hoverScale, tapScale, textFade, textReveal } = useMicroAnimations();
  const { triggerHapticFeedback } = useSettings();
  const { backgroundShimmerGlow } = usePowerfulAnimations();

  const handleClearHistory = async () => {
    triggerHapticFeedback();
    const { value } = await NativeDialog.confirm({
      title: "Clear History?",
      message: "Are you sure you want to delete all listening history records? This action is irreversible.",
      okButtonTitle: "Yes, Clear",
      cancelButtonTitle: "Cancel",
    });

    if (value) {
      clearHistory();
    }
  };

  const pageVariants: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.2 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const headerVariants: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const emptyStateVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.4 } },
  };

  const carouselContainerVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const clearButtonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col h-full text-gray-100 overflow-hidden select-none relative"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `linear-gradient(45deg, hsl(var(--gradient-blue-dark)), hsl(var(--gradient-blue-light)), hsl(var(--gradient-blue-dark)))`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      {/* NEW: Background shimmer glow for the history page */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />

      <motion.header
        className="w-full text-center py-6 bg-gradient-to-b from-magic-blue-start/80 to-transparent z-10 relative"
        variants={headerVariants}
      >
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <MagicBackButton />
          </motion.div>
          <div className="flex-1 text-center">
            <motion.h1
              className="text-4xl font-extrabold text-white drop-shadow-md mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Session History
            </motion.h1>
            <motion.p {...textFade} className="text-lg text-gray-300">Your recent listening sessions</motion.p>
          </div>
          <div className="w-12"></div> {/* Placeholder for symmetry */}
        </div>
      </motion.header>

      <motion.main
        className="flex-1 flex flex-col p-4 overflow-y-auto scrollbar-styled w-full max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sessionHistory.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center px-4"
            variants={emptyStateVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div {...textReveal}>
              <HistoryIcon size={96} className="mb-8 text-magic-accent-blue/70" />
            </motion.div>
            <motion.p {...textReveal} className="text-2xl font-semibold mb-3 text-white">No records yet</motion.p>
            <motion.p {...textFade} className="text-lg text-gray-300">
              Start playing sounds to see them here
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            // Уменьшаем горизонтальный padding здесь, чтобы карусель могла использовать больше места
            className="flex-1 flex flex-col items-center w-full pt-4 gap-y-8 relative" 
            variants={carouselContainerVariants}
            initial="initial"
            animate="animate"
          >
            <Carousel
              className="w-full px-10 sm:px-16" // Добавляем горизонтальный padding к самой карусели
              opts={{
                align: "center", // Center alignment for better visual appeal
                loop: true,
              }}
            >
              <CarouselContent className="flex gap-4">
                {sessionHistory.map((session, index) => (
                  <CarouselItem 
                    key={session.id} 
                    // На мобильных 80% ширины, на планшетах 50%, на десктопах 33%
                    className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4" 
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex justify-center items-center w-full h-full p-2" // Added padding for spacing
                    >
                      <HistoryCard session={session} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="left-0 md:left-2 bg-magic-gray-dark/70 hover:bg-magic-gray-light/70 text-magic-accent-blue border-magic-accent-blue/40 animate-border-glow" 
                onClick={() => triggerHapticFeedback()}
                {...hoverScale}
                {...tapScale}
              />
              <CarouselNext
                className="right-0 md:right-2 bg-magic-gray-dark/70 hover:bg-magic-gray-light/70 text-magic-accent-blue border-magic-accent-blue/40 animate-border-glow" 
                onClick={() => triggerHapticFeedback()}
                {...hoverScale}
                {...tapScale}
              />
            </Carousel>
            {/* Removed SocialShareButtons */}
          </motion.div>
        )}
      </motion.main>

      {sessionHistory.length > 0 && (
        <motion.div
          className="w-full flex justify-center py-5 pb-24 max-w-4xl mx-auto"
          variants={clearButtonVariants}
          initial="initial"
          animate="animate"
        >
          <MotionButton
            onClick={handleClearHistory}
            variant="outline"
            size="lg"
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30 px-6 py-2.5 rounded-full text-base shadow-xl z-[10001]"
            {...hoverScale}
            {...tapScale}
          >
            <Trash2 size={18} className="mr-2" />
            Clear History
          </MotionButton>
        </motion.div>
      )}

      {/* Removed ad banner */}
    </motion.div>
  );
};

export default History;