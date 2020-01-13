import { strict as assert } from "assert";
import uuid from "uuid/v4";
import { UserSession } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  createQuery,
  getSearchResult,
  hasSecurity,
  insertSession,
  reset
} from "../../../__tests__/helpers";
import { GET } from "../user-sessions";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/user-sessions", () => assert(hasSecurity(GET.apiDoc, "Read")));

test("GET /api/user-sessions -> 200", async () => {
  const { req, res, next, user } = await createMocks("Read");

  const session = await insertSession(user);

  req.query = createQuery<UserSession>({
    userId: user.id
  });

  await GET(req, res, next);
  assert.equal(res.statusCode, 200);

  const response = getSearchResult(res);
  assert(response.entities.UserSession[session.id]);
});

test("GET /api/user-sessions -> 400", async () => {
  const { req, res, next } = await createMocks("Read");

  req.query = createQuery<UserSession>({});

  await GET(req, res, next);
  assert.equal(res.statusCode, 400);
});

test("GET /api/user-sessions -> 403", async () => {
  const { req, res, next } = await createMocks("Read");

  req.query = createQuery<UserSession>({
    userId: uuid()
  });

  await GET(req, res, next);
  assert.equal(res.statusCode, 403);
});
