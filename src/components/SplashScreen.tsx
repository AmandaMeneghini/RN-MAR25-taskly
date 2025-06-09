// SplashScreen.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SplashScreen() {
  const { isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={
          isDarkMode
            ? require('../Assets/Images/LogoDark.png')
            : require('../Assets/Images/Logo.png')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
