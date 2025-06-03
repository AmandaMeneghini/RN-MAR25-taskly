import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Fonts from '../../Theme/fonts';

interface BackButtonProps {
  onPress: () => void;
  rightText?: string; // Texto opcional ao lado do botão
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, rightText }) => {
  return (
    <View style={styles.container}>
      {/* Botão VOLTAR */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../Assets/icons/VectorBack.png')}
            style={styles.icon}
          />
          <Text style={styles.textButton}>VOLTAR</Text>
        </View>
      </TouchableOpacity>

      {/* Texto ao lado do botão, exemplo: 'Termos e regulamentos' */}
      {rightText && <Text style={styles.textRight}>{rightText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 329,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    width: 113,
    height: 48,
    borderRadius: 12,
    padding: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
  },
  textButton: {
    color: '#F4F4F4',
    ...Fonts.Roboto50018,
  },
  textRight: {
    color: '#000000',
    ...Fonts.Roboto40016,
  },
});

export default BackButton;
