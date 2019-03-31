import { getManager } from "typeorm";
import { TestDatabase } from "../../../__tests__/helpers";
import { UserAccountEntity } from "../UserAccountEntity";
import { UserConfigEntity } from "../UserConfigEntity";
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

  const userAccount = new UserAccountEntity("github", "", "");
  const userConfig = new UserConfigEntity();
  const user = new UserEntity("name", "Admin", userAccount, userConfig);

  await manager.save(user);

  const users = await manager.find(UserEntity);

  expect(users.length).toBe(1);
});
