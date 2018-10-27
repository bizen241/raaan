import { createServer } from "http";
import fetch, { RequestInit } from "node-fetch";
import { testProcessEnv } from "../../__tests__/helpers";
import { createApp } from "../../app";

const { serverPort, serverHost } = testProcessEnv;
const base = `http://${serverHost}:${serverPort}`;
const app = createApp(testProcessEnv);

export class TestServer {
  server = createServer(app);

  fetch(path: string, init?: RequestInit) {
    const url = new URL(path, base);

    return fetch(url.toString(), init);
  }

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
