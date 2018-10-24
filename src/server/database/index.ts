import { createConnection } from "typeorm";
import { ProcessEnv } from "../env";
import { entities } from "./entities";
import { migrations } from "./migrations";

export const connectDatabase = (processEnv: ProcessEnv) =>
  createConnection({
    type: "postgres",
    url: processEnv.databaseUrl,
    entities,
    migrations
  });
