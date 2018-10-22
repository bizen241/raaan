import { Server } from "http";
import nodeFetch, { RequestInit } from "node-fetch";
import { createApp } from "../app";

const app = createApp();
const port = 5000;
const host = "localhost";
const base = `http://${host}:${port}`;

export const fetch = (path: string, init?: RequestInit) => {
  const url = new URL(path, base);

  return nodeFetch(url.toString(), init);
};

export class TestServer {
  server?: Server;

  async start() {
    await this.startServer();
  }

  async stop() {
    await this.stopServer();
  }

  startServer() {
    return new Promise(resolve => {
      this.server = app.listen(port, host, () => resolve());
    });
  }

  stopServer() {
    return new Promise(resolve => {
      if (this.server === undefined) {
        resolve();
      } else {
        this.server.close(() => resolve());
      }
    });
  }
}
