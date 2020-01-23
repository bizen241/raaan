import { strict as assert } from "assert";
import { Contest } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  getFindResult,
  getSearchResult,
  insertContest,
  insertExercise,
  insertGroupMember,
  reset,
  setPostParams,
  setSearchParams
} from "../../../__tests__/helpers";
import { GET, POST } from "../contests";

describe("api > contests", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("403", async () => {
      const { req, res, next } = await createMocks("Read");

      await GET(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
      const { req, res, next, user } = await createMocks("Read");

      const { group } = await insertGroupMember({
        groupMemberUser: user,
        groupMemberPermission: "read"
      });
      const { contest } = await insertContest({
        contestGroup: group
      });

      setSearchParams<Contest>(req, {
        groupId: group.id
      });

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert(response.entities.Contest[contest.id]);
    });
  });

  describe("POST", () => {
    test("400", async () => {
      const { req, res, next } = await createMocks("Read");

      await POST(req, res, next);
      assert.equal(res.statusCode, 400);
    });

    test("403", async () => {
      const { req, res, next, user, manager } = await createMocks("Read");

      const { group, groupMember } = await insertGroupMember({
        groupMemberUser: user,
        groupMemberPermission: "write"
      });
      const { exercise } = await insertExercise();

      await manager.remove(groupMember);

      setPostParams<Contest>(req, {
        groupId: group.id,
        exerciseId: exercise.id,
        startAt: Date.now(),
        finishAt: Date.now() + 1000 * 60 * 60
      });

      await POST(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("400", async () => {
      const { req, res, next, user, manager } = await createMocks("Read");

      const { group } = await insertGroupMember({
        groupMemberUser: user,
        groupMemberPermission: "write"
      });
      const { exercise } = await insertExercise();

      await manager.remove(exercise);

      setPostParams<Contest>(req, {
        groupId: group.id,
        exerciseId: exercise.id,
        startAt: Date.now(),
        finishAt: Date.now() + 1000 * 60 * 60
      });

      await POST(req, res, next);
      assert.equal(res.statusCode, 400);
    });

    test("200", async () => {
      const { req, res, next, user } = await createMocks("Write");

      const { group } = await insertGroupMember({
        groupMemberUser: user,
        groupMemberPermission: "write"
      });
      const { exercise } = await insertExercise();

      setPostParams<Contest>(req, {
        groupId: group.id,
        exerciseId: exercise.id,
        startAt: Date.now(),
        finishAt: Date.now() + 1000 * 60 * 60
      });

      await POST(req, res, next);
      assert.equal(res.statusCode, 200);

      const entities = getFindResult(res);
      assert.equal(Object.entries(entities.Contest).length, 1);
    });
  });
});
