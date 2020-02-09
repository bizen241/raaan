import { strict as assert } from "assert";
import { ExerciseCommentSummary } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  getSearchResult,
  insertExerciseComment,
  reset,
  setSearchParams
} from "../../../__tests__/helpers";
import { GET } from "../exercise-comment-summaries";

describe("api > exercise-comment-summaries", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("200", async () => {
      const { req, res, next } = await createMocks("Guest");

      await insertExerciseComment();

      setSearchParams<ExerciseCommentSummary>(req, {});

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });
  });
});
