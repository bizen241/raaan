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

  const manager = getManager();

  const targetAccount = await manager.findOne(
    UserAccountEntity,
    {
      provider,
      accountId
    },
    {
      relations: ["user"]
    }
  );
  const sameEmailAccount = await manager.findOne(
    UserAccountEntity,
    {
      email: params.email
    },
    {
      relations: ["user"]
    }
  );

  if (user === undefined) {
    if (targetAccount === undefined) {
      if (sameEmailAccount === undefined) {
        return createUser(params);
      } else {
        throw new AuthError(sameEmailAccount.provider);
      }
    } else {
      return updateUser(user, targetAccount, params);
    }
  }

  const currentAccount = await manager.findOne(
    UserAccountEntity,
    {
      user: {
        id: user.id
      }
    },
    {
      relations: ["user"]
    }
  );
  if (currentAccount === undefined) {
    throw createError(500, "currentAccount is not defined");
  }

  if (targetAccount !== undefined) {
    if (targetAccount.id === currentAccount.id) {
      return updateUser(user, targetAccount, params);
    } else {
      throw createError(403);
    }
  } else {
    if (sameEmailAccount === undefined || sameEmailAccount.id === currentAccount.id) {
      return updateUser(user, currentAccount, params);
    } else {
      throw createError(403);
    }
  }
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
