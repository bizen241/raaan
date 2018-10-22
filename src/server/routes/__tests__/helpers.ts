import { createServer } from "http";
import nodeFetch, { RequestInit } from "node-fetch";
import { testProcessEnv } from "../../__tests__/helpers";
import { createApp } from "../../app";

const { serverPort, serverHost } = testProcessEnv;

const base = `http://${serverHost}:${serverPort}`;

export const testFetch = (path: string, init?: RequestInit) => {
  const url = new URL(path, base);

  return nodeFetch(url.toString(), init);
};

const app = createApp();

export class TestServer {
  server = createServer(app);

  async start() {
    await this.startServer();
  }

  async stop() {
    await this.stopServer();
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
