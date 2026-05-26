import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCasinoCardEffect {
  highlightedCardIndex: number | null;
  startCasinoEffect: (totalCards: number) => void;
  stopCasinoEffect: () => void;
}

export const useCasinoCardEffect = (): UseCasinoCardEffect => {
  const [highlightedCardIndex, setHighlightedCardIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalCardsRef = useRef(0);

  const stopCasinoEffect = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHighlightedCardIndex(null);
  }, []);

  const animateCards = useCallback(() => {
    const totalCards = totalCardsRef.current;
    if (totalCards === 0) {
      stopCasinoEffect();
      return;
    }

    setHighlightedCardIndex(prevIndex => {
      const current = prevIndex !== null ? prevIndex : 0;
      const nextIndex = (current + 1) % totalCards; // Простая последовательная смена
      return nextIndex;
    });

    timeoutRef.current = setTimeout(animateCards, 1500); // Увеличена задержка до 1.5 секунды
  }, [stopCasinoEffect]);

  const startCasinoEffect = useCallback((totalCards: number) => {
    stopCasinoEffect(); // Очищаем любую существующую анимацию
    totalCardsRef.current = totalCards;
    setHighlightedCardIndex(0); // Начинаем с первой карточки
    timeoutRef.current = setTimeout(animateCards, 1500); // Начальная задержка
  }, [animateCards, stopCasinoEffect]);

  useEffect(() => {
    return () => {
      stopCasinoEffect();
    };
  }, [stopCasinoEffect]);

  useEffect(() => {
  }, [highlightedCardIndex]);


  return { highlightedCardIndex, startCasinoEffect, stopCasinoEffect };
};