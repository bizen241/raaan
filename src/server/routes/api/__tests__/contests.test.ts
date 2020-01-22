import { strict as assert } from "assert";
import { Contest } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  createQuery,
  getSearchResult,
  insertContest,
  reset
} from "../../../__tests__/helpers";
import { GET } from "../contests";

describe("api > contests", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("200", async () => {
      const { req, res, next } = await createMocks("Read");

      const contest = await insertContest();

      req.query = createQuery<Contest>({});

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert(response.entities.Contest[contest.id]);
    });
  });
});
