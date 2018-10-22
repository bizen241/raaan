import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  serverPort: number;
  serverHost: string;
}

export const getProcessEnv = (): ProcessEnv => {
  const { SERVER_PORT, SERVER_HOST } = process.env;

  return {
    serverPort: SERVER_PORT !== undefined && !isNaN(Number(SERVER_PORT)) ? Number(SERVER_PORT) : 3000,
    serverHost: SERVER_HOST || "localhost"
  };
};
