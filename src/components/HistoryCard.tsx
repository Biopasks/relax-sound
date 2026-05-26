
import React from 'react';
import { motion, Easing, Variants, Transition } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMicroAnimations, usePowerfulAnimations } from '@/hooks/use-animations'; // Updated import
import { useSettings } from '@/context/SettingsContext';

interface SessionRecord {
  id: string;
  soundName: string;
  startTime: number;
  durationSeconds: number;
  endTime: number;
  stoppedManually: boolean;
}

interface HistoryCardProps {
  session: SessionRecord;
}

const HistoryCard: React.FC<HistoryCardProps> = React.memo(({ session }) => {
  const { hoverScale, tapScale, dominoText } = useMicroAnimations(); // Updated import
  const { triggerHapticFeedback } = useSettings();
  const { backgroundShimmerGlow } = usePowerfulAnimations(); // Import new animation

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
      parts.push(`${minutes.toString().padStart(2, '0')}m`);
    }
    parts.push(`${seconds.toString().padStart(2, '0')}s`);

    return parts.join(' ');
  };

  const cardVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      boxShadow: [
        "0 0 0px rgba(var(--magic-accent-blue-rgb), 0)",
        "0 0 8px 2px rgba(var(--magic-accent-blue-rgb), 0.2)",
        "0 0 0px rgba(var(--magic-accent-blue-rgb), 0)"
      ],
      transition: {
        opacity: { duration: 0.4 },
        y: { duration: 0.4 },
        scale: { duration: 0.4 },
        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } as Transition,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 0 15px 5px rgba(var(--magic-accent-blue-rgb), 0.4)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.97,
      boxShadow: "0 0 5px 2px rgba(var(--magic-accent-blue-rgb), 0.2)",
      transition: { duration: 0.1 }
    }
  };

  const iconVariants: Variants = {
    animate: {
      rotate: session.stoppedManually ? 0 : [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        rotate: { duration: session.stoppedManually ? 0 : 3, repeat: session.stoppedManually ? 0 : Infinity, ease: "linear" } as Transition,
        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" } as Transition
      }
    }
  };

  return (
    <motion.div
      className="relative w-full h-full max-w-xs bg-card rounded-2xl p-6 border border-border shadow-lg flex flex-col items-center text-center cursor-pointer overflow-hidden" // Increased padding and max-width
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={() => triggerHapticFeedback()}
    >
      {/* NEW: Background shimmer glow for the card */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        {...backgroundShimmerGlow('var(--app-global-accent-rgb)')}
      />
      <div className="flex flex-col items-center mb-4 relative z-10">
        <motion.div
          className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3 flex-shrink-0" // Increased size
          variants={iconVariants}
          initial="animate"
          animate="animate"
        >
          {session.stoppedManually ? (
            <Pause size={32} className="text-primary" /> // Increased icon size
          ) : (
            <Play size={32} className="text-primary" /> // Increased icon size
          )}
        </motion.div>
        <motion.h3
          className="font-semibold text-foreground text-2xl mb-1 font-etude-noire" // Increased font size
          variants={dominoText.parent}
          initial="hidden"
          animate="visible"
        >
          {session.soundName.split("").map((char, index) => (
            <motion.span key={index} variants={dominoText.child}>
              {char}
            </motion.span>
          ))}
        </motion.h3>
        <p className="text-base text-muted-foreground">{formatDate(session.startTime)}</p> {/* Increased font size */}
      </div>
      <div className="flex flex-col items-center relative z-10">
        <motion.div
          className="text-primary font-bold text-3xl mb-2 font-flemmatico" // Increased font size
          variants={dominoText.parent}
          initial="hidden"
          animate="visible"
        >
          {formatDuration(session.durationSeconds).split("").map((char, index) => (
            <motion.span key={index} variants={dominoText.child}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        <div className={cn(
          "text-sm px-4 py-1.5 rounded-full font-medium", // Increased padding and font size
          session.stoppedManually 
            ? 'bg-destructive/20 text-destructive'
            : 'bg-primary/20 text-primary'
        )}>
          {session.stoppedManually ? 'Stopped Manually' : 'Sleep Timer'}
        </div>
      </div>
    </motion.div>
  );
});

export default HistoryCard;