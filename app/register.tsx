import { AuthRequest } from "@/dto/auth-request";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/build/Entypo";
import { HEALTH_SERVICE } from "@/constants/instances";


// Previene el auto ocultamiento del splash screen
SplashScreen.preventAutoHideAsync();

// Configuración del splash screen
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

/**
 * Componente de react para el registro de los usuarios
 *
 * @function Register
 * @author Alison <mailto:alison@example.com>
 * @date 05/02/2025
 */
const Register: React.FC<{
  onRegister: (username: string, password: string) => void;
}> = ({ onRegister }) => {
  // Formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [redmine, setRedmine] = useState("");

  // Comportamientos de la aplicación
  const [error, setError] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setError("Correo electrónico no válido");
    } else {
      setError("");
    }
    setCorreo(text);
  };

  // Routing
  const navigation = useRouter();
  const goToLogin = () => navigation.replace("/login");





  const onSubmit = () => {
    const authService = new AuthService();

    authService.register({
      worker: {
        nombre,
        correo,
        idRedmine: redmine,
      },
      user: {
        username,
        estado: true,
      },
      userpass: {
        password,
      },
    });

    setNombre("");
    setCorreo("");
    setRedmine("");
    setUsername("");
    setPassword("");
  };

  const onError: SubmitErrorHandler<AuthRequest> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Registro</Text>

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nombres"
            value={nombre}
            onChangeText={setNombre}
          />
        )}
        control={control}
        name={"nombres"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        control={control}
        name={"correo"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Identificador Redmine"
            value={redmine}
            onChangeText={setRedmine}
          />
        )}
        control={control}
        name={"redmine"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nombre de Usuario"
            value={username}
            onChangeText={setUsername}
          />
        )}
        control={control}
        name={"username"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            // passwordRules={} -- Se es que se necesita agregar unas reglas de validacion para la contraseña
            onChangeText={setPassword}
          />
        )}
        control={control}
        name={"username"}
        rules={{ required: true }}
      />

      <View style={styles.button_container}>
        <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
        <Button title="Iniciar Sesión" onPress={goToLogin} />
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
  }
});

export default Register;
