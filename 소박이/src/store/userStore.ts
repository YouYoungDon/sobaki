import { create } from 'zustand';
import { UserState } from '../types';

const EXP_PER_RECORD = 10;
const EXP_PER_LEVEL = 100;

function getRoomStage(count: number): 1 | 2 | 3 | 4 | 5 {
  if (count >= 60) return 5;
  if (count >= 30) return 4;
  if (count >= 15) return 3;
  if (count >= 5) return 2;
  return 1;
}

interface UserStore extends UserState {
  processRecordReward: () => void;
  setStreak: (streak: number) => void;
  hydrate: (state: UserState) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  level: 1,
  exp: 0,
  streak: 0,
  totalRecordCount: 0,
  roomStage: 1,
  processRecordReward: () =>
    set((state) => {
      const newCount = state.totalRecordCount + 1;
      const newExp = state.exp + EXP_PER_RECORD;
      const newLevel = Math.floor(newExp / EXP_PER_LEVEL) + 1;
      return {
        totalRecordCount: newCount,
        exp: newExp,
        level: newLevel,
        roomStage: getRoomStage(newCount),
      };
    }),
  setStreak: (streak) => set({ streak }),
  hydrate: (state) => set(state),
}));
