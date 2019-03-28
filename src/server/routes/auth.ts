import { Router } from "express";
import { isAuthProviderName } from "../../shared/auth";

export const authRouter = Router();

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
