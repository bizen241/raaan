import { strict as assert } from "assert";
import uuid from "uuid/v4";
import {
  close,
  connect,
  createMocks,
  createParams,
  insertSession,
  insertUser,
  reset
} from "../../../../__tests__/helpers";
import { UserSessionEntity } from "../../../../database/entities";
import { DELETE } from "../{id}";

describe("api > user-sessions > {id}", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("DELETE", () => {
    test("404", async () => {
      const { req, res, next } = await createMocks("Read");

      req.params = createParams(uuid());

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 404);
    });

    test("403", async () => {
      const { req, res, next } = await createMocks("Read");

      const { user } = await insertUser({
        userPermission: "Read"
      });
      const session = await insertSession({
        sessionUser: user
      });

      req.params = createParams(session.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 403);
    });

    test("200", async () => {
      const { req, res, next, manager, user } = await createMocks("Read");

      const session = await insertSession({
        sessionUser: user
      });

      req.params = createParams(session.id);

      await DELETE(req, res, next);
      assert.equal(res.statusCode, 200);

      const deletedSession = await manager.findOne(UserSessionEntity, session.id);
      assert.equal(deletedSession, undefined);
    });
  });
});
