import { strict as assert } from "assert";
import { EntityStore } from "../../../../shared/api/response/get";
import { createHttpMocks, TestDatabase } from "../../../__tests__/helpers";
import { DELETE, GET } from "../user";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();
});

test("GET /api/user -> 200", async () => {
  const { req, res, next, user, account, config } = await createHttpMocks("Write");

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;
  assert.notEqual(data.User[user.id], undefined);
  assert.notEqual(data.UserConfig[config.id], undefined);
  assert.equal(data.UserAccount[account.id], undefined);
});

test("DELETE /api/user -> 200", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 200);
});

test("DELETE /api/user -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Admin");

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 403);
});
