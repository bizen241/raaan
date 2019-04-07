import { getManager } from "typeorm";
import { AuthProviderName } from "../../shared/auth";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../database/entities";

interface AuthParams {
  provider: AuthProviderName;
  accountId: string;
  name: string;
  email: string;
}

export const saveUser = async (sessionUser: UserEntity | undefined, params: AuthParams) => {
  const { provider, accountId, email } = params;

  const manager = getManager();

  const account = await manager.findOne(
    UserAccountEntity,
    {
      provider,
      accountId
    },
    {
      relations: ["user"]
    }
  );

  if (account !== undefined) {
    if (account.user === undefined) {
      throw new Error();
    }

    if (account.email !== email) {
      account.email = email;

      await manager.save(account);
    }

    return account.user;
  }

  if (sessionUser === undefined) {
    return createUser(params);
  } else {
    return updateUser(sessionUser, params);
  }
};

const updateUser = async (user: UserEntity, { provider, accountId, email }: AuthParams) => {
  const manager = getManager();

  const account = await manager.findOne(UserAccountEntity, {
    user
  });
  if (account === undefined) {
    throw new Error();
  }

  account.provider = provider;
  account.accountId = accountId;
  account.email = email;

  await manager.save(account);

  return user;
};

const createUser = async ({ provider, accountId, name, email }: AuthParams) => {
  const manager = getManager();

  const config = new UserConfigEntity();
  await manager.save(config);

  const account = new UserAccountEntity(provider, accountId, email);
  await manager.save(account);

  const user = new UserEntity(name, "Write", account, config);
  const savedUser = await manager.save(user);

  return savedUser;
};
