
import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
// import { playUiSound } from '@/utils/audio-effects'; // Импортируем утилиту для звука

interface MagicWarningToastContentProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const MagicWarningToastContent: React.FC<MagicWarningToastContentProps> = ({ title, description }) => {
  // useEffect(() => {
  //   playUiSound('magic-error-sound.mp3'); // Воспроизводим звук при монтировании компонента
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-start gap-3 p-3"
    >
      <AlertTriangle size={24} className="text-orange-400 flex-shrink-0 mt-0.5" />
      <div className="flex flex-col">
        {title && <h3 className="text-lg font-semibold text-orange-300">{title}</h3>}
        {description && <p className="text-sm text-gray-200">{description}</p>}
      </div>
    </motion.div>
  );
};

export default MagicWarningToastContent;