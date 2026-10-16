import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../theme';

type InputFieldProps = {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  editable?: boolean;
  maxLength?: number;
};

export function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  editable = true,
  maxLength,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text accessibilityElementsHidden style={styles.icon}>
        {icon}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        selectionColor={colors.purple}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: colors.field,
    paddingHorizontal: 16,
  },
  icon: {
    width: 30,
    color: colors.muted,
    fontSize: 19,
  },
  input: {
    flex: 1,
    minHeight: 54,
    paddingVertical: 0,
    color: colors.text,
    fontSize: 15,
  },
});
