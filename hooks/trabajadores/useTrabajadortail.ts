import { AUTH_SERVICE, TRABAJADOR_SERVICE } from "@/constants/instances";
import { Daily } from "@/dto/dayli";
import { Trabajador } from "@/dto/trabajador";
import { Usuario } from "@/dto/usuario";
import { useState, useEffect } from "react";

type ErrorType = Error | null;
type DailyType = Trabajador | null;
type UserType = Usuario | null;

export const useTrabajadortail = (id: number) => {
  const [dailies, setDailies] = useState<DailyType>(null);
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await TRABAJADOR_SERVICE.obtenerPorId(+id);
      const usuario = await AUTH_SERVICE.obtenerUsuario(+id);
      setUser(usuario);
      setDailies(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  return { dailies, user,loading, error };
};
