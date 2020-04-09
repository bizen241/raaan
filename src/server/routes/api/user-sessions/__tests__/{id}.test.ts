import { strict as assert } from "assert";
import { v4 as uuid } from "uuid";
import { UserSessionEntity } from "../../../../database/entities";
import {
  close,
  connect,
  createMocks,
  insertSession,
  insertUser,
  reset,
  setDeleteParams
} from "../../../../__tests__/helpers";
import { DELETE } from "../{id}";

describe("api > user-sessions > {id}", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("DELETE", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Read");

      setDeleteParams(req, uuid());

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Read");

      const { user } = await insertUser({
        userPermission: "Read"
      });
      const { session } = await insertSession({
        sessionUser: user
      });

      setDeleteParams(req, session.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200 > another session", async () => {
      const { req, res, next, manager, user } = await createMocks("Read");

      const { session } = await insertSession({
        sessionUser: user
      });

      setDeleteParams(req, session.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 200);

      assert.equal(res.getHeader("Clear-Site-Data"), undefined);

      const deletedSession = await manager.findOne(UserSessionEntity, session.id);
      assert.equal(deletedSession, undefined);
    });

    test("200 > current session", async () => {
      const { req, res, next, manager, session } = await createMocks("Read");

      setDeleteParams(req, session.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 200);

      assert.equal(res.getHeader("Clear-Site-Data"), `"cache", "cookies", "storage", "executionContexts"`);

      const deletedSession = await manager.findOne(UserSessionEntity, session.id);
      assert.equal(deletedSession, undefined);
    });
  });
});
