import { strict as assert } from "assert";
import { close, connect, createMocks, createParams, getFindResult, reset } from "../../../../__tests__/helpers";
import { GET } from "../{id}";

describe("api > users > {id}", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("404", async () => {
      const { req, res, next, manager, user } = await createMocks("Read");

      req.params = createParams(user.id);

      await manager.remove(user);

      await GET(req, res, next);
      assert.equal(res._getStatusCode(), 404);
    });

    test("200", async () => {
      const { req, res, next, user } = await createMocks("Read");

      req.params = createParams(user.id);

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const entities = getFindResult(res);
      assert(entities.User[user.id]);
    });
  });
});
