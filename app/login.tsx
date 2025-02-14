import { AuthService } from "@/services/auth-service";
import { HealthService } from "@/services/health-service";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

import { AUTH_SERVICE, HEALTH_SERVICE } from "@/constants/instances";
import { Controller, useForm } from "react-hook-form";

/**
 * Componente de react para la autenticacion de los usuarios
 *
 * @function Login
 * @author Alison mailto:<alison@example.com>
 * @date 05/02/2025
 */
const Login = () => {
  // Formulario
  const [error, setError] = useState(true);

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
  const goToRegister = () => navigation.replace("/register");

  // Envia la data al servidor (onSubmit)
  const handleLogin = async (data: unknown) => {
    console.log(data);
    const isAuth: boolean = await AUTH_SERVICE.login(
      data.nombre.trim().toLowerCase(),
      data.password
    );
    setError(isAuth)

    if (isAuth) {
      navigation.replace("/daily/dailist");
    }
  };

  return (
    <View className="flex-1 bg-slate-950 px-5 pt-10 ">
      <Text className="text-white text-3xl font-bold mb-6">Iniciar Sesión</Text>

      {!error ? (
        <Text className="text-red-400 mb-6">Credenciales incorrectas</Text>
      ) : (
        <View />
      )}

      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="mb-4">
              <TextInput
                className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
                placeholderTextColor="#94a3b8"
                placeholder="Usuario"
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
          onPress={handleSubmit(handleLogin)}
          className="bg-sky-500 py-3 rounded-lg flex items-center justify-center active:bg-sky-700"
        >
          <Text className="text-white text-lg font-semibold">
            Iniciar Sesión
          </Text>
        </Pressable>

        <Pressable
          onPress={goToRegister}
          className="bg-sky-500 py-3 rounded-lg flex items-center justify-center active:bg-sky-700"
        >
          <Text className="text-white text-lg font-semibold">Registrarse</Text>
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
    padding: 10,
    marginBottom: 15,
  },
  button_container: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default Login;
