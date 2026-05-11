import { useEffect, useState } from 'react';
import * as storageService from '../services/storageService';
import { STORAGE_KEYS } from '../constants/storage';
import { VALID_EMOTIONS, EMOTION_MESSAGES } from '../constants/emotion';
import { useExpenseStore } from '../store/expenseStore';
import { useUserStore } from '../store/userStore';
import { useEmotionStore } from '../store/emotionStore';
import { Expense, UserState, SobagiEmotion } from '../types';

export function useAppInit(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      const [userData, expenses, lastEmotionRaw] = await Promise.all([
        storageService.load<UserState>(STORAGE_KEYS.USER),
        storageService.load<Expense[]>(STORAGE_KEYS.EXPENSES),
        storageService.load<string>(STORAGE_KEYS.LAST_EMOTION),
      ]);

      if (userData) useUserStore.getState().hydrate(userData);
      if (expenses) useExpenseStore.getState().hydrate(expenses);

      const emotion: SobagiEmotion =
        lastEmotionRaw != null && VALID_EMOTIONS.includes(lastEmotionRaw as SobagiEmotion)
          ? (lastEmotionRaw as SobagiEmotion)
          : 'happy';

      // Set emotion without triggering Storage persist (it's already from storage)
      useEmotionStore.setState({
        currentEmotion: emotion,
        currentMessage: EMOTION_MESSAGES[emotion],
      });

      setIsReady(true);
    }
    init();
  }, []);

  return isReady;
}
