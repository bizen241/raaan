import { getManager } from "typeorm";
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

beforeEach(async () => {
  await testDatabase.reset();
});

test("UserAccount", async () => {
  const accountRepository = getManager().getRepository(UserAccountEntity);
  const account = createUserAccount({
    user: createUser({
      name: "name",
      permission: "Read"
    }),
    accountId: "12345678",
    provider: "github"
  });
  await accountRepository.save(account);

  const accounts = await accountRepository.find();

  expect(accounts.length).toBe(1);
});
