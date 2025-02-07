import { AuthService } from "@/services/auth-service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const Register: React.FC<{
  onRegister: (username: string, password: string) => void;
}> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [redmine, setRedmine] = useState("");
  const [error, setError] = useState('');
  

  const navigation = useRouter();

  const goToLogin = () => navigation.replace("/login");

  const validateEmail = (text: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setError("Correo electrónico no válido");
      } else {
        setError("");
      }
      setCorreo(text);
    };

  const handleRegister = () => {
    if (username && password && nombre && correo && redmine) {
      const authService = new AuthService();

      authService.register({
        worker:{
          nombre,
          correo,
          idRedmine: redmine
        },
        user:{
          username,
          estado: true
        },
       userpass: {
        password
       }
      });

      setNombre("");
      setCorreo("");
      setRedmine("");
      setUsername("");
      setPassword("");
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Identificador Redmine"
        value={redmine}
        onChangeText={setRedmine}
      />

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
        onChangeText={setPassword}
      />
      <Button  title="Registrar" onPress={handleRegister} />
      
      <Button title="Iniciar Sesión" onPress={goToLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default Register;
