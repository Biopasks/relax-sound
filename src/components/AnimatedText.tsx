
import React from 'react';
import { motion, Variants, Easing, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMicroAnimations } from '@/hooks/use-animations'; // Обновленный импорт

interface AnimatedTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  wordVariants?: Variants;
}

const defaultWordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut" as Easing,
    } as Transition,
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, staggerDelay = 0.03, wordVariants = defaultWordVariants }) => {
  const words = text.split(' ');
  const { dominoText } = useMicroAnimations(); // Использование рефакторинговой анимации

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.p
      className={cn("flex flex-wrap justify-center", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedText;