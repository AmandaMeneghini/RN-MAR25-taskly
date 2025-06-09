import { StyleSheet } from 'react-native'
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: theme.mainText,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.primary,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: theme.secundaryBG,
  },
  inputError: {

  },
  error: {
    marginTop: 4,
    color: theme.erro,
    fontSize: 12,
  },
});
