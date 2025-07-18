import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈</Text>
      <Text style={styles.subtitle}>BurnFit에 오신 것을 환영합니다!</Text>
    </View>
  );
};

export default HomeScreen;
