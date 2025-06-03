import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 24,
    height:72,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    ...Fonts.Roboto50018
  },
  icon: {
    tintColor: '#000',
    transform: [{rotate: '180deg'}],
  },
});

export default styles