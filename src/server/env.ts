import * as dotenv from "dotenv";
import { AuthProviderName, isAuthProviderName } from "../shared/auth";
dotenv.config();

export interface ProcessEnv {
  serverHost: string;
  serverPort: number;
  databaseUrl: string;
  sessionSecret: string;
  adminAccountProvider: AuthProviderName;
  adminAccountId: string;
  adminAccountName: string;
  adminAccountEmail: string;
  githubClientId: string;
  githubClientSecret: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const {
    HOST,
    PORT,
    DATABASE_URL,
    SESSION_SECRET,
    ADMIN_ACCOUNT_PROVIDER,
    ADMIN_ACCOUNT_ID,
    ADMIN_ACCOUNT_NAME,
    ADMIN_ACCOUNT_EMAIL,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
  } = process.env;

  if (HOST === undefined) {
    throw new Error("HOST is not defined");
  } else if (PORT === undefined) {
    throw new Error("PORT is not defined");
  } else if (DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not defined");
  } else if (SESSION_SECRET === undefined) {
    throw new Error("SESSION_SECRET is not defined");
  } else if (ADMIN_ACCOUNT_PROVIDER === undefined) {
    throw new Error("ADMIN_ACCOUNT_PROVIDER is not defined");
  } else if (ADMIN_ACCOUNT_ID === undefined) {
    throw new Error("ADMIN_ACCOUNT_ID is not defined");
  } else if (ADMIN_ACCOUNT_NAME === undefined) {
    throw new Error("ADMIN_ACCOUNT_NAME is not defined");
  } else if (ADMIN_ACCOUNT_EMAIL === undefined) {
    throw new Error("ADMIN_ACCOUNT_EMAIL is not defined");
  } else if (GITHUB_CLIENT_ID === undefined) {
    throw new Error("GITHUB_CLIENT_ID is not defined");
  } else if (GITHUB_CLIENT_SECRET === undefined) {
    throw new Error("GITHUB_CLIENT_SECRET is not defined");
  }

  if (!isAuthProviderName(ADMIN_ACCOUNT_PROVIDER)) {
    throw new Error("ADMIN_ACCOUNT_PROVIDER is invalid");
  }

  return {
    serverHost: HOST,
    serverPort: Number(PORT),
    databaseUrl: DATABASE_URL,
    sessionSecret: SESSION_SECRET,
    adminAccountProvider: ADMIN_ACCOUNT_PROVIDER,
    adminAccountId: ADMIN_ACCOUNT_ID,
    adminAccountName: ADMIN_ACCOUNT_NAME,
    adminAccountEmail: ADMIN_ACCOUNT_EMAIL,
    githubClientId: GITHUB_CLIENT_ID,
    githubClientSecret: GITHUB_CLIENT_SECRET
  };
};
