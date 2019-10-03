import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { close, connect, insertUser, reset } from "../../../__tests__/helpers";
import { UserAccountEntity } from "../UserAccountEntity";
import { UserConfigEntity } from "../UserConfigEntity";
import { UserEntity } from "../UserEntity";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("UserEntity", async () => {
  await insertUser("Write");

  const users = await getManager().find(UserEntity);
  assert.equal(users.length, 1);

  const userAccounts = await getManager().find(UserAccountEntity);
  assert.equal(userAccounts.length, 1);

  const userConfigs = await getManager().find(UserConfigEntity);
  assert.equal(userConfigs.length, 1);
});
