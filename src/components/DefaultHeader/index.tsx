import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

const S3_AVATAR_BASE_URL = 'https://taskly-media.s3.us-east-1.amazonaws.com/';

interface DefaultHeaderProps {
  leftComponent?: ReactNode;
  avatarSource?: string | null;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ leftComponent, avatarSource }) => {
  const avatarId = avatarSource && avatarSource.trim() !== '' ? avatarSource : 'avatar_1';
  const finalAvatarUri = `${S3_AVATAR_BASE_URL}${avatarId}.png`;

  return (
    <View style={styles.header}>
      {leftComponent && <View style={styles.leftContainer}>{leftComponent}</View>}
      <Text style={styles.title}>TASKLY</Text>
      <Image source={{ uri: finalAvatarUri }} style={styles.avatar} />
    </View>
  );
};

export default DefaultHeader;