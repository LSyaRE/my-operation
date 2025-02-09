import { API } from "@/constants/axios-client";
import { AuthRequest } from "@/dto/auth-request";


export class AuthService {
    constructor() {
        
    }

    async register(authReq: AuthRequest) {
        try {
            const workerResponse      = await API.post('/operaciones/trabajadores/guardar', authReq.worker);
            authReq.user.trabajador   =  workerResponse.data; 
            const userResponse        = await API.post('/operaciones/usuarios/guardar', authReq.user);
            authReq.userpass.usuario  = userResponse.data;
            const userPassResponse    = await API.post('/operaciones/usuarios/passwords/guardar',authReq.userpass);
        } catch (error) {
            console.log(error);
        }
       
    }
    async login(username: string, password: string): Promise<boolean> {
        try {
            const response = await API.get('/operaciones/usuarios/passwords/validar',{params: {username, password}});
            console.log(response.data);
           return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }   
    }

}