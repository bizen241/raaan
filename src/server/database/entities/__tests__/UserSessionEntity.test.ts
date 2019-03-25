import { getManager } from "typeorm";
import * as uuid from "uuid/v4";
import { users } from "../../../session/__tests__/helpers";
import { TestDatabase } from "../../__tests__/helpers";
import { UserSessionEntity } from "../UserSessionEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("UserSessionEntity", async () => {
  const manager = getManager();

  const session = new UserSessionEntity(users.Guest);
  session.sessionId = uuid();
  session.userAgent = "";
  session.expireAt = new Date();

  await manager.save(session);

  const userSessions = await manager.find(UserSessionEntity);

  expect(userSessions.length).toBe(1);
});
