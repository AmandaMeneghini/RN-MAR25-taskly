import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: theme.secondaryText,
        padding: 15.37,
        borderRadius: 12,
        maxWidth: 48,
    },
    icon: {
        tintColor: theme.background,
    },
});
