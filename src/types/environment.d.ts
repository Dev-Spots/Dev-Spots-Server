export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SECRET: string;
      PORT: string;
      ENCRYPTION_KEY: string;
      CORS_LIST: string;
    }
  }
}
