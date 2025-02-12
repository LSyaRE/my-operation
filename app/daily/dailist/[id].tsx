import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDailytail } from "@/hooks/dailies/useDailytail";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { dailies, error, loading } = useDailytail(+id);

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
          Daily - {dailies?.fecha || "14-02-2024"} 📆
        </Text>
        <Text className="text-small text-sky-400 text-lg font-semibold mb-2">
          Timer: {dailies?.tiempoEnMinutos || "00:00:00"}
        </Text>

        {/* Título */}
        <Text className="text-white text-3xl font-bold">My Dailies</Text>

        {/* Datos */}
        <View className="mt-6 space-y-4">
          <View className="bg-slate-800 p-4 rounded-xl">
            <Text className="text-purple-300 text-lg">📝 Observación</Text>
            <Text className="text-white">
              {dailies?.observacion || "No disponible"}
            </Text>
          </View>

          <View className="bg-slate-800 p-4 rounded-xl">
            <Text className="text-sky-300 text-lg">✏️ Escrito</Text>
            <Text className="text-white">
              {dailies?.escrito ? (
                <Text>Si ha sido escrito</Text>
              ) : (
                <Text>Todavía falta por escribir</Text>
              )}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
