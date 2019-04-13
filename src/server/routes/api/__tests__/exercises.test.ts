import { SearchResponse } from "../../../../shared/api/response/search";
import { createHttpMocks, insertExercise, TestDatabase } from "../../../__tests__/helpers";
import { GET } from "../exercises";

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

test("GET /api/exercises", async () => {
  const { req, res, next, user } = await createHttpMocks("Guest");

  const { exercise } = await insertExercise(user);

  await GET(req, res, next);

  const data = JSON.parse(res._getData()) as SearchResponse;

  expect(res.statusCode).toEqual(200);
  expect(data.ids[0]).toEqual(exercise.id);
});
