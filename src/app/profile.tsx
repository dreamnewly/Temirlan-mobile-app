import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

export default function ProfileScreen() {
  const { fullName, phone, city } = useAuthFlow();
  const initial = fullName.trim()[0]?.toUpperCase() || 'Я';

  return (
    <ScreenLayout>
      <BackButton />
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.title}>Мой профиль</Text>
        <Text style={styles.subtitle}>Ваши данные и выбранный город</Text>
      </View>

      <View style={styles.details}>
        <ProfileRow label="Имя" value={fullName || 'Не указано'} />
        <ProfileRow label="Номер телефона" value={phone || 'Не указан'} />
        <ProfileRow label="Город" value={city || 'Не выбран'} last />
      </View>

      <View style={styles.button}>
        <PrimaryButton onPress={() => router.replace('/home')} title="На главную" />
      </View>
    </ScreenLayout>
  );
}

function ProfileRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 38,
    backgroundColor: '#FBF3FD',
  },
  avatarText: {
    color: colors.purple,
    fontSize: 30,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 14,
  },
  details: {
    borderRadius: 18,
    backgroundColor: colors.field,
    paddingHorizontal: 16,
  },
  row: {
    minHeight: 68,
    justifyContent: 'center',
    gap: 5,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    marginTop: 'auto',
    paddingTop: 32,
  },
});
