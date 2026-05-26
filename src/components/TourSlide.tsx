
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, ChevronDown } from 'lucide-react';
import AnimatedTextSegment from './AnimatedTextSegment';
import { useMicroAnimations } from '@/hooks/use-animations';

interface TourSlideProps {
  title: string;
  description: string;
  images?: string[];
  icon?: LucideIcon;
  index: number;
  layoutType?: 'image-top' | 'icon-top';
  onScrolledToBottom: (slideIndex: number, scrolled: boolean) => void;
}

const imageVariants: Variants = {
  initial: { opacity: 0, scale: 0.9, rotate: 0, filter: "blur(5px)", boxShadow: "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)" },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: [0, -3, 0], // Subtle float
    rotate: 0, // Ensure no Z-axis rotation
    rotateX: 0, // Ensure no X-axis rotation
    filter: "blur(0px)", // Clean filter
    x: 0,
    boxShadow: [
      "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)",
      "0 0 10px 3px rgba(var(--magic-cyan-accent-rgb), 0.3)",
      "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)"
    ],
    transition: { 
      duration: 1.0,
      ease: "easeOut",
      type: "spring", damping: 15, stiffness: 80,
      boxShadow: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    } 
  },
  exit: { opacity: 0, scale: 0.9, rotate: 0, filter: "blur(5px)", x: 0, transition: { duration: 0.6, ease: "easeIn" } },
};

const textContainerVariants: Variants = { 
  initial: { opacity: 0, y: 30, filter: "blur(5px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { 
      duration: 1.4,
      ease: "easeOut", 
      delay: 0.2,
      type: "spring", damping: 10, stiffness: 70,
    } 
  },
  exit: { opacity: 0, y: -20, filter: "blur(5px)", transition: { duration: 0.8, ease: "easeIn" } },
};

const iconVariants: Variants = {
  initial: { opacity: 0, scale: 0.5, rotate: -90, boxShadow: "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)" },
  animate: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0, 
    boxShadow: [
      "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)",
      "0 0 10px 3px rgba(var(--magic-cyan-accent-rgb), 0.3)",
      "0 0 0px rgba(var(--magic-cyan-accent-rgb), 0)"
    ],
    transition: { 
      duration: 1.2,
      ease: "backOut", 
      delay: 0.4,
      type: "spring", damping: 15, stiffness: 100,
      boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    } 
  },
  exit: { opacity: 0, scale: 0.5, rotate: 90, transition: { duration: 0.8, ease: "easeIn" } },
  continuous: {
    rotate: [0, 360],
    scale: [1, 1.05, 1],
    transition: {
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
    } as Transition
  }
};

const TourSlide: React.FC<TourSlideProps> = ({ title, description, images, icon: Icon, index, layoutType = 'image-top', onScrolledToBottom }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const { hoverScale, tapScale } = useMicroAnimations();

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 1;
      if (isAtBottom !== scrolledToBottom) {
        setScrolledToBottom(isAtBottom);
        onScrolledToBottom(index, isAtBottom);
      }
    }
  }, [index, onScrolledToBottom, scrolledToBottom]);

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const renderImage = () => images && images.length > 0 && (
    <motion.div 
      className="w-full flex-shrink-0 flex justify-center mb-3"
      variants={{
        animate: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
      }}
    >
      {images.slice(0, 1).map((imgSrc, imgIndex) => (
        <motion.div
          key={imgIndex}
          className="relative w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 rounded-xl shadow-lg border-2 border-magic-cyan-accent/50 overflow-hidden flex-shrink-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img
            src={imgSrc}
            alt={`Tour illustration ${imgIndex + 1}`}
            className={cn(
              "object-contain w-full h-full"
              // Removed aggressive filter classes
            )}
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );

  const renderIcon = () => Icon && (
    <motion.div
      className="mb-2 flex-shrink-0"
      variants={iconVariants}
      initial="initial"
      animate={["animate", "continuous"]}
      exit="exit"
    >
      <Icon size={28} className="text-magic-cyan-accent w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
    </motion.div>
  );

  const highlightWordsInTitle = {
    "welcome!": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "selection": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "sound": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "player": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "controls": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "sleep": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "timer": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "extra": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "features": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "start": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
    "tutorial!": "text-magic-cyan-accent font-bold text-xl sm:text-2xl",
  };

  const highlightWordsInDescription = {
    "calmness": "text-magic-cyan-accent font-semibold",
    "productivity": "text-magic-cyan-accent font-semibold",
    "improve": "text-magic-cyan-accent font-semibold",
    "sleep": "text-magic-cyan-accent font-semibold",
    "concentration": "text-magic-cyan-accent font-semibold",
    "relaxation": "text-magic-cyan-accent font-semibold",
    "main": "text-magic-cyan-accent font-semibold",
    "screen": "text-magic-cyan-accent font-semibold",
    "many": "text-magic-cyan-accent font-semibold",
    "relaxing": "text-magic-cyan-accent font-semibold",
    "sounds": "text-magic-cyan-accent font-semibold",
    "tap": "text-magic-cyan-accent font-semibold",
    "card": "text-magic-cyan-accent font-semibold",
    "player": "text-magic-cyan-accent font-semibold",
    "playback": "text-magic-cyan-accent font-semibold",
    "volume": "text-magic-cyan-accent font-semibold",
    "background": "text-magic-cyan-accent font-semibold",
    "radio": "text-magic-cyan-accent font-semibold",
    "perfect": "text-magic-cyan-accent font-semibold",
    "atmosphere": "text-magic-cyan-accent font-semibold",
    "automatically": "text-magic-cyan-accent font-semibold",
    "turn": "text-magic-cyan-accent font-semibold",
    "off": "text-magic-cyan-accent font-semibold",
    "smooth": "text-magic-cyan-accent font-semibold",
    "transition": "text-magic-cyan-accent font-semibold",
    "history": "text-magic-cyan-accent font-semibold",
    "customize": "text-magic-cyan-accent font-semibold",
    "share": "text-magic-cyan-accent font-semibold",
    "journey": "text-magic-cyan-accent font-semibold",
    "begins!": "text-magic-cyan-accent font-semibold",
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start p-3 text-center h-full w-full gap-y-2 flex-grow"
    >
      {layoutType === 'image-top' && renderImage()}
      {layoutType === 'icon-top' && renderIcon()}

      <motion.div
        ref={scrollRef}
        className={cn(
          "flex flex-col items-center text-center w-full overflow-y-auto scrollbar-styled flex-grow px-2 max-w-sm mx-auto",
        )}
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatedTextSegment
          text={title}
          className={cn("text-xl sm:text-2xl md:text-3xl font-etude-noire font-bold text-magic-accent-blue drop-shadow-md w-full whitespace-normal leading-tight mb-2")}
          highlightWords={highlightWordsInTitle}
          staggerDelay={0.03}
        />
        <AnimatedTextSegment
          text={description}
          className={cn("text-sm sm:text-base text-gray-200 w-full whitespace-normal leading-snug font-mts-wide")}
          highlightWords={highlightWordsInDescription}
          staggerDelay={0.01}
        />
      </motion.div>

      {!scrolledToBottom && (
        <motion.div
          className="absolute bottom-20 sm:bottom-24 text-magic-cyan-accent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0.8, 1, 0.8, 1, 0], y: [10, 0, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-magic-cyan-accent text-white shadow-lg">
            <ChevronDown size={14} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TourSlide;