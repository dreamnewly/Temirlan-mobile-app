import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { FormError } from '../components/FormError';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

export default function VerifyScreen() {
  const { phone, code, setCode } = useAuthFlow();
  const [error, setError] = useState('');
  const inputs = useRef<(TextInput | null)[]>([]);
  const digits = Array.from({ length: 4 }, (_, index) => code[index] ?? '');

  const updateDigit = (index: number, value: string) => {
    const nextDigit = value.replace(/\D/g, '').slice(-1);
    const next = digits.slice();
    next[index] = nextDigit;
    setCode(next.join(''));
    if (nextDigit && index < 3) inputs.current[index + 1]?.focus();
    setError('');
  };

  const continueToReset = () => {
    if (code.length !== 4) {
      setError('Введите четырёхзначный код.');
      return;
    }
    router.push('/reset-password');
  };

  return (
    <ScreenLayout contentStyle={styles.page}>
      <BackButton />
      <View style={styles.center}>
        <Text style={styles.title}>Подтвердите номер</Text>
        <Text style={styles.subtitle}>Мы отправили код на</Text>
        <Text style={styles.phone}>{phone || 'ваш номер телефона'}</Text>

        <View style={styles.codeRow}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              accessibilityLabel={`Цифра ${index + 1} кода`}
              autoComplete="sms-otp"
              autoFocus={index === 0}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => updateDigit(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
                  inputs.current[index - 1]?.focus();
                }
              }}
              ref={(input) => {
                inputs.current[index] = input;
              }}
              selectionColor={colors.purple}
              style={styles.digit}
              value={digit}
            />
          ))}
        </View>
        <FormError>{error}</FormError>
        <View style={styles.button}>
          <PrimaryButton onPress={continueToReset} title="Продолжить" />
        </View>
        <Pressable onPress={() => setCode('')} style={styles.resend}>
          <Text style={styles.resendText}>Отправить код еще раз</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 56,
  },
  title: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 30,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  phone: {
    marginTop: 3,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 28,
  },
  digit: {
    flex: 1,
    height: 60,
    borderRadius: 16,
    backgroundColor: colors.field,
    color: colors.text,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  resend: {
    alignSelf: 'center',
    marginTop: 24,
    paddingVertical: 4,
  },
  resendText: {
    color: colors.muted,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
