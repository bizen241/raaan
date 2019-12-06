import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { GroupApplication } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { GroupApplicationEntity, GroupEntity, GroupSecretEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, applicantId, searchLimit, searchOffset } = parseQuery("GroupApplication", req.query);

  const query = getManager()
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

  const [groupApplications, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groupApplications, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupApplication",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { groupId, secret }: Params<GroupApplication> = req.body;

  await getManager().transaction(async manager => {
    const group = await manager.findOne(GroupEntity, groupId);
    if (group === undefined) {
      return next(createError(404));
    }

    const groupSecret = await manager.findOne(GroupSecretEntity, {
      group: {
        id: groupId
      }
    });
    if (groupSecret === undefined) {
      return next(createError(404));
    }
    if (groupSecret.value !== secret || groupSecret.expireAt.getTime() <= Date.now()) {
      return next(createError(403));
    }

    const groupApplication = new GroupApplicationEntity(group, currentUser);
    await manager.save(groupApplication);

    responseFindResult(req, res, groupApplication);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "GroupApplication",
  permission: "Write",
  hasBody: true
});
