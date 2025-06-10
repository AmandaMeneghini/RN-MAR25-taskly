import React from 'react';
import {View, Text, Image} from 'react-native';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';
interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SadFace.png')}
        resizeMode="contain"
      />

      {title && <Text style={styles.title}>{title}</Text>}

      <Text style={styles.textNoTask}>
        {message || 'No momento você não possui tarefa'}
      </Text>
    </View>
  );
};

export default EmptyState;