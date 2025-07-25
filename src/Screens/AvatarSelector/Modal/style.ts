import {StyleSheet} from 'react-native';
import Fonts from '../../../Theme/fonts';
import { Theme } from '../../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    ...Fonts.Roboto50018,
    color: theme.mainText,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  description: {
    ...Fonts.Roboto40016,
    color: theme.mainText,
    textAlign: 'left',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.background,
    fontWeight: 'bold',
  },
});