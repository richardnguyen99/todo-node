// Declare used key-value pairs in process.env

declare namespace NodeJS {
  interface ProcessEnv {
    // Node Environment
    NODE_ENV: "development" | "production";
    PORT: string;

    // Database
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
  }
}
