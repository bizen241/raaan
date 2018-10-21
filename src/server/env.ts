import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  serverPort: number | undefined;
  serverHost: string | undefined;
}

export const getProcessEnv = (): ProcessEnv => {
  const { SERVER_PORT, SERVER_HOST } = process.env;

  return {
    serverPort: SERVER_PORT !== undefined && !isNaN(Number(SERVER_PORT)) ? Number(SERVER_PORT) : undefined,
    serverHost: SERVER_HOST
  };
};
