import { Trabajador } from "./trabajador";
import { Usuario } from "./usuario";
import { UsuarioPassword } from "./usuario-password";

export interface AuthRequest{
    worker: Trabajador;
    user: Usuario;
    userpass: UsuarioPassword;
}