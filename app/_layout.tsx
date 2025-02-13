import "./styles/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { useFonts } from "expo-font";
import { Slot, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import "react-native-reanimated";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/build/Entypo";

import { useColorScheme } from "@/hooks/useColorScheme";
import { HEALTH_SERVICE } from "@/constants/instances";
import { Text, View, ActivityIndicator } from "react-native";
import { LayoutStyles } from "./styles/layoutStyles";

// Load Layout Styles
const { container, centered_container, overlay, loaderContainer, text } =
  LayoutStyles;

// Previene el auto ocultamiento del splash screen
SplashScreen.preventAutoHideAsync();

// Configuración del splash screen
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  type HealthyType = boolean | null;

  // Comportamientos de la aplicación
  const [isHealthy, setIsHealthy] = useState<HealthyType>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  // Efecto para la carga del splash screen
  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  // Para cuando termine de cargar los datos de la aplicación quita el splash screen
  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  // Carga el componente para el splash screen
  if (!appIsReady) {
    return (
      <View style={centered_container}>
        <View style={overlay}>
          <View style={loaderContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={text}>Cargando...</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View className="h-full flex justify-center bg-slate-950 px-5 pt-10" onLayout={onLayoutRootView}>
        {!isHealthy ? (
          <Text>No existe conexion con el servidor</Text>
        ) : (
          <View />
        )}
        <Slot />
      </View>
    </ThemeProvider>
  );
}
