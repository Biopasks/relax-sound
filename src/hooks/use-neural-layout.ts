import { useEffect, useRef, useCallback } from 'react';

export function useNeuralLayout() {
  const navRef = useRef<HTMLElement>(null);

  const measure = useCallback(() => {
    const navH = navRef.current?.offsetHeight || 64;
    document.documentElement.style.setProperty('--nav-height', navH + 'px');
  }, []);

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', () => setTimeout(measure, 200));

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, [measure]);

  return { navRef };
}
