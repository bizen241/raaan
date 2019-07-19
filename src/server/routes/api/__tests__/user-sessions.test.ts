import { strict as assert } from "assert";
import { UserSession } from "../../../../shared/api/entities";
import { SearchResponse } from "../../../../shared/api/response/search";
import { createHttpMocks, insertSession, insertUser, TestDatabase } from "../../../__tests__/helpers";
import { SearchQuery } from "../../../api/request/search/parse";
import { GET } from "../user-sessions";

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

test("GET /api/user-sessions", async () => {
  const { user } = await insertUser("Read");
  await insertSession(user);

  const { req, res } = await createHttpMocks("Read");

  const query: SearchQuery<UserSession> = {
    userId: req.user.id
  };

  req.query = query;

  await GET(req, res, () => null);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  assert(data.ids);
});
