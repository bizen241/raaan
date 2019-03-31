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

test("GET /api/contents", async () => {
  await insertExercise();

  const { req, res } = createHttpMocks("Guest");

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  expect(data.ids).toBeDefined();
});
