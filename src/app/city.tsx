import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackButton } from '../components/BackButton';
import { FormError } from '../components/FormError';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { useAuthFlow } from '../context/AuthFlowContext';
import { colors } from '../theme';

const cities = ['Астана', 'Алматы', 'Шымкент', 'Караганда', 'Костанай', 'Актобе'];

export default function CityScreen() {
  const { city, setCity } = useAuthFlow();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [error, setError] = useState('');

  const finish = () => {
    if (!city) {
      setError('Выберите город, чтобы продолжить.');
      return;
    }
    setError('');
    router.replace('/profile');
  };

  return (
    <ScreenLayout>
      <BackButton />
      <Text style={styles.title}>Выберите город</Text>
      <Text style={styles.subtitle}>
        Заведения, которые будут показываться вам, зависят от вашего города.
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => setPickerVisible(true)}
        style={styles.selector}
      >
        <Text style={[styles.selectedCity, !city && styles.placeholder]}>
          {city || 'Выбрать город'}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      <FormError>{error}</FormError>
      <View style={styles.button}>
        <PrimaryButton onPress={finish} title="Продолжить" />
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
        transparent
        visible={pickerVisible}
      >
        <Pressable style={styles.scrim} onPress={() => setPickerVisible(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Ваш город</Text>
            <FlatList
              data={cities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setCity(item);
                    setPickerVisible(false);
                    setError('');
                  }}
                  style={styles.cityOption}
                >
                  <Text style={styles.cityLabel}>{item}</Text>
                  {city === item ? <Text style={styles.check}>✓</Text> : null}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
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
    marginTop: 5,
    marginBottom: 28,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  selector: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 17,
    backgroundColor: colors.field,
    paddingHorizontal: 16,
  },
  selectedCity: {
    color: colors.text,
    fontSize: 15,
  },
  placeholder: {
    color: colors.muted,
  },
  chevron: {
    color: colors.purple,
    fontSize: 24,
    lineHeight: 26,
  },
  button: {
    marginTop: 'auto',
    paddingTop: 32,
  },
  scrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(27, 25, 35, 0.38)',
  },
  sheet: {
    maxHeight: '72%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  handle: {
    width: 42,
    height: 4,
    alignSelf: 'center',
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: 18,
  },
  sheetTitle: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
  },
  cityOption: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  cityLabel: {
    color: colors.text,
    fontSize: 16,
  },
  check: {
    color: colors.purple,
    fontSize: 19,
    fontWeight: '700',
  },
});
