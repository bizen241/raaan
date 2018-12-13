import { ContentBranch } from "../../../../shared/api/entities";
import { SearchResult } from "../../../../shared/api/response/search";
import { SearchQuery } from "../../../api/request/search";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { GET } from "../content-branches";
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

test("GET /api/content-branches", async () => {
  const { req, res } = createHttpMocks("Guest");

  const query: SearchQuery<ContentBranch> = {
    lang: "ja"
  };

  req.query = query;

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResult;
  expect(data.ids).toBeDefined();
});
