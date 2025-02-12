import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { Daily } from "@/dto/dayli";
import { DAILY_SERVICE } from "@/constants/instances";

export const useCreateDaily = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Daily>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: Daily) => {
    setIsSubmitting(true);

    try {
      await DAILY_SERVICE.guardar(data); // Guardar los datos utilizando tu servicio
      router.push("/daily/dailist"); // Redirigir a la lista de dailies
    } catch (error) {
      console.error("Error al crear", error);
      Alert.alert("Error", "Hubo un problema al crear la entrada");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
