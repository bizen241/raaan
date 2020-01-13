import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { GroupApplicationEntity, GroupEntity, GroupSecretEntity } from "../../database/entities";

export const GET = createSearchOperation("GroupApplication", "Read", async ({ manager, params }) => {
  const { groupId, applicantId, searchLimit, searchOffset } = params;

  const query = manager
    .createQueryBuilder(GroupApplicationEntity, "groupApplication")
    .leftJoinAndSelect("groupApplication.group", "group")
    .leftJoinAndSelect("groupApplication.applicant", "applicant")
    .leftJoinAndMapOne("group.summary", "group.summary", "groupSummary")
    .leftJoinAndMapOne("applicant.summary", "applicant.summary", "applicantSummary")
    .take(searchLimit)
    .skip(searchOffset);

  if (groupId !== undefined) {
    query.andWhere("groupApplication.groupId = :groupId", { groupId });
  }
  if (applicantId !== undefined) {
    query.andWhere("groupApplication.applicantId = :applicantId", { applicantId });
  }

  return query;
});

export const POST = createPostOperation("GroupApplication", "Write", async ({ currentUser, manager, params }) => {
  const { groupId, secret } = params;

  const group = await manager.findOne(GroupEntity, groupId);
  if (group === undefined) {
    throw createError(400);
  }

  const groupSecret = await manager
    .createQueryBuilder(GroupSecretEntity, "groupSecret")
    .andWhere("groupSecret.groupId = :groupId", { groupId })
    .getOne();
  if (groupSecret === undefined) {
    throw createError(400);
  }
  if (groupSecret.value !== secret || groupSecret.expireAt.getTime() <= Date.now()) {
    throw createError(403);
  }

  const groupApplication = new GroupApplicationEntity(group, currentUser);
  await manager.save(groupApplication);

  return [groupApplication];
});
