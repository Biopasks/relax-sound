
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMicroAnimations } from '@/hooks/use-animations'; // Обновленный импорт

interface PulsatingButtonWrapperProps {
  children: React.ReactNode;
  className?: string;
  pulseColorClass?: string;
}

const PulsatingButtonWrapper: React.FC<PulsatingButtonWrapperProps> = ({ children, className, pulseColorClass = "border-magic-accent-blue/50" }) => {
  const { hoverScale, tapScale } = useMicroAnimations(); // Использование рефакторингового импорта

  return (
    <motion.div className={cn("relative flex flex-col items-center", className)}>
      <motion.div
        className={cn("absolute inset-0 rounded-full border-2 pointer-events-none", pulseColorClass)}
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  );
};

export default PulsatingButtonWrapper;