import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';

import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  tag: {
    backgroundColor: theme.primaryLight,
    ...Fonts.Roboto40016,
    padding: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
});
