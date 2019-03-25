import { getManager } from "typeorm";
import { users } from "../../../session/__tests__/helpers";
import { TestDatabase } from "../../__tests__/helpers";
import { UserAccountEntity } from "../UserAccountEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("UserAccountEntity", async () => {
  const manager = getManager();

  const account = new UserAccountEntity(users.Write, "github", "");

  await manager.save(account);

  const userAccounts = await manager.find(UserAccountEntity);

  expect(userAccounts.length).toBe(1);
});
