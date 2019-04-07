import { getManager } from "typeorm";
import { insertSession, insertUser, TestDatabase } from "../../../__tests__/helpers";
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

  const { user } = await insertUser("Write");

  await insertSession(user);

  const userSessions = await manager.find(UserSessionEntity);

  expect(userSessions.length).toBe(1);
});
