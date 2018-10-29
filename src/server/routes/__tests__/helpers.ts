import { createServer, Server } from "http";
import fetch, { RequestInit } from "node-fetch";
import { Connection } from "typeorm";
import { testProcessEnv } from "../../__tests__/helpers";
import { createApp } from "../../app";
import { connectDatabase } from "../../database";
import { setGuestUser } from "../../database/setup/guest";

const { serverPort, serverHost } = testProcessEnv;
const base = `http://${serverHost}:${serverPort}`;

export class TestServer {
  server: Server;
  connection?: Connection;

  constructor(app = createApp(testProcessEnv)) {
    this.server = createServer(app);
  }

  fetch(path: string, init?: RequestInit) {
    const url = new URL(path, base);

    return fetch(url.toString(), init);
  }

  async start() {
    await this.startServer();
    await this.startDatabase();
  }

  async stop() {
    await this.stopServer();
    await this.stopDatabase();
  }

  startServer() {
    return new Promise(resolve => {
      this.server.listen(serverPort, serverHost, () => resolve());
    });
  }

  stopServer() {
    return new Promise(resolve => {
      this.server.close(() => resolve());
    });
  }

  async startDatabase() {
    this.connection = await connectDatabase(testProcessEnv);

    await this.connection.synchronize(true);

    await setGuestUser();
  }

  async stopDatabase() {
    if (this.connection !== undefined) {
      await this.connection.close();
    }
  }
}
