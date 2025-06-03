import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoTask: {
    color: '#AAAAAA',
    ...Fonts.Roboto40016,
    marginBottom: 32,
  },
});

export default styles;
