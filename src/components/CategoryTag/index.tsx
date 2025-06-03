import React from 'react';
import { Text, TextStyle } from 'react-native';
import styles from './styles';


interface CategoryTagProps {
  item: string;
  fontStyle?: TextStyle;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ item, fontStyle }) => {
  return <Text style={[styles.tag, fontStyle]}>{item}</Text>;
};

export default CategoryTag;