import { strict as assert } from "assert";
import uuid from "uuid/v4";
import { EntityId, UserSession } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  getSearchResult,
  insertSession,
  reset,
  setSearchParams
} from "../../../__tests__/helpers";
import { GET } from "../user-sessions";

describe("api > user-sessions", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("400", async () => {
      const { req, res, next } = await createMocks("Read");

      setSearchParams<UserSession>(req, {});

      await GET(req, res, next);
      assert.equal(res.statusCode, 400);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Read");

      setSearchParams<UserSession>(req, {
        userId: uuid() as EntityId<"User">
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
      const { req, res, next, user } = await createMocks("Read");

      const { session } = await insertSession({
        sessionUser: user
      });

      setSearchParams<UserSession>(req, {
        userId: user.id
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert(response.entities.UserSession[session.id]);
    });
  });
});
