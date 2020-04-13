import { createConnection, getConnection, getManager } from "typeorm";
import { AppDiaryEntryEntity, entities, TagEntity, UserEntity } from "../../database/entities";
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
  });
};

export const reset = async () => {
  const manager = getManager();

  await manager.remove(await manager.find(AppDiaryEntryEntity));
  await manager.remove(await manager.find(UserEntity));
  await manager.remove(await manager.find(TagEntity));
};

export const close = async () => {
  await getConnection("default").close();
};
