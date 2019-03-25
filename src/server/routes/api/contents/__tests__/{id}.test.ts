import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import { PathParams } from "../../../../api/operation";
import { TestDatabase } from "../../../../database/__tests__/helpers";
import { ExerciseEntity } from "../../../../database/entities";
import { insertExercise } from "../../../../database/entities/__tests__/helpers";
import { insertSessions, insertUsers } from "../../../../session/__tests__/helpers";
import { createHttpMocks } from "../../__tests__/helpers";
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

test("GET /api/contents/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Guest");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("GET /api/contents/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Guest");

  const contentId = uuid();
  await insertExercise(contentId);

  (req.params as PathParams) = {
    id: contentId
  };

  await GET(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.Exercise[contentId]).toBeDefined();
});

test("DELETE /api/contents/{id} -> 404", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(404);
});

test("DELETE /api/contents/{id} -> 200", async () => {
  const { req, res, next } = createHttpMocks("Admin");

  const contentId = uuid();
  await insertExercise(contentId);

  (req.params as PathParams) = {
    id: contentId
  };

  await DELETE(req, res, next);

  expect(res._getStatusCode()).toEqual(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.Exercise[contentId]).toBeUndefined();

  const removedExercise = await getManager().findOne(ExerciseEntity, contentId);
  expect(removedExercise).toBeUndefined();
});
