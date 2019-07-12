import { Response, Router } from "express";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserSessionEntity } from "../database/entities";

export const logoutRouter = Router();

export const setClearSiteData = (res: Response) => {
  res.setHeader("Clear-Site-Data", `"cache", "cookies", "storage", "executionContexts"`);
};

logoutRouter.get("/", async (req, res, next) => {
  const session = req.session;

  if (session === undefined) {
    return next(createError(500));
  }
  if (req.user === undefined) {
    return next(createError(403));
  }

  await getManager()
    .delete(UserSessionEntity, {
      sessionId: session.id
    })
    .catch(() => {
      return next(createError(500));
    });

  setClearSiteData(res);

  res.sendStatus(200);
});
