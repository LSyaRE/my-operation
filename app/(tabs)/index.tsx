import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definición de tipos
type RootStackParamList = {
  DailyList: undefined;
  RegisterDaily: undefined;
};

export interface Task {
  id: string;
  userName: string;
  dailyTime: string;
  observations: string;
}

interface DailyListProps {
  tasks: Task[];
}

// Definición del tipo de navegación
type DailyListNavigationProp = StackNavigationProp<RootStackParamList, 'DailyList'>;

const DailyList: React.FC<DailyListProps> = ({ tasks }) => {
  const navigation = useNavigation<DailyListNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tareas Diarias</Text>
      <Button title="Registrar Daily" onPress={() => navigation.navigate('RegisterDaily')} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Usuario: {item.userName}</Text>
            <Text style={styles.itemText}>Tiempo: {item.dailyTime}</Text>
            <Text style={styles.itemText}>Observaciones: {item.observations}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default DailyList;