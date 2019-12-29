import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseCommentEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseCommentId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const exerciseComment = await manager.findOne(ExerciseCommentEntity, exerciseCommentId, {
      relations: ["target", "target.summary"]
    });
    if (exerciseComment === undefined) {
      return next(createError(404));
    }
    if (exerciseComment.target === undefined || exerciseComment.target.summary === undefined) {
      return next(createError(500));
    }

    const isAuthor = exerciseComment.authorId === currentUser.id;
    if (!isAuthor) {
      return next(createError(403));
    }

    const targetSummary = exerciseComment.target.summary;

    targetSummary.commentCount -= 1;
    await manager.save(targetSummary);

    await manager.remove(exerciseComment);

    responseFindResult(req, res, targetSummary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "ExerciseComment",
  permission: "Read",
  hasId: true
});
