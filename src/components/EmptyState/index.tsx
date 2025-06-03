import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';

const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SadFace.png')}
        resizeMode="contain"
      />
      <Text style={styles.textNoTask}>No momento você não possui tarefa</Text>
    </View>
  );
};

export default EmptyState;