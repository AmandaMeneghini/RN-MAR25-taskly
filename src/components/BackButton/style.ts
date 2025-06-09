import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => {
    return StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 40,
      paddingHorizontal: 32,
      backgroundColor: theme.background,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: theme.secondaryText,
      width: 113,
      height: 48,
      borderRadius: 12,
      padding: 12,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
      marginRight: 8,
    },
    textButton: {
      color: theme.background,
      ...Fonts.Roboto50018,
    },
    textRight: {
      color: theme.mainText,
      ...Fonts.Roboto40016,
    },
  })
};