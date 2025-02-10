import { API } from "@/constants/axios-client";
import { Dayli } from "@/dto/dayli";

export class DayliService {
  constructor() {}

  async guardar(dayliReq: Dayli): Promise<Dayli> {
    const savedDayli = await API.post("/operaciones/dailies/guardar", dayliReq);
    return savedDayli.data;
  }

  async obtenerTodos(): Promise<Dayli[]> {
    const daylies = await API.get("/operaciones/dailies/obtener-todos");
    return daylies.data;
  }

  async obtenerPorId(id: number): Promise<Dayli> {
    const dayli = await API.get(`/operaciones/dailies/buscar-id/${id}`);
    return dayli.data;
  }

  async buscarPorFecha(): Promise<Dayli[]> {
    const dayli = await API.get(
      `/operaciones/dailies/buscar-por-fecha/{fecha}`
    );
    return dayli.data;
  }

  async eliminar(id: number): Promise<Dayli> {
    const dayli = await API.delete(`/operaciones/dailies/${id}`);
    return dayli.data;
  }


}
