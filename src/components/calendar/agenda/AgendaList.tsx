import { Text, View } from 'react-native';
import styles from './style';

interface Props {
  activeTab: string;
  activeDate: Date;
}

interface Agenda {
  time: string;
  title: string;
}
const mockData: Record<string, Agenda[]> = {
  식단: [
    { time: '08:00', title: '아침 식사' },
    { time: '12:30', title: '점심 식사' },
    { time: '19:00', title: '저녁 식사' },
  ],
  운동: [
    { time: '06:00', title: '런닝' },
    { time: '18:00', title: '헬스장 운동' },
  ],
  신체: [
    { time: '체중', title: '70kg' },
    { time: '체지방률', title: '15%' },
  ],
};
const List = ({ agenda }: { agenda: Agenda }) => {
  return (
    <View style={styles.agendaItem}>
      <Text style={styles.agendaTime}>{agenda.time}</Text>
      <Text style={styles.agendaText}>{agenda.title}</Text>
    </View>
  );
};

const AgendaList = ({ activeTab, activeDate }: Props) => {
  const currentDate = activeDate || new Date();
  const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  const agendaItems = mockData[activeTab];

  if (!agendaItems) {
    return null;
  }

  return (
    <View style={styles.tabContent}>
      <Text style={styles.tabContentTitle}>
        {dateStr} {activeTab}
      </Text>
      {agendaItems.map((agenda, index) => (
        <List key={index} agenda={agenda} />
      ))}
    </View>
  );
};

export default AgendaList;
