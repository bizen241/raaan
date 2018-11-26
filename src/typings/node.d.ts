declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    SERVER_HOST?: string;
    SERVER_PORT?: string;
    DATABASE_URL?: string;
    SESSION_SECRET?: string;
    ADMIN_ACCOUNT_PROVIDER?: string;
    ADMIN_ACCOUNT_ID?: string;
    ADMIN_ACCOUNT_NAME?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;
  }

  interface Global {
    fetch: any;
  }
}
