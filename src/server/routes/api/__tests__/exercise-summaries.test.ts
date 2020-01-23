import { strict as assert } from "assert";
import { ExerciseSummary } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  getSearchResult,
  insertExercise,
  insertUser,
  reset,
  setSearchParams
} from "../../../__tests__/helpers";
import { GET } from "../exercise-summaries";

describe("api > exercise-summaries", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("200", async () => {
      const { req, res, next } = await createMocks("Guest");

      const { user: author } = await insertUser({
        userPermission: "Write"
      });
      const { exerciseSummary } = await insertExercise({
        exerciseAuthor: author,
        exerciseTitle: "test",
        exerciseTags: ["test"]
      });

      setSearchParams<ExerciseSummary>(req, {
        authorId: author.id
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert(response.entities.ExerciseSummary[exerciseSummary.id]);
    });
  });
});
