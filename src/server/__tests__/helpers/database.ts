import { createConnection, getConnection, getManager } from "typeorm";
import { entities, TagEntity, UserEntity } from "../../database/entities";
import { testEnv } from "./env";

export const connect = async () => {
  const { host, port, username, password, name: database } = testEnv.database;

  const connection = await createConnection({
    type: "mysql",
    host,
    port,
    username,
    password,
    database,
    entities
  });
  await connection.synchronize();
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
