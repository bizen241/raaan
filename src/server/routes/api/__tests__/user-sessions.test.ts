import { strict as assert } from "assert";
import uuid from "uuid/v4";
import { UserSession } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  createQuery,
  getSearchResult,
  insertSession,
  reset
} from "../../../__tests__/helpers";
import { GET } from "../user-sessions";

describe("api > user-sessions", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("400", async () => {
      const { req, res, next } = await createMocks("Read");

      req.query = createQuery<UserSession>({});

      await GET(req, res, next);
      assert.equal(res.statusCode, 400);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Read");

      req.query = createQuery<UserSession>({
        userId: uuid()
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
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
  });
});
