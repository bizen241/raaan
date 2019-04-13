import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, insertUser, TestDatabase } from "../../../../__tests__/helpers";
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

test("GET /api/user-accounts/{id} -> 404", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("GET /api/user-accounts/{id} -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Guest");

  const { account } = await insertUser("Write");

  (req.params as PathParams) = {
    id: account.id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("GET /api/user-accounts/{id} -> 200", async () => {
  const { req, res, next, user, account } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: account.id
  };

  await GET(req, res, next);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.UserAccount[account.id]).toBeDefined();
  expect(data.User[user.id]).toBeDefined();
});
