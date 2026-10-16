import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

export default function HomeScreen() {
  const { fullName, city } = useAuthFlow();
  const firstName = fullName.trim().split(/\s+/)[0];

  return (
    <ScreenLayout>
      <Text style={styles.eyebrow}>ГЛАВНАЯ</Text>
      <Text style={styles.title}>{firstName ? `Здравствуйте, ${firstName}!` : 'Здравствуйте!'}</Text>
      <Text style={styles.subtitle}>Рады видеть вас снова.</Text>

      <View style={styles.cityCard}>
        <View style={styles.cityIcon}>
          <Text style={styles.cityIconText}>⌖</Text>
        </View>
        <View style={styles.cityInfo}>
          <Text style={styles.cardLabel}>Ваш город</Text>
          <Text style={styles.cityName}>{city || 'Пока не выбран'}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/city')}
          style={styles.changeCity}
        >
          <Text style={styles.link}>Изменить</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Ваш аккаунт</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/profile')}
        style={({ pressed }) => [styles.profileCard, pressed && styles.pressed]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstName?.[0]?.toUpperCase() || 'Я'}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{fullName || 'Мой профиль'}</Text>
          <Text style={styles.profileCaption}>Личные данные и настройки</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      <View style={styles.recommendationCard}>
        <Text style={styles.recommendationTitle}>Подборки рядом</Text>
        <Text style={styles.recommendationText}>
          {city
            ? `Когда появятся новые места в городе ${city}, они будут показаны здесь.`
            : 'Выберите город, чтобы получать подборки мест рядом с вами.'}
        </Text>
      </View>

      <View style={styles.bottomButton}>
        <PrimaryButton onPress={() => router.replace('/login')} title="Выйти" />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginBottom: 10,
    color: colors.purple,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 33,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 26,
    color: colors.muted,
    fontSize: 15,
  },
  cityCard: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: colors.field,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cityIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  cityIconText: {
    color: colors.purple,
    fontSize: 24,
  },
  cityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardLabel: {
    color: colors.muted,
    fontSize: 12,
  },
  cityName: {
    marginTop: 3,
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  changeCity: {
    paddingVertical: 8,
    paddingLeft: 8,
  },
  link: {
    color: colors.purple,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 13,
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  profileCard: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  avatar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: colors.field,
  },
  avatarText: {
    color: colors.purple,
    fontSize: 18,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  profileCaption: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
  },
  chevron: {
    color: colors.muted,
    fontSize: 27,
    lineHeight: 30,
  },
  recommendationCard: {
    marginTop: 24,
    borderRadius: 18,
    backgroundColor: '#FBF3FD',
    padding: 18,
  },
  recommendationTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  recommendationText: {
    marginTop: 7,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  bottomButton: {
    marginTop: 'auto',
    paddingTop: 30,
  },
});
