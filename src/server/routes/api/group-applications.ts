import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { GroupApplication } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { GroupApplicationEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, applicantId, searchLimit, searchOffset } = parseQuery<GroupApplication>(
    "GroupApplication",
    req.query
  );

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
