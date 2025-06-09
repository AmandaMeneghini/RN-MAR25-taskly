import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../../../components/button';
import { getStyles } from './style';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { useTheme } from '../../../context/ThemeContext';


interface LoginErrorModalProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const LoginErrorModal: React.FC<LoginErrorModalProps> = ({
  visible,
  title,
  description,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(getStyles);
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button
          title='FECHAR'
          fontFamily='Roboto50018'
          backgroundColor={theme.background}
          textColor={theme.primary}
          borderColor={theme.primary}
          borderWidth={2}
          height={40}
          onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoginErrorModal;