import { Server } from "http";
import nodeFetch, { RequestInit } from "node-fetch";
import { createApp } from "../app";
import { ProcessEnv } from "../env";

const serverPort = 5000;
const serverHost = "localhost";

export const testProcessEnv: ProcessEnv = {
  serverPort,
  serverHost
};

const base = `http://${serverHost}:${serverPort}`;

export const fetch = (path: string, init?: RequestInit) => {
  const url = new URL(path, base);

  return nodeFetch(url.toString(), init);
};

const app = createApp();

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
      this.server = app.listen(serverPort, serverHost, () => resolve());
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
