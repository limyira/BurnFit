import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';

const LibraryScreen = () => {
  const libraryItems = [
    {
      id: 1,
      title: '운동 가이드',
      description: '다양한 운동 방법을 확인하세요',
    },
    { id: 2, title: '영양 정보', description: '건강한 식단 정보를 제공합니다' },
    { id: 3, title: '건강 팁', description: '일상 건강 관리 팁을 확인하세요' },
    { id: 4, title: '운동 동영상', description: '운동 동영상을 시청하세요' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>라이브러리</Text>
      <ScrollView style={styles.scrollView}>
        {libraryItems.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;
