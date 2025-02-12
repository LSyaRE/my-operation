import { DAILY_SERVICE } from "@/constants/instances";
import { Daily } from "@/dto/dayli";
import { useState, useEffect } from "react";

type ErrorType = Error | null;
type DailyType = Daily | null;

export const useDailytail = (id: number) => {
  const [dailies, setDailies] = useState<DailyType>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await DAILY_SERVICE.obtenerPorId(+id);
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
  return { dailies, loading, error };
};
