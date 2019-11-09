import { EntityManager } from "typeorm";
import { ExerciseSummaryEntity } from "../database/entities";

export const updateExerciseSummarySubmittedCount = async (
  manager: EntityManager,
  exerciseSummary: ExerciseSummaryEntity,
  typeCount: number
) => {
  exerciseSummary.submittedCount += 1;
  exerciseSummary.typedCount += typeCount;

  await manager.save(exerciseSummary);

  return exerciseSummary;
};
