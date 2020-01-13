import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { setClearSiteData } from "../../../auth";
import { UserSessionEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("UserSession", "Read", async ({ req, res, currentUser, manager, id }) => {
  const userSession = await manager.findOne(UserSessionEntity, id);
  if (userSession === undefined) {
    throw createError(404);
  }

  const isOwn = userSession.userId !== currentUser.id;
  if (isOwn) {
    throw createError(403);
  }

  await manager.remove(userSession);

  if (userSession.sessionId === req.sessionID) {
    setClearSiteData(res);
  }

  return [];
});
