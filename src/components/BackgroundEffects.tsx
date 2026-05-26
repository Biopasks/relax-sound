
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  scale: number;
}

interface SoundTheme {
  particles: string[];
  colors: string[];
  gradient: string[];
  orbColors: string[];
  label: string;
}

const soundThemes: Record<string, SoundTheme> = {
  noise: {
    particles: ['⚪', '✨', '🌫️', '☁️', '💫', '❄️', '🌟'],
    colors: ['text-gray-300', 'text-blue-200', 'text-white/70', 'text-gray-400'],
    gradient: ['#1a1a2e', '#16213e', '#0f3460', '#1a1a2e'],
    orbColors: ['rgba(100,149,237,0.12)', 'rgba(200,200,220,0.08)', 'rgba(70,130,200,0.10)'],
    label: 'pure',
  },
  rain: {
    particles: ['💧', '💦', '🌧️', '☔', '🌊', '🔵', '🫧'],
    colors: ['text-blue-300', 'text-cyan-300/60', 'text-indigo-300', 'text-blue-400'],
    gradient: ['#0c1445', '#1a237e', '#283593', '#0c1445'],
    orbColors: ['rgba(66,165,245,0.15)', 'rgba(41,121,255,0.10)', 'rgba(100,181,246,0.08)'],
    label: 'water',
  },
  ocean: {
    particles: ['🌊', '🐚', '🐠', '🐬', '🫧', '💙', '💧'],
    colors: ['text-blue-400', 'text-cyan-400', 'text-blue-200', 'text-teal-300'],
    gradient: ['#002b4a', '#004d74', '#006994', '#002b4a'],
    orbColors: ['rgba(0,150,200,0.15)', 'rgba(0,200,180,0.10)', 'rgba(0,100,150,0.12)'],
    label: 'deep',
  },
  fan: {
    particles: ['💨', '🌀', '🌬️', '🍃', '🌪️', '⚪', '⚙️'],
    colors: ['text-gray-400', 'text-gray-300', 'text-white/70', 'text-slate-300'],
    gradient: ['#1a1a2e', '#2d2d44', '#3d3d56', '#1a1a2e'],
    orbColors: ['rgba(180,180,200,0.10)', 'rgba(200,200,220,0.06)', 'rgba(150,150,180,0.08)'],
    label: 'flow',
  },
  campfire: {
    particles: ['🔥', '🪵', '✨', '🎇', '🌟', '🧡', '🔥'],
    colors: ['text-orange-300', 'text-red-400', 'text-yellow-200', 'text-amber-300'],
    gradient: ['#1a0a00', '#3d1c00', '#662d00', '#1a0a00'],
    orbColors: ['rgba(255,100,0,0.15)', 'rgba(255,160,0,0.12)', 'rgba(200,50,0,0.08)'],
    label: 'warm',
  },
  space: {
    particles: ['⭐', '💫', '🌌', '🚀', '🪐', '✨', '🔭'],
    colors: ['text-yellow-100', 'text-purple-300', 'text-white/70', 'text-indigo-200'],
    gradient: ['#050510', '#0a0a2e', '#150a30', '#050510'],
    orbColors: ['rgba(150,100,255,0.12)', 'rgba(200,150,255,0.08)', 'rgba(100,50,200,0.10)'],
    label: 'cosmic',
  },
};

const DEFAULT_PARTICLE_CHARS = ['✨', '💫', '🌟', '🌠', '🔮', '⚛️', '🌀', '💡'];
const DEFAULT_PARTICLE_COLORS = ['text-blue-200', 'text-indigo-300', 'text-gray-300', 'text-magic-accent-blue/50', 'text-white/70', 'text-cyan-300/60', 'text-purple-200'];
const TAILWIND_TEXT_SIZES = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'];
const PARTICLE_COUNT = 40;

interface BackgroundEffectsProps {
  currentSoundId: string | null;
}

const MeshGradient: React.FC<{ theme: SoundTheme }> = ({ theme }) => (
  <div className="absolute inset-0 overflow-hidden">
    {theme.orbColors.map((color, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${40 + i * 30}%`,
          height: `${40 + i * 30}%`,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 50 - i * 20, -30 + i * 15, 0],
          y: [0, -30 + i * 10, 40 - i * 15, 0],
          scale: [1, 1.2 - i * 0.05, 0.9 + i * 0.05, 1],
        }}
        transition={{
          duration: 20 + i * 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 3,
        }}
      />
    ))}
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]}, ${theme.gradient[2]}, ${theme.gradient[3]})`,
        backgroundSize: '400% 400%',
      }}
    />
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        background: `radial-gradient(circle at 30% 40%, ${theme.orbColors[0]} 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, ${theme.orbColors[1]} 0%, transparent 50%),
                    radial-gradient(circle at 50% 80%, ${theme.orbColors[2]} 0%, transparent 50%)`,
      }}
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ currentSoundId }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(() => {
    if (currentSoundId && soundThemes[currentSoundId]) {
      return soundThemes[currentSoundId];
    }
    return soundThemes.noise;
  }, [currentSoundId]);

  const generateParticles = useCallback(() => {
    const selectedChars = theme.particles;
    const selectedColors = theme.colors;

    const newParticles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isDistant = Math.random() > 0.7;
      const durationFactor = isDistant ? Math.random() * 20 + 30 : Math.random() * 15 + 20;
      const opacityFactor = isDistant ? Math.random() * 0.05 + 0.08 : Math.random() * 0.1 + 0.15;
      const initialScale = isDistant ? Math.random() * 0.3 + 0.2 : Math.random() * 0.5 + 0.5;

      newParticles.push({
        id: `particle-${i}-${Date.now()}`,
        char: selectedChars[Math.floor(Math.random() * selectedChars.length)],
        sizeClass: TAILWIND_TEXT_SIZES[Math.floor(Math.random() * TAILWIND_TEXT_SIZES.length)],
        color: selectedColors[Math.floor(Math.random() * selectedColors.length)],
        initialX: `${Math.random() * 100}vw`,
        initialY: `${Math.random() * 100}vh`,
        animationDuration: durationFactor,
        animationDelay: Math.random() * 20,
        animationX: (Math.random() - 0.5) * (isDistant ? 30 : 80),
        animationY: (Math.random() - 0.5) * (isDistant ? 20 : 60),
        opacity: opacityFactor,
        zIndex: isDistant ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 5) + 4,
        rotate: (Math.random() - 0.5) * 360,
        scale: initialScale,
      });
    }
    setParticles(newParticles);
  }, [theme]);

  useEffect(() => {
    generateParticles();
  }, [generateParticles]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      <MeshGradient theme={theme} />
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute pointer-events-none whitespace-nowrap select-none",
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
