import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  monthNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: { fontSize: 30, color: '#333', top: -2 },
  currentDateText: { fontSize: 16, color: '#666' },
  weekdayLabels: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  weekdayLabel: { flex: 1, alignItems: 'center' },
  weekdayText: { fontSize: 14, fontWeight: '600', color: '#333' },
  calendarContainer: {
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    marginTop: 5,
  },

  knobContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    paddingVertical: 8,
  },
  knob: {
    width: 48,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  weekViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawerContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: 140,
    height: '100%',
    zIndex: 40,
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
});

export default styles;
