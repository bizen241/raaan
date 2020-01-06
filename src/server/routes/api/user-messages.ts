import * as createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { UserMessageEntity } from "../../database/entities";

export const GET = createSearchOperation("UserMessage", "Read", async ({ currentUser, manager, params }) => {
  const { userId } = params;

  const isOwn = userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(UserMessageEntity, "userMessage")
    .leftJoinAndSelect("userMessage.user", "user");

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  return query;
});
