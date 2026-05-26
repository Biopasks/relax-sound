
import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion'; // Импорт Easing
import { cn } from '@/lib/utils';

interface GlobalParticleBurstProps {
  onComplete: () => void;
}

const PARTICLE_COUNT = 30;
const PARTICLE_CHARS = ['✨', '💫', '🌟', '🔮', '⚛️', '🌀', '💡', '💖', '💙', '💚', '💛', '🧡', '💜'];
const PARTICLE_COLORS = ['text-magic-accent-blue', 'text-magic-cyan-accent', 'text-magic-accent-green', 'text-yellow-300', 'text-purple-300', 'text-pink-300', 'text-white'];
const PARTICLE_SIZES = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];

const GlobalParticleBurst: React.FC<GlobalParticleBurstProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Соответствует длительности анимации
    return () => clearTimeout(timer);
  }, [onComplete]);

  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const char = PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const size = PARTICLE_SIZES[Math.floor(Math.random() * PARTICLE_SIZES.length)];

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;

    const endX = initialX + (Math.random() - 0.5) * window.innerWidth * 0.8;
    const endY = initialY + (Math.random() - 0.5) * window.innerHeight * 0.8;

    const rotate = Math.random() * 720 - 360; // -360 до 360 градусов
    const scale = Math.random() * 0.8 + 0.5; // 0.5 до 1.3

    return {
      id: i,
      char,
      color,
      size,
      initial: {
        x: initialX,
        y: initialY,
        opacity: 1,
        scale: 0.5,
        rotate: 0,
      },
      animate: {
        x: endX,
        y: endY,
        opacity: 0,
        scale: scale,
        rotate: rotate,
      },
      transition: {
        duration: 1.8 + Math.random() * 0.4, // Немного варьируемая длительность
        ease: "easeOut" as Easing, // Явное приведение к Easing
        delay: Math.random() * 0.2, // Небольшая случайная задержка для эффекта взрыва
      },
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={cn("absolute whitespace-nowrap", particle.color, particle.size)}
            initial={particle.initial}
            animate={particle.animate}
            transition={particle.transition}
            style={{
              left: 0, // Начальная позиция будет установлена через x, y в initial/animate
              top: 0,
              transformOrigin: 'center center',
            }}
          >
            {particle.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlobalParticleBurst;