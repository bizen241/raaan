import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/entity";
import { PathParams } from "../../../../api/operation";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { createUserAccount } from "../../../../database/entities";
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

const readUserAccounts = [
  createUserAccount({
    id: uuid(),
    user: users.Read,
    accountId: "11111111",
    provider: "github"
  }),
  createUserAccount({
    id: uuid(),
    user: users.Read,
    accountId: "22222222",
    provider: "github"
  })
];

const writeUserAccounts = [
  createUserAccount({
    id: uuid(),
    user: users.Write,
    accountId: "11111111",
    provider: "github"
  })
];

const insertUserAccounts = () => getManager().save([...readUserAccounts, ...writeUserAccounts]);

beforeEach(async () => {
  await testDatabase.reset();

  await insertUsers();
  await insertUserAccounts();
});

test("GET /api/user-accounts/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("GET /api/user-accounts/{id} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: readUserAccounts[0].id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("GET /api/user-accounts/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: readUserAccounts[0].id
  };

  await GET(req, res, next);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.UserAccount[readUserAccounts[0].id]).toBeDefined();
  expect(data.User[users.Read.id]).toBeDefined();
});

test("DELETE /api/user-accounts/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/user-accounts/{id} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: writeUserAccounts[0].id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("DELETE /api/user-accounts/{id} -> 405", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: readUserAccounts[0].id
  };

  await getManager().remove(readUserAccounts[1]);

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(405);
});

test("DELETE /api/user-accounts/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Read");

  (req.params as PathParams) = {
    id: readUserAccounts[0].id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);
});
