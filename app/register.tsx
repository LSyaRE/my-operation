import { AuthRequest } from "@/dto/auth-request";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { RegisterForm } from "@/dto/register-form";

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if (!emailRegex.test(text)) {
      setError("Correo electrónico no válido");
    } else {
      setError("");
    }
  };

  // Routing
  const navigation = useRouter();
  const goToLogin = () => navigation.replace("/login");

  const onSubmit = (data: unknown) => {
    const authService = new AuthService();
    const parseData = data as RegisterForm;

    authService.register({
      worker: {
        nombre: parseData.nombre,
        correo: parseData.correo,
        idRedmine: parseData.redmine,
      },
      user: {
        username: parseData.username,
        estado: true,
      },
      userpass: {
        password: parseData.username,
      },
    });

    reset({
      username: "",
      password: "",
      nombre: "",
      correo: "",
      redmine: "",
    });
  };

  const onError: SubmitErrorHandler<RegisterForm> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registro</Text>

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Nombres"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.nombre && <Text style={styles.error_message}>El nombre es requerido.</Text>}
            </View>
          </>
        )}
        control={control}
        name={"nombre"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Correo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.correo && <Text style={styles.error_message}>El correo es invalido.</Text>}
            </View>
          </>
        )}
        control={control}
        name={"correo"}
        rules={{ required: true , pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/}}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Identificador Redmine"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.redmine && <Text style={styles.error_message}>El RedmineId es requerido.</Text>}
            </View>
          </>
        )}
        control={control}
        name={"redmine"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.redmine && <Text style={styles.error_message}>El Usuario es requerido.</Text>}
            </View>
          </>
        )}
        control={control}
        name={"username"}
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                // passwordRules={} -- Se es que se necesita agregar unas reglas de validacion para la contraseña
                onChangeText={onChange}
              />
              {errors.password && <Text style={styles.error_message}>La contraseña es requerida.</Text>}
            </View>
          </>
        )}
        control={control}
        name={"password"}
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
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  input_container: {
    padding: 10,
  },
  button_container: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  error_message: {
    color: "red",
  },
});

export default Register;
