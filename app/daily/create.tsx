import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Controller } from "react-hook-form";
import { useCreateDaily } from "@/hooks/dailies/useCreateDaily";

const CreateDaily = () => {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useCreateDaily();
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  return (
    <View className="flex-1 bg-slate-950 px-6 py-10">
      {/* Título */}
      <Text className="text-white text-3xl font-bold mb-6">📌 Crear Daily</Text>

      {/* Observación */}
      <Controller
        name="observacion"
        control={control}
        rules={{ required: "Este campo es obligatorio" }}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <Text className="text-sky-400 text-lg mb-2">📝 Observación</Text>
            <TextInput
              placeholder="Ingrese observación"
              placeholderTextColor="#94a3b8"
              value={value}
              onChangeText={onChange}
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
            />
            {errors.observacion && (
              <Text className="text-red-400 mt-1">
                {errors.observacion.message}
              </Text>
            )}
          </View>
        )}
      />

        {/* Fecha*/}
      <Controller
        name="fecha"
        control={control}
        rules={{
          required: "Este campo es obligatorio",
          pattern: { value: fechaRegex, message: "Debe ser una fecha valida" },
          min: { value: 1, message: "Debe ser mayor a 0" },
        }}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <Text className="text-green-400 text-lg mb-2">
            📅 Fecha
            </Text>
            <TextInput
              placeholder="2025-12-11"
              placeholderTextColor="#94a3b8"
              maxLength={10}
              value={value?.toString()}
              onChangeText={(text) => onChange(text.replace(/[^\d-]/g, ""))}
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
            />
            {errors.tiempoEnMinutos && (
              <Text className="text-red-400 mt-1">
                {errors.tiempoEnMinutos.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Tiempo en Minutos */}
      <Controller
        name="tiempoEnMinutos"
        control={control}
        rules={{
          required: "Este campo es obligatorio",
          pattern: { value: /^[0-9]+$/, message: "Debe ser un número válido" },
          min: { value: 1, message: "Debe ser mayor a 0" },
        }}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <Text className="text-green-400 text-lg mb-2">
              ⏳ Tiempo en Minutos
            </Text>
            <TextInput
              placeholder="Ingrese tiempo"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
            />
            {errors.tiempoEnMinutos && (
              <Text className="text-red-400 mt-1">
                {errors.tiempoEnMinutos.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Switch Escrito */}
      <Controller
        name="escrito"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View className="flex flex-row items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6">
            <Text className="text-white text-lg">📖 Escrito</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      {/* Botón de Enviar */}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-sky-500 py-3 rounded-lg flex items-center justify-center active:bg-sky-700"
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-lg font-semibold">
            🚀 Crear Daily
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default CreateDaily;
