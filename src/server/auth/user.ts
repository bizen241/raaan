import * as createError from "http-errors";
import { getManager } from "typeorm";
import { AuthProviderName } from "../../shared/auth";
import { UserAccountEntity, UserConfigEntity, UserEntity, UserSummaryEntity } from "../database/entities";

interface AuthParams {
  provider: AuthProviderName;
  accountId: string;
  name: string;
  email: string;
}

export class AuthError extends Error {
  constructor(public provider: AuthProviderName) {
    super();
  }
}

export const saveUser = async (user: UserEntity | undefined, params: AuthParams) => {
  const { provider, accountId } = params;

  const account = await getManager().findOne(
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
    if (user !== undefined) {
      throw createError(403);
    }

    return updateUser(user, account, params);
  }

  const differentProviderAccount = await getManager().findOne(UserAccountEntity, {
    email: params.email
  });

  if (differentProviderAccount !== undefined) {
    throw new AuthError(differentProviderAccount.provider);
  }

  return createUser(params);
};

const createUser = async ({ provider, accountId, name, email }: AuthParams) => {
  const account = new UserAccountEntity(provider, accountId, email);
  const config = new UserConfigEntity();
  const summary = new UserSummaryEntity();
  const user = new UserEntity(account, config, summary, name, "Write");

  const savedUser = await getManager().save(user);

  return savedUser;
};

const updateUser = async (
  user: UserEntity | undefined,
  account: UserAccountEntity,
  { provider, accountId, email }: AuthParams
) => {
  if (user !== undefined) {
    account.provider = provider;
    account.accountId = accountId;
    account.email = email;

    await getManager().save(account);
  }

  if (account.email !== email) {
    account.email = email;

    await getManager().save(account);
  }

  if (account.user === undefined) {
    throw createError(500);
  }

  return account.user;
};
