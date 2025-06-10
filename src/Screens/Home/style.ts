import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: theme.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 127,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  title: {
    ...Fonts.Roboto70024,
    color: theme.mainText,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerNoTask: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  taskListContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
});
