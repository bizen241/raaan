import { getManager } from "typeorm";
import * as uuid from "uuid";
import { TestDatabase } from "../../__tests__/helpers";
import { createUser, UserEntity } from "../UserEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("UserEntity", async () => {
  const manager = getManager();

  const user = createUser({ id: uuid(), name: "name", permission: "Admin" });

  await manager.save(user);

  const users = await manager.find(UserEntity);

  expect(users.length).toBe(1);
});
