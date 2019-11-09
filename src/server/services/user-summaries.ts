import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { UserEntity, UserSummaryEntity } from "../database/entities";

export const updateUserSummarySubmitCount = async (
  manager: EntityManager,
  currentUser: UserEntity,
  typeCount: number
) => {
  const userSummary = await manager.findOne(UserSummaryEntity, currentUser.summaryId);
  if (userSummary === undefined) {
    throw createError(500);
  }

  userSummary.submitCount += 1;
  userSummary.typeCount += typeCount;

  await manager.save(userSummary);

  return userSummary;
};
