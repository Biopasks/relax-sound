
import React from 'react';
import { motion, Easing, Transition, Variants, TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SoundWaveVisualizerProps {
  isPlaying: boolean;
}

const SoundWaveVisualizer: React.FC<SoundWaveVisualizerProps> = ({ isPlaying }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    paused: { opacity: 0, transition: { duration: 0.5 } as Transition },
  };

  const waveItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: [0, 0.3, 0.5, 0.3, 0], // Появление и исчезновение
      scale: [0.5, 0.8, 1, 1.2, 1.5], // Расширение
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeOut" as Easing,
      } as Transition,
    },
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-[1]"
      initial="hidden"
      animate={isPlaying ? "visible" : "paused"}
      variants={containerVariants}
    >
      {/* Несколько расширяющихся кругов для волнового эффекта */}
      <motion.div
        className="absolute w-[80%] h-[80%] rounded-full border border-magic-accent-blue/20"
        variants={waveItemVariants}
      />
      <motion.div
        className="absolute w-[80%] h-[80%] rounded-full border border-magic-accent-blue/30"
        variants={waveItemVariants}
        transition={{ ...(waveItemVariants.visible as TargetAndTransition).transition, delay: 0.2 } as Transition}
      />
      <motion.div
        className="absolute w-[80%] h-[80%] rounded-full border border-magic-accent-blue/40"
        variants={waveItemVariants}
        transition={{ ...(waveItemVariants.visible as TargetAndTransition).transition, delay: 0.4 } as Transition}
      />
      <motion.div
        className="absolute w-[80%] h-[80%] rounded-full border border-magic-accent-blue/50"
        variants={waveItemVariants}
        transition={{ ...(waveItemVariants.visible as TargetAndTransition).transition, delay: 0.6 } as Transition}
      />
    </motion.div>
  );
};

export default SoundWaveVisualizer;