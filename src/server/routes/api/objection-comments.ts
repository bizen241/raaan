import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ObjectionComment } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { ObjectionCommentEntity, ObjectionEntity } from "../../database/entities";

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

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { targetId, body = "" }: Params<ObjectionComment> = req.body;

  await getManager().transaction(async manager => {
    const target = await manager.findOne(ObjectionEntity, targetId);
    if (target === undefined) {
      throw createError(404);
    }

    const objectionComment = new ObjectionCommentEntity(target, currentUser, body);
    await manager.save(objectionComment);

    responseFindResult(req, res, objectionComment);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ObjectionComment",
  permission: "Write",
  hasBody: true
});
