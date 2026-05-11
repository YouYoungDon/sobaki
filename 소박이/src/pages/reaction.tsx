import React, { useCallback, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { createRoute, useNavigation } from '@granite-js/react-native';
import { SobagiReaction } from '../components/sobagi/SobagiReaction';
import { useEmotionStore } from '../store/emotionStore';
import { COLORS } from '../constants/colors';

export const Route = createRoute('/reaction', {
  validateParams: (params) => params,
  component: SobagiReactionScreen,
});

function SobagiReactionScreen() {
  const navigation = useNavigation();
  const currentEmotion = useEmotionStore((s) => s.currentEmotion);
  const currentMessage = useEmotionStore((s) => s.currentMessage);

  const handleClose = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: '/' }],
    });
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(handleClose, 2500);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <Pressable style={styles.container} onPress={handleClose}>
      <View style={styles.inner}>
        <SobagiReaction emotion={currentEmotion} message={currentMessage} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
    padding: 32,
  },
});
