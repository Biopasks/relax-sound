
import React from 'react';
import { motion, Variants, Easing, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMicroAnimations } from '@/hooks/use-animations'; // Обновленный импорт

interface AnimatedTextSegmentProps {
  text: string;
  className?: string;
  wordVariants?: Variants;
  wordTransition?: Transition;
  staggerDelay?: number;
  highlightWords?: { [key: string]: string };
}

const defaultWordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut" as Easing,
    } as Transition,
  },
};

const AnimatedTextSegment: React.FC<AnimatedTextSegmentProps> = ({
  text,
  className,
  wordVariants = defaultWordVariants,
  wordTransition,
  staggerDelay = 0.02,
  highlightWords = {},
}) => {
  const words = text.split(' ');
  const { dominoText } = useMicroAnimations(); // Использование рефакторинговой анимации

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.p
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => {
        const trimmedWord = word.replace(/[.,!?;:]/g, '');
        const highlightClass = highlightWords[trimmedWord.toLowerCase()];
        
        return (
          <motion.span
            key={i}
            className={cn("inline-block mr-1", highlightClass)}
            variants={wordVariants}
            transition={wordTransition}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

export default AnimatedTextSegment;