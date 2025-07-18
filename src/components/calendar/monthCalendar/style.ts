import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../../constants';

const styles = StyleSheet.create({
  daysContainer: { flexDirection: 'row' },
  dayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
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
  monthContainer: { width: screenWidth },
});

export default styles;
