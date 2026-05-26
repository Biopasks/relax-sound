
import { useRef, useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';

// Хук для анимаций при прокрутке
export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls };
};