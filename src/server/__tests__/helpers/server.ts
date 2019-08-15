import { createServer, Server } from "http";
import fetch, { RequestInit } from "node-fetch";
import { createApp } from "../../app";
import { TestDatabase } from "./database";
import { testEnv } from "./env";

const { host, port } = testEnv.server;
const base = `http://${host}:${port}`;

export class TestServer {
  server: Server;
  db: TestDatabase;

  constructor(app = createApp(testEnv)) {
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
      this.server.listen(port, host, () => resolve());
    });
  }

  stopServer() {
    return new Promise(resolve => {
      this.server.close(() => resolve());
    });
  }
}
