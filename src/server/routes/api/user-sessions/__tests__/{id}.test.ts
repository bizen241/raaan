import { strict as assert } from "assert";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, insertSession, insertUser, TestDatabase } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { UserSessionEntity } from "../../../../database/entities";
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

test("GET /api/user-sessions/{id} -> 404", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("GET /api/user-sessions/{id} -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  const { user } = await insertUser("Write");
  const session = await insertSession(user);

  (req.params as PathParams) = {
    id: session.id
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 403);
});

test("GET /api/user-sessions/{id} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  const session = await insertSession(user);

  (req.params as PathParams) = {
    id: session.id
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;
  assert(data.User[user.id]);
});

test("DELETE /api/user-sessions/{id} -> 404", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("DELETE /api/user-sessions/{id} -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  const { user } = await insertUser("Write");
  const session = await insertSession(user);

  (req.params as PathParams) = {
    id: session.id
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 403);
});

test("DELETE /api/user-sessions/{id} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  const session = await insertSession(user);

  (req.params as PathParams) = {
    id: session.id
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const deletedSession = await getManager().findOne(UserSessionEntity, session.id);
  assert(!deletedSession);
});
