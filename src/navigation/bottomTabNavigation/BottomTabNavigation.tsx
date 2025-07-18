import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/homeScreen/HomeScreen';
import CalendarScreen from '../../screens/calendarScreen/CalendarScreen';
import LibraryScreen from '../../screens/libraryScreen/LibraryScreen';
import MyPageScreen from '../../screens/myPageScreen/MyPageScreen';
import TabIcon from './TabIcon';
import { screenOptions } from './tabConfig';

const Tab = createBottomTabNavigator();

const HomeIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon focused={focused} icon="🏠" />
);

const CalendarIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon focused={focused} icon="📅" />
);

const LibraryIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon focused={focused} icon="📚" />
);

const MyPageIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon focused={focused} icon="👤" />
);

const BottomTabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: '캘린더',
            tabBarIcon: CalendarIcon,
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarLabel: '라이브러리',
            tabBarIcon: LibraryIcon,
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            tabBarLabel: '마이페이지',
            tabBarIcon: MyPageIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
