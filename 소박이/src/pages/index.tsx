import { createRoute } from '@granite-js/react-native';
import React from 'react';
import { View, Text } from 'react-native';

export const Route = createRoute('/', {
  component: IndexPage,
});

function IndexPage() {
  return (
    <View>
      <Text>소박이</Text>
    </View>
  );
}
