import { getManager } from "typeorm";
import * as uuid from "uuid/v4";
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

test("UserAccountEntity", async () => {
  const manager = getManager();

  const account = new UserAccountEntity("github", uuid(), uuid());
  const config = new UserConfigEntity();
  const user = new UserEntity(account, config, "name", "Write");

  await manager.save(user);

  const userAccounts = await manager.find(UserAccountEntity);

  expect(userAccounts.length).toBe(1);
});
