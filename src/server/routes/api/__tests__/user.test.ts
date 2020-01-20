import { strict as assert } from "assert";
import { close, connect, createMocks, getFindResult, reset } from "../../../__tests__/helpers";
import { DELETE, GET } from "../user";

describe("api > user", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("500", async () => {
      const { req, res, next, manager, user } = await createMocks("Read");

      await manager.remove(user);

      await GET(req, res, next);
      assert.equal(res.statusCode, 500);
    });

    test("200", async () => {
      const { req, res, next, user, config } = await createMocks("Read");

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const entities = getFindResult(res);
      assert(entities.User[user.id]);
      assert(entities.UserConfig[config.id]);
    });
  });

  describe("DELETE", () => {
    test("403", async () => {
      const { req, res, next } = await createMocks("Owner");

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
      const { req, res, next } = await createMocks("Read");

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 200);
    });
  });
});
