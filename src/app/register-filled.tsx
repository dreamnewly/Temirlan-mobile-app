import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { FormError } from '../components/FormError';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

export default function RegisterFilledScreen() {
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    password,
    setPassword,
    acceptedTerms,
    setAcceptedTerms,
  } = useAuthFlow();
  const [error, setError] = useState('');

  const register = () => {
    if (!fullName.trim() || phone.replace(/\D/g, '').length < 10 || password.length < 8) {
      setError('Проверьте имя, номер телефона и пароль.');
      return;
    }
    if (!acceptedTerms) {
      setError('Для продолжения примите условия использования.');
      return;
    }
    setError('');
    router.push('/city');
  };

  return (
    <ScreenLayout>
      <BackButton />
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.subtitle}>Создайте учетную запись, чтобы продолжить!</Text>

      <View style={styles.fields}>
        <InputField icon="●" onChangeText={setFullName} placeholder="Ваше имя" value={fullName} />
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

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: acceptedTerms }}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
        style={styles.termsRow}
      >
        <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
          {acceptedTerms ? <Text style={styles.check}>✓</Text> : null}
        </View>
        <Text style={styles.termsText}>
          Создавая учетную запись, вы соглашаетесь с нашими{' '}
          <Text accessibilityRole="link" onPress={() => router.push('/terms')} style={styles.link}>
            Условиями
          </Text>{' '}
          использования.
        </Text>
      </Pressable>

      <FormError>{error}</FormError>
      <View style={styles.button}>
        <PrimaryButton onPress={register} title="Зарегистрироваться" />
      </View>
      <View style={styles.loginRow}>
        <Text style={styles.muted}>Уже есть аккаунт? </Text>
        <Pressable onPress={() => router.replace('/login')}>
          <Text style={styles.link}>Войти</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    maxWidth: 280,
    marginTop: 5,
    marginBottom: 27,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  fields: {
    gap: 18,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 7,
    marginRight: 12,
  },
  checkboxChecked: {
    borderColor: colors.purple,
    backgroundColor: colors.purple,
  },
  check: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    marginTop: 24,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  muted: {
    color: colors.muted,
    fontSize: 14,
  },
});
