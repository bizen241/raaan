import { createConnection } from "typeorm";
import { ProcessEnv } from "../env";

export const connectDatabase = (processEnv: ProcessEnv) =>
  createConnection({
    type: "postgres",
    url: processEnv.databaseUrl
  });
