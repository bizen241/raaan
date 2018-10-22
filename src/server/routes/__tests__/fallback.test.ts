import { testFetch, TestServer } from "./helpers";

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();
});
afterAll(async () => {
  await testServer.stop();
});

test("home", async () => {
  const response = await testFetch("/");

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("text/html");
});

test("help", async () => {
  const response = await testFetch("/help");

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("text/html");
});
