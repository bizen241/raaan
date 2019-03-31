import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, insertUsers, TestDatabase, users } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { UserAccountEntity } from "../../../../database/entities";
import { GET } from "../{id}";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

const writeUserAccounts = [new UserAccountEntity("github", "1", ""), new UserAccountEntity("github", "2", "")];
const adminUserAccounts = [new UserAccountEntity("github", "0", "")];

const insertUserAccounts = () => getManager().save([...writeUserAccounts, ...adminUserAccounts]);

beforeEach(async () => {
  await testDatabase.reset();

  await insertUsers();
  await insertUserAccounts();
});

test("GET /api/user-accounts/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("GET /api/user-accounts/{id} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: adminUserAccounts[0].id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("GET /api/user-accounts/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: writeUserAccounts[0].id
  };

  await GET(req, res, next);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.UserAccount[writeUserAccounts[0].id]).toBeDefined();
  expect(data.User[users.Write.id]).toBeDefined();
});
