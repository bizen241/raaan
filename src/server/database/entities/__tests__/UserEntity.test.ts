import { getManager } from "typeorm";
import { insertUser, TestDatabase } from "../../../__tests__/helpers";
import { UserEntity } from "../UserEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("UserEntity", async () => {
  const manager = getManager();

  await insertUser("Write");

  const users = await manager.find(UserEntity);

  expect(users.length).toBe(1);
});
