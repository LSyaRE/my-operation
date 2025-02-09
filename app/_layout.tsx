import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState } from "react";
import "react-native-reanimated";
import * as Font from 'expo-font';
import Entypo from "@expo/vector-icons/build/Entypo";

import { useColorScheme } from "@/hooks/useColorScheme";
import { HEALTH_SERVICE } from "@/constants/instances";
import {  Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import Loader from "@/components/Loader";
// Previene el auto ocultamiento del splash screen
SplashScreen.preventAutoHideAsync();

// Configuración del splash screen
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Comportamientos de la aplicación
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  // Efecto para la carga del splash screen
  useFocusEffect(React.useCallback(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        const result = await HEALTH_SERVICE.checkHealth();
        setIsHealthy(result);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  },[]));

    // Para cuando termine de cargar los datos de la aplicación quita el splash screen
    const onLayoutRootView = useCallback(() => {
      if (appIsReady) {
        SplashScreen.hide();
      }
    }, [appIsReady]);
  

  // Carga el componente para el splash screen
  if (!appIsReady) {
    return <View style={styles.centered_container}>
      <View style={styles.overlay}>
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.text}>Cargando...</Text>
              </View>
            </View>
    </View>;
  }


  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <View style={
      styles.container
    } onLayout={onLayoutRootView}>
      {!isHealthy ? <Text>No existe conexion con el servidor</Text> : <View /> }
      <Slot/>
    </View>
    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  centered_container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loaderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

});

