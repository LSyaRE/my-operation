import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface Task {
  id: string;
  userName: string;
  dailyTime: string;
  observations: string;
}

interface DailyFormProps {
  addTask: (task: Task) => void;
}

const DailyForm: React.FC<DailyFormProps> = ({ addTask }) => {
  const [userName, setUserName] = useState<string>('');
  const [dailyTime, setDailyTime] = useState<string>('');
  const [observations, setObservations] = useState<string>('');

  const handleAddTask = () => {
    if (userName && dailyTime && observations) {
      const newTask: Task = { id: Math.random().toString(), userName, dailyTime, observations };
      addTask(newTask); // Llama a la función para agregar la tarea
      setUserName('');
      setDailyTime('');
      setObservations('');
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.'); // Usar Alert en lugar de alert
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agregar Tarea Diaria</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiempo de Daily"
        value={dailyTime}
        onChangeText={setDailyTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observations}
        onChangeText={setObservations}
      />
      <Button title="Agregar Registro" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default DailyForm;