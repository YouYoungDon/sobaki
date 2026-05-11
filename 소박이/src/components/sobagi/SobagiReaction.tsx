import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SobagiCharacter } from './SobagiCharacter';
import { EmotionBubble } from './EmotionBubble';
import { SobagiEmotion } from '../../types';

interface SobagiReactionProps {
  emotion: SobagiEmotion;
  message: string;
}

export function SobagiReaction({ emotion, message }: SobagiReactionProps) {
  return (
    <View style={styles.container}>
      <EmotionBubble message={message} />
      <View style={styles.gap} />
      <SobagiCharacter emotion={emotion} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  gap: {
    height: 16,
  },
});
