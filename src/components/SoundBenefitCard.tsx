
import React from 'react';
import { motion, Easing } from 'framer-motion';
import { CheckCircle, Lightbulb, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations';
import { Sound } from '@/assets/audio';
import { useSettings } from '@/context/SettingsContext';

interface SoundBenefitCardProps {
  sound: Sound;
}

const SoundBenefitCard: React.FC<SoundBenefitCardProps> = ({ sound }) => {
  const { hoverScale, tapScale } = useMicroAnimations();
  const { triggerHapticFeedback } = useSettings();
  const { backgroundShimmerGlow } = usePowerfulAnimations();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as Easing,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: -10 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.4, ease: "easeOut" as Easing } },
  };

  const Icon = sound.icon;

  return (
    <motion.div
      className="relative w-full p-6 sm:p-8 bg-card/90 rounded-3xl shadow-3xl border border-sound-details-accent/50 text-foreground flex flex-col items-center text-center overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...hoverScale}
      onClick={() => triggerHapticFeedback()}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />
      
      {/* Icon and Title */}
      <motion.div 
        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full flex items-center justify-center relative z-10"
        style={{
          background: `radial-gradient(circle at center, rgba(var(--sound-details-accent-rgb), 0.3) 0%, transparent 70%)`,
          boxShadow: `0 0 20px rgba(var(--sound-details-accent-rgb), 0.5)`
        }}
        variants={itemVariants}
      >
        <Icon className={cn("w-16 h-16 sm:w-20 sm:h-20 text-white", sound.iconColorClass)} />
      </motion.div>

      <motion.h3 
        className="text-3xl sm:text-4xl font-extrabold text-sound-details-accent mb-3 font-etude-noire drop-shadow-sm relative z-10"
        variants={itemVariants}
      >
        {sound.name}
      </motion.h3>
      <motion.p 
        className="text-base sm:text-lg text-gray-300 mb-6 max-w-md relative z-10 leading-relaxed"
        variants={itemVariants}
      >
        {sound.description}
      </motion.p>

      {/* Benefits Section */}
      <div className="w-full mb-6 relative z-10 flex-shrink-0">
        <motion.h4 
          className="text-xl sm:text-2xl font-bold text-sound-details-accent mb-4 flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <CheckCircle size={24} className="text-magic-accent-green" />
          Benefits
        </motion.h4>
        <ul className="space-y-3 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Limiting to two benefits */}
          {sound.benefits.slice(0, 2).map((benefit, index) => (
            <motion.li 
              key={index} 
              className="flex items-center justify-start gap-3 text-base sm:text-lg font-medium text-gray-200 bg-magic-gray-dark/50 p-3 rounded-xl shadow-inner border border-gray-700/50"
              variants={itemVariants}
            >
              <CheckCircle size={18} className="text-magic-accent-green flex-shrink-0" />
              <span className="text-left flex-1">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default SoundBenefitCard;