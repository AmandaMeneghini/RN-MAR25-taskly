import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import Button from '../../../components/button';


interface ThemeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ThemeModal({visible, onClose}: ThemeModalProps) {
    const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | null>(null)
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Escolha o tema</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.card,
                selectedTheme === 'dark' && styles.selectedCard,
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
            <TouchableOpacity style={[styles.card,
                selectedTheme === 'light' && styles.selectedCard,
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
            backgroundColor='#F4F4F4'
            textColor='#7b4ae4'
            borderColor='#7b4ae4'
            borderWidth={2}
            onPress={onClose}
            />

            <Button
            title="Confirmar"
            fontFamily='Roboto50018'
            width={140} 
            height={40} 
            backgroundColor='#32C25B'
            />

          </View>
        </View>
      </View>
    </Modal>
  );
}