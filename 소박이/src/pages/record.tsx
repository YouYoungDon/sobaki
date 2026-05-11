import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import { createRoute, useNavigation } from '@granite-js/react-native';
import { CategorySelector } from '../components/expense/CategorySelector';
import { saveExpense } from '../services/expenseService';
import { evaluate } from '../services/emotionEngine';
import { EMOTION_MESSAGES } from '../constants/emotion';
import { useEmotionStore } from '../store/emotionStore';
import { useExpenseStore } from '../store/expenseStore';
import { useUserStore } from '../store/userStore';
import { ExpenseCategory, EmotionContext } from '../types';
import { COLORS } from '../constants/colors';

export const Route = createRoute('/record', {
  validateParams: (params) => params,
  component: RecordScreen,
});

const USER_EMOTIONS = ['😊', '😐', '😔', '😤', '🥰'];

function RecordScreen() {
  const navigation = useNavigation();
  const [amountText, setAmountText] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('cafe');
  const [userEmotion, setUserEmotion] = useState<string | undefined>(undefined);
  const [memo, setMemo] = useState('');

  const setEmotion = useEmotionStore((s) => s.setEmotion);
  const getTodayExpenses = useExpenseStore((s) => s.getTodayExpenses);
  const streak = useUserStore((s) => s.streak);

  const amount = parseInt(amountText.replace(/,/g, ''), 10) || 0;
  const canSave = amount > 0;

  const handleSave = async () => {
    const ctx: EmotionContext = {
      isFirstRecordToday: getTodayExpenses().length === 0,
      currentStreak: streak,
      currentHour: new Date().getHours(),
    };

    const sobagiEmotion = evaluate(
      { id: '', amount, category, sobagiEmotion: 'happy', createdAt: '' },
      ctx,
    );

    const expense = {
      id: Date.now().toString(),
      amount,
      category,
      userEmotion,
      memo: memo.trim() || undefined,
      sobagiEmotion,
      createdAt: new Date().toISOString(),
    };

    setEmotion(sobagiEmotion, EMOTION_MESSAGES[sobagiEmotion]);
    await saveExpense(expense);
    navigation.navigate('/reaction');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>오늘의 소비를 기록해요</Text>

        <Text style={styles.amountDisplay}>
          {amount > 0 ? `${amount.toLocaleString()}원` : '0원'}
        </Text>

        <TextInput
          style={styles.amountInput}
          value={amountText}
          onChangeText={setAmountText}
          placeholder="금액 입력"
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.sectionLabel}>카테고리</Text>
        <CategorySelector selected={category} onSelect={setCategory} />

        <Text style={styles.sectionLabel}>기분은 어때요?</Text>
        <View style={styles.emotionRow}>
          {USER_EMOTIONS.map((e) => (
            <Pressable
              key={e}
              style={[styles.emotionChip, userEmotion === e && styles.emotionChipSelected]}
              onPress={() => setUserEmotion(userEmotion === e ? undefined : e)}
            >
              <Text style={styles.emotionEmoji}>{e}</Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={styles.memoInput}
          value={memo}
          onChangeText={setMemo}
          placeholder="메모를 입력해요 (선택)"
          maxLength={60}
        />

        <Pressable
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!canSave}
        >
          <Text style={styles.saveButtonLabel}>저장</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  title: { fontSize: 16, color: COLORS.textMuted, marginBottom: 16, textAlign: 'center' },
  amountDisplay: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  amountInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.woodLight,
    padding: 8,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionLabel: { fontSize: 13, color: COLORS.textMuted, marginBottom: 8, marginTop: 16 },
  emotionRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  emotionChip: { padding: 8, borderRadius: 20, backgroundColor: COLORS.surface },
  emotionChipSelected: { backgroundColor: COLORS.oliveGreen },
  emotionEmoji: { fontSize: 22 },
  memoInput: {
    borderWidth: 1,
    borderColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginTop: 8,
    color: COLORS.text,
  },
  saveButton: {
    marginTop: 32,
    backgroundColor: COLORS.oliveDark,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: { opacity: 0.4 },
  saveButtonLabel: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
