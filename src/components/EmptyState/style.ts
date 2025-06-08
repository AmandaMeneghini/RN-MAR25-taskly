import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    ...Fonts.Roboto70024,
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  textNoTask: {
    color: '#AAAAAA',
    ...Fonts.Roboto40016,
    marginBottom: 32,
    textAlign: 'center',
  },
});

export default styles;