import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface DailySummaryProps {
  totalAmount: number;
  recordCount: number;
}

export function DailySummary({ totalAmount, recordCount }: DailySummaryProps) {
  if (recordCount === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>오늘 첫 기록을 남겨봐요 🌿</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        오늘 {recordCount}번 기록했어요 · {totalAmount.toLocaleString()}원
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  text: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
