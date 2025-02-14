import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { Daily } from "@/dto/dayli";
import { DAILY_SERVICE } from "@/constants/instances";
import { useDailytail } from "./useDailytail";

const [dayliId, setDayliId] = useState("");
export const useUpdateDaily = (id: string) => {
 const { dailies, error, loading } = useDailytail(+id);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Daily>({
    defaultValues: {
        id: dailies?.id,
        escrito: dailies?.escrito,
        observacion: dailies?.observacion,
        tiempoEnMinutos: dailies?.tiempoEnMinutos,
        fecha: dailies?.fecha,
        trabajadores: dailies?.trabajadores,
    }
});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: Daily) => {
    setIsSubmitting(true);

    console.log(dayliId);
    try {
      await DAILY_SERVICE.actualizar(dayliId, data); // Guardar los datos utilizando tu servicio
      router.push("/daily/dailist"); // Redirigir a la lista de dailies
    } catch (error) {
      console.error("Error al actualizar", error);
      Alert.alert("Error", "Hubo un problema al actualizar la entrada");
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
