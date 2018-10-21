import * as dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  serverPort: number | undefined;
  serverHost: string | undefined;
}

const { SERVER_PORT, SERVER_HOST } = process.env;

export const processEnv: ProcessEnv = {
  serverPort: SERVER_PORT !== undefined ? Number(SERVER_PORT) : undefined,
  serverHost: SERVER_HOST
};
