import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  serverHost: string;
  serverPort: number;
  databaseUrl: string;
  sessionSecret: string;
  adminAccountProvider: string;
  adminAccountId: string;
  adminAccountName: string;
  githubClientId: string;
  githubClientSecret: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const {
    SERVER_HOST,
    SERVER_PORT,
    DATABASE_URL,
    SESSION_SECRET,
    ADMIN_ACCOUNT_PROVIDER,
    ADMIN_ACCOUNT_ID,
    ADMIN_ACCOUNT_NAME,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
  } = process.env;

  if (DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not defined");
  }
  if (SESSION_SECRET === undefined) {
    throw new Error("SESSION_SECRET is not defined");
  }
  if (ADMIN_ACCOUNT_PROVIDER === undefined) {
    throw new Error("ADMIN_ACCOUNT_PROVIDER is not defined");
  }
  if (ADMIN_ACCOUNT_ID === undefined) {
    throw new Error("ADMIN_ACCOUNT_ID is not defined");
  }
  if (ADMIN_ACCOUNT_NAME === undefined) {
    throw new Error("ADMIN_ACCOUNT_NAME is not defined");
  }
  if (GITHUB_CLIENT_ID === undefined) {
    throw new Error("GITHUB_CLIENT_ID is not defined");
  }
  if (GITHUB_CLIENT_SECRET === undefined) {
    throw new Error("GITHUB_CLIENT_SECRET is not defined");
  }

  return {
    serverHost: SERVER_HOST || "localhost",
    serverPort: SERVER_PORT !== undefined && !isNaN(Number(SERVER_PORT)) ? Number(SERVER_PORT) : 3000,
    databaseUrl: DATABASE_URL,
    sessionSecret: SESSION_SECRET,
    adminAccountProvider: ADMIN_ACCOUNT_PROVIDER,
    adminAccountId: ADMIN_ACCOUNT_ID,
    adminAccountName: ADMIN_ACCOUNT_NAME,
    githubClientId: GITHUB_CLIENT_ID,
    githubClientSecret: GITHUB_CLIENT_SECRET
  };
};
