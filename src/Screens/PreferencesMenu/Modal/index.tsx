import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getStyles } from './style'; // 1. Importe a FUNÇÃO getStyles
import { useThemedStyles } from '../../../hooks/useThemedStyles'; // 2. Importe nosso hook mágico
import Button from '../../../components/button';
import { useTheme } from '../../../context/ThemeContext';


interface ThemeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ThemeModal({visible, onClose}: ThemeModalProps) {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = useThemedStyles(getStyles);

  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light'>(
    isDarkMode ? 'dark' : 'light'
  );

  useEffect(() => {
    setSelectedTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleConfirm = () => {
    const hasThemeChanged = (selectedTheme === 'dark' && !isDarkMode) || (selectedTheme === 'light' && isDarkMode);

    if (hasThemeChanged) {
      toggleTheme();
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
          <Text style={[styles.title, { color: theme.mainText }]}>Escolha o tema</Text>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[
                styles.card,
                { backgroundColor: theme.secundaryBG },
                selectedTheme === 'dark' && [styles.selectedCard, { borderColor: theme.primary }],
              ]}
              onPress={() => setSelectedTheme('dark')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../../Assets/icons/dark-icon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.card,
                {backgroundColor: theme.secundaryBG },
                selectedTheme === 'light' && [styles.selectedCard, { borderColor: theme.primary }],
              ]}
              onPress={() => setSelectedTheme('light')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../../Assets/icons/light-icon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>

            <Button
            title="Agora não"
            fontFamily='Roboto50018'
            width={140}
            height={40}
            backgroundColor={theme.background}
            textColor={theme.primary}
            borderColor={theme.primary}
            borderWidth={2}
            onPress={onClose}
            />

            <Button
            title="Confirmar"
            fontFamily='Roboto50018'
            width={140} 
            height={40} 
            backgroundColor={theme.secundaryAccent}
            onPress={handleConfirm}
            />

          </View>
        </View>
      </View>
    </Modal>
  );
}