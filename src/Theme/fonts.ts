import { TextStyle } from 'react-native';

interface FontStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
}

const Fonts: {
  Roboto70048: FontStyle;
  Roboto70024: FontStyle;
  Roboto60020: FontStyle;
  Roboto50018: FontStyle;
  Roboto40016: FontStyle;
  Roboto40012: FontStyle;
} = {
  Roboto70048: {
    fontFamily: 'Roboto-Bold',
    fontSize: 48,
    fontWeight: '700',
  },
  Roboto70024: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    fontWeight: '700',
  },
  Roboto60020: {
    fontFamily: 'Roboto-SemiBold',
    fontSize: 20,
    fontWeight: '600',
  },
  Roboto50018: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  Roboto40016: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
  Roboto40012: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
};

export default Fonts;