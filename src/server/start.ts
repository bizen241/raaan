import { Server } from "http";
import { Connection } from "typeorm";
import { createApp } from "./app";
import { connectDatabase } from "./database";
import { ProcessEnv } from "./env";

export const startServer = async (processEnv: ProcessEnv) => {
  const database = await connectDatabase(processEnv);

  return new Promise<{ server: Server; database: Connection }>(resolve => {
    const { serverPort, serverHost } = processEnv;

    const server = createApp().listen(serverPort, serverHost, () => {
      console.log(`server: listening on port ${serverPort}`);

      resolve({ server, database });
    });
  });
};
