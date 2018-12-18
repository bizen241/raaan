import { getManager } from "typeorm";
import * as uuid from "uuid";
import { TestDatabase } from "../../__tests__/helpers";
import { createUserAccount, UserAccountEntity } from "../UserAccountEntity";
import { createUser } from "../UserEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("UserAccountEntity", async () => {
  const manager = getManager();

  const account = createUserAccount({
    id: uuid(),
    user: createUser({
      name: "name",
      permission: "Write"
    }),
    accountId: "12345678",
    provider: "github"
  });

  await manager.save(account);

  const userAccounts = await manager.find(UserAccountEntity);

  expect(userAccounts.length).toBe(1);
});
