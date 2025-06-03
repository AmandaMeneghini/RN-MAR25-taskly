import { ViewStyle } from 'react-native';

interface TabNavigatorStyles {
  tabBarStyle: ViewStyle;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  tabBarHideOnKeyboard: boolean;
  tabBarShowLabel: boolean;
  tabBarIconStyle: ViewStyle;
}

const bottomTabNavigatorStyles: TabNavigatorStyles = {
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tabBarActiveTintColor: '#FFFFFF',
  tabBarInactiveTintColor: '#5B3CC4',
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarIconStyle: { marginTop: 20 },
};

export default bottomTabNavigatorStyles;