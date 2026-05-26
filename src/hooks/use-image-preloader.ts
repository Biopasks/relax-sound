
import { useState, useEffect, useCallback } from 'react';

interface UseImagePreloaderResult {
  isLoading: boolean;
  progress: number; // Прогресс от 0 до 100
  error: string | null;
}

export const useImagePreloader = (imageUrls: string[]): UseImagePreloaderResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const preloadImages = useCallback(async () => {
    if (imageUrls.length === 0) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError(null);

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const imageLoadPromises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = (e) => {
          console.error(`Не удалось загрузить изображение: ${url}`, e);
          // Просто логируем ошибку и продолжаем
          loadedCount++;
          setProgress(Math.floor((loadedCount / totalImages) * 100));
          setError((prev) => (prev ? prev + `\nНе удалось загрузить ${url}` : `Не удалось загрузить ${url}`));
          resolve(); // Разрешаем, чтобы не блокировать общий прогресс
        };
      });
    });

    try {
      await Promise.all(imageLoadPromises);
      setIsLoading(false);
      setProgress(100);
    } catch (e: any) {
      // Этот блок может быть достигнут, если Promise.all отклоняется,
      // но мы настроили отдельные промисы на разрешение даже при ошибке загрузки изображения.
      console.error("Непредвиденная ошибка во время предварительной загрузки изображений:", e);
      setError(e.message || "Произошла непредвиденная ошибка во время предварительной загрузки изображений.");
      setIsLoading(false);
      setProgress(100); // Завершаем загрузку, даже если есть ошибки
    }
  }, [imageUrls]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return { isLoading, progress, error };
};