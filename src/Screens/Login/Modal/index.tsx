import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../../../components/button';
import styles from './style';

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
          backgroundColor='#F4F4F4'
          textColor='#5B3CC4'
          borderColor='#5B3CC4'
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