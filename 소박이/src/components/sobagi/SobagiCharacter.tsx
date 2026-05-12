import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { SobagiEmotion } from '../../types';

const EMOTION_EMOJIS: Record<SobagiEmotion, string> = {
  happy: '😊',
  excited: '🌟',
  cozy: '🍵',
  sleepy: '😴',
  satisfied: '🌿',
};

const SIZES = { small: 48, medium: 80, large: 120 };

interface SobagiCharacterProps {
  emotion: SobagiEmotion;
  size?: 'small' | 'medium' | 'large';
}

export function SobagiCharacter({ emotion, size = 'medium' }: SobagiCharacterProps) {
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 8,
      stiffness: 100,
    }).start();
  }, [emotion]);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Text style={{ fontSize: SIZES[size] }}>{EMOTION_EMOJIS[emotion]}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
