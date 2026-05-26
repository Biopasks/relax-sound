
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GameLoadingBarProps {
  progress: number; // Progress from 0 to 100
  statusText?: string; // Optional status text
}

const GameLoadingBar: React.FC<GameLoadingBarProps> = ({ progress, statusText }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-magic-blue-start to-magic-blue-end text-gray-100 z-[1000]">
      <motion.div
        className="w-64 h-8 bg-magic-gray-dark rounded-full border-2 border-magic-cyan-accent overflow-hidden relative shadow-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-magic-cyan-accent to-magic-accent-green rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 5px rgba(var(--magic-cyan-accent-rgb), 0.5)",
              "0 0 15px rgba(var(--magic-cyan-accent-rgb), 0.8)",
              "0 0 5px rgba(var(--magic-cyan-accent-rgb), 0.5)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white z-10">
          {Math.floor(progress)}%
        </span>
      </motion.div>
      {/* Removed statusText display as requested */}
    </div>
  );
};

export default GameLoadingBar;