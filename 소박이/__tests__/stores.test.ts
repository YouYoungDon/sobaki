jest.mock('../src/services/storageService', () => ({
  save: jest.fn().mockResolvedValue(undefined),
}));

import { useEmotionStore } from '../src/store/emotionStore';
import { useExpenseStore } from '../src/store/expenseStore';
import { useUserStore } from '../src/store/userStore';
import { Expense } from '../src/types';

const mockExpense = (overrides: Partial<Expense> = {}): Expense => ({
  id: '1',
  amount: 4500,
  category: 'cafe',
  sobagiEmotion: 'happy',
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe('emotionStore', () => {
  it('setEmotion updates currentEmotion and currentMessage', () => {
    useEmotionStore.getState().setEmotion('excited', '신나요!');
    const { currentEmotion, currentMessage } = useEmotionStore.getState();
    expect(currentEmotion).toBe('excited');
    expect(currentMessage).toBe('신나요!');
  });
});

describe('expenseStore', () => {
  beforeEach(() => useExpenseStore.setState({ expenses: [] }));

  it('addExpense appends to expenses', () => {
    const expense = mockExpense();
    useExpenseStore.getState().addExpense(expense);
    expect(useExpenseStore.getState().expenses).toHaveLength(1);
  });

  it('getTodayExpenses returns only today records', () => {
    const today = mockExpense({ createdAt: new Date().toISOString() });
    const old = mockExpense({ id: '2', createdAt: '2020-01-01T00:00:00.000Z' });
    useExpenseStore.getState().hydrate([today, old]);
    expect(useExpenseStore.getState().getTodayExpenses()).toHaveLength(1);
  });
});

describe('userStore', () => {
  beforeEach(() =>
    useUserStore.setState({
      level: 1, exp: 0, streak: 0, totalRecordCount: 0, roomStage: 1,
    })
  );

  it('processRecordReward increments totalRecordCount', () => {
    useUserStore.getState().processRecordReward();
    expect(useUserStore.getState().totalRecordCount).toBe(1);
  });

  it('processRecordReward advances roomStage at threshold 5', () => {
    useUserStore.setState({ totalRecordCount: 4 });
    useUserStore.getState().processRecordReward();
    expect(useUserStore.getState().roomStage).toBe(2);
  });

  it('processRecordReward advances roomStage at threshold 15', () => {
    useUserStore.setState({ totalRecordCount: 14 });
    useUserStore.getState().processRecordReward();
    expect(useUserStore.getState().roomStage).toBe(3);
  });
});
