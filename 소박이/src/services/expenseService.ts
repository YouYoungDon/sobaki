import { Expense, UserState } from '../types';
import * as storageService from './storageService';
import { STORAGE_KEYS } from '../constants/storage';
import { useExpenseStore } from '../store/expenseStore';
import { useUserStore } from '../store/userStore';
import { getLocalDateString } from '../utils/date';

export async function saveExpense(expense: Expense): Promise<void> {
  const expenseStore = useExpenseStore.getState();
  const userStore = useUserStore.getState();

  // Streak logic: only update on first record of a new day
  const yesterdayStr = getLocalDateString(new Date(Date.now() - 86400000));
  const todayExpenses = expenseStore.getTodayExpenses();

  if (todayExpenses.length === 0) {
    const yesterdayHadRecord = expenseStore.expenses.some(
      (e) => getLocalDateString(new Date(e.createdAt)) === yesterdayStr,
    );
    const newStreak = yesterdayHadRecord ? userStore.streak + 1 : 1;
    userStore.setStreak(newStreak);
  }

  expenseStore.addExpense(expense);
  userStore.processRecordReward();

  // Persist to Storage (fire-and-forget — stores already updated in memory)
  const updatedExpenses = useExpenseStore.getState().expenses;
  const updatedUser: UserState = {
    level: useUserStore.getState().level,
    exp: useUserStore.getState().exp,
    streak: useUserStore.getState().streak,
    totalRecordCount: useUserStore.getState().totalRecordCount,
    roomStage: useUserStore.getState().roomStage,
  };

  void storageService.save(STORAGE_KEYS.EXPENSES, updatedExpenses);
  void storageService.save(STORAGE_KEYS.USER, updatedUser);
}
