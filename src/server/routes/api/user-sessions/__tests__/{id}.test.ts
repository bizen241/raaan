import { strict as assert } from "assert";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createHttpMocks, insertSession, insertUser, TestDatabase } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { UserSessionEntity } from "../../../../database/entities";
import { DELETE } from "../{id}";

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

test("DELETE /api/user-sessions/{id} -> 404", async () => {
  const { req, res, next } = await createHttpMocks("Read");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("DELETE /api/user-sessions/{id} -> 403", async () => {
  const { req, res, next } = await createHttpMocks("Read");

  const { user } = await insertUser("Read");
  const session = await insertSession(user);

  (req.params as PathParams) = {
    id: session.id
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 403);
});

test("DELETE /api/user-sessions/{id} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Read");

  const session = await insertSession(user);

  (req.params as PathParams) = {
    id: session.id
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const deletedSession = await getManager().findOne(UserSessionEntity, session.id);
  assert(!deletedSession);
});
