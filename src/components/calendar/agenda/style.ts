import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#339FFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  tabContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  agendaItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  agendaTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#339FFF',
    minWidth: 60,
  },
  agendaText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 16,
    flex: 1,
  },
});

export default styles;
