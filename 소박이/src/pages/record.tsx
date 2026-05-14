import React, { useRef, useState } from 'react';
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

const USER_EMOTIONS = [
  { emoji: '😊', label: '좋아' },
  { emoji: '😐', label: '그냥' },
  { emoji: '😔', label: '속상' },
  { emoji: '😤', label: '억울' },
  { emoji: '🥰', label: '뿌듯' },
];

function RecordScreen() {
  const navigation = useNavigation();
  const [amountText, setAmountText] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('cafe');
  const [userEmotion, setUserEmotion] = useState<string | undefined>(undefined);
  const [memo, setMemo] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const amountInputRef = useRef<TextInput>(null);

  const setEmotion = useEmotionStore((s) => s.setEmotion);
  const getTodayExpenses = useExpenseStore((s) => s.getTodayExpenses);
  const streak = useUserStore((s) => s.streak);

  const amount = parseInt(amountText.replace(/,/g, ''), 10) || 0;
  const canSave = amount > 0 && !isSaving;

  const handleSave = async () => {
    if (!canSave) return;
    setIsSaving(true);
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
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.navigate('/')}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>기록하기</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageSubtitle}>오늘의 소비를 기록해요 ✏️</Text>

        {/* Amount hero */}
        <Pressable style={styles.amountCard} onPress={() => amountInputRef.current?.focus()}>
          <Text style={styles.amountDisplay}>
            {amount > 0 ? `${amount.toLocaleString()}원` : '0원'}
          </Text>
          <TextInput
            ref={amountInputRef}
            style={styles.amountInput}
            value={amountText}
            onChangeText={setAmountText}
            placeholder="금액을 입력해요"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            maxLength={10}
          />
        </Pressable>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>카테고리</Text>
          <CategorySelector selected={category} onSelect={setCategory} />
        </View>

        {/* User emotion */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>기분은 어때요?</Text>
          <View style={styles.emotionRow}>
            {USER_EMOTIONS.map((e) => (
              <Pressable
                key={e.emoji}
                style={[styles.emotionChip, userEmotion === e.emoji && styles.emotionChipSelected]}
                onPress={() => setUserEmotion(userEmotion === e.emoji ? undefined : e.emoji)}
              >
                <Text style={styles.emotionEmoji}>{e.emoji}</Text>
                <Text style={[styles.emotionLabel, userEmotion === e.emoji && styles.emotionLabelSelected]}>
                  {e.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Memo */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>한마디 (선택)</Text>
          <TextInput
            style={styles.memoInput}
            value={memo}
            onChangeText={setMemo}
            placeholder="오늘 소비에 대한 한마디..."
            placeholderTextColor={COLORS.textLight}
            maxLength={60}
            multiline
          />
        </View>

        {/* Save */}
        <Pressable
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!canSave}
        >
          <Text style={styles.saveButtonLabel}>저장하기</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 8,
    paddingBottom: 4,
    backgroundColor: COLORS.cream,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: COLORS.text,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerSpacer: {
    width: 44,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 48,
  },
  pageSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  amountCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  amountDisplay: {
    fontSize: 44,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  amountInput: {
    fontSize: 14,
    color: COLORS.textMuted,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 160,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  emotionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  emotionChip: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    minWidth: 52,
    gap: 4,
  },
  emotionChipSelected: {
    backgroundColor: COLORS.oliveGreen,
  },
  emotionEmoji: {
    fontSize: 22,
  },
  emotionLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  emotionLabelSelected: {
    color: '#fff',
  },
  memoInput: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 80,
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: COLORS.oliveDark,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: COLORS.oliveDark,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  saveButtonDisabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
