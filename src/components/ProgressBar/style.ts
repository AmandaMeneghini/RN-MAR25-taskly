import {StyleSheet} from 'react-native';

import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: theme.primaryLight,
    borderRadius: 2,
    overflow: 'hidden',
    marginVertical: 16,
  },
  progress: {
    height: '100%',
    backgroundColor: theme.primary,
  },
});

