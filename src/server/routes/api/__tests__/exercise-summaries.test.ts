import { strict as assert } from "assert";
import { ExerciseSummary } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  createQuery,
  getSearchResult,
  hasSecurity,
  insertExercise,
  insertUser,
  reset
} from "../../../__tests__/helpers";
import { GET } from "../exercise-summaries";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/exercise-summaries", () => assert(hasSecurity(GET.apiDoc, "Guest")));

test("GET /api/exercise-summaries -> 200", async () => {
  const { req, res, next } = await createMocks("Guest");

  const { user: author } = await insertUser("Write");
  const { exerciseSummary } = await insertExercise(author);

  req.query = createQuery<ExerciseSummary>({
    authorId: author.id
  });

  await GET(req, res, next);
  assert.equal(res.statusCode, 200);

  const response = getSearchResult(res);
  assert(response.entities.ExerciseSummary[exerciseSummary.id]);
});
