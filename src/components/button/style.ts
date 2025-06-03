import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  button: {
    width: 329,
    height: 47,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    ...Fonts.Roboto60020,
  },
});

export default styles;
