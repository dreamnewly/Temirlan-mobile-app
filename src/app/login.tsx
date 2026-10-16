import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { FormError } from '../components/FormError';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

export default function LoginScreen() {
  const { phone, setPhone, password, setPassword } = useAuthFlow();
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (phone.replace(/\D/g, '').length < 10 || !password) {
      setError('Введите номер телефона и пароль.');
      return;
    }
    setError('');
    router.replace('/home');
  };

  return (
    <ScreenLayout>
      <BackButton />
      <Text style={styles.title}>Привет, с возвращением!</Text>
      <Text style={styles.subtitle}>Войдите в свой аккаунт.</Text>

      <View style={styles.fields}>
        <InputField
          icon="☎"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          placeholder="Номер телефона"
          value={phone}
        />
        <InputField
          icon="▣"
          onChangeText={setPassword}
          placeholder="Пароль"
          secureTextEntry
          value={password}
        />
      </View>

      <Link href="/recovery" asChild>
        <Pressable accessibilityRole="link" hitSlop={8} style={styles.forgot}>
          <Text style={styles.link}>Забыли пароль?</Text>
        </Pressable>
      </Link>
      <FormError>{error}</FormError>
      <View style={styles.primary}>
        <PrimaryButton onPress={handleLogin} title="Войти" />
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.muted}>У вас нет аккаунта? </Text>
        <Link href="/register" asChild>
          <Pressable accessibilityRole="link" hitSlop={8} style={styles.signupLink}>
            <Text style={styles.link}>Зарегистрироваться</Text>
          </Pressable>
        </Link>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 3,
    marginBottom: 28,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  fields: {
    gap: 18,
  },
  forgot: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  signupLink: {
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  link: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '500',
  },
  primary: {
    marginTop: 32,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 22,
  },
  muted: {
    color: colors.muted,
    fontSize: 14,
  },
});
