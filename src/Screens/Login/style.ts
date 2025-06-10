import {StyleSheet} from 'react-native';

import {Theme} from '../../theme/colors';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 32,
      backgroundColor: theme.background,
      justifyContent: 'center',
    },
    form: {},
    logo: {
      width: 329,
      height: 56,
      alignContent: 'center',
      marginBottom: 24,
    },
    inputSpacing: {
      marginBottom: 40,
    },
    checkboxContainer: {
      flexDirection: 'row',
      gap: 2.5,
      marginTop: 24,
    },
    checkboxIcon: {
      width: 24,
      height: 24,
      paddingTop: 25,
    },
    textCheckbox: {
      fontSize: 16,
      color: theme.mainText,
    },
    buttonEnter: {
      marginTop: 24,
    },
    buttonCreate: {
      marginTop: 24,
    },
  });
