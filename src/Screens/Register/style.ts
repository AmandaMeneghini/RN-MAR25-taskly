import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
      padding: 32,
      backgroundColor: theme.background,
      alignItems: 'center',
      flexGrow: 1,
    },
    form: {
      flex: 1,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 13,
      backgroundColor: theme.secondaryText,
      height: 50,
      width: 110,
      borderRadius: 10,
    },
    backText: {
      color: theme.background,
      ...Fonts.Roboto50018,
    },
    inputSpacing: {
      marginBottom: 40,
      width:329,
      height:47,
    },
    buttonSpacing: {
      marginTop: 16,
    },
    title: {
      ...Fonts.Roboto70024,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: 32,
      color: theme.mainText,
    },

    createButton: {
      backgroundColor: theme.primary,
      width: 329,
      height:47,
      marginTop:8,
    },
    icon: {
      tintColor: theme.background,
    }
  });