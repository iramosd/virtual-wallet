export interface AppConfig {
  port: number;
  apiKey: string;
  dataAccessApiUrl: string;
  environment: string;
  version: string;
}

export const appConfig: AppConfig = {
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : 8002,
  apiKey: process.env.API_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
  dataAccessApiUrl: process.env.DATA_ACCESS_API_URL || 'http://localhost:8001/api',
  environment: process.env.NODE_ENV || 'development',
  version: process.env.APP_VERSION || '1.0.0',
};