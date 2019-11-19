import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { SubmissionEntity, UserEntity, UserSummaryEntity } from "../database/entities";

export const updateUserSummarySubmitCount = async (params: {
  manager: EntityManager;
  currentUser: UserEntity;
  submission: SubmissionEntity;
}) => {
  const { manager, currentUser, submission } = params;
  const { typeCount } = submission;

  const userSummary = await manager.findOne(UserSummaryEntity, currentUser.summaryId, {
    relations: ["user"]
  });
  if (userSummary === undefined) {
    throw createError(500);
  }

  userSummary.submitCount += 1;
  userSummary.typeCount += typeCount;

  await manager.save(userSummary);

  return userSummary;
};
