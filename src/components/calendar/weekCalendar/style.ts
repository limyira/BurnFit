import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../../constants';

const styles = StyleSheet.create({
  weekdayLabel: { flex: 1, alignItems: 'center' },
  weekContainer: { width: screenWidth },
  daysContainer: { flexDirection: 'row' },
});

export default styles;
