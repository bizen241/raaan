import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { ReportCommentEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { targetId, authorId, searchLimit, searchOffset } = parseQuery("ReportComment", req.query);

  const query = getManager()
    .createQueryBuilder(ReportCommentEntity, "reportComment")
    .leftJoinAndSelect("reportComment.target", "target")
    .leftJoinAndSelect("reportComment.author", "author")
    .leftJoinAndSelect("author.summary", "summary")
    .take(searchLimit)
    .skip(searchOffset);

  if (targetId !== undefined) {
    query.andWhere("reportComment.targetId = :targetId", { targetId });
  }
  if (authorId !== undefined) {
    query.andWhere("reportComment.authorId = :authorId", { authorId });
  }

  const [reportComments, count] = await query.getManyAndCount();

  responseSearchResult(req, res, reportComments, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ReportComment",
  permission: "Read",
  hasQuery: true
});
