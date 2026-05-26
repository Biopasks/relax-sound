
import React from 'react';
import { Sound } from '@/assets/audio';
import SoundCard from './SoundCard';
import { cn } from '@/lib/utils';

interface SoundGridProps {
  sounds: Sound[];
  onSoundSelect: (sound: Sound) => void;
  currentSound: Sound | null;
  highlightedCardIndex?: number;
}

const SoundGrid: React.FC<SoundGridProps> = ({ 
  sounds, 
  onSoundSelect, 
  currentSound, 
  highlightedCardIndex 
}) => {
  return (
    <div 
      className={cn(
        "h-full grid grid-cols-3 auto-rows-auto content-center",
        "gap-1.5 md:gap-2 lg:gap-3",
        "px-2 sm:px-3 md:px-4 lg:px-6",
        "pt-1 max-w-full mx-auto w-full"
      )}
    >
      {sounds.map((sound, index) => (
        <div 
          key={sound.id} 
          className="flex items-center justify-center"
        >
          <SoundCard
            sound={sound}
            onSelect={onSoundSelect}
            isSelected={currentSound?.id === sound.id}
            isCasinoHighlighted={highlightedCardIndex === index}
          />
        </div>
      ))}
    </div>
  );
};

export default SoundGrid;