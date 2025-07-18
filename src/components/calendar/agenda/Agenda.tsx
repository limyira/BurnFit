import { Pressable, Text, View } from 'react-native';
import styles from './style';
import React, { useState } from 'react';
import AgendaList from './AgendaList';

type TabType = '식단' | '운동' | '신체';

interface Props {
  activeDate: Date;
}

const Agenda = ({ activeDate }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('식단');
  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
  };
  return (
    <>
      <View style={styles.tabsContainer}>
        {(['식단', '운동', '신체'] as TabType[]).map(tab => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <AgendaList activeTab={activeTab} activeDate={activeDate} />
    </>
  );
};

export default Agenda;
