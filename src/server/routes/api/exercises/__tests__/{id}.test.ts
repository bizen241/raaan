import { strict as assert } from "assert";
import uuid from "uuid/v4";
import {
  close,
  connect,
  createMocks,
  createParams,
  getFindResult,
  hasSecurity,
  insertExercise,
  reset
} from "../../../../__tests__/helpers";
import { ExerciseEntity } from "../../../../database/entities";
import { DELETE, GET, PATCH } from "../{id}";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("GET /api/exercises/{id}", () => assert(hasSecurity(GET.apiDoc, "Guest")));
test("PATCH /api/exercises/{id}", () => assert(hasSecurity(PATCH.apiDoc, "Read")));
test("DELETE /api/exercises/{id}", () => assert(hasSecurity(DELETE.apiDoc, "Read")));

test("GET /api/exercises/{id} -> 200", async () => {
  const { req, res, next, user } = await createMocks("Guest");

  const { exercise } = await insertExercise(user);

  req.params = createParams(exercise.id);

  await GET(req, res, next);
  assert.equal(res.statusCode, 200);

  const entities = getFindResult(res);
  assert(entities.Exercise[exercise.id]);
});

test("GET /api/exercises/{id} -> 404", async () => {
  const { req, res, next } = await createMocks("Guest");

  req.params = createParams(uuid());

  await GET(req, res, next);
  assert.equal(res.statusCode, 404);
});

test("DELETE /api/exercises/{id} -> 200", async () => {
  const { req, res, next, manager, user } = await createMocks("Read");

  const { exercise } = await insertExercise(user);

  req.params = createParams(exercise.id);

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 200);

  const deletedExercise = await manager.findOne(ExerciseEntity, exercise.id);
  assert.equal(deletedExercise, undefined);
});

test("DELETE /api/exercises/{id} -> 404", async () => {
  const { req, res, next } = await createMocks("Admin");

  req.params = createParams(uuid());

  await DELETE(req, res, next);
  assert.equal(res.statusCode, 404);
});
