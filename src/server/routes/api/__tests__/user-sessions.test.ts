import { SearchResult } from "../../../../shared/api/response/search";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { insertSessions } from "../../../session/__tests__/helpers";
import { GET } from "../user-sessions";
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

  await insertSessions();
});

test("GET /api/user-sessions", async () => {
  const { req, res } = createHttpMocks("Read");

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResult;
  expect(data.ids).toBeDefined();
});
