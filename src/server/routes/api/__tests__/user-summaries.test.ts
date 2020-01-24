import { strict as assert } from "assert";
import { UserSummary } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  getSearchResult,
  insertUser,
  reset,
  setSearchParams
} from "../../../__tests__/helpers";
import { GET } from "../user-summaries";

describe("api > user-summaries", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("200", async () => {
      const { req, res, next } = await createMocks("Guest");

      await insertUser();

      setSearchParams<UserSummary>(req, {});

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });
  });
});
