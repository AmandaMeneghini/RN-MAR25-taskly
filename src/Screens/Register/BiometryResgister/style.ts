// src/Screens/Register/BiometryModal/style.ts
import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827B2',
  },
  modalContent: {
    width: 329,
    height:225,
    backgroundColor: '#F4F4F4',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap:12,
  },
  
  title: {
    ...Fonts.Roboto50018,
    color:'#1E1E1E',
  },
  description: {
    ...Fonts.Roboto40016,
    textAlign: 'justify',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },
  leftButton: {
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    width:134.5,
    height:37,
    borderWidth:2,
    borderRadius:8,
    borderColor:'#5B3CC4',
  },
  rightButton: {
    backgroundColor: '#5B3CC4',
    alignItems:'center',
    justifyContent:'center',
    width:134.5,
    height:37,
    borderRadius:8,
  },
  leftButtonText: {
    color: '#5B3CC4',
    ...Fonts.Roboto50018,
    textAlign: 'center',
  },
  rightButtonText: {
    color: '#fff',
    ...Fonts.Roboto50018,
    textAlign: 'center',
  }
});

export default styles;
