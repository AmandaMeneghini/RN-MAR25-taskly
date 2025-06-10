import { StyleSheet } from 'react-native';
import Fonts from '../../../Theme/fonts';
import { Theme } from '../../../theme/colors';

const CARD_SIZE = 140;

export const getStyles = (theme: Theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.background,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    minWidth: 300,
  },
  title: {
    ...Fonts.Roboto40016,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: theme.secundaryBG,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: theme.secundaryBG,
  },
  selectedCard: {
    borderColor: theme.primary,
    backgroundColor: theme.secundaryBG,
  },
  icon: {
    width: 80,
    height: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },
});