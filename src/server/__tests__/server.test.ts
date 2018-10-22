import { fetch, TestServer } from "./helpers";

const server = new TestServer();

beforeAll(async () => {
  await server.start();
});
afterAll(async () => {
  await server.stop();
});

test("server", async () => {
  const response = await fetch("/");

  expect(response.status).toEqual(200);
});
