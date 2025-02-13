import { API } from "@/constants/axios-client";
import { Trabajador } from "@/dto/trabajador";

const path = "/operaciones/trabajadores";

export class TrabajadorService {
  constructor() {}

  async guardar(dayliReq: Trabajador): Promise<Trabajador> {
    const savedDayli = await API.post(`${path}/guardar`, dayliReq);
    return savedDayli.data;
  }


  async actualizar(id: number, dayliReq: Trabajador): Promise<Trabajador> {
    const updatedDayli = await API.put(`${path}/${id}`, dayliReq);
    return updatedDayli.data;
  }

  async obtenerTodos(): Promise<Trabajador[]> {
    const daylies = await API.get(`${path}/obtener-todos`);
    return daylies.data;
  }

  async  obtenerPorId(id: number): Promise<Trabajador> {
    const dayli = await API.get(`${path}/buscar-id/${id}`);
    return dayli.data;
  }

  async buscarPorFecha(): Promise<Trabajador[]> {
    const dayli = await API.get(`${path}/buscar-por-fecha/{fecha}`);
    return dayli.data;
  }

  async eliminar(id: number): Promise<Trabajador> {
    const dayli = await API.delete(`${path}/${id}`);
    return dayli.data;
  }
}
