import React from 'react';
import { Text, TextStyle } from 'react-native';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';

interface CategoryTagProps {
  item: string;
  fontStyle?: TextStyle;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ item, fontStyle }) => {
  const styles = useThemedStyles(getStyles);
  return <Text style={[styles.tag, fontStyle]}>{item}</Text>;
};

export default CategoryTag;