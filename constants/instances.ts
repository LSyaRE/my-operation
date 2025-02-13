import { AuthService } from "@/services/auth-service";
import { DailyService } from "@/services/dayli-service";
import { HealthService } from "@/services/health-service";
import { TrabajadorService } from "@/services/trabajador-service";

export const AUTH_SERVICE = new AuthService();
export const HEALTH_SERVICE = new HealthService();
export const DAILY_SERVICE = new DailyService();
export const TRABAJADOR_SERVICE = new TrabajadorService();
