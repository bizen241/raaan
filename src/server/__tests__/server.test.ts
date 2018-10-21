import { Server } from "http";
import fetch from "node-fetch";
import { createApp } from "../app";

let server: Server;

beforeAll(done => {
  const app = createApp();

  server = app.listen(3000, "localhost", done);
});

afterAll(done => {
  server.close(done);
});

test("server", async () => {
  const response = await fetch("http://localhost:3000");

  expect(response.status).toEqual(200);
});
