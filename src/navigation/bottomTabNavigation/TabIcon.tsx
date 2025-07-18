import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon }) => {
  return (
    <Text style={[styles.icon, focused && styles.focusedIcon]}>{icon}</Text>
  );
};

export default TabIcon;
const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    transform: [{ scale: 1 }],
  },
  focusedIcon: {
    fontSize: 26,
    transform: [{ scale: 1.1 }],
  },
});
