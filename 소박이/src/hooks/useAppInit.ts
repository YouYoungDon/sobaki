import { useEffect } from 'react';
import * as storageService from '../services/storageService';
import { STORAGE_KEYS } from '../constants/storage';
import { VALID_EMOTIONS, EMOTION_MESSAGES } from '../constants/emotion';
import { useExpenseStore } from '../store/expenseStore';
import { useUserStore } from '../store/userStore';
import { useEmotionStore } from '../store/emotionStore';
import { Expense, UserState, SobagiEmotion } from '../types';

let appInitialized = false;

export function useAppInit(): boolean {
  useEffect(() => {
    if (appInitialized) return;
    appInitialized = true;

    // Load stored data in background — does not block rendering
    async function loadStored() {
      try {
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

        useEmotionStore.setState({
          currentEmotion: emotion,
          currentMessage: EMOTION_MESSAGES[emotion],
        });
      } catch {
        // Storage unavailable in sandbox — use default state
      }
    }

    loadStored();
  }, []);

  // Always ready immediately — no loading gate
  return true;
}
