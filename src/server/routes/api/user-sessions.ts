import createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { UserSessionEntity } from "../../database/entities";

export const GET = createSearchOperation("UserSession", "Read", async ({ currentUser, manager, params }) => {
  const { userId } = params;
  if (userId === undefined) {
    throw createError(400);
  }

  const isOwn = userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(UserSessionEntity, "userSession")
    .leftJoinAndSelect("userSession.user", "user")
    .leftJoinAndSelect("user.summary", "summary")
    .andWhere("user.id = :userId", { userId });

  return query;
});
