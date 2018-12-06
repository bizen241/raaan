import { getManager } from "typeorm";
import * as uuid from "uuid";
import { TestDatabase } from "../../__tests__/helpers";
import { createUser } from "../UserEntity";
import { createUserSession, UserSessionEntity } from "../UserSessionEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("UserSessionEntity", async () => {
  const manager = getManager();

  const session = createUserSession({
    id: uuid(),
    user: createUser({
      name: "name",
      permission: "Read"
    }),
    sessionId: uuid(),
    userAgent: "userAgent",
    expireAt: new Date()
  });

  await manager.save(session);

  const userSessions = await manager.find(UserSessionEntity);

  expect(userSessions.length).toBe(1);
});
