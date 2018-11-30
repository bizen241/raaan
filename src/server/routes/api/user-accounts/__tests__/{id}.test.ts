import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/entity";
import { PathParams } from "../../../../api/operation";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { createUserAccount } from "../../../../database/entities";
import { users } from "../../../../session/__tests__/helpers";
import { createHttpMocks } from "../../__tests__/helpers";
import { GET } from "../{id}";

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

test("GET /api/user-accounts/{user-account}", async () => {
  const userAccountId = uuid();

  await getManager().save(users.Read);
  await getManager().save(
    createUserAccount({
      id: userAccountId,
      user: users.Read,
      accountId: "",
      provider: "github"
    })
  );

  const { req, res } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: userAccountId
  };

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});
