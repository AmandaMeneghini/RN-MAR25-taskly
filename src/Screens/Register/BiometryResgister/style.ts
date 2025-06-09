import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';
import { Theme } from '../../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827B2',
  },
  modalContent: {
    width: 329,
    height:225,
    backgroundColor: theme.background,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap:12,
  },
  
  title: {
    ...Fonts.Roboto50018,
    color: theme.mainText,
  },
  description: {
    ...Fonts.Roboto40016,
    textAlign: 'justify',
    color: theme.mainText,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },
  leftButton: {
    backgroundColor: theme.background,
    alignItems:'center',
    justifyContent:'center',
    width:134.5,
    height:37,
    borderWidth:2,
    borderRadius:8,
    borderColor: theme.primary,
  },
  rightButton: {
    backgroundColor: theme.primary,
    alignItems:'center',
    justifyContent:'center',
    width:134.5,
    height:37,
    borderRadius:8,
  },
  leftButtonText: {
    color: theme.primary,
    ...Fonts.Roboto50018,
    textAlign: 'center',
  },
  rightButtonText: {
    color: theme.background,
    ...Fonts.Roboto50018,
    textAlign: 'center',
  }
});
