import { strict as assert } from "assert";
import { ExerciseSummary } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  getSearchResult,
  insertExercise,
  insertUser,
  reset,
  setSearchParams
} from "../../../__tests__/helpers";
import { UserEntity } from "../../../database/entities";
import { GET } from "../exercise-summaries";

describe("api > exercise-summaries", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    let author: UserEntity;

    beforeEach(async () => {
      const { user } = await insertUser({
        userPermission: "Write"
      });
      author = user;

      await insertExercise({
        exerciseAuthor: author,
        exerciseTitle: "correct title",
        exerciseTags: ["correct"]
      });
    });

    test("200 > authorId", async () => {
      const { req, res, next } = await createMocks("Guest");

      setSearchParams<ExerciseSummary>(req, {
        authorId: author.id
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });

    test("200 > authorId", async () => {
      const { req, res, next } = await createMocks("Guest");

      const { user } = await insertUser();

      setSearchParams<ExerciseSummary>(req, {
        authorId: user.id
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 0);
    });

    test("200 > tags", async () => {
      const { req, res, next } = await createMocks("Guest");

      setSearchParams<ExerciseSummary>(req, {
        tags: "correct"
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });

    test("200 > tags", async () => {
      const { req, res, next } = await createMocks("Guest");

      setSearchParams<ExerciseSummary>(req, {
        tags: "wrong"
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 0);
    });

    test("200 > title", async () => {
      const { req, res, next } = await createMocks("Guest");

      setSearchParams<ExerciseSummary>(req, {
        title: "correct"
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });

    test("200 > title", async () => {
      const { req, res, next } = await createMocks("Guest");

      setSearchParams<ExerciseSummary>(req, {
        title: "wrong"
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 0);
    });

    test("200 > isEditing", async () => {
      const { req, res, next, user } = await createMocks("Write");

      await insertExercise({
        exerciseAuthor: user,
        exerciseIsMerged: false
      });

      setSearchParams<ExerciseSummary>(req, {
        authorId: user.id,
        isEditing: true
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });
  });
});
