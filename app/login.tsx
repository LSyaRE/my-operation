import { AuthService } from '@/services/auth-service';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const navigation =  useRouter();;
  const authService = new AuthService();

  const handleLogin = async () => {
    if (username && password) {
      const isAuth: boolean = await authService.login(username, password);
            
      setPassword('');
      
      if (isAuth) {
        navigation.replace('/dayli');
      }
      
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    }
  };

  const goToRegister = () => navigation.replace('/register');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={username}
        
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        // passwordRules={} -- Se es que se necesita agregar unas reglas de validacion para la contraseña
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={goToRegister} />
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

export default Login;