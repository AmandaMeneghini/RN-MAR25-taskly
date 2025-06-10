import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../button'
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../context/ThemeContext';

type Props = {
    visible: boolean;
    title: string;
    description: string;
    confirmText: string;
    confirmColor: string;
    cancelText?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmationModal({
    visible,
    title,
    description,
    confirmText,
    confirmColor,
    cancelText = 'Agora não',
    onCancel,
    onConfirm,
}: Props) {
    const styles = useThemedStyles(getStyles);
    const { theme } = useTheme();
    return(
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonRow}>
            <Button
              title={cancelText}
              fontFamily='Roboto50018'
              backgroundColor={theme.background}
              textColor={theme.primary}
              borderColor={theme.primary}
              borderWidth={2}
              width={150}
              height={40}
              onPress={onCancel}
            />
            <Button
              title={confirmText}
              fontFamily='Roboto50018'
              backgroundColor={confirmColor}
              textColor={theme.background}
              width={150}
              height={40}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
    )
}