import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MagicBackButton: React.FC = () => {
  const navigate = useNavigate();
  const { triggerHapticFeedback } = useSettings();

  const handleGoBack = () => {
    triggerHapticFeedback();
    navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleGoBack}
      className={cn(
        "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-sm",
        "border border-magic-accent-blue/40 transition-all duration-200 ease-in-out",
        "flex items-center justify-center text-blue-300 hover:bg-gray-700/80 hover:border-magic-accent-blue/60 hover:text-white"
      )}
    >
      <ChevronLeft size={20} className="sm:size-24 md:size-28" />
    </Button>
  );
};

export default MagicBackButton;
