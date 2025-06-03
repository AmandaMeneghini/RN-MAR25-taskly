import React, { useRef, useCallback } from 'react';
import { TouchableOpacity, Image, Animated, ImageSourcePropType } from 'react-native';

interface AnimatedCheckProps {
  isCompleted: boolean;
  onToggle: () => void;
  checkedImageSource: ImageSourcePropType;
  uncheckedImageSource: ImageSourcePropType;
}

const AnimatedCheck: React.FC<AnimatedCheckProps> = ({
  isCompleted,
  onToggle,
  checkedImageSource,
  uncheckedImageSource,
}) => {
  const iconScaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(
    (animatedValue: Animated.Value, toValue: number, duration: number, callback?: () => void) => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    []
  );

  const handleCheckPress = () => {
    animateScale(iconScaleValue, 0.8, 50, () => {
      animateScale(iconScaleValue, 1, 100);
      onToggle();
    });
  };

  const animatedIconStyle = {
    transform: [{ scale: iconScaleValue }],
  };

  return (
    <TouchableOpacity onPress={handleCheckPress} style={animatedIconStyle}>
      <Image
        source={isCompleted ? checkedImageSource : uncheckedImageSource}
      />
    </TouchableOpacity>
  );
};

export default AnimatedCheck;