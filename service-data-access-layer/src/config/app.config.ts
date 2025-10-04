export interface AppConfig {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  apiKey: string;
  environment: string;
  version: string;
}

export const appConfig: AppConfig = {
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : 8001,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'virtual_wallet',
  },
  apiKey: process.env.API_KEY || 'sk_test_api_key',
  environment: process.env.NODE_ENV || 'development',
  version: process.env.APP_VERSION || '1.0.0',
};