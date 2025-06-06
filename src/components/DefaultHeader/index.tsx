import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

import { getS3AvatarUrl } from '../../Utils/imageUtils'; 

interface DefaultHeaderProps {
  leftComponent?: ReactNode;
  avatarSource?: string | null;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ leftComponent, avatarSource }) => {
  const finalAvatarUri = getS3AvatarUrl(avatarSource, 'avatar_1');

  return (
    <View style={styles.header}>
      {leftComponent && <View style={styles.leftContainer}>{leftComponent}</View>}
      <Text style={styles.title}>TASKLY</Text>
      <Image source={{ uri: finalAvatarUri }} style={styles.avatar} />
    </View>
  );
};

export default DefaultHeader;