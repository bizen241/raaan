import { RequestHandler } from "express";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { AuthProviderName } from "../../shared/auth";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../database/entities";
import { ProcessEnv } from "../env";
import { saveSession } from "../session/save";
import { createAuthClients, UserProfile } from "./clients";

export const createAuthMiddleware = (processEnv: ProcessEnv): RequestHandler => {
  const clients = createAuthClients(processEnv);

  return (req, res, next) => {
    req.authorize = async provider => {
      try {
        await saveSession(req, res);

        const redirectUrl = clients[provider].authorize(req);

        res.redirect(redirectUrl.toString());
      } catch (e) {
        next(e);
      }
    };

    req.authenticate = async provider => {
      try {
        const userProfile = await clients[provider].authenticate(req);

        const user = await saveUser(provider, userProfile, req.user);

        req.user = user;

        req.session.user = user;
        req.session.sessionId = uuid();

        await saveSession(req, res);

        res.redirect("/");
      } catch (e) {
        throw createError(500);
      }
    };

    next();
  };
};

const saveUser = async (provider: AuthProviderName, userProfile: UserProfile, sessionUser: UserEntity) => {
  const manager = getManager();

  const account = await manager.findOne(
    UserAccountEntity,
    {
      provider,
      accountId: userProfile.id
    },
    {
      relations: ["user"]
    }
  );

  if (account !== undefined) {
    if (account.user === undefined) {
      throw new Error();
    }

    if (account.email !== userProfile.email) {
      account.email = userProfile.email;

      await manager.save(account);
    }

    return account.user;
  }

  if (sessionUser.permission === "Guest") {
    return createUser(provider, userProfile);
  } else {
    return updateUser(sessionUser, provider, userProfile);
  }
};

const updateUser = async (user: UserEntity, provider: AuthProviderName, userProfile: UserProfile) => {
  const manager = getManager();

  const account = await manager.findOne(UserAccountEntity, {
    user
  });
  if (account === undefined) {
    throw new Error();
  }

  account.provider = provider;
  account.accountId = userProfile.id;
  account.email = userProfile.email;

  await manager.save(account);

  return user;
};

const createUser = async (provider: AuthProviderName, userProfile: UserProfile) => {
  const manager = getManager();

  const config = new UserConfigEntity();
  await manager.save(config);

  const account = new UserAccountEntity(provider, userProfile.id, userProfile.email);
  await manager.save(account);

  const user = new UserEntity(name, "Write", account, config);
  const savedUser = await manager.save(user);

  return savedUser;
};
