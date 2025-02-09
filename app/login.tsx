import { AuthService } from "@/services/auth-service";
import { HealthService } from "@/services/health-service";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import { AUTH_SERVICE, HEALTH_SERVICE } from "@/constants/instances";

/**
 * Componente de react para la autenticacion de los usuarios
 * 
 * @function Login
 * @author Alison mailto:<alison@example.com>
 * @date 05/02/2025
 */
const Login =  () => {
  // Formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  


  // Routing
  const navigation = useRouter();
  const goToRegister = () => navigation.replace("/register");




  // Envia la data al servidor (onSubmit)
  const handleLogin = async () => {
    if (username && password) {
      const isAuth: boolean = await AUTH_SERVICE.login(username, password);

      setPassword("");

      if (isAuth) {
        navigation.replace("/(dayli)");
      }
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    }
  };


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
      <View style={styles.button_container}>
        <Button title="Iniciar Sesión" onPress={handleLogin} />
        <Button title="Registrarse" onPress={goToRegister} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf:"center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button_container: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    justifyContent:'space-between',
    marginBottom: 20,
  },

});

export default Login;
