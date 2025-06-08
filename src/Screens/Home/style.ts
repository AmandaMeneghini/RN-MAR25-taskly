import {StyleSheet} from 'react-native';

import Fonts from '../../Theme/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#F4F4F4',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 127,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  title: {
    ...Fonts.Roboto70024,
    color: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerNoTask: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  taskListContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;
