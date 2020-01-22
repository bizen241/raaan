import { strict as assert } from "assert";
import uuid from "uuid/v4";
import {
  close,
  connect,
  createMocks,
  createParams,
  getFindResult,
  insertExercise,
  reset
} from "../../../../__tests__/helpers";
import { ExerciseEntity } from "../../../../database/entities";
import { DELETE, GET } from "../{id}";

describe("api > exercises > {id}", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Guest");

      req.params = createParams(uuid());

      await GET(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("200", async () => {
      const { req, res, next, user } = await createMocks("Guest");

      const { exercise } = await insertExercise({
        exerciseAuthor: user
      });

      req.params = createParams(exercise.id);

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const entities = getFindResult(res);
      assert(entities.Exercise[exercise.id]);
    });
  });

  describe("DELETE", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Read");

      req.params = createParams(uuid());

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("200", async () => {
      const { req, res, next, manager, user } = await createMocks("Read");

      const { exercise } = await insertExercise({
        exerciseAuthor: user
      });

      req.params = createParams(exercise.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 200);

      const deletedExercise = await manager.findOne(ExerciseEntity, exercise.id);
      assert.equal(deletedExercise, undefined);
    });
  });
});
