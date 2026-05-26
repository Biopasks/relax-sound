export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Здесь будет реальная интеграция с Яндекс.Метрикой
  // Например: ym(XXXXXX, 'reachGoal', eventName, params);
};

export const onSoundPlayed = (soundName: string) => {
  trackEvent('sound_played', { soundName });
};

export const onSleepTimerSet = (duration: number) => {
  trackEvent('sleep_timer_set', { duration });
};

export const onAdInterstitialShow = () => {
  trackEvent('ad_interstitial_show');
};

export const onAdRewardedUnlock = (soundName: string) => {
  trackEvent('ad_rewarded_unlock', { soundName });
};

export const onAdAudioPauseError = () => {
  trackEvent('ad_audio_pause_error');
};

export const onFavoriteToggled = (soundName: string, isFavorited: boolean) => {
  trackEvent('favorite_toggled', { soundName, isFavorited });
};