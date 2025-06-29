import React, { ReactNode } from 'react';
import { View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';

import { getS3AvatarUrl } from '../../Utils/imageUtils';

interface DefaultHeaderProps {
  leftComponent?: ReactNode;
  avatarSource?: string | null;
  style?: StyleProp<ViewStyle>;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  leftComponent,
  avatarSource,
  style,
}) => {
  const finalAvatarUri = getS3AvatarUrl(avatarSource, 'avatar_1');
  const styles = useThemedStyles(getStyles);

  return (
    <View style={[styles.header, style]}>
      {leftComponent && <View style={styles.leftContainer}>{leftComponent}</View>}
      <Text style={styles.title}>TASKLY</Text>
      <Image source={{ uri: finalAvatarUri }} style={styles.avatar} />
    </View>
  );
};

export default DefaultHeader;