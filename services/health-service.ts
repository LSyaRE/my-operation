import { API } from "@/constants/axios-client";

export class HealthService {
    
    async checkHealth() : Promise<boolean>{

     try{
         const response = await API.get('/operaciones/prueba/');

        return response.data != null;
     }  
     catch(error){
         console.error(error);
         return false;
     } 
    }
}