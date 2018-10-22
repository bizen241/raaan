import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  serverPort: number;
  serverHost: string;
  databaseUrl: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const { SERVER_PORT, SERVER_HOST, DATABASE_URL } = process.env;

  if (DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not defined");
  }

  return {
    serverPort: SERVER_PORT !== undefined && !isNaN(Number(SERVER_PORT)) ? Number(SERVER_PORT) : 3000,
    serverHost: SERVER_HOST || "localhost",
    databaseUrl: DATABASE_URL
  };
};
