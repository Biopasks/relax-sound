
import React from 'react';
import { motion, Transition, Variants, Easing } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { usePowerfulAnimations, useMicroAnimations, logoTiltHover } from '@/hooks/use-animations'; // Обновленный импорт

interface AnimatedLogoProps {
  text: string;
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ text, className }) => {
  const { glowPulse } = usePowerfulAnimations();
  const { logoTiltHover: logoTiltHoverAnimation } = useMicroAnimations(); // Переименовано, чтобы избежать конфликта

  const containerVariants: Variants = {
    initial: { perspective: 800 },
    animate: {
      perspective: 800,
      transition: { duration: 2, ease: "easeInOut" as Easing }
    },
    ...logoTiltHoverAnimation // Использование рефакторинговой анимации
  };

  const layerVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({
      opacity: [0, 0.1 + i * 0.05, 0.1 + i * 0.05, 0],
      scale: [0.8, 1 + i * 0.05, 1 + i * 0.05, 1.1 + i * 0.05],
      filter: [`blur(${i * 0.5}px)`, `blur(${i * 1.5}px)`, `blur(${i * 1.5}px)`, `blur(${i * 0.5}px)`],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut" as Easing,
        delay: i * 0.3,
        times: [0, 0.3, 0.7, 1]
      } as Transition
    }),
  };

  const backgroundGlowVariants: Variants = {
    animate: {
      boxShadow: [
        "0 0 2px 1px rgba(var(--magic-accent-blue-rgb), 0.1)",
        "0 0 8px 3px rgba(var(--magic-accent-blue-rgb), 0.4)",
        "0 0 2px 1px rgba(var(--magic-accent-blue-rgb), 0.1)"
      ],
      scale: [1, 1.01, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as Easing
      } as Transition
    }
  };

  const particleVariants: Variants = {
    animate: (i: number) => ({
      x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
      opacity: [0, 0.5, 0.5, 0],
      scale: [0.5, 1, 1, 0.5],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "linear" as Easing,
        delay: Math.random() * 5
      } as Transition
    })
  };

  return (
    <motion.div
      className={cn("relative flex items-center justify-center", className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        variants={backgroundGlowVariants}
        style={{
          background: `radial-gradient(circle at center, rgba(var(--magic-accent-blue-rgb), 0.3) 0%, transparent 40%)`,
          transform: "translateZ(-10px)"
        }}
      />

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`layer-${i}`}
          className="absolute inset-0 rounded-full pointer-events-none"
          custom={i}
          variants={layerVariants}
          style={{
            border: `${1 + i * 0.5}px solid rgba(var(--magic-accent-blue-rgb), ${0.05 + i * 0.02})`,
            transform: `translateZ(-${5 + i * 5}px)`
          }}
        />
      ))}

      <AnimatedText
        text="RelaxSound"
        className="relative z-10 text-4xl font-extrabold text-white drop-shadow-lg font-flemmatico"
      />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute text-xl pointer-events-none"
          custom={i}
          variants={particleVariants}
          style={{
            transform: `translateZ(${5 + i * 0.5}px)`
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedLogo;