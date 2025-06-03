import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import styles from './style';

type ProfileHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function ProfileHeader({ title, onBackPress }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}>
        <Image source={require('../../Assets/icons/VectorBack.png')} />
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>
      <Text style={styles.editText}>{title}</Text>
    </View>
  );
}