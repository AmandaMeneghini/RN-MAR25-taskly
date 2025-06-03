import {StyleSheet} from 'react-native';
import Fonts from '../../../Theme/fonts';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    ...Fonts.Roboto50018,
    color: '#1E1E1E',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  description: {
    ...Fonts.Roboto40016,
    color: '#1E1E1E',
    textAlign: 'left',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
