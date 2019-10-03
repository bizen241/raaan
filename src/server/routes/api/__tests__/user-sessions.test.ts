import { strict as assert } from "assert";
import { UserSession } from "../../../../shared/api/entities";
import { SearchResponse } from "../../../../shared/api/response/search";
import { close, connect, createHttpMocks, insertSession, reset } from "../../../__tests__/helpers";
import { SearchQuery } from "../../../api/request/search/parse";
import { GET } from "../user-sessions";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/user-sessions", async () => {
  const { req, res, next, user } = await createHttpMocks("Read");
  const session = await insertSession(user);

  const query: SearchQuery<UserSession> = {
    userId: req.user.id
  };
  req.query = query;

  await GET(req, res, next);
  assert.equal(res._getStatusCode(), 200);

  const data: SearchResponse = res._getJSONData();
  assert.equal(data.ids[0], session.id);
});
