import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { createRoute, useNavigation } from '@granite-js/react-native';
import { RoomBackground } from '../components/room/RoomBackground';
import { SobagiCharacter } from '../components/sobagi/SobagiCharacter';
import { DailySummary } from '../components/common/DailySummary';
import { QuickRecordButton } from '../components/common/QuickRecordButton';
import { useEmotionStore } from '../store/emotionStore';
import { useExpenseStore } from '../store/expenseStore';
import { useUserStore } from '../store/userStore';
import { useAppInit } from '../hooks/useAppInit';
import { BottomTabs } from '../components/common/BottomTabs';
import { getLocalDateString } from '../utils/date';
import { COLORS } from '../constants/colors';

export const Route = createRoute('/', {
  validateParams: (params) => params,
  component: HomeScreen,
});

function HomeScreen() {
  const navigation = useNavigation();
  const isReady = useAppInit();

  const currentEmotion = useEmotionStore((s) => s.currentEmotion);
  const roomStage = useUserStore((s) => s.roomStage);
  const expenses = useExpenseStore((s) => s.expenses);
  const todayExpenses = useMemo(() => {
    const todayStr = getLocalDateString(new Date());
    return expenses.filter((e) => getLocalDateString(new Date(e.createdAt)) === todayStr);
  }, [expenses]);
  const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0);

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <SobagiCharacter emotion="happy" size="large" />
      </View>
    );
  }

  return (
    <RoomBackground stage={roomStage}>
      <View style={styles.container}>
        <View style={styles.summary}>
          <DailySummary totalAmount={todayTotal} recordCount={todayExpenses.length} />
        </View>

        <View style={styles.character}>
          <SobagiCharacter emotion={currentEmotion} size="large" />
        </View>

        <View style={styles.fab}>
          <QuickRecordButton onPress={() => navigation.navigate('/record')} />
        </View>
      </View>
      <BottomTabs />
    </RoomBackground>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1, paddingTop: 60, paddingBottom: 40 },
  summary: { alignItems: 'center', marginBottom: 8 },
  character: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: { alignItems: 'center' },
});
