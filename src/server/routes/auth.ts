import { Router } from "express";
import { AuthProviderName } from "../../shared/auth";

export const authRouter = Router();

const authProviderNames = Object.values({
  github: "github"
} as { [P in AuthProviderName]: P });

const isAuthProviderName = (target: any): target is AuthProviderName => authProviderNames.includes(target);

authRouter.get("/:provider", (req, _, next) => {
  const { provider } = req.params;

  if (!isAuthProviderName(provider)) {
    next();

    return;
  }

  req.authorize(provider);
});

authRouter.get("/:provider/callback", (req, _, next) => {
  const { provider } = req.params;

  if (!isAuthProviderName(provider)) {
    next();

    return;
  }

  req.authenticate(provider);
});
