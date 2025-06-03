import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...Fonts.Roboto50018,
    color: '#1E1E1E',
    marginBottom: 10,

  },
  description: {
    ...Fonts.Roboto40016,
    color: '#1E1E1E',
    marginBottom: 20,
  },
});