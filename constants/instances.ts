import { AuthService } from "@/services/auth-service";
import { DailyService } from "@/services/dayli-service";
import { HealthService } from "@/services/health-service";

export const AUTH_SERVICE = new AuthService();
export const HEALTH_SERVICE = new HealthService();
export const DAILY_SERVICE = new DailyService();
