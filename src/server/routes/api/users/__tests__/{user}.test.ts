import { getManager } from "typeorm";
import { EntityStore } from "../../../../../shared/api/response/entity";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { users } from "../../../../session/__tests__/helpers";
import { createHttpMocks } from "../../__tests__/helpers";
import { GET, PathParams } from "../{user}";

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

test("GET /api/users/{user}", async () => {
  await getManager().save(users.Read);

  const { req, res } = createHttpMocks("Read");

  const params: PathParams = {
    user: users.Read.id
  };

  req.params = params;

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});
