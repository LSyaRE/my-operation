import { API } from "@/constants/axios-client";
import { Daily } from "@/dto/dayli";

const path = "/operaciones/dailies";

export class DailyService {
  constructor() {}

  async guardar(dayliReq: Daily): Promise<Daily> {
    const savedDayli = await API.post(`${path}/guardar`, dayliReq);
    return savedDayli.data;
  }

  async obtenerTodos(): Promise<Daily[]> {
    const daylies = await API.get(`${path}/obtener-todos`);
    return daylies.data;
  }

  async obtenerPorId(id: number): Promise<Daily> {
    const dayli = await API.get(`${path}/buscar-id/${id}`);
    return dayli.data;
  }

  async buscarPorFecha(): Promise<Daily[]> {
    const dayli = await API.get(`${path}/buscar-por-fecha/{fecha}`);
    return dayli.data;
  }

  async eliminar(id: number): Promise<Daily> {
    const dayli = await API.delete(`${path}/${id}`);
    return dayli.data;
  }
}
