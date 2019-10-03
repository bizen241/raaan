import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { close, connect, insertSession, insertUser, reset } from "../../../__tests__/helpers";
import { UserSessionEntity } from "../UserSessionEntity";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("UserSessionEntity", async () => {
  const { user } = await insertUser("Write");

  await insertSession(user);

  const userSessions = await getManager().find(UserSessionEntity);
  assert.equal(userSessions.length, 1);
});
