import { strict as assert } from "assert";
import { SearchResponse } from "../../../../shared/api/response/search";
import { createHttpMocks, TestDatabase } from "../../../__tests__/helpers";
import { GET } from "../users";

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

test("GET /api/users", async () => {
  const { req, res } = await createHttpMocks("Guest");

  await GET(req, res, () => null);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  assert(data.ids);
});
