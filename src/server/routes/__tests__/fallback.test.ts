import { strict as assert } from "assert";
import { request, reset, start, stop } from "../../__tests__/helpers";

beforeAll(async () => start());
beforeEach(async () => reset());
afterAll(async () => stop());

test("GET /", async () => {
  const response = await request("/");

  assert.equal(response.status, 200);

  const contentTypeHeader = response.headers.get("Content-Type");
  assert(contentTypeHeader && contentTypeHeader.includes("text/html"));
});

test("GET /config", async () => {
  const response = await request("/config");

  assert.equal(response.status, 200);

  const contentTypeHeader = response.headers.get("Content-Type");
  assert(contentTypeHeader && contentTypeHeader.includes("text/html"));
});
