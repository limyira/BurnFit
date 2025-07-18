import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  todayItem: {
    borderWidth: 2,
    borderColor: '#339FFF',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: '#339FFF',
    borderRadius: 20,
  },
  dayNumber: { fontSize: 16, fontWeight: '600', color: '#333' },
  todayText: { color: '#339FFF', fontWeight: 'bold' },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  otherMonthText: { color: '#ccc' },
  dayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
});

export default styles;
