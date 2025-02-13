import {  TRABAJADOR_SERVICE } from "@/constants/instances";
import { Daily } from "@/dto/dayli";
import { Trabajador } from "@/dto/trabajador";
import { useState, useEffect } from "react";

// Hook personalizado para obtener y eliminar Dailies
export const useTrabajador = () => {
  const [dailies, setDailies] = useState<Trabajador[]>([]);

  const fetchData = async () => {
    try {
      const data = await TRABAJADOR_SERVICE.obtenerTodos();
      setDailies(data);
    } catch (error) {
      console.error("Error al obtener los dailies:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("Intentando eliminar el ID:", id);

      if (!id) throw new Error("Not Found");

      await TRABAJADOR_SERVICE.eliminar(id);
      fetchData(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el daily:", error);
    }
  };

  // Llamamos a la función de obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  return {
    dailies,
    handleDelete,
  };
};
