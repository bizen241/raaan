import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import {
  createHttpMocks,
  insertSessions,
  insertUsers,
  sessions,
  TestDatabase,
  users
} from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { DELETE, GET } from "../{id}";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();

  await insertUsers();
  await insertSessions();
});

test("GET /api/user-sessions/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("GET /api/user-sessions/{id} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: sessions.Admin.id
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("GET /api/user-sessions/{id} -> 200", async () => {
  await getManager().save(users.Write);
  await getManager().save(sessions.Write);

  const { req, res } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: sessions.Write.id
  };

  await GET(req, res, () => null);

  expect(res.statusCode).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Write.id]).toBeDefined();
});

test("DELETE /api/user-sessions/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/user-sessions/{id} -> 403", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: sessions.Admin.id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});

test("DELETE /api/user-sessions/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Write");

  (req.params as PathParams) = {
    id: sessions.Write.id
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);
});
