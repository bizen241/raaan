import { getManager } from "typeorm";
import { UserSession } from "../../../../shared/api/entities";
import { SearchResponse } from "../../../../shared/api/response/search";
import { SearchQuery } from "../../../api/request/search/parse";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { sessions, users } from "../../../session/__tests__/helpers";
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
});

test("GET /api/user-sessions", async () => {
  await getManager().save(users.Write);
  await getManager().save(sessions.Write);

  const { req, res } = createHttpMocks("Write");

  const query: SearchQuery<UserSession> = {
    userId: req.user.id
  };

  req.query = query;

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  expect(data.ids).toBeDefined();
});
