import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  serverPort: number;
  serverHost: string;
  sessionSecret: string;
  databaseUrl: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const { SERVER_PORT, SERVER_HOST, SESSION_SECRET, DATABASE_URL } = process.env;

  if (DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not defined");
  }
  if (SESSION_SECRET === undefined) {
    throw new Error("SESSION_SECRET is not defined");
  }

  return {
    serverPort: SERVER_PORT !== undefined && !isNaN(Number(SERVER_PORT)) ? Number(SERVER_PORT) : 3000,
    serverHost: SERVER_HOST || "localhost",
    sessionSecret: SESSION_SECRET,
    databaseUrl: DATABASE_URL
  };
};
