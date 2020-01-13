import { strict as assert } from "assert";
import uuid from "uuid/v4";
import {
  close,
  connect,
  createMocks,
  createParams,
  hasSecurity,
  insertSession,
  insertUser,
  reset
} from "../../../../__tests__/helpers";
import { UserSessionEntity } from "../../../../database/entities";
import { DELETE } from "../{id}";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("DELETE /api/users/{id}", () => assert(hasSecurity(DELETE.apiDoc, "Read")));

test("DELETE /api/user-sessions/{id} -> 200", async () => {
  const { req, res, next, manager, user } = await createMocks("Read");

  const session = await insertSession(user);

  req.params = createParams(session.id);

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 200);

  const deletedSession = await manager.findOne(UserSessionEntity, session.id);
  assert.equal(deletedSession, undefined);
});

test("DELETE /api/user-sessions/{id} -> 404", async () => {
  const { req, res, next } = await createMocks("Read");

  req.params = createParams(uuid());

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 404);
});

test("DELETE /api/user-sessions/{id} -> 403", async () => {
  const { req, res, next } = await createMocks("Read");

  const { user } = await insertUser("Read");
  const session = await insertSession(user);

  req.params = createParams(session.id);

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 403);
});
