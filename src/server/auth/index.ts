import { RequestHandler } from "express";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { AuthProviderName } from "../../shared/auth";
import { AccountEntity, createAccount, createUser, UserEntity } from "../database/entities";
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
        const user = await saveUserAccount(provider, userProfile, req.session.user).catch(() => {
          throw createError(500);
        });

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

const saveUserAccount = async (provider: AuthProviderName, userProfile: UserProfile, sessionUser: UserEntity) => {
  const manager = getManager();

  const account = await manager.findOne(
    AccountEntity,
    { provider, accountId: userProfile.id },
    {
      relations: ["user"]
    }
  );

  return account !== undefined ? account.user : await createUserAccount(provider, userProfile, sessionUser);
};

const createUserAccount = async (provider: AuthProviderName, userProfile: UserProfile, sessionUser: UserEntity) => {
  const user =
    sessionUser.permission !== "Guest"
      ? sessionUser
      : createUser({
          name: userProfile.name,
          permission: "Read"
        });

  const account = createAccount({
    accountId: userProfile.id,
    provider,
    user
  });

  const manager = getManager();

  const savedUser = await manager.save(user);
  await manager.save(account);

  return savedUser;
};
