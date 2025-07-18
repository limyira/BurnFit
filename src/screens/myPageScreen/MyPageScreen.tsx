import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';

const MyPageScreen = () => {
  const menuItems = [
    { id: 1, title: '프로필 설정' },
    { id: 2, title: '운동 기록' },
    { id: 3, title: '목표 설정' },
    { id: 4, title: '알림 설정' },
    { id: 5, title: '도움말' },
    { id: 6, title: '로그아웃' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>

      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>유저님</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>

      <ScrollView
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map(item => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuArrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyPageScreen;
