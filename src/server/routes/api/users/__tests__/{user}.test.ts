import { getManager } from "typeorm";
import { EntityStore } from "../../../../../shared/api/response/entity";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { UserEntity, UserSessionEntity } from "../../../../database/entities";
import { insertSessions, sessions, users } from "../../../../session/__tests__/helpers";
import { createHttpMocks } from "../../__tests__/helpers";
import { DELETE, GET, PathParams } from "../{user}";

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

test("GET /api/users/{user}", async () => {
  const { req, res, next } = createHttpMocks("Read");

  const params: PathParams = {
    user: users.Read.id
  };

  req.params = params;

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});

test("DELETE /api/users/{user} success", async () => {
  const { req, res, next } = createHttpMocks("Read");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(302);
  expect(res._getRedirectUrl()).toEqual("/logout");

  const ghostUser = await getManager().findOne(UserEntity, users.Read.id);
  const deletedSession = await getManager().findOne(UserSessionEntity, sessions.Read.id);

  expect(ghostUser && ghostUser.permission).toBe("Ghost");
  expect(deletedSession).toBeUndefined();
});

test("DELETE /api/users/{user} failure", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});
