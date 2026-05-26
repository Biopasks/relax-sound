import { useState, useEffect } from 'react';

type ColorScheme = 'light' | 'dark';

export function useColorScheme(): ColorScheme {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateColorScheme = () => {
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Устанавливаем начальное значение
    updateColorScheme();

    // Слушаем изменения
    mediaQuery.addEventListener('change', updateColorScheme);

    // Очистка при размонтировании
    return () => {
      mediaQuery.removeEventListener('change', updateColorScheme);
    };
  }, []);

  return colorScheme;
}