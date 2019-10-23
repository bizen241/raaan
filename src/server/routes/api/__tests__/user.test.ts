import { strict as assert } from "assert";
import { EntityStore } from "../../../../shared/api/response/get";
import { close, connect, createHttpMocks, reset } from "../../../__tests__/helpers";
import { DELETE, GET } from "../user";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/user -> 200", async () => {
  const { req, res, next, user, account, config } = await createHttpMocks("Read");

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;
  assert.notEqual(data.User[user.id], undefined);
  assert.notEqual(data.UserConfig[config.id], undefined);
});

test("DELETE /api/user -> 200", async () => {
  const { req, res, next } = await createHttpMocks("Read");

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 302);
});

test("DELETE /api/user -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Owner");

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 403);
});
