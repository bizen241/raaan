import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, SubmissionEntity } from "../../database/entities";
import { updateContestEntry } from "../../services/contest-entries";
import { updateRelatedEntities } from "../../services/submissions";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { exerciseId, contestId, typeCount, time, accuracy }: Params<Submission> = req.body;
  if (exerciseId === undefined || typeCount === undefined || time === undefined || accuracy === undefined) {
    throw createError(400);
  }

  await getManager().transaction(async manager => {
    const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
      relations: ["author", "summary", "draft"]
    });
    if (exercise === undefined) {
      throw createError(400);
    }
    if (exercise.author === undefined || exercise.summary === undefined) {
      throw createError(500);
    }

    if (typeCount > exercise.summary.maxTypeCount) {
      throw createError(400);
    }

    const submission = await manager.save(
      new SubmissionEntity(currentUser, exercise, {
        typeCount,
        time,
        accuracy
      })
    );

    const updatedEntities = await updateRelatedEntities({
      manager,
      currentUser,
      submission
    });

    if (contestId !== undefined) {
      const contestEntry = await updateContestEntry({
        manager,
        currentUser,
        submission,
        contestId
      });

      updatedEntities.push(contestEntry);
    }

    responseFindResult(req, res, ...updatedEntities);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Submission",
  permission: "Read",
  hasBody: true
});
