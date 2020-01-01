import { createConnection, getConnection, getManager } from "typeorm";
import { entities, TagEntity, UserEntity } from "../../database/entities";
import { testEnv } from "./env";

export const connect = async () => {
  jest.setTimeout(60000);

  const { host, port, username, password, name: database } = testEnv.database;

  await createConnection({
    name: "default",
    type: "mysql",
    host,
    port,
    username,
    password,
    database,
    entities,
    synchronize: true,
    dropSchema: true
  });
};

export const reset = async () => {
  const manager = getManager();

  const users = await manager.find(UserEntity);
  await manager.remove(users);
  const tags = await manager.find(TagEntity);
  await manager.remove(tags);
};

export const close = async () => {
  await getConnection().close();
};
