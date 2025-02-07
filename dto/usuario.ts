import { Trabajador } from "./trabajador";

export interface Usuario {
    id?: number;
    username: string;
    trabajador?: Trabajador;
    estado: boolean;
}