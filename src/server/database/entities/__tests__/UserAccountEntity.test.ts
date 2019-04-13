import { getManager } from "typeorm";
import * as uuid from "uuid/v4";
import { TestDatabase } from "../../../__tests__/helpers";
import { UserAccountEntity } from "../UserAccountEntity";
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

  const user = new UserEntity("name", "Write");
  await manager.save(user);

  const account = new UserAccountEntity(user, "github", uuid(), uuid());
  await manager.save(account);

  const userAccounts = await manager.find(UserAccountEntity);

  expect(userAccounts.length).toBe(1);
});
