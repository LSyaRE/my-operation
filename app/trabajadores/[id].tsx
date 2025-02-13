import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDailytail } from "@/hooks/dailies/useDailytail";
import { useTrabajadortail } from "@/hooks/trabajadores/useTrabajadortail";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { dailies, error, loading, user } = useTrabajadortail(+id);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <Text className="text-red-400 font-semibold">
          {JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-950">
      {/* Imagen superior */}
      <Image
        source={{
          uri: "https://img.freepik.com/premium-photo/school-supplies-stationery-gray-background_107592-207.jpg?semt=ais_hybrid",
        }}
        className="w-full h-56 rounded-b-3xl"
      />

      {/* Contenido */}
      <View className="px-6 py-6">
        {/* Subtítulo tipo Notion */}
        <Text className="text-sky-400 text-lg font-semibold mb-2">
          RedmineId 🪪 - {dailies?.idRedmine || "🪪"} 
        </Text>
        <Text className="text-small text-sky-400 text-lg font-semibold mb-2">
          Nombre 🧑: {dailies?.nombre || "Nombre"}
        </Text>

        {/* Título */}
        <Text className="text-white text-3xl font-bold">Datos Trabajador</Text>

        {/* Datos */}
        <View className="mt-6 space-y-4">
          <View className="bg-slate-800 p-4 rounded-xl">
            <Text className="text-purple-300 text-lg">📧 Correo</Text>
            <Text className="text-white">
              {dailies?.correo || "No disponible"}
            </Text>
          </View>
          <View className="bg-slate-800 p-4 rounded-xl">
            <Text className="text-purple-300 text-lg">✏️ Usuario</Text>
            <Text className="text-white">
              {user?.username || "No disponible"}
            </Text>
          </View>

          <View className="bg-slate-800 p-4 rounded-xl">
            <Text className="text-sky-300 text-lg">🌙 Estado</Text>
            <Text className="text-white px-2">
              {user?.estado ? (
                <View className="bg-green-600 px-5 rounded-full">
                  <Text className="text-white-300 text-lg">Activo</Text>
                </View>
              ) : (
                <View className="bg-red-600 px-5 rounded-full">
                  <Text className="text-white-300 text-lg">Inactivo</Text>
                </View>
              )}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
