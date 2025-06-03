import { TouchableOpacity, Text, ImageSourcePropType, Image } from 'react-native';
import style from './style';

type Props = {
    title: string;
    icon: ImageSourcePropType;
    onPress?: () => void
  };

  export function CarouselActionItem({ title, icon, onPress }: Props) {
    return (
      <TouchableOpacity style={style.container} onPress={onPress} >
        <Text style={style.title}>{title}</Text>
        <Image source={icon} style={style.icon} />
      </TouchableOpacity>
    );
 }