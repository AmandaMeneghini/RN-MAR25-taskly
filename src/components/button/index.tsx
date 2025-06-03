import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  TextStyle,
  DimensionValue,
  ViewStyle,
} from 'react-native';
import styles from './style';
import Fonts from '../../Theme/fonts';

interface ButtonProps {
  title?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  textColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}


export default function Button({
  title,
  backgroundColor = '#5B3CC4',
  borderColor = '#5B3CC4',
  borderWidth = 0,
  textColor = '#FFFFFF',
  width = 300,
  height = 50,
  fontFamily,
  fontWeight = 'bold',
  fontSize,
  style,
  onPress,
  loading = false,
  
}: ButtonProps) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor, borderColor, borderWidth, width, height},
          style,
        ]}
        onPress={onPress}
        disabled={loading}  // Desabilitando o botão enquanto está carregando
      >
        {loading ? (
          <ActivityIndicator size="small" color={textColor || '#FFFFFF'} />
        ) : (
          <Text
            style={[
              styles.text,
              {color: textColor, fontWeight, fontSize},
              fontFamily ? {fontFamily} : {},
              fontFamily && fontFamily in Fonts
                ? Fonts[fontFamily as keyof typeof Fonts]
                : {},
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
