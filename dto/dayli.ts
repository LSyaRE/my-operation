import { Trabajador } from "./trabajador";

export interface Daily {
  id?: number;
  observacion: string;
  fecha: Date;
  escrito: boolean;
  tiempoEnMinutos: number;
  trabajadores?: Trabajador[];
}
