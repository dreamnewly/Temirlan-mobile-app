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

export default function RecoveryScreen() {
  const { phone, setPhone, setCode } = useAuthFlow();
  const [error, setError] = useState('');

  const continueToVerification = () => {
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Введите корректный номер телефона.');
      return;
    }
    setError('');
    setCode('');
    router.push('/verify');
  };

  return (
    <ScreenLayout contentStyle={styles.page}>
      <BackButton />
      <View style={styles.center}>
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text style={styles.subtitle}>
          Введите свой номер телефона, чтобы восстановить пароль
        </Text>
        <View style={styles.field}>
          <InputField
            icon="☎"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            placeholder="Номер телефона"
            value={phone}
          />
        </View>
        <FormError>{error}</FormError>
        <View style={styles.button}>
          <PrimaryButton onPress={continueToVerification} title="Продолжить" />
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
    marginTop: 4,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  field: {
    marginTop: 30,
  },
  button: {
    marginTop: 28,
  },
});
