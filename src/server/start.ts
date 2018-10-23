import { Server } from "http";
import { createApp } from "./app";
import { ProcessEnv } from "./env";

export const startServer = async (processEnv: ProcessEnv) => {
  return new Promise<Server>(resolve => {
    const { serverPort, serverHost } = processEnv;

    const server = createApp().listen(serverPort, serverHost, () => {
      console.log(`server: listening on port ${serverPort}`);

      resolve(server);
    });
  });
};
