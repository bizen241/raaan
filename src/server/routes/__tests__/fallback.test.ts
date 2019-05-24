import { strict as assert } from "assert";
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

  assert.equal(response.status, 200);

  const contentTypeHeader = response.headers.get("Content-Type");
  assert(contentTypeHeader && contentTypeHeader.includes("text/html"));
});

test("GET /config", async () => {
  const response = await testServer.fetch("/config");

  assert.equal(response.status, 200);

  const contentTypeHeader = response.headers.get("Content-Type");
  assert(contentTypeHeader && contentTypeHeader.includes("text/html"));
});
