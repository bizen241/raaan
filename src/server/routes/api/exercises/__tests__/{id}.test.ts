import { strict as assert } from "assert";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { EntityStore } from "../../../../../shared/api/response/get";
import { createHttpMocks, insertExercise, TestDatabase } from "../../../../__tests__/helpers";
import { PathParams } from "../../../../api/operation";
import { ExerciseEntity } from "../../../../database/entities";
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
});

test("GET /api/contents/{id} -> 404", async () => {
  const { req, res, next } = await createHttpMocks("Guest");

  (req.params as PathParams) = {
    id: uuid()
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("GET /api/contents/{id} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Guest");

  const { exercise } = await insertExercise(user);

  (req.params as PathParams) = {
    id: exercise.id
  };

  await GET(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;
  assert(data.Exercise[exercise.id]);
});

test("DELETE /api/contents/{id} -> 404", async () => {
  const { req, res, next } = await createHttpMocks("Admin");

  (req.params as PathParams) = {
    id: uuid()
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 404);
});

test("DELETE /api/contents/{id} -> 200", async () => {
  const { req, res, next, user } = await createHttpMocks("Write");

  const { exercise } = await insertExercise(user);

  (req.params as PathParams) = {
    id: exercise.id
  };

  await DELETE(req, res, next);

  assert.equal(res._getStatusCode(), 200);

  const data = JSON.parse(res._getData()) as EntityStore;
  assert.equal(data.Exercise[exercise.id], undefined);

  const removedExercise = await getManager().findOne(ExerciseEntity, exercise.id);
  assert.equal(removedExercise, undefined);
});
