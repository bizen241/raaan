import { createSearchOperation } from "../../api/operation";
import { ExerciseDiaryEntryEntity } from "../../database/entities";

export const GET = createSearchOperation("ExerciseDiaryEntry", "Read", async ({ manager, params }) => {
  const { targetId: exerciseId } = params;

  const query = manager
    .createQueryBuilder(ExerciseDiaryEntryEntity, "exerciseDiaryEntry")
    .leftJoinAndSelect("exerciseDiaryEntry.exercise", "exercise")
    .orderBy("exerciseDiaryEntry.date", "DESC");

  if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  return query;
});
