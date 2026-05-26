
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePowerfulAnimations } from '@/hooks/use-animations'; // Импорт usePowerfulAnimations

interface Particle {
  id: string;
  char: string;
  sizeClass: string;
  color: string;
  initialX: string;
  initialY: string;
  animationDuration: number;
  animationDelay: number;
  animationX: number;
  animationY: number;
  opacity: number;
  zIndex: number;
  rotate: number;
  scale: number; // Добавлено для индивидуального масштабирования
}

// Тематические наборы символов для каждого звука
const thematicParticles: { [key: string]: string[] } = {
  'noise': ['⚪', '✨', '🌫️', '☁️', '💫', '❄️', '🌟'], // Добавлено больше символов
  'rain': ['💧', '💦', '🌧️', '☔', '🌊', '🔵', '🫧'], // Добавлено больше символов
  'ocean': ['🌊', '🐚', '🐠', '🐬', '🫧', '💙', '💧'], // Добавлено больше символов
  'fan': ['💨', '🌀', '🌬️', '🍃', '🌪️', '⚪', '⚙️'], // Добавлено больше символов
  'campfire': ['🔥', '🪵', '✨', '🎇', '🌟', '🧡', '🔥'], // Добавлено больше символов
  'space': ['⭐', '💫', '🌌', '🚀', '🪐', '✨', '🔭'], // Добавлено больше символов
};

// Тематические наборы цветов для каждого звука
const thematicColors: { [key: string]: string[] } = {
  'noise': ['text-gray-300', 'text-blue-200', 'text-white/70', 'text-gray-400'],
  'rain': ['text-blue-300', 'text-cyan-300/60', 'text-indigo-300', 'text-blue-400'],
  'ocean': ['text-blue-400', 'text-cyan-400', 'text-blue-200', 'text-teal-300'],
  'fan': ['text-gray-400', 'text-gray-300', 'text-white/70', 'text-slate-300'],
  'campfire': ['text-orange-300', 'text-red-400', 'text-yellow-200', 'text-amber-300'],
  'space': ['text-yellow-100', 'text-purple-300', 'text-white/70', 'text-indigo-200'],
};

// Общие символы и цвета по умолчанию
const DEFAULT_PARTICLE_CHARS = ['0', '1', 'A', 'B', '#', '$', '%', '&', '*', '+', '-', '=', '>', '<', '/', '\\', '!', '?', '@', '^', '~', '☁️', '🌙', '✨', '💧', '🍃', '⚪', '🔵', '⭐', '💫', '🌟', '🌠', '🔮', '⚛️', '🌀', '💡'];
const DEFAULT_PARTICLE_COLORS = ['text-blue-200', 'text-indigo-300', 'text-gray-300', 'text-green-220', 'text-yellow-100', 'text-magic-accent-blue/50', 'text-gray-400', 'text-white/70', 'text-cyan-300/60', 'text-purple-200', 'text-pink-200'];

const PARTICLE_COUNT = 150; // Увеличено количество частиц для большей плотности
const TAILWIND_TEXT_SIZES = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl']; // Расширен диапазон размеров

interface BackgroundEffectsProps {
  currentSoundId: string | null;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ currentSoundId }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { backgroundShimmerGlow } = usePowerfulAnimations(); // Использование новой анимации

  useEffect(() => {
    const generateParticles = () => {
      const selectedChars = currentSoundId && thematicParticles[currentSoundId]
        ? thematicParticles[currentSoundId]
        : DEFAULT_PARTICLE_CHARS;

      const selectedColors = currentSoundId && thematicColors[currentSoundId]
        ? thematicColors[currentSoundId]
        : DEFAULT_PARTICLE_COLORS;

      const newParticles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const isDistant = Math.random() > 0.7; // 30% частиц будут 'далекими'
        const durationFactor = isDistant ? Math.random() * 20 + 30 : Math.random() * 15 + 20; // Увеличена длительность (20-50 секунд)
        const opacityFactor = isDistant ? Math.random() * 0.05 + 0.1 : Math.random() * 0.1 + 0.2; // Уменьшена прозрачность (0.1-0.3)
        const initialScale = isDistant ? Math.random() * 0.3 + 0.2 : Math.random() * 0.5 + 0.5; // Разный начальный масштаб
        const animationScale = initialScale * (Math.random() * 0.5 + 1); // Масштабирование во время анимации

        newParticles.push({
          id: `particle-${i}-${Date.now()}`,
          char: selectedChars[Math.floor(Math.random() * selectedChars.length)],
          sizeClass: TAILWIND_TEXT_SIZES[Math.floor(Math.random() * TAILWIND_TEXT_SIZES.length)],
          color: selectedColors[Math.floor(Math.random() * selectedColors.length)],
          initialX: `${Math.random() * 100}vw`,
          initialY: `${Math.random() * 100}vh`,
          animationDuration: durationFactor,
          animationDelay: Math.random() * 20, // 0-20 секунд задержки
          animationX: (Math.random() - 0.5) * (isDistant ? 30 : 80), // Уменьшен дрейф
          animationY: (Math.random() - 0.5) * (isDistant ? 20 : 60), // Уменьшен дрейф
          opacity: opacityFactor,
          zIndex: isDistant ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 5) + 4,
          rotate: (Math.random() - 0.5) * 360, // Случайное начальное вращение
          scale: initialScale,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [currentSoundId]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0 bg-magic-blue-end">
      {/* NEW: Фоновое мерцающее свечение для контейнера фоновых эффектов */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute pointer-events-none whitespace-nowrap",
            particle.color,
            particle.sizeClass
          )}
          style={{
            left: particle.initialX,
            top: particle.initialY,
            zIndex: particle.zIndex,
            willChange: 'transform, opacity',
          }}
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
            rotate: particle.rotate,
            scale: particle.scale,
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity, 0],
            x: [0, particle.animationX, -particle.animationX, 0],
            y: [0, particle.animationY, -particle.animationY, 0],
            rotate: [0, 360],
            scale: [particle.scale, particle.scale * 1.1, particle.scale],
          }}
          transition={{
            duration: particle.animationDuration,
            delay: particle.animationDelay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.8, 1],
          }}
        >
          {particle.char}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundEffects;