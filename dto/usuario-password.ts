import { Usuario } from "./usuario";

export interface UsuarioPassword{
    id?: number;
    usuario?: Usuario;
    password: string;
}