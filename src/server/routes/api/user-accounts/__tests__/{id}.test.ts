import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import { PathParams } from "../../../../api/operation";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { UserAccountEntity } from "../../../../database/entities";
import { insertUsers, users } from "../../../../session/__tests__/helpers";
import { createHttpMocks } from "../../__tests__/helpers";
import { DELETE, GET } from "../{id}";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

const writeUserAccounts = [
  new UserAccountEntity(users.Write, "github", "11111111"),
  new UserAccountEntity(users.Write, "github", "22222222")
];

const adminUserAccounts = [new UserAccountEntity(users.Admin, "github", "11111111")];

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

test("DELETE /api/user-accounts/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/user-accounts/{id} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: adminUserAccounts[0].id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("DELETE /api/user-accounts/{id} -> 405", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: writeUserAccounts[0].id
  };

  await getManager().remove(writeUserAccounts[1]);

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(405);
});

test("DELETE /api/user-accounts/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: writeUserAccounts[0].id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);
});
