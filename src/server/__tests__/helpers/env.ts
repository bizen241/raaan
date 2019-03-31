import * as dotenv from "dotenv";
dotenv.config();

import { ProcessEnv } from "../../env";

const { TEST_DATABASE_URL } = process.env;

if (TEST_DATABASE_URL === undefined) {
  throw new Error("TEST_DATABASE_URL is not defined");
}

export const testProcessEnv: ProcessEnv = {
  serverHost: "localhost",
  serverPort: 8000,
  databaseUrl: TEST_DATABASE_URL,
  sessionSecret: "secret",
  adminAccountProvider: "github",
  adminAccountId: "12345678",
  adminAccountName: "name",
  githubClientId: "12345678901234567890",
  githubClientSecret: "1234567890123456789012345678901234567890"
};
