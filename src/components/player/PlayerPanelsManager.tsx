
import React from 'react';
import TimerPanel from '@/components/TimerPanel';
import AboutAppPanel from '@/components/AboutAppPanel';
import SoundDetailsPanel from '@/components/SoundDetailsPanel';
import { useSound } from '@/context/SoundContext';
import { Sound } from '@/assets/audio'; // Import Sound

type ActivePanel = 'timer' | 'about' | 'soundDetails' | null; // Updated ActivePanel type

interface PlayerPanelsManagerProps {
  activePanel: ActivePanel;
  onPanelClose: () => void;
  onCloseWithEffects: () => void;
}

const PlayerPanelsManager: React.FC<PlayerPanelsManagerProps> = ({
  activePanel,
  onPanelClose,
  onCloseWithEffects,
}) => {
  const { currentNoise } = useSound(); // Use currentNoise

  // Determine which sound is currently active for the SoundDetailsPanel
  const activeSoundForDetails = currentNoise;

  return (
    <>
      <TimerPanel isOpen={activePanel === 'timer'} onClose={onPanelClose} />
      <AboutAppPanel isOpen={activePanel === 'about'} onClose={onPanelClose} />
      {activeSoundForDetails && ( // Only render SoundDetailsPanel if there's an active sound
        <SoundDetailsPanel
          isOpen={activePanel === 'soundDetails'}
          onClose={onPanelClose}
          onCloseWithEffects={onCloseWithEffects}
          sound={activeSoundForDetails as Sound} // Cast to Sound
        />
      )}
    </>
  );
};

export default PlayerPanelsManager;