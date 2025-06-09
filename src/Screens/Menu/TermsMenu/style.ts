import { StyleSheet } from "react-native";
import { Theme } from '../../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 0,
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    webview: {
      flex: 1,
      marginTop: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });