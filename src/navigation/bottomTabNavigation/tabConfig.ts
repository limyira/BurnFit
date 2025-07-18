import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export interface TabConfig {
  name: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
}

export const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: 10,
    paddingTop: 5,
    height: 70,
  },
  tabBarItemStyle: {
    paddingVertical: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  tabBarActiveTintColor: '#339FFF',
  tabBarInactiveTintColor: '#8E8E93',
  tabBarIconStyle: {
    marginBottom: 2,
  },
};
