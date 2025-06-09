import React from 'react';
import { View } from 'react-native';
import { getStyles } from './style';
import { useThemedStyles } from '../../hooks/useThemedStyles';

export default function ProgressBar({ progress }: { progress: number }) {
  const styles = useThemedStyles(getStyles);
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
}
