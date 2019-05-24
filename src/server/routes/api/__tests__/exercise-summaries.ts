import { strict as assert } from "assert";
import { SearchResponse } from "../../../../shared/api/response/search";
import { createHttpMocks, insertExercise, TestDatabase } from "../../../__tests__/helpers";
import { GET } from "../exercise-summaries";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();
});

test("GET /api/exercise-summaries", async () => {
  const { req, res, next, user } = await createHttpMocks("Guest");
  const { exerciseSummary } = await insertExercise(user);

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  assert.equal(data.ids[0], exerciseSummary.id);
});
