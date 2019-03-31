import { createServer, Server } from "http";
import fetch, { RequestInit } from "node-fetch";
import { createApp } from "../../app";
import { TestDatabase } from "./database";
import { testProcessEnv } from "./env";

const { serverPort, serverHost } = testProcessEnv;
const base = `http://${serverHost}:${serverPort}`;

export class TestServer {
  server: Server;
  db: TestDatabase;

  constructor(app = createApp(testProcessEnv)) {
    this.server = createServer(app);
    this.db = new TestDatabase();
  }

  fetch(path: string, init?: RequestInit) {
    const url = new URL(path, base);

    return fetch(url.toString(), init);
  }

  async start() {
    await this.startServer();
    await this.db.connect();
  }

  async reset() {
    await this.db.reset();
  }

  async stop() {
    await this.stopServer();
    await this.db.close();
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
}
