import { StyleSheet } from "react-native";
import Fonts from "../../Theme/fonts";
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
      editText: {
        ...Fonts.Roboto40016,
        color: theme.background,
      },
      icon: {
        tintColor: theme.background,
      }
});