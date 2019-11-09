import { EntityManager } from "typeorm";
import { ExerciseDiaryEntity, ExerciseEntity } from "../database/entities";

export const updateExerciseDiarySubmittedCount = async (
  manager: EntityManager,
  exercise: ExerciseEntity,
  typeCount: number,
  submittedDate: string
) => {
  const exerciseDiary = await manager.findOne(ExerciseDiaryEntity, {
    exerciseId: exercise.id,
    date: submittedDate
  });

  if (exerciseDiary === undefined) {
    const newExerciseDiary = new ExerciseDiaryEntity(exercise, submittedDate);

    newExerciseDiary.submittedCount += 1;
    newExerciseDiary.typedCount += typeCount;

    await manager.save(newExerciseDiary);

    return newExerciseDiary;
  } else {
    exerciseDiary.submittedCount += 1;
    exerciseDiary.typedCount += typeCount;

    await manager.save(exerciseDiary);

    return exerciseDiary;
  }
};
