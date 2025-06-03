import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

interface DefaultHeaderProps {
  leftComponent?: ReactNode;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ leftComponent }) => {
  return (
    <View style={styles.header}>
      {leftComponent && <View style={styles.leftContainer}>{leftComponent}</View>}
      <Text style={styles.title}>TASKLY</Text>
      <Image
        source={require('../../Assets/Images/Avatars/avatar_1.png')}
        style={styles.avatar}
      />
    </View>
  );
};


export default DefaultHeader;