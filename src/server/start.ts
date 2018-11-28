import { Server } from "http";
import { Connection } from "typeorm";
import { createApp } from "./app";
import { connectDatabase } from "./database";
import { setAdminUser } from "./database/setup/admin";
import { setGuestUser } from "./database/setup/guest";
import { ProcessEnv } from "./env";

export const startServer = async (processEnv: ProcessEnv) => {
  const database = await connectDatabase(processEnv);

  await database.synchronize();
  await setGuestUser();
  await setAdminUser(processEnv);

  return new Promise<{ server: Server; database: Connection }>(resolve => {
    const { serverPort } = processEnv;

    const server = createApp(processEnv).listen(serverPort, () => {
      console.log(`server: listening on port ${serverPort}`);

      resolve({ server, database });
    });
  });
};
