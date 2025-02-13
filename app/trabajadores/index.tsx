import { View, Text, FlatList, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTrabajador } from "@/hooks/trabajadores/useTrabajador";

const DaiList = () => {
  const { dailies, handleDelete } = useTrabajador();
  return (
    <View>
      {/* Encabezado */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-semibold text-[#FFF1E9]"> Administración</Text>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/52/04/65/52046537db9b7f481843d2aee62082c1.jpg",
          }}
          className="w-12 h-12 rounded-full border-pink-800"
        />
      </View>
      <View>
        <Text className="text-3xl text-[#FFD5D5]">Trabajadores</Text>

        <FlatList
          data={dailies}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <View className="container mx-auto mt-5 space-y-4">
              <View className="bg-gray-800 p-5 rounded-xl">
                <Text className="text-white text-lg font-semibold">
                  Nombre: {item.nombre}
                </Text>
                <Text className="text-gray-400">
                  RedmineId: {item.idRedmine}
                </Text>

                <View className="flex-row justify-end space-x-2 mt-3">
                  <Pressable
                    className="bg-pink-400 px-3 py-2 text-center rounded-lg active:90"
                    onPress={() => handleDelete(item.id!)}
                  >
                    <Ionicons name="trash-outline" size={24} color="white" />
                  </Pressable>
                  <Pressable
                    className="bg-blue-500 px-3 py-2 rounded-lg flex align-baseline"
                    onPress={() => router.push(`/trabajadores/${item.id}`)}
                  >
                    <Text className="text-white text-sm">
                      Ver Detalle
                      <Ionicons
                        name="paper-plane"
                        size={24}
                        color="white"
                        className="ml-1"
                      />
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DaiList;
