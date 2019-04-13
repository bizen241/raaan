import { TestServer } from "../../__tests__/helpers";

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();
});
afterAll(async () => {
  await testServer.stop();
});

test("GET /", async () => {
  const response = await testServer.fetch("/");

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("text/html");
});

test("GET /config", async () => {
  const response = await testServer.fetch("/config");

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("text/html");
});
