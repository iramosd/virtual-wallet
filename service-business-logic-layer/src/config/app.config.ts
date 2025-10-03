export interface AppConfig {
  port: number;
  apiKey: string;
  environment: string;
  version: string;
}

export const appConfig: AppConfig = {
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : 8002,
  apiKey: process.env.API_KEY || 'default-api-key',
  environment: process.env.NODE_ENV || 'development',
  version: process.env.APP_VERSION || '1.0.0',
};