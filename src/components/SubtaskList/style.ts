import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts'
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  subtaskArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 32
  },
  subtaskAreaText: {
    flexDirection: 'row',
    gap: 7,
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.secondaryText,
    marginRight: 10,
  },
  subtaskText: {
    ...Fonts.Roboto40016,
    color: theme.mainText,
    flexShrink: 1,
  },
  subtaskTextCompleted: {
    textDecorationLine: 'line-through',
    color: theme.secondaryText,
  },
  confirmEditButton:{
      position: 'absolute',
      right: 10,
      top: 13,
  },
  inputEditArea: {
    width: '100%'
  },
  
});
