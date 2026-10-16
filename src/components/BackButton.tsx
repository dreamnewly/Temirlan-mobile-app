import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../theme';

export function BackButton() {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Назад"
      hitSlop={10}
      onPress={() => (router.canGoBack() ? router.back() : router.replace('/login'))}
      style={styles.button}
    >
      <Text style={styles.arrow}>←</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  arrow: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 38,
  },
});
