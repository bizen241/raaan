declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;
    NODE_ENV?: string;
    SERVER_HOST?: string;
    SERVER_PORT?: string;
    SESSION_SECRET?: string;
  }

  interface Global {
    fetch: any;
  }
}
