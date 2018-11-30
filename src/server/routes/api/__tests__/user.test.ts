import { EntityStore } from "../../../../shared/api/response/entity";
import { TestDatabase } from "../../../database/__tests__/helpers";
import { users } from "../../../session/__tests__/helpers";
import { DELETE, GET } from "../user";
import { createHttpMocks } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("GET /api/user", async () => {
  const { req, res, next } = createHttpMocks("Read");

  await GET(req, res, next);

  expect(res.statusCode).toBe(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});

test("DELETE /api/user success", async () => {
  const { req, res, next } = createHttpMocks("Read");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);
});

test("DELETE /api/user failure", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});
