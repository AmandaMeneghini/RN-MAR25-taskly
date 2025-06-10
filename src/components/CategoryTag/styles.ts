import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#E6E0F7',
    ...Fonts.Roboto40016,
    padding: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
});

export default styles;
