import { strict as assert } from "assert";
import { v4 as uuid } from "uuid";
import { ExerciseEntity } from "../../../../database/entities";
import {
  close,
  connect,
  createMocks,
  getFindResult,
  insertExercise,
  reset,
  setDeleteParams,
  setGetParams,
  setPatchParams
} from "../../../../__tests__/helpers";
import { DELETE, GET, PATCH } from "../{id}";

describe("api > exercises > {id}", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Guest");

      setGetParams(req, uuid());

      await GET(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Guest");

      const { exercise } = await insertExercise({
        exerciseIsPrivate: true
      });

      setGetParams(req, exercise.id);

      await GET(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
      const { req, res, next, user } = await createMocks("Guest");

      const { exercise } = await insertExercise({
        exerciseAuthor: user
      });

      setGetParams(req, exercise.id);

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const entities = getFindResult(res);
      assert(entities.Exercise[exercise.id]);
    });
  });

  describe("PATCH", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Guest");

      setPatchParams(req, uuid(), {});

      await PATCH(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Guest");

      const { exercise } = await insertExercise();

      setPatchParams(req, exercise.id, {});

      await PATCH(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200 > by author", async () => {
      const { req, res, next, user } = await createMocks("Read");

      const { exercise } = await insertExercise({
        exerciseAuthor: user
      });

      setPatchParams(req, exercise.id, {
        isPrivate: false
      });

      await PATCH(req, res, next);
      assert.equal(res.statusCode, 200);
    });

    test("200 > by admin", async () => {
      const { req, res, next } = await createMocks("Admin");

      const { exercise } = await insertExercise();

      setPatchParams(req, exercise.id, {
        isLocked: true
      });

      await PATCH(req, res, next);
      assert.equal(res.statusCode, 200);
    });
  });

  describe("DELETE", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Read");

      setDeleteParams(req, uuid());

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Read");

      const { exercise } = await insertExercise();

      setDeleteParams(req, exercise.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
      const { req, res, next, manager, user } = await createMocks("Read");

      const { exercise } = await insertExercise({
        exerciseAuthor: user
      });

      setDeleteParams(req, exercise.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 200);

      const deletedExercise = await manager.findOne(ExerciseEntity, exercise.id);
      assert.equal(deletedExercise, undefined);
    });
  });
});
