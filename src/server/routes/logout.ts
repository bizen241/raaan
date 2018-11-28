import { Router } from "express";
import * as createError from "http-errors";

export const logoutRouter = Router();

logoutRouter.get("/", async (req, res, next) => {
  const currentUser = req.session.user;
  if (currentUser.permission === "Guest") {
    return next(createError(403));
  }

  res.setHeader("Clear-Site-Data", `"cache", "cookies", "storage", "executionContexts"`);

  res.sendStatus(200);
});
