import { toast } from 'sonner';
import { NativeAudio } from '@/capacitor-plugins'; // Import NativeAudio
import { playUiSound } from './audio-effects';

const SOUND_PLAYED_NOTIFICATION_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
let lastSoundPlayedNotificationTime = 0;

export const showSuccess = (message: string, soundName?: string) => {
  toast.success(message, {
    duration: 3000,
    style: {
      backgroundColor: 'var(--magic-accent-green)',
      color: 'white',
      border: '1px solid var(--magic-accent-green-dark)',
      boxShadow: '0 4px 12px rgba(0, 255, 128, 0.3)',
    },
  });
  // playUiSound('success.mp3'); // Temporarily commented out due to missing file
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 5000,
    style: {
      backgroundColor: 'var(--magic-red)',
      color: 'white',
      border: '1px solid var(--magic-red-dark)',
      boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)',
    },
  });
  // playUiSound('error.mp3'); // Temporarily commented out due to missing file
};

export const showInfo = (message: string) => {
  toast.info(message, {
    duration: 4000,
    style: {
      backgroundColor: 'var(--magic-blue-start)',
      color: 'white',
      border: '1px solid var(--magic-blue-end)',
      boxShadow: '0 4px 12px rgba(0, 128, 255, 0.3)',
    },
  });
  // playUiSound('info.mp3'); // Temporarily commented out due to missing file
};