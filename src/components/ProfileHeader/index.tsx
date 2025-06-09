import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';


type ProfileHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function ProfileHeader({ title, onBackPress }: ProfileHeaderProps) {
  
  const styles = useThemedStyles(getStyles);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}>
        <Image style={styles.icon} source={require('../../Assets/icons/VectorBack.png')} />
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>
      <Text style={styles.editText}>{title}</Text>
    </View>
  );
}