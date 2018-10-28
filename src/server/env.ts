import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  githubClientId: string;
  githubClientSecret: string;
  serverPort: number;
  serverHost: string;
  sessionSecret: string;
  databaseUrl: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    SERVER_PORT,
    SERVER_HOST,
    SESSION_SECRET,
    DATABASE_URL
  } = process.env;

  if (GITHUB_CLIENT_ID === undefined) {
    throw new Error("GITHUB_CLIENT_ID is not defined");
  }
  if (GITHUB_CLIENT_SECRET === undefined) {
    throw new Error("GITHUB_CLIENT_SECRET is not defined");
  }
  if (DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not defined");
  }
  if (SESSION_SECRET === undefined) {
    throw new Error("SESSION_SECRET is not defined");
  }

  return {
    githubClientId: GITHUB_CLIENT_ID,
    githubClientSecret: GITHUB_CLIENT_SECRET,
    serverPort: SERVER_PORT !== undefined && !isNaN(Number(SERVER_PORT)) ? Number(SERVER_PORT) : 3000,
    serverHost: SERVER_HOST || "localhost",
    sessionSecret: SESSION_SECRET,
    databaseUrl: DATABASE_URL
  };
};
