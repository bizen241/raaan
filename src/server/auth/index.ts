import { Express } from "express";
import * as createError from "http-errors";
import * as passport from "passport";
import { getManager } from "typeorm";
import { UserEntity } from "../database/entities";
import { Env } from "../env";
import { createGitHubStrategy } from "./strategies/github";

export const prepareAuth = (env: Env, app: Express) => {
  passport.use("github", createGitHubStrategy(env.github.clientId, env.github.clientSecret));

  passport.serializeUser((user: UserEntity, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getManager().findOne(UserEntity, id);
      if (user === undefined) {
        return done(createError(403));
      }

      done(null, user);
    } catch (e) {
      done(createError(500));
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
