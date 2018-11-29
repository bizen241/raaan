import { Response, Router } from "express";
import * as createError from "http-errors";
import { getManager } from "typeorm";

export const logoutRouter = Router();

export const setClearSiteData = (res: Response) => {
  res.setHeader("Clear-Site-Data", `"cache", "cookies", "storage", "executionContexts"`);
};

logoutRouter.get("/", async (req, res, next) => {
  const currentUser = req.session.user;
  if (currentUser.permission === "Guest") {
    return next(createError(403));
  }

  await getManager().remove(req.session);

  setClearSiteData(res);

  res.sendStatus(200);
});
