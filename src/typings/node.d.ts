declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    SERVER_HOST?: string;
    SERVER_PORT?: string;
    DATABASE_URL?: string;
  }
}
