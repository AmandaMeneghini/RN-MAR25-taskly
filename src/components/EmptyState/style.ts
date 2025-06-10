import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    ...Fonts.Roboto70024,
    color: theme.mainText,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  textNoTask: {
    color: theme.secondaryText,
    ...Fonts.Roboto40016,
    marginBottom: 32,
    textAlign: 'center',
  },
});