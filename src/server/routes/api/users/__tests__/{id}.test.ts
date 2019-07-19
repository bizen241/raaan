import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, TestDatabase } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { GET } from "../{id}";

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

test("GET /api/users/{id} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Read");

  (req.params as PathParams) = {
    id: user.id
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;

  assert(data.User[user.id]);
});

test("GET /api/users/{id} -> 404", async () => {
  const { req, res, next, user } = await createHttpMocks("Read");

  (req.params as PathParams) = {
    id: user.id
  };

  await getManager().remove(user);
  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});
