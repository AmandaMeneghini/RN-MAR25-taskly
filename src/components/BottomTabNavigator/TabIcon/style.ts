import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: '#5B3CC4',
    position: 'absolute',
    zIndex: -1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default styles;