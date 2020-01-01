import { strict as assert } from "assert";
import {
  close,
  connect,
  createMocks,
  createParams,
  getFindResult,
  hasSecurity,
  reset
} from "../../../../__tests__/helpers";
import { GET } from "../{id}";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/users/{id}", () => assert(hasSecurity(GET.apiDoc, "Guest")));

test("GET /api/users/{id} -> 200", async () => {
  const { req, res, next, user } = await createMocks("Read");

  req.params = createParams(user.id);

  await GET(req, res, next);
  assert.equal(res.statusCode, 200);

  const entities = getFindResult(res);
  assert(entities.User[user.id]);
});

test("GET /api/users/{id} -> 404", async () => {
  const { req, res, next, manager, user } = await createMocks("Read");

  req.params = createParams(user.id);

  await manager.remove(user);

  await GET(req, res, next);
  assert.equal(res._getStatusCode(), 404);
});
