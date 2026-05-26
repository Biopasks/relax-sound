
import { Transition, TargetAndTransition, Easing } from 'framer-motion';
import { SoundCardEffects, createIdleParticles, createBurstParticles } from './utils';

export const getSoundCardEffects = (soundId: string): SoundCardEffects => {
  const baseCardDuration = 3.0;
  const baseIconDuration = 5.0;

  const idleParticleCount = 10;
  const idleParticleScale = [0.5, 1.2, 0.5];
  const idleParticleOpacity = [0, 0.4, 0];
  const idleParticleDuration = 4.0;
  const idleParticleDelay = 0.1;
  const idleParticleRange = 20;

  const burstParticleCount = 15;
  const burstParticleScale = [0.8, 2.0, 0.5];
  const burstParticleOpacity = [0, 1, 0];
  const burstParticleDuration = 0.8;
  const burstParticleDelay = 0.05;
  const burstParticleRange = 60;

  switch (soundId) {
    case 'noise':
      return {
        cardAnimate: {},
        iconAnimate: {
          y: [0, -5, 0],
          opacity: [1, 0.9, 1],
          scale: [1, 1.05, 1],
          transition: { duration: baseIconDuration * 1.1, repeat: Infinity, ease: "easeInOut" as Easing },
        },
        idleParticles: createIdleParticles(
          ['⚪', '✨', '🌫️', '☁️'],
          idleParticleCount,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 1.5,
          idleParticleDelay * 1.5,
          idleParticleRange, idleParticleRange, 180
        ),
        selectionBurstParticles: createBurstParticles(
          ['⚪', '✨', '🌫️', '☁️'],
          burstParticleCount,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange, burstParticleRange, 360
        ),
      };
    case 'rain':
      return {
        cardAnimate: {},
        iconAnimate: {
          y: [0, 8, 0],
          rotate: [0, 3, -3, 0],
          scale: [1, 1.03, 1],
          transition: { duration: baseIconDuration * 1.0, repeat: Infinity, ease: "linear" as Easing },
        },
        idleParticles: createIdleParticles(
          ['💧', '💦', '•'],
          idleParticleCount + 5,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 1.2,
          idleParticleDelay * 1.2,
          idleParticleRange + 10, idleParticleRange - 5, 90
        ),
        selectionBurstParticles: createBurstParticles(
          ['💧', '💦', '🌧️'],
          burstParticleCount + 5,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange + 10, burstParticleRange - 5, 180
        ),
      };
    case 'ocean':
      return {
        cardAnimate: {},
        iconAnimate: {
          rotate: [0, 7, -7, 0],
          scale: [1, 1.04, 1],
          transition: { duration: baseIconDuration * 1.3, repeat: Infinity, ease: "easeInOut" as Easing },
        },
        idleParticles: createIdleParticles(
          ['🫧', '🌊', '•'],
          idleParticleCount + 5,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 1.8,
          idleParticleDelay * 1.8,
          idleParticleRange - 5, idleParticleRange - 5, 180
        ),
        selectionBurstParticles: createBurstParticles(
          ['🫧', '🌊', '🐠', '🐬'],
          burstParticleCount + 5,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange - 5, burstParticleRange - 5, 360
        ),
      };
    case 'fan':
      return {
        cardAnimate: {},
        iconAnimate: {
          rotate: 360,
          scale: [1, 1.02, 1],
          transition: { rotate: { duration: baseIconDuration * 0.8, repeat: Infinity, ease: "linear" as Easing } as Transition, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" as Easing } as Transition },
        },
        idleParticles: createIdleParticles(
          ['💨', '🌀', '🌬️', '•'],
          idleParticleCount + 10,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 1.0,
          idleParticleDelay * 1.0,
          idleParticleRange + 20, idleParticleRange + 20, 360
        ),
        selectionBurstParticles: createBurstParticles(
          ['💨', '🌀', '🌬️'],
          burstParticleCount + 10,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange + 20, burstParticleRange + 20, 720
        ),
      };
    case 'campfire':
      return {
        cardAnimate: {},
        iconAnimate: {
          scale: [1, 1.07, 1, 0.93, 1],
          y: [0, -3, 0, 3, 0],
          transition: { duration: baseIconDuration * 1.0, repeat: Infinity, ease: "easeInOut" as Easing },
        },
        idleParticles: createIdleParticles(
          ['🔥', '✨', '🎇', '•'],
          idleParticleCount + 5,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 2.0,
          idleParticleDelay * 2.0,
          idleParticleRange + 15, idleParticleRange - 10, 270
        ),
        selectionBurstParticles: createBurstParticles(
          ['🔥', '✨', '🎇'],
          burstParticleCount + 5,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange + 15, burstParticleRange - 10, 360
        ),
      };
    case 'space':
      return {
        cardAnimate: {},
        iconAnimate: {
          scale: [1, 1.1, 0.9, 1.05, 1],
          opacity: [1, 0.8, 1, 0.9, 1],
          filter: ["blur(0px) brightness(1)", "blur(1px) brightness(1.1)", "blur(0px) brightness(1)"],
          rotate: [0, 5, -5, 2, 0],
          transition: { duration: baseIconDuration * 1.5, repeat: Infinity, ease: "easeInOut" as Easing },
        },
        idleParticles: createIdleParticles(
          ['💫', '🌌', '🚀', '🪐', '•'],
          idleParticleCount + 5,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 2.5,
          idleParticleDelay * 2.5,
          idleParticleRange + 10, idleParticleRange + 10, 360
        ),
        selectionBurstParticles: createBurstParticles(
          ['💫', '🌌', '🚀', '🪐'],
          burstParticleCount + 5,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange + 10, burstParticleRange + 10, 720
        ),
      };
    default:
      return {
        cardAnimate: {},
        iconAnimate: {
          y: [0, -8, 0],
          opacity: [1, 0.9, 1],
          scale: [1, 1.05, 1],
        },
        idleParticles: createIdleParticles(
          ['✨', '⭐', '💫'],
          idleParticleCount,
          idleParticleScale,
          idleParticleOpacity,
          idleParticleDuration * 1.5,
          idleParticleDelay * 1.5,
          idleParticleRange, idleParticleRange, 180
        ),
        selectionBurstParticles: createBurstParticles(
          ['✨', '⭐', '💫'],
          burstParticleCount,
          burstParticleScale,
          burstParticleOpacity,
          burstParticleDuration,
          burstParticleDelay,
          burstParticleRange, burstParticleRange, 360
        ),
      };
  }
};
