import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  title: {
    ...Fonts.Roboto70024,
    color: '#000000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  leftContainer: {
    alignSelf: 'center',
  },
});

export default styles;
