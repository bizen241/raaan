import { testFetch, TestServer } from "./helpers";

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();
});
afterAll(async () => {
  await testServer.stop();
});

test("server", async () => {
  const response = await testFetch("/");

  expect(response.status).toEqual(200);
});
