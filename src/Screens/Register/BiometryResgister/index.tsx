import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './style';

interface BiometryModalProps {
  visible: boolean;
  title: string;
  description: string;
  buttonLeftText: string;
  buttonRightText: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  loading?: boolean;
}

const BiometryModal: React.FC<BiometryModalProps> = ({
  visible,
  title,
  description,
  buttonLeftText,
  buttonRightText,
  onPressLeft,
  onPressRight,
  loading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!loading) onPressLeft();
      }}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#5B3CC4"
              style={{ marginVertical: 20 }}
            />
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.leftButton}
                onPress={onPressLeft}
                disabled={loading}>
                <Text style={styles.leftButtonText}>{buttonLeftText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rightButton}
                onPress={onPressRight}
                disabled={loading}>
                <Text style={styles.rightButtonText}>{buttonRightText}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BiometryModal;
