import { getManager } from "typeorm";
import { UserAccount } from "../../../../shared/api/entities";
import { SearchResponse } from "../../../../shared/api/response/search";
import { SearchQuery } from "../../../api/request/search";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { createUserAccount } from "../../../database/entities";
import { users } from "../../../session/__tests__/helpers";
import { GET } from "../user-accounts";
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

test("GET /api/user-accounts", async () => {
  await getManager().save(users.Read);
  await getManager().save(
    createUserAccount({
      user: users.Read,
      accountId: "",
      provider: "github"
    })
  );

  const { req, res } = createHttpMocks("Read");

  const query: SearchQuery<UserAccount> = {
    userId: req.session.user.id
  };

  req.query = query;

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as SearchResponse;
  expect(data.ids).toBeDefined();
});
