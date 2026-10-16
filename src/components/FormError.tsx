import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export function FormError({ children }: { children?: string }) {
  if (!children) return null;
  return <Text style={styles.error}>{children}</Text>;
}

const styles = StyleSheet.create({
  error: {
    marginTop: 10,
    color: colors.error,
    fontSize: 13,
    lineHeight: 18,
  },
});
