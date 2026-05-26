
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FactDisplayProps {
  facts: string[];
  intervalMs?: number;
  className?: string;
}

const FactDisplay: React.FC<FactDisplayProps> = ({ facts, intervalMs = 7000, className }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    if (facts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [facts, intervalMs]);

  if (facts.length === 0) {
    return null;
  }

  const currentFact = facts[currentFactIndex];

  const backgroundVariants: Variants = {
    animate: {
      background: [
        "linear-gradient(90deg, rgba(var(--magic-gray-dark-rgb), 0.7) 0%, rgba(var(--magic-gray-light-rgb), 0.2) 50%, rgba(var(--magic-gray-dark-rgb), 0.7) 100%)",
        "linear-gradient(90deg, rgba(var(--magic-gray-dark-rgb), 0.7) 100%, rgba(var(--magic-gray-light-rgb), 0.2) 50%, rgba(var(--magic-gray-dark-rgb), 0.7) 0%)"
      ],
      backgroundSize: "200% 100%",
      backgroundPosition: ["0% 0%", "100% 0%"],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      } as Transition
    }
  };

  const textVariants: Variants = {
    initial: { opacity: 0, y: 10, filter: "blur(3px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, filter: "blur(3px)", transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <motion.div
      className={cn(
        "relative w-full h-20 flex items-center justify-center p-3 rounded-xl bg-magic-gray-dark/70 backdrop-blur-sm border border-gray-600/40 shadow-xl overflow-hidden",
        className
      )}
      variants={backgroundVariants}
      initial={false}
      animate="animate"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={currentFactIndex}
          className="text-center text-base font-medium text-gray-200 absolute inset-0 flex items-center justify-center px-3"
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentFact}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default FactDisplay;