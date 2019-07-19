import { Server } from "http";
import { Connection } from "typeorm";
import { createApp } from "./app";
import { connectDatabase } from "./database";
import { setGuestUser } from "./database/setup/guest";
import { setOwnerUser } from "./database/setup/owner";
import { ProcessEnv } from "./env";

export const startServer = async (processEnv: ProcessEnv) => {
  const database = await connectDatabase(processEnv);

  await database.synchronize();
  await setGuestUser();
  await setOwnerUser(processEnv);

  return new Promise<{ server: Server; database: Connection }>(resolve => {
    const { serverPort } = processEnv;

    const server = createApp(processEnv).listen(serverPort, () => {
      console.log(`server: listening on port ${serverPort}`);

      resolve({ server, database });
    });
  });
};
