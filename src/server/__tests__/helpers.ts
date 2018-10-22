import * as dotenv from "dotenv";
dotenv.config();

import { ProcessEnv } from "../env";

const { TEST_DATABASE_URL } = process.env;

if (TEST_DATABASE_URL === undefined) {
  throw new Error("TEST_DATABASE_URL is not defined");
}

export const testProcessEnv: ProcessEnv = {
  serverPort: 5000,
  serverHost: "localhost",
  databaseUrl: TEST_DATABASE_URL
};
