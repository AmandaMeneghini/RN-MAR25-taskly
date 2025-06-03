import React from 'react';
import { View } from 'react-native';
import styles from './style';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
}
