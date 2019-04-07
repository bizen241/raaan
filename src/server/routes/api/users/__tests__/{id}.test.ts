import { getManager } from "typeorm";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, insertUser, TestDatabase } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { UserAccountEntity, UserEntity } from "../../../../database/entities";
import { DELETE, GET } from "../{id}";

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

test("GET /api/users/{user} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: user.id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[user.id]).toBeDefined();
});

test("GET /api/users/{user} -> 404", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: user.id
  };

  await getManager().remove(user);

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/users/{user} -> 200", async () => {
  const { req, res, next } = await createHttpMocks("Admin");

  const { user, account } = await insertUser("Write");

  (req.params as PathParams) = {
    id: user.id
  };

  const manager = getManager();

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const deletedUser = await manager.findOne(UserEntity, user.id);
  const deletedAccount = await manager.findOne(UserAccountEntity, account.id);

  expect(deletedUser).toBeUndefined();
  expect(deletedAccount).toBeUndefined();
});

test("DELETE /api/users/{user} -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("DELETE /api/users/{user} -> 404", async () => {
  const { req, res, next, user } = await createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: user.id
  };

  await getManager().remove(user);

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/users/{user} -> 403", async () => {
  const { req, res, next, user } = await createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: user.id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});
