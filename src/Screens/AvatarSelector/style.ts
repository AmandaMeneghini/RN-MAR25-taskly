import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/fonts';

const AVATAR_SIZE = 90;
const AVATAR_MARGIN = 12;

export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  content: {
    alignItems: 'center',
    marginBottom: 24,
  },
  textAvatar: {
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
    ...Fonts.Roboto70024,
  },
  textPick: {
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
    ...Fonts.Roboto40016,
  },
  avatarsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },
  avatarTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: AVATAR_SIZE + AVATAR_MARGIN,
    height: AVATAR_SIZE + AVATAR_MARGIN,
    backgroundColor: '#fff',
  },
  confirmButton: {
    alignSelf: 'center',
    marginTop: 16,
    height: 48,
  },
});
