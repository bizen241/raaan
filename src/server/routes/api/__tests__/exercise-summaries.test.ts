import { strict as assert } from "assert";
import { SearchResponse } from "../../../../shared/api/response/search";
import { close, connect, createHttpMocks, insertExercise, reset } from "../../../__tests__/helpers";
import { GET } from "../exercise-summaries";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/exercise-summaries", async () => {
  const { req, res, next, user } = await createHttpMocks("Guest");
  await insertExercise(user);

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  assert.equal(data.ids[0], undefined);
});
