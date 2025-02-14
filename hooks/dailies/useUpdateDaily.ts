import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { Daily } from "@/dto/dayli";
import { DAILY_SERVICE } from "@/constants/instances";
import { useDailytail } from "./useDailytail";

const [dayliId, setDayliId] = useState("");
export const useUpdateDaily = (id: string) => {
  const { dailies, error, loading } = useDailytail(+id);
  const [dailies2, setDailies] = useState<Daily | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Daily>({
    defaultValues: {
      id: dailies2?.id,
      escrito: dailies2?.escrito,
      observacion: dailies2?.observacion,
      tiempoEnMinutos: dailies2?.tiempoEnMinutos,
      fecha: dailies2?.fecha,
      trabajadores: dailies2?.trabajadores,
    },
  });

  useEffect(() => {
    if (dailies) {
      // Si los datos están disponibles, actualizamos los valores del formulario
      setValue("id", dailies.id);
      setValue("escrito", dailies.escrito);
      setValue("observacion", dailies.observacion);
      setValue("tiempoEnMinutos", dailies.tiempoEnMinutos);
      setValue("fecha", dailies.fecha);
      setValue("trabajadores", dailies.trabajadores);
    }
  }, [dailies, setValue]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: Daily) => {
    setIsSubmitting(true);

    try {
      await DAILY_SERVICE.actualizar(data?.id, data); // Guardar los datos utilizando tu servicio
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
