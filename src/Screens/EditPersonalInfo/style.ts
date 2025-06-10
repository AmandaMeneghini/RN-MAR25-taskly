import {StyleSheet} from 'react-native';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.mainText,
  },
  inputSpacing: {
    marginBottom: 50,
  },
  buttonSpacing: {
    marginTop: 30,
  },
});

