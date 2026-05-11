import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@granite-js/react-native';
import { COLORS } from '../../constants/colors';

export function BottomTabs() {
  const navigation = useNavigation();
  return (
    <View style={styles.bar}>
      <Pressable style={styles.tab} onPress={() => navigation.navigate('/')}>
        <Text style={styles.tabLabel}>🏠 홈</Text>
      </Pressable>
      <Pressable style={styles.tab} onPress={() => navigation.navigate('/history')}>
        <Text style={styles.tabLabel}>📋 기록</Text>
      </Pressable>
      <Pressable style={styles.tab} onPress={() => navigation.navigate('/stats')}>
        <Text style={styles.tabLabel}>📊 통계</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.warmWhite,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    paddingBottom: 20,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabLabel: { fontSize: 13, color: COLORS.textMuted },
});
