import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { colors } from '../theme';

const sections = [
  {
    title: 'Учетная запись',
    text: 'Указывайте достоверные данные и не передавайте пароль другим людям. Вы отвечаете за действия, выполненные через вашу учетную запись.',
  },
  {
    title: 'Выбор города',
    text: 'Город используется, чтобы подбирать для вас местные заведения и рекомендации. Его можно изменить в приложении.',
  },
  {
    title: 'Использование сервиса',
    text: 'Не используйте приложение для незаконных действий, попыток нарушить его работу или получить чужие данные.',
  },
  {
    title: 'Демонстрационная версия',
    text: 'Сейчас это прототип: регистрация и вход не подключены к серверу, а данные профиля хранятся только во время текущего сеанса.',
  },
];

export default function TermsScreen() {
  return (
    <ScreenLayout>
      <BackButton />
      <Text style={styles.title}>Условия использования</Text>
      <Text style={styles.subtitle}>Краткие правила работы приложения</Text>

      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          Продолжая регистрацию, вы подтверждаете, что ознакомились с этими условиями.
        </Text>
      </View>

      {sections.map((section, index) => (
        <View key={section.title} style={[styles.section, index > 0 && styles.sectionSpacing]}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.body}>{section.text}</Text>
        </View>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31,
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 22,
    color: colors.muted,
    fontSize: 15,
  },
  notice: {
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#FBF3FD',
    padding: 16,
  },
  noticeText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },
  section: {
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sectionSpacing: {
    marginTop: 18,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    marginTop: 7,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
