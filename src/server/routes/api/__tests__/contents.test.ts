import { SearchResult } from "../../../../shared/api/response/search";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { insertContent } from "../../../database/entities/__tests__/helpers";
import { GET } from "../contents";
import { createHttpMocks } from "./helpers";

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
  await insertContent();

  const { req, res } = createHttpMocks("Guest");

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResult;
  expect(data.ids).toBeDefined();
});
