import { getManager } from "typeorm";
import { TestDatabase } from "../../__tests__/helpers";
import { AccountEntity, createAccount } from "../AccountEntity";
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

test("accounts", async () => {
  const accountRepository = getManager().getRepository(AccountEntity);
  const account = createAccount({
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
