import { StyleSheet } from 'react-native'
import { Theme } from '../../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: theme.primary,
    position: 'absolute',
    zIndex: -1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
