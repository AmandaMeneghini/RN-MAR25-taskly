import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import styles from './style';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  width?: DimensionValue;
  height?: DimensionValue;
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
  textColor?: string;
  mask?: 'phone' | 'none';
  validateEmail?: boolean;
  editable?: boolean;
  multiline?: boolean;
  maxHeight?: DimensionValue;
}

export default function Input({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  width,
  height,
  fontFamily,
  fontWeight = 'normal',
  textColor = '#000000',
  mask = 'none',
  validateEmail = false,
  editable = true,
  ...textInputProps
}: InputProps) {
  const [internalValue, setInternalValue] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    return cleaned; // Retorna apenas os números
  };

  const handleChange = (text: string) => {
    const newValue = mask === 'phone' ? formatPhone(text) : text;
    setInternalValue(newValue);

    if (validateEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(newValue) ? null : 'E-mail inválido');
    }

    textInputProps.onChangeText?.(newValue);
  };

  const displayValue = textInputProps.value ?? internalValue;

  return (
    <View style={[styles.container, {width: '100%'}, containerStyle]}>
      {label != null && (
        <Text style={[styles.label, labelStyle, {fontFamily, fontWeight}]}>
          {label}
        </Text>
      )}
      <TextInput
        {...textInputProps}
        value={displayValue}
        onChangeText={handleChange}
        editable={editable}
        style={[
          styles.input,
          inputStyle,
          (error || emailError) && styles.inputError,
          {
            width,
            height,
            fontFamily,
            fontWeight,
            color: textColor,
            backgroundColor: editable ? '#FFFFFF' : '#F0F0F0',
          },
        ]}
        keyboardType={
          validateEmail
            ? 'email-address'
            : textInputProps.keyboardType ?? 'default'
        }
        autoCapitalize={
          validateEmail ? 'none' : textInputProps.autoCapitalize ?? 'sentences'
        }
        autoCorrect={validateEmail ? false : textInputProps.autoCorrect ?? true}
      />
      {error != null && (
        <Text style={[styles.error, errorStyle, {fontFamily, fontWeight}]}>
          {error}
        </Text>
      )}
      {emailError && (
        <Text style={[styles.error, errorStyle, {fontFamily, fontWeight}]}>
          {emailError}
        </Text>
      )}
    </View>
  );
}

