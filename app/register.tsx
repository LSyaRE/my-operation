import { AuthRequest } from "@/dto/auth-request";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { RegisterForm } from "@/dto/register-form";
import { AUTH_SERVICE } from "@/constants/instances";

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
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Routing
  const navigation = useRouter();
  const goToLogin = () => navigation.replace("/login");

  const onSubmit = (data: unknown) => {
    const parseData = data as RegisterForm;

    AUTH_SERVICE.register({
      worker: {
        nombre: parseData.nombre,
        correo: parseData.correo,
        idRedmine: parseData.redmine,
      },
      user: {
        username: parseData.username.trim().toLowerCase(),
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
    <View className="flex-1 bg-slate-950 px-5 pt-10">
      <Text className="text-white text-3xl font-bold mb-6">Registro</Text>

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="mb-4">
              <TextInput
                className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
                placeholderTextColor="#94a3b8"
                placeholder="Nombres"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.nombre && (
                <Text className="text-red-400 mt-1">
                  {errors.nombre.message}
                </Text>
              )}
            </View>
          </>
        )}
        control={control}
        name={"nombre"}
        rules={{
          required: "Este campo es obligatorio",
        }}
      />

      <Controller
        rules={{
          required: "Este campo es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo invalido",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="mb-4">
              <TextInput
                className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
                placeholderTextColor="#94a3b8"
                placeholder="Correo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.correo && (
                <Text className="text-red-400 mt-1">
                  {errors.correo.message}
                </Text>
              )}
            </View>
          </>
        )}
        control={control}
        name={"correo"}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="mb-4">
              <TextInput
                className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
                placeholderTextColor="#94a3b8"
                placeholder="Identificador Redmine"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.redmine && (
                <Text className="text-red-400 mt-1">
                  {errors.redmine.message}
                </Text>
              )}
            </View>
          </>
        )}
        control={control}
        name={"redmine"}
        rules={{
          required: "Este campo es obligatorio",
        }}
      />

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="mb-4">
              <TextInput
                className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
                placeholderTextColor="#94a3b8"
                placeholder="Nombre de Usuario"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.username && (
                <Text className="text-red-400 mt-1">
                  {errors.username.message}
                </Text>
              )}
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
            <View className="mb-4">
              <TextInput
                className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
                placeholderTextColor="#94a3b8"
                placeholder="Contraseña"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                // passwordRules={} -- Se es que se necesita agregar unas reglas de validacion para la contraseña
                onChangeText={onChange}
              />
              {errors.password && (
                <Text className="text-red-400 mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </>
        )}
        control={control}
        name={"password"}
        rules={{
          required: "Este campo es obligatorio",
        }}
      />

      <View style={styles.button_container}>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-sky-500 py-3 rounded-lg flex items-center justify-center active:bg-sky-700"
        >
          <Text className="text-white text-lg font-semibold">Registrarse</Text>
        </Pressable>

        <Pressable
          onPress={goToLogin}
          className="bg-sky-500 py-3 rounded-lg flex items-center justify-center active:bg-sky-700"
        >
          <Text className="text-white text-lg font-semibold">Iniciar Sesión</Text>
        </Pressable>
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
