import React from 'react';
import { Stack } from 'expo-router';
import { AuthFlowProvider } from '../context/AuthFlowContext';

export default function RootLayout() {
  return (
    <AuthFlowProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </AuthFlowProvider>
  );
}
