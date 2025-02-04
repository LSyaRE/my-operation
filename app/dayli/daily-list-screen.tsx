import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import DailyListPaginator from './daily-list-paginator'; // Asegúrate de que la ruta sea correcta
import { Task } from '../../dto/Task';
import DailyList from '../(tabs)';

interface DailyListScreenProps {
  tasks: Task[];
}

const DailyListScreen: React.FC<DailyListScreenProps> = ({ tasks }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.titleText}>My Daily App</Text>
        <DailyList tasks={tasks} />
        <DailyListPaginator tasks={tasks} /> {/* Pasando tasks como prop */}
      </View>
    </SafeAreaView>
  );
};

// Definición de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerView: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DailyListScreen;