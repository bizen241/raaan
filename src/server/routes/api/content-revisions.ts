import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ExerciseRevision, ExerciseDetail } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  ExerciseRevisionEntity,
  createExerciseEntity,
  createExerciseRevisionEntity,
  UserEntity,
  createExerciseDetailEntity
} from "../../database/entities";

const getExercise = async (currentUser: UserEntity, contentId: string | undefined) => {
  if (contentId !== undefined) {
    const loadedExercise = await getManager().findOne(ExerciseEntity, contentId, {
      relations: ["author", "latest", "tags"]
    });

    if (loadedExercise !== undefined) {
      return loadedExercise;
    }
  }

  return createExerciseEntity({
    author: currentUser
  });
};

const saveExerciseRevision = async (content: ExerciseEntity, revision: ExerciseRevisionEntity) =>
  getManager().transaction(async manager => {
    const savedRevision = await manager.save(revision);

    content.latest = savedRevision;
    const savedExercise = await manager.save(content);

    savedRevision.content = savedExercise;
    await manager.save(savedRevision);

    return savedRevision.id;
  });

export const POST: OperationFunction = errorBoundary(async (req, res) => {
  const params: SaveParams<ExerciseDetail> = req.body;

  const manager = getManager();

  const content = await getExercise(req.session.user, contentId);

  const newDetail = createExerciseDetailEntity(manager, params);
  const newRevisionId = await saveExerciseRevision(content, newRevision);

  const loadedExercise = await getManager().findOne(ExerciseEntity, newRevisionId, {
    relations: ["content", "content.author", "content.latest", "content.tags"]
  });
  if (loadedRevision === undefined) {
    throw new Error();
  }

  responseFindResult(res, loadedRevision);
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseRevision",
  summary: "Create a revision of content",
  permission: "Write",
  hasBody: true
});
