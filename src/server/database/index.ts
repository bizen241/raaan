import { createConnection } from "typeorm";
import { Env } from "../env";
import { entities } from "./entities";
import { migrations } from "./migrations";

export const connectDatabase = (env: Env) => {
  const { host, port, username, password, name: database } = env.database;

  return createConnection({
    type: "mysql",
    host,
    port,
    username,
    password,
    database,
    entities,
    migrations
  });
};
