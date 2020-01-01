import { strict as assert } from "assert";
import { close, connect, createMocks, getFindResult, hasSecurity, reset } from "../../../__tests__/helpers";
import { DELETE, GET } from "../user";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/user", () => assert(hasSecurity(GET.apiDoc, "Read")));
test("DELETE /api/user", () => assert(hasSecurity(DELETE.apiDoc, "Read")));

test("GET /api/user -> 200", async () => {
  const { req, res, next, user, config } = await createMocks("Read");

  await GET(req, res, next);
  assert.equal(res.statusCode, 200);

  const entities = getFindResult(res);
  assert(entities.User[user.id]);
  assert(entities.UserConfig[config.id]);
});

test("GET /api/user -> 500", async () => {
  const { req, res, next, manager, user } = await createMocks("Read");

  await manager.remove(user);

  await GET(req, res, next);
  assert.equal(res.statusCode, 500);
});

test("DELETE /api/user -> 200", async () => {
  const { req, res, next } = await createMocks("Read");

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 200);
});

test("DELETE /api/user -> 403", async () => {
  const { req, res, next } = await createMocks("Owner");

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 403);
});
