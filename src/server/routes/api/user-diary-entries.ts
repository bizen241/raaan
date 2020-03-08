import createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { UserDiaryEntryEntity } from "../../database/entities";

export const GET = createSearchOperation("UserDiaryEntry", "Read", async ({ currentUser, manager, params }) => {
  const { targetId: userId } = params;

  const isOwn = userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(UserDiaryEntryEntity, "userDiaryEntry")
    .leftJoinAndSelect("userDiaryEntry.user", "user")
    .orderBy("userDiaryEntry.date", "DESC");

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  return query;
});
