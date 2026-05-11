export type SobagiEmotion = 'happy' | 'excited' | 'cozy' | 'sleepy' | 'satisfied';

export type ExpenseCategory = 'cafe' | 'food' | 'transport' | 'shopping' | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  userEmotion?: string;   // emoji the user selected
  memo?: string;
  sobagiEmotion: SobagiEmotion;
  createdAt: string;      // ISO string, local time used for display
}

export interface UserState {
  level: number;
  exp: number;
  streak: number;
  totalRecordCount: number;
  roomStage: 1 | 2 | 3 | 4 | 5;
}

export interface EmotionContext {
  isFirstRecordToday: boolean;
  currentStreak: number;
  currentHour: number;    // 0–23, device local time
}
