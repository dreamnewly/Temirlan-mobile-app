import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { FormError } from '../components/FormError';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

export default function ResetPasswordScreen() {
  const { password, setPassword } = useAuthFlow();
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const savePassword = () => {
    if (password.length < 8 || !/[a-zа-я]/.test(password) || !/[A-ZА-Я]/.test(password)) {
      setError('Пароль должен содержать не менее 8 символов, строчные и заглавные буквы.');
      return;
    }
    if (password !== confirmation) {
      setError('Пароли не совпадают.');
      return;
    }
    setError('');
    router.replace('/login');
  };

  return (
    <ScreenLayout contentStyle={styles.page}>
      <BackButton />
      <View style={styles.center}>
        <Text style={styles.title}>Сбросить пароль</Text>
        <Text style={styles.subtitle}>
          Не менее 8 символов, с прописными и строчными буквами
        </Text>
        <View style={styles.fields}>
          <InputField
            icon="▣"
            onChangeText={setPassword}
            placeholder="Пароль"
            secureTextEntry
            value={password}
          />
          <InputField
            icon="▣"
            onChangeText={setConfirmation}
            placeholder="Повторить пароль"
            secureTextEntry
            value={confirmation}
          />
        </View>
        <FormError>{error}</FormError>
        <View style={styles.button}>
          <PrimaryButton onPress={savePassword} title="Продолжить" />
        </View>
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
    maxWidth: 320,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 28,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  fields: {
    gap: 18,
  },
  button: {
    marginTop: 28,
  },
});
