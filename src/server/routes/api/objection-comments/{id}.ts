import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ObjectionCommentEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: objectionCommentId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const objectionComment = await manager.findOne(ObjectionCommentEntity, objectionCommentId, {
      relations: ["target", "target.summary"]
    });
    if (objectionComment === undefined) {
      return next(createError(404));
    }
    if (objectionComment.target === undefined || objectionComment.target.summary === undefined) {
      return next(createError(500));
    }

    const isAuthor = objectionComment.authorId === currentUser.id;
    if (!isAuthor) {
      return next(createError(403));
    }

    const targetSummary = objectionComment.target.summary;

    targetSummary.commentCount -= 1;
    await manager.save(targetSummary);

    await manager.remove(objectionComment);

    responseFindResult(req, res, targetSummary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "ObjectionComment",
  permission: "Read",
  hasId: true
});
