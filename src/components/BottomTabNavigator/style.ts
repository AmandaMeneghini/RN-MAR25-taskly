import { ViewStyle } from 'react-native';
import { Theme } from '../../theme/colors';

interface TabNavigatorStyles {
  tabBarStyle: ViewStyle;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  tabBarHideOnKeyboard: boolean;
  tabBarShowLabel: boolean;
  tabBarIconStyle: ViewStyle;
}

const getBottomTabNavigatorStyles = (theme: Theme): TabNavigatorStyles => ({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: theme.secundaryBG,
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tabBarActiveTintColor: theme.background,
  tabBarInactiveTintColor: theme.primary,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarIconStyle: { marginTop: 20 },
});

export default getBottomTabNavigatorStyles;
