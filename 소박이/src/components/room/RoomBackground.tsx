import React from 'react';
import { View, StyleSheet } from 'react-native';

const STAGE_COLORS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: '#F5EDD8',
  2: '#EDE8D0',
  3: '#E8E0C8',
  4: '#E2DAC0',
  5: '#DDD4B8',
};

interface RoomBackgroundProps {
  stage: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
}

export function RoomBackground({ stage, children }: RoomBackgroundProps) {
  return (
    <View style={[styles.container, { backgroundColor: STAGE_COLORS[stage] }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
