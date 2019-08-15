import { Server } from "http";
import { Connection } from "typeorm";
import { createApp } from "./app";
import { connectDatabase } from "./database";
import { setGuestUser } from "./database/setup/guest";
import { setOwnerUser } from "./database/setup/owner";
import { Env } from "./env";

export const startServer = async (env: Env) => {
  const database = await connectDatabase(env);

  await database.synchronize();
  await setGuestUser();
  await setOwnerUser(env);

  return new Promise<{ server: Server; database: Connection }>(resolve => {
    const { port } = env.server;

    const server = createApp(env).listen(port, () => {
      console.log(`server: listening on port ${port}`);

      resolve({ server, database });
    });
  });
};
