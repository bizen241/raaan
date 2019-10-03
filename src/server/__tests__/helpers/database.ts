import { ConnectionOptions, createConnection, getConnection, getManager } from "typeorm";
import { entities, TagEntity, UserEntity } from "../../database/entities";

export const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "mysql",
  database: "raan_test",
  entities
};

export const connect = async () => {
  const connection = await createConnection(connectionOptions);
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
