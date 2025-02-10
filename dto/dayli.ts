import { Trabajador } from "./trabajador";

export interface Dayli {
    id : number;
    observacion: string;
    fecha: Date;
    escrito: boolean;
    tiempoEnMinutos: number;
    trabajadores: Trabajador[];
}