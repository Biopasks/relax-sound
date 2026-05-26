
import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VinylCenterVisualizerProps {
  isPlaying: boolean;
  iconColorClass?: string;
}

const VinylCenterVisualizer: React.FC<VinylCenterVisualizerProps> = ({ isPlaying, iconColorClass }) => {
  const particleVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0.5, 1, 1.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay: Math.random() * 1,
      },
    },
    playing: {
      opacity: [0, 0.8, 0],
      scale: [0.2, 1, 1.8],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeOut",
        delay: Math.random() * 0.5,
      },
    },
  };

  const auraVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.2, 0.5, 0.2],
      scale: [0.9, 1.1, 0.9],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    playing: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseRingVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: [0, 0.3, 0],
      scale: [0.5, 1, 1.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeOut",
        delay: Math.random() * 1,
      },
    },
    playing: {
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 1.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeOut",
        delay: Math.random() * 0.3,
      },
    },
  };

  const baseColorClass = iconColorClass || "text-magic-accent-blue"; // Используем цвет иконки или дефолтный

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
      <AnimatePresence>
        {isPlaying ? (
          // Эффекты, когда играет
          <motion.div
            key="playing-visualizer"
            className="absolute inset-0 rounded-full"
            initial="hidden"
            animate="playing"
            exit="hidden"
          >
            {/* Основная пульсирующая аура */}
            <motion.div
              className={cn("absolute inset-0 rounded-full", baseColorClass.replace('text-', 'bg-') + '/30')}
              variants={auraVariants}
            />
            {/* Быстрые пульсирующие кольца */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`playing-pulse-ring-${i}`}
                className={cn("absolute rounded-full border-2", baseColorClass.replace('text-', 'border-') + '/70')}
                style={{
                  width: `${50 + i * 20}%`,
                  height: `${50 + i * 20}%`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                variants={pulseRingVariants}
              />
            ))}
            {/* Мелкие частицы */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`playing-particle-${i}`}
                className={cn("absolute rounded-full w-2 h-2", baseColorClass.replace('text-', 'bg-') + '/80')}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
              />
            ))}
          </motion.div>
        ) : (
          // Эффекты, когда не играет
          <motion.div
            key="idle-visualizer"
            className="absolute inset-0 rounded-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Медленная пульсирующая аура */}
            <motion.div
              className={cn("absolute inset-0 rounded-full", baseColorClass.replace('text-', 'bg-') + '/10')}
              variants={auraVariants}
            />
            {/* Медленные пульсирующие кольца */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`idle-pulse-ring-${i}`}
                className={cn("absolute rounded-full border", baseColorClass.replace('text-', 'border-') + '/50')}
                style={{
                  width: `${70 + i * 15}%`,
                  height: `${70 + i * 15}%`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                variants={pulseRingVariants}
              />
            ))}
            {/* Очень медленные, крупные частицы */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`idle-particle-${i}`}
                className={cn("absolute rounded-full w-3 h-3", baseColorClass.replace('text-', 'bg-') + '/60')}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VinylCenterVisualizer;