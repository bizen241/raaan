import { Server } from "http";
import { createApp } from "./app";
import { connect } from "./database";
import { setGuestUser } from "./database/setup/guest";
import { setOwnerUser } from "./database/setup/owner";
import { Env } from "./env";

export const startServer = async (env: Env) => {
  await connect(env);

  await setGuestUser();
  await setOwnerUser(env);

  return new Promise<Server>((resolve) => {
    const { port } = env.server;

    const server = createApp(env).listen(port, () => {
      console.log(`server: listening on port ${port}`);

      resolve(server);
    });
  });
};
