import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDailytail } from "@/hooks/dailies/useDailytail";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { dailies, error, loading } = useDailytail(+id);

  const router = useRouter();

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
      {/* Update */}

      <Pressable className="my-4">
        <Text
          className="text-sky-300 font-bold text-2xl hover:text-pink-400 hover:underline"
          onPress={() => router.push("/daily")}
        >
          Update Dailies
        </Text>
      </Pressable>

      {/* Imagen superior */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1501139083538-0139583c060f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVsb2olMjByZWxvamVzJTIwaG9yYXxlbnwwfHwwfHx8MA%3D%3D",
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
          <Text>
            Timer <Ionicons name="alarm-outline" size={24} color="sky" />
          </Text>
          : {dailies?.tiempoEnMinutos || "00:00:00"}
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
