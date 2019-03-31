import { getManager } from "typeorm";
import { EntityStore } from "../../../../../shared/api/response/get";
import {
  createHttpMocks,
  insertSessions,
  insertUsers,
  sessions,
  TestDatabase,
  users
} from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { UserAccountEntity, UserEntity, UserSessionEntity } from "../../../../database/entities";
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

  await insertUsers();
  await insertSessions();
});

test("GET /api/users/{user} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: users.Write.id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Write.id]).toBeDefined();
});

test("GET /api/users/{user} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: users.Write.id
  };

  await getManager().remove(sessions.Write);
  await getManager().remove(users.Write);

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/users/{user} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: users.Write.id
  };

  const manager = getManager();

  const savedAccount = await manager.save(new UserAccountEntity("github", "0", ""));
  const accountId = savedAccount.id;

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const deletedUser = await manager.findOne(UserEntity, users.Write.id);
  const deletedSession = await manager.findOne(UserSessionEntity, sessions.Write.id);
  const deletedAccount = await manager.findOne(UserAccountEntity, accountId);

  expect(deletedUser).toBeUndefined();
  expect(deletedSession).toBeUndefined();
  expect(deletedAccount).toBeUndefined();
});

test("DELETE /api/users/{user} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Write");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("DELETE /api/users/{user} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: users.Write.id
  };

  await getManager().remove(sessions.Write);
  await getManager().remove(users.Write);

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/users/{user} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: users.Admin.id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});
