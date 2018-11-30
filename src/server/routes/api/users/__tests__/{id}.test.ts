import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/entity";
import { PathParams } from "../../../../api/operation";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { createUserAccount, UserAccountEntity, UserEntity, UserSessionEntity } from "../../../../database/entities";
import { insertSessions, sessions, users } from "../../../../session/__tests__/helpers";
import { createHttpMocks } from "../../__tests__/helpers";
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

  await insertSessions();
});

test("GET /api/users/{user} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: users.Read.id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});

test("GET /api/users/{user} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: users.Read.id
  };

  await getManager().remove(sessions.Read);
  await getManager().remove(users.Read);

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/users/{user} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: users.Read.id
  };

  const manager = getManager();

  const accountId = uuid();
  await manager.save(
    createUserAccount({
      id: accountId,
      accountId: "12345678",
      provider: "github",
      user: users.Read
    })
  );

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const ghostUser = await manager.findOne(UserEntity, users.Read.id);
  const deletedSession = await manager.findOne(UserSessionEntity, sessions.Read.id);
  const deletedAccount = await manager.findOne(UserAccountEntity, accountId);

  expect(ghostUser && ghostUser.permission).toBe("Ghost");
  expect(deletedSession).toBeUndefined();
  expect(deletedAccount).toBeUndefined();
});

test("DELETE /api/users/{user} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Read");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("DELETE /api/users/{user} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: users.Read.id
  };

  await getManager().remove(sessions.Read);
  await getManager().remove(users.Read);

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
