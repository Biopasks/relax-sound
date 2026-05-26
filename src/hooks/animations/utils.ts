
import { Transition, TargetAndTransition, Easing } from 'framer-motion';
import { vinylDesigns } from '@/lib/vinyl-designs';

export const vinylDesignAuraColors: { [key: string]: string } = {
  'classic-black': 'var(--radio-aura-classic-black-rgb)',
  'deep-blue': 'var(--radio-aura-deep-blue-rgb)',
  'emerald-green': 'var(--radio-aura-emerald-green-rgb)',
  'cosmic-purple': 'var(--radio-aura-cosmic-purple-rgb)',
  'golden-dawn': 'var(--radio-aura-golden-dawn-rgb)',
  'silver-mist': 'var(--radio-aura-silver-mist-rgb)',
  'fiery-red': 'var(--radio-aura-fiery-red-rgb)',
  'forest-night': 'var(--radio-aura-forest-night-rgb)',
  'ocean-wave': 'var(--radio-aura-ocean-wave-rgb)',
  'desert-sunset': 'var(--radio-aura-desert-sunset-rgb)',
  'starry-night': 'var(--radio-aura-starry-night-rgb)',
  'cloud-dream': 'var(--radio-aura-cloud-dream-rgb)',
  'zen-garden': 'var(--radio-aura-zen-garden-rgb)',
};

export const createIdleParticles = (chars: string[], count: number, scale: number[], opacity: number[], duration: number, delay: number, yRange: number, xRange: number, rotateRange: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    char: chars[Math.floor(Math.random() * chars.length)],
    className: "absolute text-sm pointer-events-none",
    initial: { opacity: 0, scale: scale[0], y: 0, x: 0, rotate: 0 },
    animate: {
      opacity: opacity,
      scale: scale,
      y: [0, (Math.random() - 0.5) * yRange, (Math.random() - 0.5) * yRange, 0],
      x: [0, (Math.random() - 0.5) * xRange, (Math.random() - 0.5) * xRange, 0],
      rotate: [0, (Math.random() - 0.5) * rotateRange, (Math.random() - 0.5) * rotateRange, 0],
    },
    transition: {
      duration: duration + Math.random() * (duration * 0.5),
      repeat: Infinity,
      ease: "easeInOut" as Easing,
      delay: i * delay + Math.random() * (delay * 2),
      times: [0, 0.2, 0.8, 1]
    } as Transition
  }));
};

export const createBurstParticles = (chars: string[], count: number, scale: number[], opacity: number[], duration: number, delay: number, yRange: number, xRange: number, rotateRange: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    char: chars[Math.floor(Math.random() * chars.length)],
    className: "absolute text-base pointer-events-none",
    initial: { opacity: 0, scale: scale[0], y: 0, x: 0, rotate: 0 },
    animate: {
      opacity: opacity,
      scale: scale,
      y: [0, (Math.random() - 0.5) * yRange],
      x: [0, (Math.random() - 0.5) * xRange],
      rotate: [0, (Math.random() - 0.5) * rotateRange],
    },
    transition: {
      duration: duration + Math.random() * (duration * 0.5),
      ease: "easeOut" as Easing,
      delay: i * delay,
    } as Transition
  }));
};

export interface SoundCardEffects {
  cardInitial?: TargetAndTransition;
  cardAnimate?: TargetAndTransition;
  cardTransition?: Transition;
  iconAnimate?: TargetAndTransition;
  iconTransition?: Transition;
  idleParticles?: { char: string; className: string; initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition }[];
  selectionBurstParticles?: { char: string; className: string; initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition }[];
  flashEffect?: { className: string; animate: TargetAndTransition; transition: Transition };
}