import React from 'react';
import { TouchableOpacity, Text, ImageSourcePropType, Image} from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getStyles } from './style';

type Props = {
    title: string;
    icon: ImageSourcePropType;
    onPress?: () => void;
    iconColor?: string;
  };

export function CarouselActionItem({ title, icon, onPress, iconColor }: Props) {
    const styles = useThemedStyles(getStyles);
    return (
      <TouchableOpacity style={styles.container} onPress={onPress} >
        <Image source={icon} style={[styles.icon, { tintColor: iconColor }]} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
}
