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
        const user = await saveUserAndAccount(provider, userProfile, req.user).catch(() => {
          throw createError(500);
        });

        req.user = user;
        req.session.user = user;
        req.session.sessionId = uuid();

        await saveSession(req, res).catch(() => {
          throw createError(500);
        });

        res.redirect("/");
      } catch (e) {
        next(e);
      }
    };

    next();
  };
};

const saveUserAndAccount = async (provider: AuthProviderName, userProfile: UserProfile, sessionUser: UserEntity) => {
  const manager = getManager();

  const account = await manager.findOne(
    UserAccountEntity,
    { provider, accountId: userProfile.id },
    {
      relations: ["user"]
    }
  );

  if (account !== undefined) {
    if (account.user === undefined) {
      throw createError(500);
    }

    return account.user;
  }

  return await createUserAndAccount(provider, userProfile, sessionUser);
};

const createUserAndAccount = async (provider: AuthProviderName, userProfile: UserProfile, sessionUser: UserEntity) => {
  const manager = getManager();

  const userConfig = new UserConfigEntity();
  await manager.save(userConfig);

  const user = sessionUser.permission !== "Guest" ? sessionUser : new UserEntity(name, "Write", userConfig);
  const savedUser = await manager.save(user);

  const userAccount = new UserAccountEntity(user, provider, userProfile.id);
  await manager.save(userAccount);

  return savedUser;
};
