import { EntityStore } from "../../../../shared/api/response/get";
import { createHttpMocks, TestDatabase } from "../../../__tests__/helpers";
import { DELETE, GET } from "../user";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("GET /api/user", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  await GET(req, res, next);

  expect(res.statusCode).toBe(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[user.id]).toBeDefined();
});

test("DELETE /api/user success", async () => {
  const { req, res, next } = await createHttpMocks("Write");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);
});

test("DELETE /api/user failure", async () => {
  const { req, res, next } = await createHttpMocks("Admin");

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(403);
});
