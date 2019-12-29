import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { ObjectionCommentEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { targetId, authorId, searchLimit, searchOffset } = parseQuery("ObjectionComment", req.query);

  const query = getManager()
    .createQueryBuilder(ObjectionCommentEntity, "objectionComment")
    .leftJoinAndSelect("objectionComment.target", "target")
    .leftJoinAndSelect("objectionComment.author", "author")
    .leftJoinAndSelect("author.summary", "summary")
    .take(searchLimit)
    .skip(searchOffset);

  if (targetId !== undefined) {
    query.andWhere("objectionComment.targetId = :targetId", { targetId });
  }
  if (authorId !== undefined) {
    query.andWhere("objectionComment.authorId = :authorId", { authorId });
  }

  const [objectionComments, count] = await query.getManyAndCount();

  responseSearchResult(req, res, objectionComments, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ObjectionComment",
  permission: "Read",
  hasQuery: true
});
