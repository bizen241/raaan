import * as createError from "http-errors";
import { Verifier } from "passport-github";
import { AuthStrategyCallback } from ".";
import { AuthProviderName } from "../../../shared/auth";
import { AuthError, saveUser } from "../user";

export const createVerifier = (provider: AuthProviderName): Verifier => async (
  req,
  _,
  __,
  profile,
  done: AuthStrategyCallback
) => {
  const { id, username, emails = [] } = profile;

  try {
    const email = emails[0];
    if (email === undefined) {
      throw createError(500);
    }

    const user = await saveUser(req.user, {
      provider,
      accountId: id,
      name: username || "",
      email: email.value
    });

    done(null, user);
  } catch (e) {
    if (e instanceof AuthError) {
      done(null, false, {
        provider: e.provider
      });
    }

    done(e);
  }
};
