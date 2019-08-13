import * as dotenv from "dotenv";
import { AuthProviderName, isAuthProviderName } from "../shared/auth";
dotenv.config();

export interface ProcessEnv {
  serverHost: string;
  serverPort: number;
  databaseUrl: string;
  sessionSecret: string;
  ownerAccountProvider: AuthProviderName;
  ownerAccountId: string;
  ownerAccountName: string;
  ownerAccountEmail: string;
  githubClientId: string;
  githubClientSecret: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const serverHost = getEnv("SERVER_HOST");
  const serverPort = Number(getEnv("SERVER_PORT"));
  const databaseUrl = getEnv("DATABASE_URL");
  const sessionSecret = getEnv("SESSION_SECRET");
  const ownerAccountProvider = getEnv("OWNER_ACCOUNT_PROVIDER");
  const ownerAccountId = getEnv("OWNER_ACCOUNT_ID");
  const ownerAccountName = getEnv("OWNER_ACCOUNT_NAME");
  const ownerAccountEmail = getEnv("OWNER_ACCOUNT_EMAIL");
  const githubClientId = getEnv("GITHUB_CLIENT_ID");
  const githubClientSecret = getEnv("GITHUB_CLIENT_SECRET");

  if (isNaN(serverPort)) {
    throw new Error("SERVER_PORT is invalid");
  }
  if (!isAuthProviderName(ownerAccountProvider)) {
    throw new Error("OWNER_ACCOUNT_PROVIDER is invalid");
  }

  return {
    serverHost,
    serverPort,
    databaseUrl,
    sessionSecret,
    ownerAccountProvider,
    ownerAccountId,
    ownerAccountName,
    ownerAccountEmail,
    githubClientId,
    githubClientSecret
  };
};

const getEnv = (key: string) => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`${key} is not defined`);
  }

  return value;
};
