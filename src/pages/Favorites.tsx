
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/SettingsContext';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations'; // Обновленный импорт
import SoundCard from '@/components/SoundCard';
import { sounds } from '@/assets/audio';
import { cn } from '@/lib/utils';
import { useSound } from '@/context/SoundContext';
import MagicBackButton from '@/components/MagicBackButton'; // Импорт MagicBackButton

const MotionButton = motion(Button);

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteSounds, triggerHapticFeedback } = useSettings();
  const { currentNoise, isNoisePlaying, playPauseNoise } = useSound(); // Обновлено на currentNoise, isNoisePlaying, playPauseNoise
  const { hoverScale, tapScale, textFade, textReveal } = useMicroAnimations(); // Обновленный импорт
  const { emptyIconBounce, backgroundShimmerGlow } = usePowerfulAnimations(); // Импорт новой анимации

  const handleGoBack = () => {
    triggerHapticFeedback();
    navigate(-1);
  };

  const handleSoundSelect = (sound: typeof sounds[0]) => {
    playPauseNoise(sound); // Использование playPauseNoise
    triggerHapticFeedback();
    navigate('/player');
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

  const favoriteSoundsData = sounds.filter(sound => favoriteSounds.includes(sound.id));

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
      {/* NEW: Background shimmer glow for the favorites page */}
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
              Favorites
            </motion.h1>
            <motion.p {...textFade} className="text-lg text-gray-300">Your favorite sounds</motion.p>
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
        {favoriteSoundsData.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center px-4"
            variants={emptyStateVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div {...textReveal}>
              <motion.div {...emptyIconBounce}>
                <Heart size={96} className="mb-8 text-red-500/70" />
              </motion.div>
            </motion.div>
            <motion.p {...textReveal} className="text-2xl font-semibold mb-3 text-white">No favorites yet</motion.p>
            <motion.p {...textFade} className="text-lg text-gray-300">
              Tap the <Heart size={18} className="inline-block text-gray-400" /> icon on a sound card to add it here
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 overflow-y-auto scrollbar-styled"
            style={{ gridAutoRows: 'minmax(200px, 1fr)' }} // Set minimum row height
            variants={{
              hidden: { opacity: 0 }, // Added hidden state for container
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            initial="hidden" // Initialize as hidden
            animate="visible"
          >
            {favoriteSoundsData.map((sound, index) => (
              <motion.div 
                key={sound.id} 
                variants={{
                  hidden: { opacity: 0, y: 80, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
                }} 
                className="flex justify-center items-center w-full h-full"
              >
                <SoundCard
                  sound={sound}
                  onSelect={handleSoundSelect}
                  isSelected={currentNoise?.id === sound.id} // Use currentNoise
                  isCasinoHighlighted={false}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.main>

      {/* Removed ad banner */}
    </motion.div>
  );
};

export default Favorites;