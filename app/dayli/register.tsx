import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Definición de la interfaz Task
export interface Task {
  id: string;
  userName: string;
  dailyTime: string;
  observations: string;
}

interface RegisterDailyProps {
  addTask: (task: Task) => void;
}

const RegisterDaily: React.FC<RegisterDailyProps> = ({ addTask }) => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [dailyTime, setDailyTime] = useState('');
  const [observations, setObservations] = useState('');

  const handleSave = () => {
    // Crear una nueva tarea
    const newTask: Task = {
      id: String(new Date().getTime()), // ID único basado en el tiempo
      userName,
      dailyTime,
      observations,
    };

    // Agregar la tarea utilizando la función pasada como prop
    addTask(newTask);

    // Mostrar mensaje de éxito
    Alert.alert('Éxito', 'Daily guardado correctamente', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(), // Regresar a la lista
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Daily</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiempo Diario"
        value={dailyTime}
        onChangeText={setDailyTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observations}
        onChangeText={setObservations}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default RegisterDaily;