import { createServer } from "http";
import fetch, { RequestInit } from "node-fetch";
import { createApp } from "../../app";
import { close, connect } from "./database";
import { testEnv } from "./env";

const { host, port } = testEnv.server;
const base = `http://${host}:${port}`;

const server = createServer(createApp(testEnv));

export const start = async () => {
  await connect();

  return new Promise(resolve => {
    server.listen(port, host, () => resolve());
  });
};

export const stop = async () => {
  await close();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
};

export const request = (path: string, init?: RequestInit) => {
  const url = new URL(path, base);

  return fetch(url.toString(), init);
};
